const { from, gql, InMemoryCache } = require("@apollo/client");
const asdf = require("@apollo/client");
const Observable = require("zen-observable");

let first = false;

const link1 = (operation, forward) => {
  console.log("link1 - before");

  const result = forward(operation).map((result) => {
    console.log("link1 .map");
  });

  if (!first) {
    first = true;
    client
      .query({
        query: gql`
          query asf {
            basket
          }
        `,
        variables: { inside: "link1" },
      })
      .then((res) => {
        console.log("result inside", res);
      });
  }

  console.log("link1 - after");
  return result;
};

const link2 = (operation, forward) => {
  console.log("link2 - before");

  const result = forward(operation).map((result) => {
    console.log("link2 .map");
  });

  console.log("link2 - after");
  return result;
};

const terminatingLink = (operation) => {
  console.log("terminating", operation.variables);
  return Observable.of({
    result: "asdf",
  });
};

const client = new asdf.ApolloClient({
  link: from([link1, link2, terminatingLink]),

  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query asf {
        basket
      }
    `,
    variables: { outside: "yes" },
  })
  .then((res) => {
    console.log("result", res);
  });

[UpdateBasket, GetBasket];
