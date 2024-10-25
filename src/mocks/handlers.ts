import { http, HttpResponse } from "msw";

// mocked backend value
export const INITIAL_COUNT = 100;

export const handlers = [
  http.get("/api/count", () => {
    return HttpResponse.json({ initialCount: INITIAL_COUNT });
  }),
  // catch all unknown endpoints and return 404
  http.get("/*", () => {
    return new HttpResponse(null, { status: 404 });
  }),
];
