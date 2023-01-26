import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import { client } from "../lib/apollo";
import { gql } from "@apollo/client";
import About from "../components/About";
import parse from "html-react-parser";
import Link from "next/link";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div className="container">
      <Head>
        <title>joener.io, WordPress Developer</title>
        <link rel="icon" href="favicon.png"></link>
      </Head>

      <Hero />
      <About />

      <div className="projects-container inner-block">
        <div className="main-margin">
          <h2>Blog</h2>
          <div className="posts-container">
            {posts.map((post) => {
              return (
                <div className="post-item post">
                  <Link href={`blog${post.uri}`}>
                    <a>
                      <span class="list-category">
                        {post?.categories.nodes[0].name}
                      </span>
                      <div class="image-container">
                        <img src={post?.featuredImage?.node.sourceUrl} />
                      </div>

                      <div className="text-container">
                        <h3>{parse(post.title)}</h3>

                        {parse(post.excerpt)}
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <main class="main-margin">
        <div className="grid">
          {posts.map((post) => {
            return <PostCard key={post.uri} post={post}></PostCard>;
          })}
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}

export async function getStaticProps() {
  const GET_POSTS = gql`
    query GetAllPosts {
      posts(first: 3) {
        nodes {
          date
          excerpt
          title
          uri
          content
          featuredImage {
            node {
              uri
              srcSet
              sourceUrl
            }
          }
          categories {
            nodes {
              id
              name
            }
          }
        }
      }
    }
  `;

  const response = await client.query({
    query: GET_POSTS,
  });

  const posts = response?.data?.posts?.nodes;
  return {
    props: {
      posts,
    },
  };
}
