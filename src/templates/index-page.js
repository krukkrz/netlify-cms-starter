import * as React from "react"
import PropTypes from "prop-types";
import { getSrc} from "gatsby-plugin-image";
import { graphql } from "gatsby";


export const IndexPageTemplate = ({ image, title }) => {
  const imageSource = getSrc(image) || image;
  return (
    <>
      <h1>{title}</h1>
      <img src={imageSource} alt=''/>
    </>
);
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
};

// markup
const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
      <IndexPageTemplate
          image={frontmatter.image}
          title={frontmatter.title}
      />
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(width: 240, quality: 64, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;