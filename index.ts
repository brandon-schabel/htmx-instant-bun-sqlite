import { createServerFactory } from "instant-bun/modules/server-factory";
import { createNote, readAllNotes } from "./db";
import tailwindConfig from "./tailwind.config";

const server = createServerFactory();

const port = 8080;

const htmlDoc = `
<!DOCTYPE html>
<html>
    <head>
        <title>Instant Bun</title>
        <script src="https://unpkg.com/htmx.org@1.9.3"></script>
        <script src="https://cdn.tailwindcss.com"></script>

        <script>
        tailwind.config = ${JSON.stringify(tailwindConfig)};
        </script>
    </head>
    <body>
        <h1>Instant Bun</h1>
        <p>Instant Bun is a web framework indy hackers</p>
        <p>It is currently in development.</p>


        <button hx-post="/clicked" hx-swap="outerHTML">
        Click Me
      </button>

      <button hx-post="/add-note" hx-swap="afterend">
        Add Note
      </button>

      <div>
        
      </div>


    </body>
</html>

`;

server.addRoute(
  "/",
  () =>
    new Response(htmlDoc, {
      headers: {
        "Content-Type": "text/html",
      },
    })
);
server.addRoute("/test", () => new Response("This is a test route!"));

server.addRoute("/clicked", () => {
  console.log("wow clicked!");
  return new Response(
    `<div>
    <h1>Clicked!</h1>
    <h2>It worked with HTML!</h2>
    <h3>This was sent from the server</h3>
  </div>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
});

server.addRoute("/add-note", async () => {
  try {

    
    await createNote({
      id: "test",
      text: "This is a test note",
    });
  } catch (err) {
    console.error("error creating note", err);
    return new Response("<p>error creating note</p>", {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  const notesArray = [];

  try {
    const notes = await readAllNotes();

    notesArray.push(...notes);
  } catch (err) {
    console.error("error reading notes", err);

    return new Response("<p>error reading notes</p>", {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  return new Response(`<pre>${JSON.stringify(notesArray, null, 2)}</pre>`, {
    headers: {
      "Content-Type": "text/html",
    },
  });
});

try {
  console.log(`Starting server on port ${port}...`);

  server.start(port);
  console.log(
    `Server started on port ${port}, press Ctrl+C to stop, http://localhost:${port}`
  );
} catch (e) {
  console.error("Issue starting server: ", e);
}
