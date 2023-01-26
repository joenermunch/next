import "../styles/index.scss";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "../lib/apollo";
import "animate.css/animate.min.css";
import Script from "next/script";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Script
        id="tagmanager-main"
        strategy="lazyOnload"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=GTM-M2M3SSG`}
      ></Script>
      <Script
        id="tagmanager-setup"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTM-M2M3SSG');
          `,
        }}
      />
      <Header />

      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
