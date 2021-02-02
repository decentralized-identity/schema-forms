
(function(){

let anchor = document.createElement('a');

let style = document.createElement('style');
    style.textContent = `
      schema-form {
        display: block;
        box-sizing: border-box;
        width: 100%;
        max-width: 600px;
        transition: opacity 0.5s ease;
      }
      schema-form:empty {
        opacity: 0;
      }
      schema-form > form > .schema-form-submit {
        display: none;
      }
      schema-form[submit] > form > .schema-form-submit {
        display: block;
      }
      schema-form h4 {
        margin-top: 0.8em;
      }
      schema-form .je-panel {
        padding: 0.8em 1em !important;
      }
      schema-form div[data-theme="spectre"] div[data-schematype]:not([data-schematype="object"]):hover {
        background-color: transparent !important;
      }
      schema-form .compact > .form-group > .form-checkbox {
        padding-left: 0 !important;
      }
      schema-form .compact > .form-group > .form-checkbox i.form-icon {
        position: relative;
        background: #bcc3ce;
        border-radius: .45rem;
        height: .9rem;
        top: .2rem !important;
        width: 1.6rem;
        margin-right: 0.5em;
      }
      schema-form .compact > .form-group > .form-checkbox input:checked+i.form-icon::before {
        left: 14px;
      }
      schema-form .compact > .form-group > .form-checkbox i.form-icon::before {
        background: #fff;
        border-radius: 50%;
        content: "";
        display: block;
        height: .8rem !important;
        margin-top: 0 !important;
        left: 0;
        position: absolute;
        top: 0 !important;
        transition: background .2s,border .2s,box-shadow .2s,color .2s,left .2s;
        width: .8rem !important;
      }
    `;

let modulePath = document.currentScript.getAttribute('module-path') || '/modules/';

document.documentElement.prepend(style, ...[
  'spectre.min.css',
  'spectre-exp.min.css',
  'spectre-icons.min.css'
].map(href => {
  let link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = modulePath + href;
  return link;
}));

let JSONRender;
const imports = Promise.all([
  'json-editor.min.js',
  'json-render.js'
].map(path => import(modulePath + path)))
 .then(modules => {
  JSONRender = modules[1].default;
});

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
    throw 'No template provided'
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
        await imports;
        this.load(config);
      break;
    }
  }
});

})();