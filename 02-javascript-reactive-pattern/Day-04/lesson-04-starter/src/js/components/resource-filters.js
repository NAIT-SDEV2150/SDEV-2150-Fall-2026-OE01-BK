const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <aside class="h-100">
    <div class="card h-100">
      <div class="card-header">
        <strong>Filters</strong>
      </div>

      <div class="card-body">
        <form id="frm-filter">
          <label for="q" class="form-label">Search</label>
          <input id="q" class="form-control" type="text" placeholder="Try: tutoring, mental health, bursary" />

          <hr class="my-3" />

          <div class="mb-2"><strong>Category</strong></div>
          <div class="d-flex flex-wrap gap-2" aria-label="Category filters">
            <!-- TODO: Set active state on All category button -->
            <button class="btn btn-sm btn-outline-primary" type="button">All</button>
            <button class="btn btn-sm btn-outline-primary" type="button">Academic</button>
            <button class="btn btn-sm btn-outline-primary" type="button">Wellness</button>
            <button class="btn btn-sm btn-outline-primary" type="button">Financial</button>
            <button class="btn btn-sm btn-outline-primary" type="button">Tech</button>
          </div>

          <hr class="my-3" />

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="openNow" />
            <label class="form-check-label" for="openNow">Open now</label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="virtual" />
            <label class="form-check-label" for="virtual">Virtual options</label>
          </div>

          <hr class="my-3" />

          <div class="d-flex gap-2">
            <!-- TODO: (Later) reset form and re-dispatch filter state -->
            <button class="btn btn-outline-secondary" type="button">Reset</button>
            <button class="btn btn-primary" type="submit">Filter</button>
          </div>
        </form>
      </div>
    </div>
  </aside>`;

class ResourceFilters extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // TODO: Bind event handler methods
  }

  // TODO: Manage lifecycle and events (i.e., connectedCallback, disconnectedCallback).
  connectedCallback() {
    this.render();
    // Step 2: On form submit, preventDefault, read values, and dispatch `resource-filters-changed`.
    // TODO: Add a submit listener to #frm-filter.
    
    // TODO: Add click listener to category buttons.
  }
  
  // Step 2: Create submit handler method.
  // TODO: Build a filters object: { query, category, openNow, virtual }.
  // TODO: Dispatch a bubbling + composed CustomEvent('resource-filters-changed', { detail: filters }).

  // Step 2: Create category button click handler method.
  // TODO: Handle category button clicks to set active state.

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('resource-filters', ResourceFilters);
