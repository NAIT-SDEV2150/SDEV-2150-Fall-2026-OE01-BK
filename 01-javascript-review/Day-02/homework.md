# Homework Exercise: Web Components & Composition

## Goal
Build small, reusable Web Components and compose them into a simple product demo using Shadow DOM, templates, and slots.

## Task (deliverables)
1. Create a small static project (single page) with components in a separate JS file (e.g., src/js/components.js).
2. Implement the following components:
   - `<product-image>`
     - Attributes: src, alt, size (sm|md|lg)
     - Renders an image inside a shadow root and exposes a CSS custom property for border-radius.
   - `<price-badge>`
     - Attributes: price, currency (default "CAD"), variant (default|sale)
     - Uses a template and shadow DOM for scoped styles.
   - `<product-card>`
     - Attributes: name, sku, description
     - Composes `<product-image>` and `<price-badge>`, provides a named slot "actions" for buttons/controls, and a slot "extra" for metadata.
3. Include:
   - Templates and styles encapsulated in each component's shadow DOM.
   - A demo page showing at least two product cards with different props and slot content.
   - Basic accessibility (alt text, button labels, focus styles).
   - A short README.md explaining how to open the demo locally.
4. Keep component code modular and documented with brief comments.
5. Utilize [Vite](https://vite.dev/) to scaffold and complete your development.

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
- Attributes map to rendered content (image src/alt, name, sku, price).
- product-card composes product-image + price-badge + slots.
- Slots accept fallback content and work when children are provided.
- Buttons are keyboard-accessible and include visible focus styles.
- Demo page includes at least two distinct product-card instances.
- README explains how to open the demo page locally.

## Estimated time
- 60-120 minutes

## Submission
- Commit your files to your workbook repo and push to GitHub.
- Include README.md with run instructions and a short note describing which components you built, and any options applicable or config settings (e.g., CSS properties).