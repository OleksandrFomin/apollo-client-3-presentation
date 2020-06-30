import React, { useState } from "react";
import { GET_COUNTRY } from "./queries/queries";
import { useQuery } from "@apollo/client";

const CountrySearch = () => {
  const [code, setCode] = useState("");

  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code },
    skip: code.length !== 2,
  });

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <input value={code} onChange={handleChange} />
      {loading && <div>Loading...</div>}
      {data && (
        <div>
          <div>{data.country.countryWithCapital}</div>
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
