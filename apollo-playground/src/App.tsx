/*** SCHEMA ***/
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: {
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
    clientAge: { type: GraphQLInt },
  },
});

const personData = { id: 1, age: 0, clientAge: 0, __typename: "Person" };

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    person: {
      type: PersonType,
      resolve: () => personData,
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    person: {
      type: PersonType,
      args: {
        age: { type: GraphQLInt },
      },
      resolve: function (_, { age }) {
        personData.age = age;
        return personData;
      },
    },
  },
});

const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

/*** LINK ***/
import { graphql, print } from "graphql";
import { ApolloLink, Observable, from } from "@apollo/client";
function delay(wait) {
  return new Promise((resolve) => setTimeout(resolve, wait));
}

const terminatingLink = new ApolloLink((operation) => {
  return new Observable(async (observer) => {
    const { query, operationName, variables } = operation;
    await delay(1000);
    try {
      const result = await graphql({
        schema,
        source: print(query),
        variableValues: variables,
        operationName,
      });
      observer.next(result);
      observer.complete();
    } catch (err) {
      observer.error(err);
    }
  });
});

const CACHE_QUERY = gql`
  query Person {
    person {
      id
      clientAge
    }
  }
`;

const link = from([terminatingLink]);

const cache = new InMemoryCache();

/*** APP ***/
import React from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
  useMutation,
} from "@apollo/client";

const PERSON = gql`
  query Person {
    person {
      id
      age
    }
  }
`;

const SET_AGE = gql`
  mutation SetAge($age: Int) {
    person(age: $age) {
      id
      age
    }
  }
`;

function App() {
  const query = useQuery(PERSON);
  const { loading, data } = query;

  const [setAge] = useMutation(SET_AGE);

  return (
    <main>
      <div className="add-person">
        <button
          onClick={() => {
            setAge({
              variables: { age: data.person.age + 1 },
              optimisticResponse: {
                person: {
                  __typename: "Person",
                  id: data.person.id,
                  age: data.person.age + 1,
                },
              },
            });
          }}
        >
          Increment Age
        </button>
      </div>

      <h2>Ages</h2>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          <li>Age: {data.person.age}</li>
        </ul>
      )}
    </main>
  );
}

const client = new ApolloClient({
  cache,
  link,
});

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
