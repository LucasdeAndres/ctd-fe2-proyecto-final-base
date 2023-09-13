import { rest } from "msw";
import { API_URL } from "../../../app/constants";
import { fakeQuotes } from "./fakeData";
export const handlers = [
  rest.get(API_URL, (request, response, context) => {
    console.log([fakeQuotes[4]]);
    return response(
      context.json([fakeQuotes[4]]),
      context.status(200),
      context.delay(150)
    );
  }),
];
