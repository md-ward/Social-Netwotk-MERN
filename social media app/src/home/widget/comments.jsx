import { useEffect, useRef } from "react";
import useCommentStore from "../store/useCommentStore";
import PropTypes from "prop-types";
import Loader from "../../global/widgets/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { formatPostTime } from "../../global/formatTime";

const Comments = ({ postId }) => {
  const {
    comments,
    handleFetchingPostComments,
    handleAddingNewComment,
    isLoading,
  } = useCommentStore();

  useEffect(() => {
    handleFetchingPostComments(postId);
  }, [handleFetchingPostComments, postId]);

  const commentInputRef = useRef();

  async function submitNewComment(e) {
    e.preventDefault();
    await handleAddingNewComment(postId, commentInputRef.current.value);
    commentInputRef.current.value = ""; // Clear the input field after submitting the comment
  }

  return (
    <div className="custom-scrollbar flex max-h-96 flex-col space-y-4 overflow-y-scroll py-2">
      {isLoading && <Loader />}
      {!isLoading &&
        comments.map((comment) => (
          <div
            className="flex items-center space-x-4 rounded bg-slate-50 p-4"
            key={comment._id}
          >
            <img
              src={comment.user.profile.profileImage.originalUrl ?? ""}
              alt={comment.user.first_name + " profile image"}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <div className="flex space-x-1 text-xs font-bold">
                <p>{comment.user.first_name}</p>
                <p>{comment.user.last_name}</p>
              </div>
              <p className="whitespace-pre-wrap text-gray-600">
                {comment.comment}
              </p>
              <p className="text-xs text-gray-400">
                {formatPostTime(comment.createdAt)}
              </p>
            </div>
          </div>
        ))}
      <form className="flex rounded-md px-3">
        <input
          autoComplete="off"
          ref={commentInputRef}
          type="text"
          name="new_comment"
          className="flex-1 rounded-l-[5rem] bg-slate-50 px-3 py-2 text-sm text-gray-600 outline-blue-500"
          placeholder="Add a comment"
        />
        <button
          onClick={submitNewComment}
          className="size-10 rounded-r-[5rem] bg-blue-500 text-white hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faArrowRight} size="lg" />
        </button>
      </form>
    </div>
  );
};

Comments.propTypes = {
  postId: PropTypes.string,
};

export default Comments;
