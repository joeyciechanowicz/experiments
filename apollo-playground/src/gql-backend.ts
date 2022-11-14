/*** SCHEMA ***/
import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
} from "graphql";
import { ApolloLink, from, Observable } from "@apollo/client";
import { graphql, print } from "graphql";

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

function delay(wait: number) {
  return new Promise((resolve) => setTimeout(resolve, wait));
}

export const terminatingLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    (async () => {
      const { query, operationName, variables } = operation;
      await delay(1000);
      const result = await graphql({
        schema,
        source: print(query),
        variableValues: variables,
        operationName,
      });
      return result;
    })()
      .then((result) => {
        observer.next(result);
        observer.complete();
      })
      .catch((e) => {
        observer.error(e);
      });
  });
});
