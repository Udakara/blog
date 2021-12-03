import React from "react";
import Link from "next/link";

const PostCard = ({ post , key }) => {
  return (
    <div className="bg-white shadow-lg rounded p-0 lg:p-8 pb-12 mb-8 bg-opacity-60">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img
          src={post.featuredImage != null ? post.featuredImage.url : null}
          alt={post.title}
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <div>
        <h1 className="transition duration-300 text-left mb-4 cursor-pointer hover:text-blue-500 text-3xl font-semibold sm:px-5 lg:px-1">
          <Link  key={key} href={`/post/${post.slug}`}>{post.title}</Link>
        </h1>
      </div>
      <div className="block lg:flex px-1 text-center items-center justify-start mb-8 w-full">
        <div className="flex justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-1 items-center">
          <img
            alt={post.author.name}
            height="30px"
            width="30px"
            src={post.author.photo.url}
          />
        </div>
        <p className="inline align-middle text-gray-700 ml-2  text-sm">
          {post.author.name}
        </p>
      </div>
      <div>
        <p className="text-justify text-sm text-gray-700 font-normal px-1 mb-8  sm:px-5 lg:px-1">
          {post.excerpt}
        </p>
      </div>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-blue-500 text-sm font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Continue reading
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
