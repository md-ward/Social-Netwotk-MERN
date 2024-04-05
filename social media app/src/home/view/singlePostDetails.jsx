import { useEffect } from "react";
import { Post } from "../widget/posts";
import usePostStore from "../store/usePostStore";
import { useParams } from "react-router-dom";

const SinglePostPage = () => {
  const { singlePost, handleFetchingSinglePost } = usePostStore((state) => ({
    singlePost: state.singlePost,
    handleFetchingSinglePost: state.handleFetchingSinglePost,
  }));
  const params = useParams();

  useEffect(() => {
    handleFetchingSinglePost(params.postId);
  }, [handleFetchingSinglePost, params]);
  //   console.log(singlePost);
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <Post post={singlePost} />{" "}
    </div>
  );
};

export default SinglePostPage;
