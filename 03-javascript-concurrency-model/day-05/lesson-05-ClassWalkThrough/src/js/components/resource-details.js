const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header">
        <strong>Details</strong>
      </div>
      <!-- Details content will be injected here -->
      <slot></slot>

      <!-- Action buttons may be dealt with in a future example -->
      <div class="card-footer d-flex gap-2">
        <button class="btn btn-outline-secondary" type="button">Copy email</button>
        <button class="btn btn-outline-primary" type="button">Open map</button>
      </div>
    </div>
  </section>`;

class ResourceDetails extends HTMLElement {
  #resource = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set resource(data) {
    this.#resource = data;
    this.render();
  }

  render() {
    if (this.#resource) {
      const detailsContainer = document.createElement('div');
      detailsContainer.classList.add('card-body');

      detailsContainer.innerHTML = `
        <h2 class="h5">${this.#resource.title}</h2>
        <p class="text-body-secondary mb-2">${this.#resource.summary}</p>

        <dl class="row mb-0">
          <dt class="col-4">Category</dt>
          <dd class="col-8">${this.#resource.category}</dd>

          <dt class="col-4">Location</dt>
          <dd class="col-8">${this.#resource.location}</dd>

          <dt class="col-4">Hours</dt>
          <dd class="col-8">${this.#resource.hours}</dd>

          <dt class="col-4">Contact</dt>
          <dd class="col-8">${this.#resource.contact}</dd>
        </dl>
      `;

      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.shadowRoot.querySelector('slot').appendChild(detailsContainer);
    } else {
      // If no resource is selected, just render the template
      this.shadowRoot.innerHTML = '';
      // TODO: Hide action buttons when no resource is selected
      const content = template.content.cloneNode(true);
      content.querySelector('.card-footer').classList.add('d-none');
      this.shadowRoot.appendChild(content);
    }
  }
}

customElements.define('resource-details', ResourceDetails);
