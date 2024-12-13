import { type RequestType } from "npm:@ghostery/adblocker";
import { expect } from "jsr:@std/expect";
import { type Assertion, parse } from "../src/assert.ts";

const check = (
  content: string,
  expected: Array<{ filter: string; assertions: Assertion[] }>,
) => {
  expect([...parse(content)]).toStrictEqual(expected);
};

Deno.test("empty string", () => {
  check("", []);
});

Deno.test("filter without assertion", () => {
  check("/ads/", [
    {
      filter: "/ads/",
      assertions: [],
    },
  ]);
});

Deno.test("multiple assertions for a filter", () => {
  check(
    `
! >>> url=https://example.com type=script source=https://source.com
! >>> url=https://example.com type=css source=https://source.com
/ads/
`,
    [
      {
        filter: "/ads/",
        assertions: [
          {
            url: "https://example.com",
            source: "https://source.com",
            type: "script" as RequestType,
            match: true,
          },
          {
            url: "https://example.com",
            source: "https://source.com",
            type: "css" as RequestType,
            match: true,
          },
        ],
      },
    ],
  );
});

Deno.test("parses compound assertion", () => {
  check(
    `
! >>> url=https://example.com
! ...
! ...    type=script
! ... source=https://source.com
/ads/
`,
    [
      {
        filter: "/ads/",
        assertions: [
          {
            url: "https://example.com",
            source: "https://source.com",
            type: "script",
            match: true,
          },
        ],
      },
    ],
  );
});

Deno.test("handle orphan assertion", () => {
  check("! >>> url=URL", [
    {
      filter: "",
      assertions: [
        {
          match: true,
          url: "URL",
        },
      ],
    },
  ]);
});

Deno.test("handles complex case", () => {
  check(
    `
! Some top-level comments

! This is a filter
filter1
! Another comment

! >>> type=css

filter2
! >>> type=css
! >>> type=script
! >>> type=main_frame match=false
! ... url=URL
! ...source=SOURCE
filter3

! >>>
! ...
! ...
! ... type=css
`,
    [
      {
        filter: "filter1",
        assertions: [],
      },
      {
        filter: "",
        assertions: [
          {
            match: true,
            type: "css" as RequestType,
          },
        ],
      },
      {
        filter: "filter2",
        assertions: [],
      },
      {
        filter: "filter3",
        assertions: [
          { match: true, type: "css" as RequestType },
          { match: true, type: "script" as RequestType },
          {
            match: false,
            type: "main_frame" as RequestType,
            url: "URL",
            source: "SOURCE",
          },
        ],
      },
      {
        filter: "",
        assertions: [{ match: true, type: "css" as RequestType }],
      },
    ],
  );
});
