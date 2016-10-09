'use strict';  

// FullScreen menu
function fsMenu(){
	function init() {
		$('.fs-nav__toggle-button').on('click', function(e){
			e.preventDefault();
			$(this).toggleClass('open');
			$('.fs-nav__menu').toggleClass('open');
		});	
	}
	return {
		init: init
	}
}



//Flip Card
function flipCard(){
	function init() {
		$('.authorize-btn').on('click', function(e){		
			e.preventDefault();
			$('.flip-card').toggleClass('flipped');
			$(this).toggleClass('hidden');
		});

		$('.back-to-home').on('click', function(e){
			e.preventDefault();
			$('.flip-card').toggleClass('flipped');
			$('.authorize-btn').toggleClass('hidden');
		});
	}
	return {
		init: init
	}
}



//Blog scroll menu
function BlogScroll(){
	function init() {
		$('.vertical-nav__link').on('click', function(e) {
			e.preventDefault();
	    var href = $(this).attr("href");
	    var buttons = $('.vertical-nav__item');
	    buttons.removeClass('vertical-nav__item_active');
	    $(this).parent().toggleClass('vertical-nav__item_active');
	    $('body').animate({
	      scrollTop: $(href).offset().top
	    }, 500);
	    return false;
	  });

	  var blogSidebar = $('.blog-sidebar'),
				sidebarPosition = $('.vertical-nav__list').offset().top;

		$(window).scroll(function(e) {		
				var pageOffset = $(window).scrollTop();
				if(pageOffset > sidebarPosition) {
					blogSidebar.addClass('blog-sidebar_fixed');
				} else {
					blogSidebar.removeClass('blog-sidebar_fixed');
				}
		});

		// Mobile toogle
		$(window).on('click', function(){		
				$('.blog-sidebar').toggleClass('blog-sidebar_active');
		});
	}
	return {
		init: init
	}
}



// Slider 
function Slider(){
	function init() {
		$('.navigation__arrow').on('click', function(e) {
			e.preventDefault();

			var $this = $(this),
			container = $('.slider'),
			list = container.find('.slider__inner-wrapper'),
			items = container.find('.slide'),
			activeSlide = items.filter('.slide_active'),
			nextSlide = activeSlide.next(),
			prevSlide = activeSlide.prev(),
			firstSlide = items.first(),
			lastSlide = items.last(),
			sliderOffset = container.offset().left,
			reqPos = 0;
			
			if($(this).hasClass('navigation__arrow_right')){
				if(nextSlide.length) {
					findReqPos(nextSlide);
					removeActiveClass(nextSlide);				
				} else {
					findReqPos(firstSlide);
					removeActiveClass(firstSlide);
				}		
			} else {
				if(prevSlide.length) {
					findReqPos(prevSlide);
					removeActiveClass(prevSlide);				
				} else {
					findReqPos(lastSlide);
					removeActiveClass(lastSlide);
				}
			}

			list.css('left', "-=" + reqPos + 'px');

			function removeActiveClass(reqSlide) {
				reqSlide.addClass('slide_active').siblings().removeClass('slide_active');
			}

			function findReqPos(slide) {
				reqPos = slide.offset().left - sliderOffset;
			}
		});		
	}
	return {
		init: init
	}
}


$(document).ready(function(){
	var fsmenu = fsMenu().init(),
			flipcard = flipCard().init(),
			slider = Slider().init();
	if($('.blog-sidebar').length){
		var blogscroll = BlogScroll().init();
	}
})

// Slider responsive
// var slider = (function() {
// 	return {
// 		init : function() {
// 				var _this = this;
// 				$('.navigation__arrow').on('click', function(e){
// 						e.preventDefault();
// 						var $this = $(this),
// 								slides = $this.closest('slider').find('.slide'),
// 								activeSlide = slides.filter('.slide_active'),
// 								nextSlide = activeSlide.next(),
// 								prevSlide = activeSlide.prev(),
// 								firstSlide = slides.first(),
// 								lastSlide = slides.last();
// 								console.log(slides);
// 						if($('.navigation__arrow_left')){
// 							_this.moveSlide(nextSlide, "forward");
// 						}
// 				});
// 		},
// 		moveSlide: function(slide, direction){
// 			var container = slide.closest('.slider'),
// 					slides = container.find('.slide'),
// 					active = slides.filter('.slide_active'),
// 					slideWidth = slides.width(),
// 					duration = 700,
// 					reqCssPosition = 0,
// 					reqSlideStrafe = 0;
// 			if(direction === "forward"){
// 				reqCssPosition = slideWidth;
// 				reqSlideStrafe = -slideWidth;
// 			} else if(direction === "backforward"){
// 				reqCssPosition = -slideWidth;
// 				reqSlideStrafe = slideWidth;
// 			}

// 			slide.css('left', reqCssPosition).addClass('.slide_active');

// 			
// 		}
// 	}
// })();

// $(document).ready(function(){
// 	if($('.slider').length){
// 		slider.init();
// 	}
// });