import StoriesBar from "../../global/widgets/storiesBar";
import CreatePost from "../widget/create_post";
import Posts from "../widget/posts";

const HomePage = () => {
  return (
    <div className="flex w-full  flex-col ">
      {/* <ContactSection></ContactSection> */}
      <div className="mx-auto w-[90%]">
        <StoriesBar />
        <CreatePost />
      </div>

      <Posts />
    </div>
  );
};

export default HomePage;
