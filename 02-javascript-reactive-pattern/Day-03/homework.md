# Homework Exercise: Web Components & Reactive Pattern (Part 1)

## Goal
Build small, reusable Web Components and compose them into a simple product demo using Shadow DOM, templates, slots, and **custom events** to demonstrate a basic reactive pattern.

## Task (deliverables)
1. Create a small static project (single page) with components in a separate JS file (for example `src/js/components.js`).
2. Implement the following components:
   - `<product-image>`
     - Attributes: `src`, `alt`, `size` (`sm|md|lg`)
     - Renders an image inside a shadow root and exposes a CSS custom property for border-radius.
   - `<price-badge>`
     - Attributes: `price`, `currency` (default `"CAD"`), `variant` (`default|sale`)
     - Uses a template and shadow DOM for scoped styles.
   - `<product-card>`
     - Attributes: `name`, `sku`, `description`
     - Composes `<product-image>` and `<price-badge>`
     - Provides a named slot `"actions"` for buttons/controls, and a slot `"extra"` for metadata.
     - Dispatches a custom event `product-purchase` with detail `{ sku, name }` when a Purchase button is clicked.
   - **NEW** `<cart-summary>`
     - Maintains internal state for total purchases and the most recently purchased product.
     - Reacts to the `product-purchase` custom event.
     - Re-renders automatically when its internal state changes.

## Event Contract

This exercise uses an explicit event contract to demonstrate a simple reactive pattern.

### Event: `product-purchase`

- **Emitted by:** `<product-card>`
- **When:** The Purchase button is clicked
- **Event configuration:**
  - `bubbles: true`
  - `composed: true`
- **Detail payload:**

```js
{
  sku: string,
  name: string
}
```

- **Who listens:**
  - The demo page (e.g., `main.js`)
- **What happens next:**
  - The listener updates `<cart-summary>` by calling a public method (e.g., `recordPurchase(detail)`)

## Example usage
```html
<product-card name="Trail Bottle" sku="TB-01" description="Insulated water bottle">
  <product-image slot="image" src="images/bottle.jpg" alt="Trail Bottle" size="md"></product-image>
  <price-badge slot="price" price="24.99" currency="CAD"></price-badge>
  <div slot="actions">
    <button class="buy">Purchase</button>
  </div>
  <div slot="extra">Ships free over $50</div>
</product-card>
```

## Acceptance Criteria
- Each component uses shadow DOM and a template for markup/styles.
- Attributes map to rendered content (image `src/alt`, `name`, `sku`, `price`).
- `<product-card>` composes `<product-image>` + `<price-badge>` + slots and dispatches `product-purchase` when Purchase is activated.
- Slots accept fallback content and work when children are provided.
- Buttons are keyboard-accessible and include visible focus styles.
- Demo page includes at least two distinct product-card instances.
- README explains how to open the demo page locally.
- `<product-card>` dispatches a `product-purchase` custom event with the correct payload.
- The demo page listens for `product-purchase` and updates `<cart-summary>`.
- `<cart-summary>` maintains state and re-renders when purchases occur.
- Multiple purchases result in visible UI updates.

## Stretch Challenges (optional)
- Extend this exercise by adding `<product-filters>` and `<product-list>` components that communicate via a `product-filters-changed` event.
- Persist a "recently viewed" product in localStorage.

## Estimated time
- 60-120 minutes

## Submission
- Commit your files to your workbook repo and push to GitHub.
- Include README.md with run instructions and a short note describing which components you built, and any options applicable or config settings (e.g., CSS properties).