
let matchReplacerRegex = /\$\{/gmi;
let replaceValuesRegex = /"\s*\{\{\s*([^\}\s]*)\s*\}\}\s*"/gmi;
let JSONPath;
const imports = Promise.all([
  './jsonpath-plus.js',
].map(path => import(path)))
 .then(modules => {
  JSONPath = modules[0].JSONPath;
});

export default {
  async render(template, data) {
    await imports;
    template = typeof template === 'string' ? template : JSON.stringify(template);
    let replaced = template.replace(replaceValuesRegex, (m, prop) => {
      let value = JSONPath({ path: prop.trim(), json: data })[0];
      switch (typeof value) {
        case 'undefined': return m;
        case 'string': return '"' + value + '"';
        case 'object': return JSON.stringify(value);
        default: return value;
      }
    });
    return JSON.parse(replaced, function(key, value) {
      let type = typeof value;
      if (type === 'object' && !Object.values(value).length) return undefined;
      if (type === 'string' && (!value || value.match(matchReplacerRegex))) return undefined;
      try { return JSON.parse(value) }
      catch(e){}
      return value;
    })
  }
}