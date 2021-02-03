
const fs = require('fs-extra');
const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const mergeStreams = require('merge-stream');
const cleanCSS = require('gulp-clean-css');
const axios = require('axios');

let compileLocation = 'dist';

var modules = {
  jsonRender: {
    filename: 'json-render.js',
    files: [
      'node_modules/jsonpath-plus/dist/index-browser-esm.js',
      'js/json-render.js'
    ]
  },
  customElementJS: {
    filename: 'schema-form-element.js',
    files: [
      'dist/json-render.js',
      'node_modules/@json-editor/json-editor/dist/nonmin/jsoneditor.js',
      'js/schema-form-element.js'
    ]
  },
  customElementCSS: {
    filename: 'schema-form-element.css',
    files: [
      'node_modules/spectre.css/dist/spectre.css',
      'node_modules/spectre.css/dist/spectre-exp.css',
      'node_modules/spectre.css/dist/spectre-icons.css',
      'css/schema-form-element.css'
    ]
  }
};

async function compileAsset(){
  await fs.ensureDir(compileLocation);
  return new Promise(resolve => {
    
    console.log('compiling ' + this.filename);

    let filename = this.filename.split('.');
    let type = filename.pop();
    filename = filename.join('.');

    mergeStreams(
      gulp.src(this.files)
          .pipe(concat(filename + '.' + type))
          .pipe(gulp.dest(compileLocation)),
      gulp.src(this.files)
          .pipe(concat(filename + '.min.' + type))
          .pipe(type === 'js' ? terser() : cleanCSS())
          .pipe(gulp.dest(compileLocation))
    ).on('finish', function() {
      resolve();
    })

  });
}

gulp.task('build', gulp.series(
  compileAsset.bind(modules.jsonRender), 
  compileAsset.bind(modules.customElementJS),
  compileAsset.bind(modules.customElementCSS),
));

gulp.task('watch', () => gulp.watch(['js', 'css'], gulp.parallel('build')));