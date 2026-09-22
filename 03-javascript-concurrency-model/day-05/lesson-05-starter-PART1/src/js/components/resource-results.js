const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Results</strong>
        <span class="badge text-bg-secondary">4</span>
      </div>

      <div class="list-group list-group-flush">
        <!-- Results will be injected here -->
      </div>
    </div>
  </section>`;

// TODO: Stage 2: This component will optionally fetch its own data
// when a `source` attribute is provided (attribute-driven async side effects)
class ResourceResults extends HTMLElement {
  // TODO: Stage 2: Track loading and error state when fetching from `source`
  // Example: #isLoading = false; #error = null;
  #results = [];
  #filteredResults = [];
  #filters = {
    query: '',
    category: 'all',
    openNow: false,
    virtual: false,
  };

  constructor() {
    super();
    this._handleResultClick = this._handleResultClick.bind(this);
    this.attachShadow({ mode: 'open' });
  }

  // TODO: Stage 2: Observe the `source` attribute

  set results(data) {
    this.#results = data;
    this.#filteredResults = [...data];
    this.render();
  }

  set filters(filters) {
    this.#filters = {
      ...this.#filters,
      ...filters,
    };
    this.#applyFilters();
  }

  // TODO: Stage 2: Private method to fetch data from the provided source URL

  // TODO: Stage 2: When `source` changes:
  // - Avoid refetching if the value is unchanged
  // - fetch(source)
  // - handle loading and error states
  // - set results with fetched data

  _handleResultClick(event) {
    const button = event.target.closest('button[data-id]');
    if (button) {
      const selectedId = button.getAttribute('data-id');
      this.shadowRoot.querySelector('button.active')?.classList.remove('active');
      button.classList.add('active');

      const resource = this.#results.find(r => r.id === selectedId);
      const selectedEvent = new CustomEvent('resource-selected', {
        detail: { resource },
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(selectedEvent);
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this._handleResultClick);
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this._handleResultClick);
  }

  #applyFilters() {
    const { query, category, openNow, virtual } = this.#filters;
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedCategory = (category || '').trim().toLowerCase();

    this.#filteredResults = this.#results.filter((result) => {
      if (normalizedQuery) {
        const haystack = [
          result.title,
          result.summary,
          result.category,
          result.location,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(normalizedQuery)) {
          return false;
        }
      }

      if (normalizedCategory && normalizedCategory !== 'all') {
        if (result.category.toLowerCase() !== normalizedCategory) {
          return false;
        }
      }

      if (openNow && !result.openNow) {
        return false;
      }

      if (virtual && !result.virtual) {
        return false;
      }

      return true;
    });

    this.render();
  }

  render() {
    const content = template.content.cloneNode(true);

    // TODO: Stage 2: Render loading and error states before results when fetching asynchronously
    if (this.#filteredResults.length) {
      // Generate the list of results to display
      const resultsHtml = this.#filteredResults.map(result => `<button type="button" class="list-group-item list-group-item-action" data-id="${result.id}">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">${result.title}</h2>
            <small>${result.category}</small>
          </div>
          <p class="mb-1 small text-body-secondary">${result.summary}</p>
          <small class="text-body-secondary">${result.location}</small>
        </button>`);
      const listGroup = content.querySelector('.list-group');
      listGroup.innerHTML = resultsHtml.join('');
    } else {
      // No results found message
      const listGroup = content.querySelector('.list-group');
      listGroup.innerHTML = `<div class="list-group-item">
          <p class="mb-0">No results found.</p>
        </div>`;
    }

    // Clear existing content and append new content
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(content);
  }
}

customElements.define('resource-results', ResourceResults);
