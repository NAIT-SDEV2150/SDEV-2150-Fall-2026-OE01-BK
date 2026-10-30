import express from 'express';

const app = express();
const PORT = 3001;

// Serve static files (client.js)
app.use(express.static('public'));

// Fake "data source"
const resources = [
  { id: 1, title: 'Math Help Centre' },
  { id: 2, title: 'Writing Support Lab' },
  { id: 3, title: 'IT Help Desk' },
];

app.get('/', (req, res) => {
  const resourceList = resources
    .map((r) => `<li data-id="${r.id}">${r.title}</li>`)
    .join('');

  res.send(`
    <html>
      <head>
        <title>SSR Demo</title>
      </head>
      <body>
        <h1>NAIT Resources (Server Rendered)</h1>

        <p>This HTML was generated on the server.</p>

        <ul id="resource-list">
          ${resourceList}
        </ul>

        <button id="test-btn">Click me</button>

        <script src="/client.js"></script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`SSR demo running at http://localhost:${PORT}`);
});
