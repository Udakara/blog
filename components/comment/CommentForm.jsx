import React, { useRef, useState, useEffect } from "react";
import { submitComment } from "../../services";

const CommentForm = ({slug}) => {
  const [error, seterror] = useState(false);
  const [localStorage, setlocalStorage] = useState(null);
  const [showSuccessMessage, setshowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  const handleCommentSubmit = () => {
    seterror(false);

    const comment = commentEl.current.value;
    const name = nameEl.current.value;
    const email = emailEl.current.value;

    if (!comment || !name || !email) {
      seterror(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    submitComment(commentObj).then((res) => {
      console.log("response", res);
      setshowSuccessMessage(true);

      setTimeout(() => {
        setshowSuccessMessage(false);
      }, 2000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Comment
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="comment"
          placeholder="Comment"
          ref={commentEl}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
          ref={nameEl}
        />
        <input
          type="email"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
          ref={emailEl}
        />
      </div>
      {error && <p className="text-xs text-red-600">All fields are required</p>}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData">
            {" "}
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmit}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-blue-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Submit
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
