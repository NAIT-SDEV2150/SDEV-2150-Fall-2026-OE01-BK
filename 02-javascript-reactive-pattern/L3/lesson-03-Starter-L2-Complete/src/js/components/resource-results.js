const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Results</strong>
        <span class="badge text-bg-secondary">4</span>
      </div>

      <div class= "list-group list-group-flush">
        <-- Results will be injected here -->
      </div>

    </div>
  </section>`;



  class ResourceResults extends HTMLElement {

  // create private field for result data

  #results = []; 
  constructor() {
  super();

  // bind the handleResultClick method to instance

  this._handleResultClick = this._handleResultClick.bind(this)

  this.attachShadow({ mode: 'open' });
  }

  // setter method for results 

  set results(data) {
    this.#results = data;
    this.render();
  }


  // add event handeler metyhod  for result selection
  // event delegation and user Interaction


  _handleResultClick(event)
  {
    // one listner for all clicks

    const button = event.target.closest('button[data-id]');

    if (button){

      const selectedID  = button.getAttribute('data-id');
      // mark the selected item as active 
         

    // optional chaining ?
    
    
    const active = this .shadowRoot.querySelector('button.active');
      if (active)
      {
        active.classList.remove('active');
     }
     button.classList.add('active');

     /// finding the selected resorce from the results

    const resource = this.#results.find(r => r.id === selectedID);
    // dispatch a custom event with selected resource detail

    const selectedEvent = new CustomEvent('resource-selected', {
      detail : {resource},
      bubbles: true,
      composed: true
    })

    this.dispatchEvent(selectedEvent);

    }
  }

  connectedCallback() {

    // add a click event listner to habdle result sekectio
    this.shadowRoot.addEventListener('click', this._handleResultClick);
    this.render();
  }

  disconnectedCallBack(){
    this.shadowRoot.removeEventListener('click', this._handleResultClick);
  }

  render() {
   const content = template.content.cloneNode(true);

    if (this.#results.length){

      const resultsHtml = this.#results.map(result => `<button type="button" class="list-group-item list-group-item-action" data-id = "${result.id}">
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