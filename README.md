# HTMX With Instant Bun

This project showcases a simple yet dynamic web server application created using htmx and the instant-bun framework. The server serves a basic HTML page, and it employs htmx to handle the button click event, making an HTTP POST request to the server without a full page reload and the server responds with proper HTML and is rendered on the page, thereby exemplifying a straightforward way to build an interactive web page.


## Project Structure

The main file in this project is `index.ts` where the web server is configured and started. The server listens on port 8080 and serves HTML content with some interactive elements.

## Server Configuration

The server is configured to serve a basic HTML document with a title, some descriptive text, and a button. When the button is clicked, an HTTP POST request is made to the `/clicked` route on the server, which responds with a new HTML snippet that replaces the button in the DOM.

The server is also configured with a `/test` route that simply returns a text message.

## Tailwind included
The server uses the `tailwind.config` for tailwind CSS configuration, which is a utility-first CSS framework for rapidly building custom user interfaces. The server configuration and all route handlers are defined using the `createServerFactory` function from `instant-bun`.

## Installation

To install dependencies:

```bash
bun install
```

This will install the `instant-bun` and `bun-types` packages, as well as any peer dependencies.

## Running the Server

To run the server:

```bash
bun run index.ts
```

Once the server is running, you can access the web page by navigating to `http://localhost:8080` in your web browser.

## Project Creation

This project was created using `bun init` in bun v0.6.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Troubleshooting

If there are any issues starting the server, the error will be logged to the console. If you have issues, check the error message for more information.


Absolutely, here's the section on ideas for extending the project:

## Ideas for Further Development

One potential extension of this project is to use the file and folder factory modules provided by `instant-bun` to handle file requests. This could allow the server to read and serve static files that are local to the project.

Here's a rough example of how you might set that up:

```javascript
import { createFileFactory } from "instant-bun/modules/file-factory";

const fileFactory = createFileFactory();

server.addRoute(
  "/static/:filename",
  (request, params) => fileFactory.readFile(`./static/${params.filename}`)
);
```

In this example, any request to `/static/<filename>` would cause the server to read and return the file with the corresponding name from a local `static` directory. This could be used to serve images, stylesheets, scripts, or any other static files that your application might need.

Remember that this is just a rough example and the actual implementation might differ based on your project's requirements and the specifics of the `instant-bun` framework. Always refer to the official documentation for the most accurate and up-to-date information.