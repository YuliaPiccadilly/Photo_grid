const { src, dest, series, watch } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const del = require('del');
const ttfToWoff = require('gulp-ttf2woff');
const ttfToWoff2 = require('gulp-ttf2woff2');

const clean = () => {
    return del(['dist'])
}

const fonts = () => {
    src('src/fonts/**/*.ttf')
      .pipe(ttfToWoff())
      .pipe(dest('dist/fonts'))
    return src('src/fonts/**/*.ttf')
      .pipe(ttfToWoff2())
      .pipe(dest('dist/fonts'))
  }


const resources = () => {
    return src('src/resources/**')
    .pipe(dest('dist/resources'))
}

const styles = () => {
    return src('src/styles/**/*.scss')
     .pipe(sourcemaps.init())
     .pipe(sass().on('error', sass.logError))
     .pipe(concat('main.css'))
     .pipe(autoprefixes({
        cascade: false
    }))
    .pipe(cleanCSS({
        level: 2
    }))
     .pipe(sourcemaps.write())
     .pipe(dest('dist/css'))
     .pipe(browserSync.stream())
 }

 const html = () => {
    return src('src/**/*.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/imgs/svg/**/*.svg')
    .pipe(sourcemaps.init())
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/imgs'))
    .pipe(browserSync.stream())
}

const scripts = () => {
    return src([
        'src/js/**/*.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('script.js'))
    .pipe(uglify({
        toplevel: true,
    }).on('error', notify.onError()))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

const imgs = () => {
    return src([
        'src/imgs/img/**/*.jpg',
        'src/imgs/img/**/*.png',
        'src/imgs/img/*.svg',
        'src/imgs/img/**/*.jpeg',
    ])
    .pipe(image())
    .pipe(dest('dist/imgs/img'))
    .pipe(browserSync.stream())
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

 watch('src/styles/**/*.scss', styles)
 watch('src/**/*.html', html)
 watch('src/imgs/svg/**/*.svg', svgSprites)
 watch([
    'src/imgs/img/**/*.jpg',
    'src/imgs/img/**/*.png',
    'src/imgs/img/**/*.jpeg',
  ], imgs);
watch('src/js/**/*.js', scripts)
watch('src/resources', resources)
watch('src/fonts/**/*.ttf', fonts)


exports.fonts = fonts
exports.styles = styles
 exports.html = html
 exports.images = imgs
 exports.scripts = scripts
 exports.default = series(clean, resources, styles, scripts, fonts, html, imgs, svgSprites, watchFiles)


//BUILD VERSION
const htmlBuild = () => {
    return src('src/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

exports.build = series(clean, htmlBuild, styles, scripts, imgs, svgSprites, fonts, watchFiles);
