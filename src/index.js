const { Hono } = require("hono");
const { serve } = require("@hono/node-server");
const { logger } = require("hono/logger");
const { html } = require("hono/html");

const app = new Hono();
app.use(logger());

app.get("/", (c) => {
  const name = c.req.query("name") ?? "ゲスト";
  return c.html(html`
    <!doctype html>
    <html>
      <head>
        <title>Home</title>
      </head>
      <body>
        <h1>こんにちは！ ${name} さん</h1>
        <p>これは Hono のサンプルアプリケーションです。</p>
      </body>
    </html>
  `);
});

app.get("/secret", (c) => {
  return c.html(html`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Secret</title>
      </head>
      <body>
        <h1>秘密のページ</h1>
        <p>見つけてしまいましたね......</p>
      </body>
    </html>
  `);
})

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
