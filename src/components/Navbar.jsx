import React from "react";
import { NavLink } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
  query getCategories {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
export default function Navbar() {
  const { data, loading, error } = useQuery(CATEGORIES);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error T-T</p>;
  console.log(data);
  return (  
    <>
      <ul>
        <li>
          <NavLink to={"/"}>Navbar</NavLink>
        </li>
        <li>
          <span>Filter by Category</span>
          {data.categories.data.map(category => (
            <NavLink to={`/category/${category.id}`} key={category.id}>
              <ul>
                <li>
                  {category.id}. {category.attributes.name}
                </li>
              </ul>
            </NavLink>
          ))}
        </li>
      </ul>
    </>
  );
}
