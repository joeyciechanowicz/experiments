function wrap(cb) {
  return () => setImmediate(() => new Promise(() => {
    cb();
  }));
}

function lotsAndLotsOfPromises(assertion) {
  let wrappedUp = assertion;

  for (let i = 0; i < 10; i++) {
    wrappedUp = wrap(wrappedUp);
  }

  return wrappedUp;
}

afterEach(() => new Promise(res => setTimeout(res, 1000)));

test('assertion fails even though the test passes', () => {
  setTimeout(() => {
    expect(1).toBe('andy');
  }, 250)
});
