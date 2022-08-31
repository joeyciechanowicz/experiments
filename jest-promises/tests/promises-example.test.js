
// afterEach(() => new Promise(res => setTimeout(res, 1000)));

test('test with done', (done) => {
  expect(1).toBe(1);
  debugger;
  done();
});

test('test without done', () => {
  expect(1).toBe(1);
});
