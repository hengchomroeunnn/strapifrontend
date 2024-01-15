import { gql, useQuery } from "@apollo/client";
import React from "react";
import { NavLink, useParams } from "react-router-dom";

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
                categories {
                  data {
                    id
                    attributes {
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
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error T_T</p>;
  return (
    <>
      <div>Category name: {data.category.data.attributes.name}</div>
      <div>
        {data.category.data.attributes.reviews.data.map(review => (
          <ul key={review.id}>
            <li>{review.attributes.Title}</li>
            <div>{review.attributes.Rating}</div>
            <div>
              {review.attributes.categories.data.map(c => (
                <div key={c.id}>{c.attributes.name}</div>
              ))}
            </div>
            <NavLink to={`/reviewdetail/${review.id}`}>Detail</NavLink>
          </ul>
        ))}
      </div>
    </>
  );
}
