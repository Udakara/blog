import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../../services";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded p-8 mb-8">
      <h3 className="text-xl mb-8 border-b pb-3 font-semibold">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              alt={post.node.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              src={post.node.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <Link
              href={`/post/${post.node.slug}`}
              className="text-md"
              key={index}
            >
              {post.node.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
