afterEach(() => {
  jest.useRealTimers();
});

jest.spyOn(console, "log").mockReturnValue();
jest.spyOn(console, "warn").mockReturnValue();
jest.spyOn(console, "info").mockReturnValue();