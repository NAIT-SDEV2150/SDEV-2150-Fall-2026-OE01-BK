# Lesson 22: Server-Side Rendering (SSR)

## Install dependencies and run the dev server

This lesson uses a simple Node + Express SSR demonstration project alongside your existing React app.

1. Move into the SSR demo project directory:
```sh
cd lesson-22-ssr-demo
```
2. Install dependencies:
```sh
npm install
```
3. Start the server:
```sh
npm run dev
```
4. Open the provided URL in your browser

### Demo project structure

The SSR demo project is intentionally small:

```text
lesson-22-ssr-demo/
├── package.json
├── server.js
└── public/
    └── client.js
```

We are using this project to demonstrate the idea of SSR clearly before looking at framework-supported SSR.

## Lesson focus

This lesson introduces **server-side rendering (SSR)** and compares it to **client-side rendering (CSR)**.

We will:

- examine how SSR works conceptually
- compare CSR and SSR behavior
- observe how HTML is delivered differently
- understand hydration
- explore how frameworks support SSR
- identify when SSR is appropriate

This lesson is primarily conceptual with light implementation.

## Connecting to prior lessons

In Lesson 21, we learned:

- React apps commonly use client-side rendering
- the browser builds the UI after JavaScript loads
- the initial HTML is minimal

This creates a key limitation:

> The user may see a blank or incomplete page before the app loads.

## Phase 1: The problem CSR creates

In a CSR application:

```text
HTML loads -> JavaScript loads -> React renders -> UI appears
```

This can result in:

- delayed first content
- poor perceived performance
- heavy reliance on JavaScript

## Phase 2: What is Server-Side Rendering?

Server-side rendering means:

- the server generates HTML for the requested route
- the browser receives ready-to-display content
- JavaScript loads afterward to enable interactivity

## SSR flow

```text
User requests page -> Server renders HTML -> Browser displays content immediately -> JavaScript loads -> React hydrates the page
```

## Key idea

SSR improves time to first content and perceived performance.

## Phase 3: Simple SSR demo

Open the SSR demo project and inspect the `server.js` file.

You should see something similar to this:

```js
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Server Rendered Page</h1>
        <p>This content was generated on the server.</p>
        <script src="/client.js"></script>
      </body>
    </html>
  `);
});
```

### Supporting files

The demo also includes a small client script in:

```text
public/client.js
```

That script simulates hydration by attaching behaviour after the HTML has already been rendered and displayed.

### What to notice

- the HTML already contains visible content
- no JavaScript is required to see the page
- the browser renders immediately

## Compare with CSR

CSR HTML:

```html
<div id="root"></div>
```

SSR HTML:

```html
<h1>Server Rendered Page</h1>
```

## Phase 4: Hydration

SSR alone is not enough.

The application must still become interactive.

### What is hydration?

Hydration is:

> React attaching behaviour to server-rendered HTML

For example, the client script may include logic like:

```js
document.getElementById('test-btn')?.addEventListener('click', () => {
  alert('Button is now interactive');
});
```

The key idea is that the HTML was already visible before this script made the page interactive.

## Hydration flow

```text
Server -> HTML
Client -> JavaScript loads
React -> attaches event handlers
UI -> becomes interactive
```

## Important distinction

- SSR provides content early
- hydration enables interactivity

## Phase 5: Observe SSR in DevTools

Open DevTools -> Network -> Document

Reload the SSR page.

### What you should see

- HTML contains real content
- content appears immediately
- JavaScript loads afterward

## Compare with CSR

CSR:

- HTML is minimal
- content appears after JavaScript runs

SSR:

- HTML contains content
- content appears immediately

## Phase 6: Hybrid rendering

Modern applications often combine rendering strategies.

### Hybrid approach

- some routes use SSR
- some routes use CSR
- some routes are pre-rendered

### Example

- marketing page -> SSR
- admin dashboard -> CSR
- blog -> pre-rendered

## Key idea

Rendering strategy is a design decision, not a fixed rule.

## Phase 7: Frameworks and SSR

Modern frameworks handle SSR for you.

Examples:

- React Router (framework mode)
- Next.js
- Remix (Now React Router)

### What frameworks do

- render routes on the server
- run loaders on the server
- send HTML to the browser
- hydrate on the client

## Important distinction

We do not typically build SSR manually.

Frameworks manage the complexity.

## Phase 8: Compare CSR and SSR

### Client-Side Rendering (CSR)

- browser renders UI
- minimal initial HTML
- requires JavaScript before content appears

### Server-Side Rendering (SSR)

- server renders HTML
- content appears immediately
- JavaScript enhances interactivity

## Summary comparison

| Feature | CSR | SSR |
|--------|-----|-----|
| Initial content | Delayed | Immediate |
| Interactivity | After JS | After hydration |
| Complexity | Lower | Higher |
| Performance perception | Lower | Higher |

## Phase 9: Advantages of SSR

- faster initial content display
- improved perceived performance
- better SEO support
- works better on slower devices

## Phase 10: Tradeoffs of SSR

- more complex architecture
- requires a server environment
- more complex deployment
- hydration still required

## Key Concepts Reinforced

- SSR moves rendering to the server
- hydration connects server-rendered HTML to React
- CSR and SSR solve different problems
- hybrid rendering is common in real applications
- frameworks simplify SSR implementation

## Assessment

Students should be able to explain:

- what SSR is
- how SSR differs from CSR
- what hydration is
- one advantage of SSR
- one tradeoff of SSR

## Student Exercise

Answer the following questions:

1. What is server-side rendering?
2. What problem does SSR solve?
3. What is hydration?
4. When might SSR be a better choice than CSR?

## Group Activity (Time Permitting)

Determine the best rendering strategy for each:

- marketing website
- admin dashboard
- blog platform
- real-time collaboration app

Be prepared to explain your reasoning.
