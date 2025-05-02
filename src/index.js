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
  const name = c.req.query("name") ?? "ゲスト";
  return c.html(html`
    <!doctype html>
    <html>
      <head>
        <title>よくぞここまで辿り着いたな、若造。</title>
      </head>
      <body>
        <h1>ずっとお前を待っていたぞ。</h1>
        <p>ここからが試練じゃぞ。</p>
      </body>
    </html>
  `);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
