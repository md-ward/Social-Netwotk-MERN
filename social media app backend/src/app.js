// ! libraries ............
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const http = require("http");

// ! routers and imports......
const registeringRoutes = require("./registeration/routes/registeringRoutes");
const accountSettingsRouter = require("./registeration/routes/accountSettingRoutes");
const postRouter = require("./post/routes/postRoutes");
const profileRouter = require("./profile/routes/profileRoutes");
const notificationRouter = require("./notifications/routes/notificationsRoutes");
const commentsRouter = require("./comments/routes/commentsRouts");
const notificationServiceInstance = require("./webSockets/controllers/notificationWebSocketController");
const PostServiceInstance = require("./webSockets/controllers/postsWebSocketController");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://192.168.1.7:5173",
    "http://localhost:4173",
  ],
  methods: ["PUT", "POST", "GET", "DELETE", "OPTIONS", "HEAD"],
  credentials: true,
};
app.use(cors(corsOptions));

// ! user Registeration.....

app.use("/register", registeringRoutes);
// ! account settings.......... [change phone num , change account status  ]
app.use("/account/setting", accountSettingsRouter);

app.use("/account/profile", profileRouter);

app.use("/posts", postRouter);

app.use("/account/notification", notificationRouter);
// ! comments ..........
app.use("/comments", commentsRouter);

//! Allowing access for images only those folders ...FD
app.use(
  "/uploads/defaults",
  express.static(path.join(__dirname, "uploads", "defaults"))
);
app.use(
  "/uploads/thumbnails",
  express.static(path.join(__dirname, "uploads", "thumbnails"))
);

app.use(
  "/uploads/original",
  express.static(path.join(__dirname, "uploads", "original"))
);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
    const server = http.createServer(app);
    // ! config notification service
    notificationServiceInstance.setServer(
      server,
      process.env.NOTIFICATION_SERVICE_PORT,
      corsOptions
    );

    // ! config post service

    PostServiceInstance.setServer(
      server,
      process.env.POST_SERVICE_PORT,
      corsOptions
    );
    notificationServiceInstance.startServer();
    PostServiceInstance.startServer();

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Server running on 192.168.1.7:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if there's an error connecting to the database
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
