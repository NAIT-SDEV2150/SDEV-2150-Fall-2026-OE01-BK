const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header">
        <strong>Details</strong>
      </div>

      <div class="card-body">
        <h2 class="h5">Peer Tutoring Centre</h2>
        <p class="text-body-secondary mb-2">Drop-in tutoring and study support.</p>

        <dl class="row mb-0">
          <dt class="col-4">Category</dt>
          <dd class="col-8">Academic</dd>

          <dt class="col-4">Location</dt>
          <dd class="col-8">Building W, Room W101</dd>

          <dt class="col-4">Hours</dt>
          <dd class="col-8">Mon-Thu 10:00-16:00</dd>

          <dt class="col-4">Contact</dt>
          <dd class="col-8">tutoring@nait.ca</dd>
        </dl>
      </div>

      <div class="card-footer d-flex gap-2">
        <button class="btn btn-outline-secondary" type="button">Copy email</button>
        <button class="btn btn-outline-primary" type="button">Open map</button>
      </div>
    </div>
  </section>`;

class ResourceDetails extends HTMLElement {
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

customElements.define('resource-details', ResourceDetails);