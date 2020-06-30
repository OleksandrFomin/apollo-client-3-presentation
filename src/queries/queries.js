const { gql } = require("@apollo/client");

export const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      currency
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries {
    sortedCountries @client {
      code
      name
      capital
      countryWithCapital
    }
    countries {
      code
      name
      capital
      countryWithCapital @client
    }
  }
`;
