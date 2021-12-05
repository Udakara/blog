import Head from 'next/head'
import React, { useState, useEffect } from "react";
import { PostCard, Categories, PostWidget , PoweredBy} from '../components'
import { getPosts } from '../services'

export default function Home({posts}) {
  
  return (
    
    <div className="container mx-auto px-10 mb-8">
    
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <div>
              <PostCard post={post.node} key={index} />
            </div>
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-20">
            <PostWidget />
            <Categories />
            <PoweredBy/>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const posts = (await getPosts()) || []
  return {
    props: { posts }
  }
}
