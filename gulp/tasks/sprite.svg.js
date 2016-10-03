'use strict';

module.exports = function() {
  $.gulp.task('sprite:svg', function() {
    let svgminConfig = { js2svg: { pretty: true } };

    let cheerioConfig = {
      run: function($) {
        $('[fill]').each(function () {
          if(this.attribs.fill.toUpperCase()!='NONE'){
            this.attribs.fill='';
          };
        });
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    };

    let svgSpriteConfig = {
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    };

    return $.gulp.src('./source/svg/*.svg')
        .pipe($.gp.svgmin(svgminConfig))
        .pipe($.gp.cheerio(cheerioConfig))
        .pipe($.gp.replace('&gt;', '>'))
        .pipe($.gp.svgSprite(svgSpriteConfig))
        .pipe($.gulp.dest($.config.root + '/assets/img'));
  });
};


// Original
// 'use strict';

// module.exports = function() {
//   $.gulp.task('sprite:svg', function() {
//     return $.gulp.src('./source/sprite/*.svg')
//       .pipe($.gp.svgmin({
//         js2svg: {
//           pretty: true
//         }
//       }))
//       .pipe($.gp.cheerio({
//         run: function ($) {
//           $('[fill]').removeAttr('fill');
//           $('[stroke]').removeAttr('stroke');
//           $('[style]').removeAttr('style');
//         },
//         parserOptions: { xmlMode: true }
//       }))
//       .pipe($.gp.replace('&gt;', '>'))
//       .pipe($.gp.svgSprite({
//         mode: {
//           symbol: {
//             sprite: "../sprite.svg"
//           }
//         }
//       }))
//       .pipe($.gulp.dest($.config.root + '/assets/img'))
//   })
// };
