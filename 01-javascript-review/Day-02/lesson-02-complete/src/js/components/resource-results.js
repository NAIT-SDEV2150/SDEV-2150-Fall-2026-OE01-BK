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
        <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">Peer Tutoring Centre</h2>
            <small>Academic</small>
          </div>
          <p class="mb-1 small text-body-secondary">Drop-in tutoring and study support.</p>
          <small class="text-body-secondary">Building W, Room W101</small>
        </button>

        <button type="button" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">Counselling Services</h2>
            <small>Wellness</small>
          </div>
          <p class="mb-1 small text-body-secondary">Confidential mental health supports.</p>
          <small class="text-body-secondary">Virtual and in-person</small>
        </button>

        <button type="button" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">Student Awards and Bursaries</h2>
            <small>Financial</small>
          </div>
          <p class="mb-1 small text-body-secondary">Funding options and application help.</p>
          <small class="text-body-secondary">Student Services, Main Floor CAT</small>
        </button>

        <button type="button" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">IT Service Desk</h2>
            <small>Tech</small>
          </div>
          <p class="mb-1 small text-body-secondary">Account access, Wi-Fi, BYOD support.</p>
          <small class="text-body-secondary">Library</small>
        </button>
      </div>
    </div>
  </section>`;

class ResourceResults extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('resource-results', ResourceResults);