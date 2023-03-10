const { src, dest, series, parallel, watch } = require('gulp');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

function copyHtmlTask() {
    return src('./src/index.html')
        .pipe(dest('./dist'))
}

function copyCssTask() {
    return src('./src/index.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('./dist'))
}
function copyJsTask() {
    return src(['./src/*js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('./dist'))
}

function serveTask(done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    watch('./src/index.html', series (copyHtmlTask, browserReloadTask));
    watch('./src/index.css', series (copyCssTask, browserReloadTask));
    watch('./src/*js', series (copyJsTask, browserReloadTask));
    done();
}

function browserReloadTask(done) {
    browserSync.reload();
    done();
}

function buildTask() {
    return parallel(copyHtmlTask, copyCssTask, copyJsTask)
}


module.exports = {
    build: buildTask(),
    start: series(buildTask(), serveTask),
}

