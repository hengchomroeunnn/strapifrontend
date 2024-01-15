import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id,
        attributes {
          Title
          Rating
          Body
        }
      }
    }
  }
`;

export default function Homepage() {
  
  const {data, loading, error} = useQuery(REVIEWS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :/</p>;

  return (
    <div>
      {data && data.reviews.data.map(movie => (
        <div key={movie.id}>
          <h2>{movie.attributes.Title}</h2>
          <p>Rating: {movie.attributes.Rating}</p>
          {/* <div>
          {movie.attributes.Body.map((paragraph, index) => (
            <p key={index}>{paragraph.children[0].text}</p>
          ))}
        </div> */}
          <Link to={`/reviewdetail/${movie.id}`}>Review Detail</Link>
        </div>
      ))}
    </div>
  );
}
