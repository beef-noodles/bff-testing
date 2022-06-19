import supertest from "supertest";

import app from "@/app";

describe("Health endpoint", () => {
  const request = supertest(app.callback());
  it("should return true for health endpoint", async () => {
    const response = await request.get("/v1/health");

    expect(response.text).toEqual("true");
  });
});
