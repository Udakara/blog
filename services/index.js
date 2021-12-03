import { request, gql } from 'graphql-request'

const graphQlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
  const query = gql`
    query GetPostsQuery {
        postsConnection {
          edges {
            node {
              author {
                name
                id
                photo {
                  url
                }
                bio
              }
              title
              slug
              isFeatured
              publishedAt
              id
              excerpt
              createdAt
              featuredImage {
                url
              }
              categories {
                id
                name
                slug
              }
            }
          }
        }
      } 
    `

  const postsList = await request(graphQlAPI, query)

  return postsList.postsConnection.edges
}

export const getRecentPosts = async () => {
  const query = gql`
  query getRecentpostsQuery {
    postsConnection(orderBy: createdAt_ASC, first: 3) {
      edges {
        node {
          title
          slug
          publishedAt
          id
          createdAt
          featuredImage {
            url
          }
        }
      }
    }
  }
  `
  const recentPostList = await request(graphQlAPI, query)
  return recentPostList.postsConnection.edges
}

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug:String! , $categories:[String!]){
      postsConnection(
        where:{slug_not:$slug, AND:{categories_some:{slug_in: $categories}}},
        first:3
      )
      {
        edges {
          node {
            title
            slug
            publishedAt
            id
            createdAt
            featuredImage {
              url
            }
          }
        }
      }
    }
  `
  const similarPostList = await request(graphQlAPI, query,{categories, slug})
  return similarPostList.postsConnection.edges
}

export const getCategories = async () => {
  const query = gql`
  query MyQuery {
    categories {
      id
      name
      stage
      slug
    }
  }
  `
  const categoryList = await request(graphQlAPI, query)
  return categoryList.categories
}

export const getPostDetails = async (slug ) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        id
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphQlAPI, query, { slug });

  return result.post;
}


export const submitComment =  async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
}

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphQlAPI, query, { slug });

  return result.comments;
};

export const getCategoriesedPosts = async (category) => {
  const query = gql`
    query GetCategorizedPostsQuery($category: String!) {
      posts(
        where: {categories_some: {slug: $category}}
        orderBy: createdAt_DESC
        first: 3
        stage: PUBLISHED
      ) {
        id
        title
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        excerpt
        isFeatured
        slug
        publishedAt
        featuredImage {
          url
        }
        categories {
          id
          name
          slug
        }
      }
    }`

  const postsList = await request(graphQlAPI, query, {category})

  return postsList.posts
}