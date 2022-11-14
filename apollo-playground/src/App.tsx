import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  gql,
  InMemoryCache,
  RequestHandler,
  useMutation,
  useQuery,
} from "@apollo/client";
import { terminatingLink } from "./gql-backend";

let count = 0;
const loggingLink: RequestHandler = (operation, forward) => {
  const nextCount = count + 1;
  count++;
  console.log(`Operation "${operation.operationName}" #${nextCount} sent`);

  return forward(operation).map((result) => {
    console.log(
      `Operation "${operation.operationName}" #${nextCount} completed`
    );
    return result;
  });
};

const link = from([loggingLink, terminatingLink]);
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link,
});

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

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
