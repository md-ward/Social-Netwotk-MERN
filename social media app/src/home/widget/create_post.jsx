import { useRef, useState } from "react";
import usePostStore from "../store/usePostStore";
import useProfileStore from "../../profile/store/useProfileStore";

const CreatePost = () => {
  const formRef = useRef();
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleSubmittingNewPost = usePostStore(
    (state) => state.handleSubmittingNewPost,
  );

  const { personalProfileDetails } = useProfileStore((state) => ({
    personalProfileDetails: state.personalProfileDetails,
  }));

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const fileList = Array.from(e.target.files);
    setImages(fileList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    formData.append("content", content);
    images.forEach((image) => {
      formData.append(`images`, image);
      console.log(image);
    });

    handleSubmittingNewPost(formData);

    setContent("");
    setImages([]);
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="  ">
      <div className="flex items-center space-x-2">
        <img
          src={personalProfileDetails.profileImage?.originalUrl ?? ""}
          alt="user profile image"
          className="aspect-square h-8 w-8  rounded-full object-fill"
        />
        <button
          onClick={openModal}
          className="mt-2 w-full flex-grow rounded-full bg-gray-100 px-4 py-2 text-gray-500 outline-none"
        >
          {"What's on your mind?"}
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-40  flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex  w-1/2 flex-col rounded-lg bg-white p-4">
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="grid grid-cols-3 grid-rows-2 gap-2 bg-gray-100">
                {images.map((image) => (
                  <img
                    className="size-32 object-scale-down"
                    key={image.name}
                    src={URL.createObjectURL(image)}
                  />
                ))}
              </div>
              <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="What's on your mind?"
                className="mb-4 w-full resize-none rounded-lg border border-gray-300 px-4 py-2"
              />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="mr-2 rounded-full bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                >
                  Post
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full px-4 py-2 text-gray-500 transition-colors hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
