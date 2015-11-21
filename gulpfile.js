var babelify     = require('babelify');
var browserify   = require('browserify');
var es           = require('event-stream');
var glob         = require('glob');
var gulp         = require('gulp');
var notify       = require('gulp-notify');
var path         = require('path');
var rename       = require('gulp-rename');
var source       = require('vinyl-source-stream');

function jsBundlesTask (done) {
    return glob('./js/app.js', function(err, files) {
        if (err) {
            done(err);
        }

        var tasks = files.map(function(entry) {
            return browserify({
                    entries: [entry],
                    transform: [babelify.configure({
                        presets: ["es2015", "react"],
                    })]
                })
                .bundle()
                .pipe(source(entry))
                .pipe(rename({
                    dirname: '',
                    extname: '.js'
                }))
                .pipe(gulp.dest('./dest/js'))
                .pipe(notify({
                    title: 'bundles',
                    message: 'scripts bundleados :)',
                    icon: path.join(__dirname, '/node_modules/gulp-notify/assets/gulp.png')
                }));
        });
        es.merge(tasks).on('end', done);
    });
}

function watchTask () {
    gulp.watch(['js/**/*.js', 'js/**/*.jsx'], ['js-bundles']);
}

gulp.task('js-bundles', jsBundlesTask);
gulp.task('watch', watchTask);

// main task to run on Gulp CLI
gulp.task('build', ['js-bundles']);
gulp.task('default', ['js-bundles', 'watch']);
