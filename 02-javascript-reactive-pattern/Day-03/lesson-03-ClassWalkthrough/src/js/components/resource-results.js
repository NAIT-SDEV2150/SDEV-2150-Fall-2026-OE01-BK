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
        <!-- Results from data will be rendered here -->

      </div>
    </div>
  </section>`;
/**
 * <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
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
 */

class ResourceResults extends HTMLElement {
  // TODO: Create a private field for results data
  #results = [];

  constructor() {
    super();
    // TODO: Bind the handleResultClick method to this instance
    this._handleResultClick = this._handleResultClick.bind(this);

    this.attachShadow({ mode: 'open' });
  }

  // TODO: Implement setter for results data, remember to render
  set results(data) {
    this.#results = data;
    this.render(); // as data updates, component is automatically rerendered
  }

  // TODO: Add an event handler method for result selection

  _handleResultClick(event) {

    // identify which button is clicked

    const button = event.target.closest('button[data-id]');
    if (button){
      const seletedId = button.getAttribute('data-id');
      // mark this result element as active
      // optional chaining operator 

      this.shadowRoot.querySelector('button.active')?.classList.remove('active');
      button.classList.add('active');

      // Find the selected resurce from results

      const resource = this.#results.find(r => r.id === seletedId);
      // create an event and pass selected resource as payload

      const selectedEvent = new CustomEvent('resource-selected', {
        detail: {resource},
        bubbles: true,
        composed: true,
      });
      // dispatch the event

      this.dispatchEvent(selectedEvent);

    }

  }

  connectedCallback() {
    // TODO: Add a click event listener to handle result selection
    this.shadowRoot.addEventListener('click', this._handleResultClick);

    this.render();
  }

  disconnectedCallback()
  {
    this.shadowRoot.removeEventListener('click', this._handleResultClick);
  }

  // TODO: Clean up event listener in disconnectedCallback

  render() {
    // TODO: Update to render from the private results field, if it's empty, show "No results found" message
 const content = template.content.cloneNode(true);
 if (this.#results.length) {
      // Generate the list of results to display
      const resultsHtml = this.#results.map(result =>` <button type="button" class="list-group-item list-group-item-action">
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

    //this.shadowRoot.appendChild(template.content.cloneNode(true));
  }


customElements.define('resource-results', ResourceResults);
