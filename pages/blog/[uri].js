import Head from "next/head";
import Footer from "../../components/Footer";
import { getPostByUri } from "../../lib/test-data";
import { client } from "../../lib/apollo";
import { gql } from "@apollo/client";
import Skeleton from "react-loading-skeleton";
import parse from "html-react-parser";
import Link from "next/link";

export default function SlugPage({ post, allPosts }) {
  return (
    <div>
      <Head>
        <title>Blog | {post?.title}</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <div className="inner-hero  inner-block">
        <div className="main-margin">
          <div className="text-container">
            <div className="breadcrumbs"></div>
            <h1>{post?.title ? post?.title : <Skeleton />}</h1>
            <p>{post?.excerpt ? parse(post?.excerpt) : <Skeleton />}</p>
            <div className="category-container">
              {post?.categories.nodes.map((category) => {
                return <span className="category">{category.name}</span>;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="post-content inner-block">
        <div className="main-margin post-columns">
          <div
            className="post-inner"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          ></div>

          <div className="sidebar">
            <div className="inner">
              <h3>More Posts</h3>
              <div className="sidebar-post-container">
                {allPosts.nodes.map((related) => {
                  return (
                    <Link href={`/blog${related?.uri}`}>
                      <h4>{related?.title}</h4>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const GET_POST_BY_URI = gql`
    query GetPostByURI($id: ID!) {
      post(id: $id, idType: URI) {
        title
        content
        slug
        uri
        date
        excerpt
        categories {
          nodes {
            id
            name
          }
        }
      }
    }
  `;

  const GET_POSTS = gql`
    query GetAllPosts {
      posts {
        nodes {
          content
          title
          uri
          date
        }
      }
    }
  `;

  const responsePosts = await client.query({
    query: GET_POSTS,
  });

  const response = await client.query(
    {
      query: GET_POST_BY_URI,
      variables: {
        id: params.uri,
      },
    },
    async () => {}
  );

  const post = response?.data?.post;
  const allPosts = responsePosts?.data?.posts;
  console.log(allPosts);
  return {
    props: {
      post,
      allPosts,
    },
  };
}

export async function getStaticPaths() {
  const paths = [];
  return {
    paths,
    fallback: "blocking",
  };
}
