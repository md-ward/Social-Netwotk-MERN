import { useEffect, useState } from "react";
import usePostStore from "../store/usePostStore";
import { formatPostTime } from "../../global/formatTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../global/widgets/loader";
import Comments from "./comments";

const Posts = () => {
  const { handleGettingGeneralPosts, posts, isLoading, error } = usePostStore(
    (state) => ({
      handleGettingGeneralPosts: state.handleGettingGeneralPosts,
      posts: state.posts,
      isLoading: state.isLoading,
      error: state.error,
    }),
  );

  useEffect(() => {
    handleGettingGeneralPosts();
  }, [handleGettingGeneralPosts]);

  return (
    <div className="custom-scrollbar  flex  w-full flex-col items-center overflow-y-scroll md:max-h-svh lg:max-h-[36rem]">
      {posts?.map((post) => (
        <Post post={post} key={post._id} />
      ))}
      {isLoading && (
        <div className="flex w-full max-w-2xl justify-center rounded-lg bg-gray-400">
          <Loader />
        </div>
      )}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    attachedImages: PropTypes.array,
    user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      profile: PropTypes.shape({
        profileImage: PropTypes.shape({
          originalUrl: PropTypes.string,
        }),
        user_name: PropTypes.string,
      }),
    }),
    content: PropTypes.string,
    createdAt: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default Posts;
export function Post({ post }) {
  const [readMore, setReadMore] = useState(false);
  const [openImage, setOpenImage] = useState({ isOpen: false, imageUrl: null });
  const [showComments, setShowComments] = useState(false);
  function expandImage(imageUrl) {
    setOpenImage({ isOpen: !openImage.isOpen, imageUrl: imageUrl });
  }
  function closeImage() {
    setOpenImage({ isOpen: false, imageUrl: null });
  }

  function toggleComments() {
    setShowComments(!showComments);
  }

  return (
    <div className=" m-4 w-full max-w-2xl rounded-lg bg-white p-4 shadow-md">
      {openImage.isOpen && (
        <div className="fixed  inset-0 z-50 flex h-full w-full flex-col  items-center  justify-center gap-2 bg-gray-500/90">
          <FontAwesomeIcon
            onClick={closeImage}
            className="absolute  right-0  top-2 aspect-square cursor-pointer  rounded-full bg-white p-2"
            icon={faClose}
            size="xl"
          />
          <img
            src={openImage.imageUrl}
            className="max-h-[90%] max-w-screen-md bg-white"
          />
        </div>
      )}
      <div className="flex items-center">
        <img
          src={post.user.profile.profileImage?.originalUrl}
          alt="User Profile"
          className="mr-4 h-12 w-12 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{`${post.user.first_name} ${post.user.last_name}`}</h2>
          <p className="text-gray-700">@{post.user.profile.user_name}</p>
          <p className="text-sm text-gray-500">
            {formatPostTime(post.createdAt)}
          </p>
        </div>
      </div>
      <p className={`mt-4 ${readMore ? "line-clamp-none" : "line-clamp-4"}`}>
        {post.content}
      </p>
      {post.content.length > 100 ? (
        <p
          onClick={() => setReadMore(!readMore)}
          className="cursor-pointer text-sky-500"
        >
          {readMore ? "Read less" : "Read More"}
        </p>
      ) : (
        ""
      )}
      <div className="mt-4 flex w-full flex-wrap  justify-center gap-2 overflow-hidden">
        {post.attachedImages.map((image, index) => (
          <img
            loading="lazy"
            onClick={() => expandImage(image.originalUrl)}
            key={index}
            src={image.originalUrl}
            alt="Post Image"
            className="mt-2  size-72  rounded  border-dark-blue object-cover hover:cursor-pointer hover:border "
          />
        ))}
      </div>
      {/* ..............Comment and like ..... */}
      <div className="mt-4 flex items-center justify-evenly">
        <button
          onClick={toggleComments}
          className="ml-6 flex items-center gap-2 text-gray-500 hover:text-blue-500 focus:outline-none"
        >
          <p>Comment</p>
          <FontAwesomeIcon icon={faComment} />
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 focus:outline-none">
          <p>Like</p>
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
      </div>
      {showComments && <Comments key={post._id} postId={post._id} />}
    </div>
  );
}
