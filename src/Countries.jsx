import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_COUNTRIES } from "./queries/queries";
import { sortOrder } from ".";

const Countries = () => {
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const handleClick = () => {
    const currentOrder = sortOrder();
    if (currentOrder === "DESC") {
      sortOrder("ASC");
    } else {
      sortOrder("DESC");
    }
  };

  return (
    <>
      <button onClick={handleClick}>Flip order</button>

      {data &&
        data.sortedCountries &&
        data.sortedCountries.map(({ code, name }) => {
          return (
            <div key={code} style={{ margin: "20px 0" }}>
              <div>{name}</div>
              <Link to={`country/${code}`}>More Detail</Link>
            </div>
          );
        })}
    </>
  );
};

export default Countries;
