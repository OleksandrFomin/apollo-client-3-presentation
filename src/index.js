import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        sortedCountries: (existing, { args, readField }) => {
          const direction = sortOrder();
          const countries = [...(readField("countries") || [])];
          return countries.sort((a, b) => {
            const aName = readField("name", a);
            const bName = readField("name", b);
            if (direction === "DESC") {
              if (aName < bName) return 1;
              if (aName > bName) return -1;
              return 0;
            } else {
              if (aName > bName) return 1;
              if (aName < bName) return -1;
              return 0;
            }
          });
        },
        country: {
          read: (existing, { toReference, args }) => {
            const countryRef = toReference({
              __typename: "Country",
              code: args.code,
            });
            return existing ?? countryRef; // nullish coalescing operator (return right operand if left is nullable, otherwise, returns left)
          },
        },
      },
    },
    Country: {
      keyFields: ["code"], //enables normalization (code serves as an ID) (could be false to disable default normalization)
      fields: {
        countryWithCapital: {
          read: (_, { readField }) => {
            const name = readField("name"); //readField accepts string version of the field name
            const capital = readField("capital");

            return `${name} ${capital}`;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache,
});

export const sortOrder = client.cache.makeVar("DESC"); //reactive variable (returns a current value if called with 0 parameters or sets a value to the variable if called with a parameter)

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
