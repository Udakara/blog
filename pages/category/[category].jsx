import React from "react";
import { useRouter } from "next/router";
import { getCategories, getCategoriesedPosts } from "../../services";
import { PostCard, Categories, PostWidget, PoweredBy } from "../../components";

const Category = ({ posts }) => {
  const router = useRouter();
  const { category } = router.query;

  if(router.isFallback){
    <h1>Data is loading</h1>
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          { posts && posts.length != 0 ? (
            posts.map((post, index) => (
              <div>
                <PostCard post={post} key={index} />
              </div>
            ))
          ) : (
            <h1 className="inline align-middle text-gray-700 ml-2  text-lg">
              Not Available
            </h1>
          )}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-20">
            <PostWidget />
            <Categories />
            <PoweredBy />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

export async function getStaticProps({ params }) {
  const data = await getCategoriesedPosts(params.category);
  return {
    props: { posts: data },
    revalidate: false,
  };
}

export async function getStaticPaths() {
  const categoryList = await getCategories();
  return {
    paths: categoryList.map((category) => ({
      params: { category: category.slug },
    })),
    fallback: true,
  };
}
