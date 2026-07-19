import { ResponseData } from "./../../lib/types";
import { convertCode } from "../../lib/actions/convertCode";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  Mock,
  test,
  vi,
} from "vitest";

describe("Testing convertCode", () => {
  const exampleUrl = "http://example.com";
  beforeEach(() => {
    vi.resetAllMocks();

    process.env.NEXT_PUBLIC_API_URL = exampleUrl;
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  test("Classic mode conver is success", async () => {
    const mockOpenApiData = {
      data: {
        "/": {
          get: {
            responses: {
              "200": {
                headers: [],
                content: {
                  "application/json": {
                    schema: {
                      type: "string",
                      example: "/hi",
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify(mockOpenApiData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const openapi = await convertCode({
      code: "app.get('/',(req,res)=>res.json('/hi'))",
    });
    const calls = (fetch as Mock).mock.calls;
    const apiUrl = calls[0][0];
    const request = calls[0][1] as Request;
    expect(apiUrl).toBe(`${exampleUrl}/gen`);
    expect(request.method).toBe("POST");
    expect(openapi).toEqual(mockOpenApiData);
  });
  test("Files mode conver is success", async () => {
    const mockOpenApiData = {
      data: {
        "/": {
          get: {
            responses: {
              "200": {
                headers: [],
                content: {
                  "application/json": {
                    schema: {
                      type: "string",
                      example: "/hi",
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify(mockOpenApiData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const blob = new Blob();
    const openapi = await convertCode({
      file: new File([blob], "example.zip"),
      mode: 1,
    });
    const calls = (fetch as Mock).mock.calls;
    const apiUrl = calls[0][0];
    const request = calls[0][1] as Request;
    expect(apiUrl).toBe(`${exampleUrl}/gen/files`);
    expect(request.method).toBe("POST");
    expect(openapi).toEqual(mockOpenApiData);
  });
});
