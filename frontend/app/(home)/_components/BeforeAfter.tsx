"use client";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import ReactCodeMirror from "@uiw/react-codemirror";

const expressLang = `// You write the route...
app.get('/users', (req, res) => { ... });

// ...and separately document it somewhere else.
// Then someone changes /users, forgets to update docs, and now they’re out of sync.
`;
const yamalLang = `
# Generated from your code. Always consistent.
paths:
  /users:
    get:
      summary: Get list of users
      responses:
        '200':
          description: List of users`;

export default function BeforeAfter() {
  return (
    <section className="px-main flex relative z-2  overflow-hidden flex-col gap-10 py-20 items-center justify-center relative">
      <div
        aria-hidden
        className="absolute w-1 top-0 left-0 -z-1 bg-accent rotate-z-45  h-full"></div>
      <div
        aria-hidden
        className="absolute w-1 top-0 -right-50 -z-1 bg-accent rotate-z-45  h-full max-sm:right-0"></div>
      <div
        aria-hidden
        className=" max-w-lg  w-full bg-accent/20 aspect-square rounded-full absolute  -z-1"></div>
      <h2>Example</h2>
      <div className="flex items-center  flex-col ">
        <h3>Before</h3>
        <ReactCodeMirror
          value={expressLang}
          extensions={[javascript()]}
          height="200px"
          className="max-sm:w-80"
          readOnly
          theme={"dark"}
        />{" "}
      </div>{" "}
      <div className="flex items-center flex-col">
        <h3>After</h3>{" "}
        <ReactCodeMirror
          value={yamalLang}
          extensions={[json()]}
          height="200px"
          className="max-sm:w-80"
          readOnly
          theme={"dark"}
        />{" "}
      </div>
      <button className="py-2 px-5 rounded-lg bg-accent text-background">
        Open In Swagger UI
      </button>
    </section>
  );
}
