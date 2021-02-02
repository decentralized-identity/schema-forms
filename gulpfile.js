const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const nunjucksRender = require('gulp-nunjucks-render');
const axios = require('axios');

let root = 'dashboard/';

var assets = {
  head: {
    js: [
      root + 'js/x-tag-polyfilled.js',
      root + 'js/x-tag-tap.js',
      root + 'js/components.js',
    ]
  },
  body: {
    js: [
      root + 'js/particles.js',
      root + 'js/global.js'
    ]
  }
};

var code;

const getRepoInfo = async () => {
  code = {
    repo: {},
    release: {},
    version: ''
  };
  try {
    await axios.all([
      axios.get('https://api.github.com/repos/decentralized-identity/ion'),
      axios.get('https://api.github.com/repos/decentralized-identity/ion/releases')
    ]).then(axios.spread(function (repo, releases) {
      code.repo = repo.data;
      code.releases = releases.data;
      code.latest_version = releases.data[0].tag_name
    })).catch(function(e){
      console.log(e)
    })
    return code;
  } catch (error) {
    console.log(error);
    return code;
  }
};

var repoFetch = getRepoInfo();

function headJS(){
  return gulp.src(assets.head.js)
    .pipe(terser())
    .pipe(concat('head.js'))
    .pipe(gulp.dest(root + 'js'))
}

function bodyJS(){
  return gulp.src(assets.body.js)
    .pipe(terser())
    .pipe(concat('body.js'))
    .pipe(gulp.dest(root + 'js'))
}

async function renderTemplates() {
  return gulp.src(root + 'html/pages/**/*.html')
    .pipe(nunjucksRender({
      path: [root + 'html', root + 'html/partials', root + 'html/pages'],
      data: {
        code: code || await getRepoInfo()
      }
    }))
    .pipe(gulp.dest('.'))
};

gulp.task('build', gulp.series(gulp.parallel(headJS, bodyJS), renderTemplates));

gulp.task('watch', () => gulp.watch([root + '**/*', '!' + root + 'js/head.js', '!' + root + 'js/body.js'], gulp.parallel('build')));

repoFetch.then(r => gulp.parallel('build')());