const { ApolloClient, gql, InMemoryCache } = require("@apollo/client");

const cache = new InMemoryCache();

(async () => {
  const client = new ApolloClient({
    cache,
  });

  client.cache.restore({
    ROOT_QUERY: {
      __typename: "Query",
      basket: {
        __ref: "BasketType:basket-id-1",
      },
    },
    "BasketType:basket-id-1": {
      __typename: "BasketType",
      id: "id-1",
      count: 0,
    },
  });

  const BASKET_QUERY = gql`
    query {
      basket {
        id
        count
      }
    }
  `;

  // useQuery
  client
    .watchQuery({
      query: BASKET_QUERY,
      fetchPolicy: "cache-and-network",
    })
    .subscribe(
      (next) => console.log("next", next.data.basket),
      (error) => console.error("error", error)
    );

  await Promise.resolve();

  const batchUpdate = (newVal, optimisticId) => {
    client.cache.batch({
      update(cacheProxy) {
        console.log(`optimistic batch - ${optimisticId}`);
        cacheProxy.writeQuery({
          query: BASKET_QUERY,
          data: {
            basket: {
              __typename: "BasketType",
              id: "id-1",
              count: newVal,
            },
          },
        });
      },
      optimistic: optimisticId,
    });
  };

  const batchUpdateRemove = (newVal, optimisticId) => {
    client.cache.batch({
      update(cache) {
        console.log(`batch, removing ${optimisticId}`);
        cache.writeQuery({
          query: BASKET_QUERY,
          data: {
            basket: {
              __typename: "BasketType",
              id: "id-1",
              count: newVal,
            },
          },
        });
      },
      removeOptimistic: optimisticId,
    });
  };

  batchUpdate(1, "op-id-1");
  await new Promise((resolve) => setTimeout(resolve, 15));
  batchUpdate(2, "op-id-2");
  await new Promise((resolve) => setTimeout(resolve, 15));

  batchUpdateRemove(1, "op-id-1");
  console.log("removed op-id-1");

  batchUpdateRemove(2, "op-id-2");
})().then(() => console.log(".then"), console.error);
