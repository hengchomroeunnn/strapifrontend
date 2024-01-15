import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

const CATEGORY = gql`
  query getCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
          reviews {
            data {
              id
              attributes {
                Title
                Body
                Rating
                categories{
                  data{
                    id,
                    attributes{
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function Category() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(CATEGORY, {
    variables: { id: id },
  });
  console.log(data);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error T_T</p>;
  return (
    <>
      <div>Category name: {data.category.data.attributes.name}</div>
      <div>
        {data.category.data.attributes.reviews.data.map(review => (
          <ul>
            <li>{review.attributes.Title}</li>
            <div>{review.attributes.Rating}</div>
            <div>{review.attributes.categories.data.map(c => (
              <div>
                {c.attributes.name}
              </div> 
            ))}</div>
            <div>{review.attributes.Body.map((paragraph, index)=>(
              <p key={index}>{paragraph.children[0].text}</p>
            ))}</div>
          </ul>
        ))}
      </div>
    </>
  );
}
