'use strict';

module.exports = function() {
   $.gulp.task('sprite:image', function(cb) {  
    var spriteData = $.gulp.src('./source/images/icons/**/*.png')
        .pipe($.gp.spritesmith({        	
            imgName: 'sprite.png',
            cssName: 'sprite.css'
          }))
    spriteData.css.pipe($.gulp.dest($.config.root + '/assets/css'));
    spriteData.img.pipe($.gulp.dest($.config.root + '/assets/img'));
    cb();
 });
}; 