
(function(){

let anchor = document.createElement('a');

customElements.define('schema-form', class SchemaForm extends HTMLElement {
  static get observedAttributes() {
    return ['schema'];
  }
  constructor() {
    super();
    this.addEventListener('submit', e => {
      e.preventDefault();
      if (this.editor) {
        let json = this.renderOutput(this.editor.getValue());
        console.log(json);
      }
    });
    this.addEventListener('click', e => {
      if (this.hasAttribute('download') && e.target.parentNode.parentNode === this && e.target.matches('.schema-form-submit')) {
        e.preventDefault();
        this.downloadOutput();
      }
    })
  }
  set schema (val){
    return this.setAttribute('schema', val);
  }
  get schema (){
    return this.getAttribute('schema');
  }
  get validate (){
    return this.hasAttribute('validate');
  }
  load(config){
    if (this.editor) this.editor.destroy();
    this.config = config;
    this.innerHTML = `<form>
        <div></div>
        <button type="submit" class="schema-form-submit">${ this.getAttribute('submit') || 'Submit' }</button>
    </form>`;
    this.editor = new JSONEditor(this.firstElementChild.firstElementChild, {
      schema: config.schema,
      theme: 'spectre',
      iconlib: 'spectre',
      disable_collapse: true,
      disable_edit_json: true,
      disable_properties: true
    });
  }
  async renderOutput(data, template){
    template = template || this?.config?.template;
    if (template) return JSONRender.render(template, data);
    throw 'No template provided';
  }
  async downloadOutput(){
    let object = await this.renderOutput(this.editor.getValue());
    let a = document.createElement('a');
    a.download = object.id.split('\/').pop();
    a.href = URL.createObjectURL(new Blob([JSON.stringify(object, null, 2)], {
      type: "application/json;charset=utf-8"
    }));
    a.click();
  }
  async attributeChangedCallback(attr, last, current) {
    switch(attr) {
      case 'schema':
        let abort;
        let config = current;
        try {
          anchor.href = config;
          config = await fetch(anchor.href).then(raw => raw.json()).catch(e => console.log(e));
        }
        catch (e) {
          try { config = JSON.parse(config) }
          catch(e) { abort = true }
        }
        if (abort) return this.config = null;
        this.load(config);
      break;
    }
  }
});

})();