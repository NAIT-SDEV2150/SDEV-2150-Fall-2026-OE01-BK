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
            <button class="btn btn-sm btn-outline-primary active" type="button">All</button>
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
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCategoryClick = this._handleCategoryClick.bind(this);
  }

  connectedCallback() {
    this.render();
    // TODO: Add a submit listener to #frm-filter.
    this._formEl = this.shadowRoot.querySelector('#frm-filter');
    this._formEl.addEventListener('submit', this._handleSubmit);
    // TODO: Add click listener to category buttons.
    this._categoryGroupEl = this.shadowRoot.querySelector('[aria-label="Category filters"]');
    this._categoryGroupEl.addEventListener('click', this._handleCategoryClick);
  }

  // TODO: Manage lifecycle and events (i.e., connectedCallback, disconnectedCallback).
  disconnectedCallback() {
    if (this._formEl) {
      this._formEl.removeEventListener('submit', this._handleSubmit);
    }
    if (this._categoryGroupEl) {
      this._categoryGroupEl.removeEventListener('click', this._handleCategoryClick);
    }
  }

  // Step 2: Create submit handler method.
  _handleSubmit(event) {
    event.preventDefault();
    // TODO: Build a filters object: { query, category, openNow, virtual }.
    const query = this.shadowRoot.querySelector('#q').value.trim();
    const categoryGroup = this.shadowRoot.querySelector('[aria-label="Category filters"]');
    const categoryButton = categoryGroup.querySelector('.active') || categoryGroup.querySelector('button');
    const category = categoryButton ? categoryButton.textContent.trim().toLowerCase() : 'all';
    const openNow = this.shadowRoot.querySelector('#openNow').checked;
    const virtual = this.shadowRoot.querySelector('#virtual').checked;
    const filters = {
      query,
      category,
      openNow,
      virtual,
    };
    // TODO: Dispatch a bubbling and composed CustomEvent('resource-filters-changed', { detail: filters }).
    const filtersEvent = new CustomEvent('resource-filters-changed', {
      detail: filters,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(filtersEvent);
  }

  // TODO: Handle category button clicks to set active state.
  _handleCategoryClick(event) {
    const button = event.target.closest('button');
    if (!button || !this._categoryGroupEl.contains(button)) {
      return;
    }

    const activeButton = this._categoryGroupEl.querySelector('.active');
    if (activeButton && activeButton !== button) {
      activeButton.classList.remove('active');
    }
    button.classList.add('active');
  }

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('resource-filters', ResourceFilters);
