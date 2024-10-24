import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/count", () => {
    return HttpResponse.json({ initialCount: 0 });
  }),
];
