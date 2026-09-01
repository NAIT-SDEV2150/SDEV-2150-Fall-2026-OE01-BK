const template = document.createElement('template');
// TODO: Update the template to support dynamic results (NOTE: we are not altering the badge count at this time)
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

class ResourceResults extends HTMLElement {
  // TODO: Create a private field for results data

  #results = []; // only this component can access this variable



  constructor() {
    super();
    // TODO: Bind the handleResultClick method to this instance
    this._handleResultClick = this._handleResultClick.bind(this); //
    this.attachShadow({ mode: 'open' });
  }

  // TODO: Implement setter for results data, remember to render
  set results(data) {
    this.#results = data;
    this.render();
  }

  // TODO: Add an event handler method for result selection

  _handleResultClick(event) {

    // which resource is selected
    // create custom event
    // pass the selected resource
    // reendering  

    const button = event.target.closest('button[data-id]');

    if (button) {

      const selectedId = button.getAttribute('data-id');
      // Mark selected result as active 

      this.shadowRoot.querySelector('button.active')?.classList.remove('active');
      button.classList.add('active');

    

    // Find the active resourece from the results

    const resource = this.#results.find(r => r.id == selectedId);

    // share this resource with detail component using custom event

    const selectedEvent = new CustomEvent('resource-selected',

      {
        detail: { resource },
        bubbles: true,
        composed: true,
      }
   );

    this.dispatchEvent(selectedEvent);

  }
  }
  
  connectedCallback() {
    // TODO: Add a click event listener to handle result selection
    this.shadowRoot.addEventListener('click', this._handleResultClick)
    this.render();
  }

  // TODO: Clean up event listener in disconnectedCallback
  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this._handleResultClick);
  }



  render() {
    // TODO: Update to render from the private results field, if it's empty, show "No results found" message
    const content = template.content.cloneNode(true);

    if (this.#results.length) {

      const resultHtml = this.#results.map(result =>
        `<button type="button" class="list-group-item list-group-item-action" data-id="${result.id}">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">${result.title}</h2>
            <small>${result.category}</small>
          </div>
          <p class="mb-1 small text-body-secondary">${result.summary}.</p>
          <small class="text-body-secondary">${result.location} </small>
        </button>`);

      // group these buttons as list

      const listGroup = content.querySelector('.list-group');
      listGroup.innerHTML = resultHtml.join('');
    }
    else {
      const listGroup = content.querySelector('.list-group');
      listGroup.innerHTML = `
                              <div class="list-group-item ">
        <p> No results found </p>
      </div>`
    }
  
    this.shadowRoot.innerHTML= '';
    this.shadowRoot.appendChild(content);
  }
}
customElements.define('resource-results', ResourceResults);