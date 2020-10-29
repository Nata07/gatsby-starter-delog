import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostLink from "../components/post-link";
import HeroHeader from "../components/heroHeader";
 
const IndexPage = ({
  data: {
    site,
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter((edge) => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <HeroHeader />

      <div>
        <h2>Entre no nosso grupo do Whatsapp &darr;</h2> 
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <a href="https://chat.whatsapp.com/HjRIxrTaRdNJI30XHpMPEZ?fbclid=IwAR3qwsvguM9HPAa9wfiOldCo9Ch6Sg5Z6wW4R4EmPjwswvuRtS4VyUIOUH4"
            target="_blank"
            type="submit"
            className="button -primary"
            style={{ marginRight: 0, fontWeight: '700', textAlign: 'center', width: '35%', marginBottom: '15px' }}
          >
            Quero fazer parte! 
          </a>    
        </div>
      </div>

      <h2>Blog Posts &darr;</h2>
      <div className="grids">{Posts}</div>
    </Layout>
  );
};

export default IndexPage;
export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(locale: "pt-br", formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
          }
        }
      }
    }
  }
`;
