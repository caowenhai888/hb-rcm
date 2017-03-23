const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const zip = require('gulp-zip');
const install = require("gulp-install");
const webpack = require('webpack-stream');
const webserver = require('gulp-webserver');
const replace = require('gulp-replace');

gulp.task('clean', () => {
  console.log('Cleaning Path: dist');
  del.sync('./dist/*', {
    force: true
  });
  console.log('Cleaning Path: target');
  del.sync('./target/*', {
    force: true
  });
});

gulp.task('install', () => {
  return gulp.src(['./package.json'])
    .pipe(install());
});

gulp.task('webpack', () => {
  return webpack(require('./webpack.config.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('tar', () => {
  return gulp.src('dist/**/*.*', {
      base: 'dist',
      dot: true
    })
    .pipe(zip('Magical-Chest.zip'))
    .pipe(gulp.dest('target'));
});

gulp.task('set-dev-node-env', () => {
  return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', () => {
  return process.env.NODE_ENV = 'production';
});

gulp.task('build-for-dev', ['set-dev-node-env'], () => {
  runSequence(
    'clean',
    'install',
    'webpack'
  )
});

gulp.task('build-for-production', ['set-prod-node-env'], () => {
  runSequence(
    'clean',
    'install',
    'webpack'
  )
});

gulp.task('default', () => {
  runSequence(
    'build-for-production'
  )
});
