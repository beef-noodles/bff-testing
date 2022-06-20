import log from "../../src/middleware/log";

describe("log", () => {
  it("should invoke log middleware", async () => {
    const nextSpy = jest.fn();

    await log({}, nextSpy);

    expect(nextSpy).toHaveBeenCalledTimes(1);
  });
});
