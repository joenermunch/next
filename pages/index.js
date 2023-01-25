import Head from "next/head";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../lib/test-data";
import { client } from "../lib/apollo";
import { gql } from "@apollo/client";
import About from "../components/About";

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>Joener Münch - WordPress Developer</title>
        <link rel="icon" href="favicon.png"></link>
      </Head>

      <Hero />
      <About />

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

  const response = await client.query({
    query: GET_POSTS,
  });

  console.log(response);

  const posts = response?.data?.posts?.nodes;
  return {
    props: {
      posts,
    },
  };
}
