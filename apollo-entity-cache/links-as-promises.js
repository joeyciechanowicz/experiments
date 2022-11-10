let hasRun = false;

const link1 = (operation, forward) => {
  console.log("link1 - before");

  const result = forward(operation).then((result) => {
    console.log("link1 .map");

    return result;
  });

  if (!hasRun) {
    hasRun = true;
    execute("from inside link1", [link1, link2, terminatingLink]).then((res) =>
      console.log("result from inside link 1 - ")
    );
  }

  console.log("link1 - after");
  return result;
};

const link2 = (operation, forward) => {
  console.log("link2 - before");

  const result = forward(operation).then((result) => {
    console.log("link2 .map");
    return result;
  });

  console.log("link2 - after");
  return result;
};

const terminatingLink = (operation) => {
  console.log("terminating", operation);
  return Promise.resolve("end result");
};

function execute(data, links) {
  return links[0](data, (nextData) => {
    return links[1](nextData, (nextNextData) => {
      return links[2](nextNextData);
    });
  });
}

execute("in data", [link1, link2, terminatingLink]).then((result) =>
  console.log(".then", result)
);
