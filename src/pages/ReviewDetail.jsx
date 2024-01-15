import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEW = gql`
query GetReview($id: ID!) {
  review(id: $id) {
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
`
export default function ReviewDetail() {
  const { id } = useParams();
  const {data, loading, error} = useQuery(REVIEW, {
    variables: {id: id}
  })
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error :/</p>;
  console.log(data);
  return (
    <>
      <h1>Review Detail</h1>
      <p>{id}</p>
      <p>{data.review.data.attributes.Title}</p>
      <div>
        {data.review.data.attributes.Body.map((paragraph, index) => (
          <p key={index}>{paragraph.children[0].text}</p>
        ))}
      </div>
    </>
  );
}
