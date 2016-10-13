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
		var container = $('.slider'),
				list = container.find('.slider__inner-wrapper'),
				items = container.find('.slide');

		$('.navigation__arrow').on('click', function(e) {
			e.preventDefault();
			var $this = $(this),					
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

			setActiveDot();

			list.css('left', "-=" + reqPos + 'px');

			function removeActiveClass(reqSlide) {
				reqSlide.addClass('slide_active').siblings().removeClass('slide_active');			
			}

			function findReqPos(slide) {
				reqPos = slide.offset().left - sliderOffset;				
			}
		});


		function createDots(){
			var $this = $(this),					
					dotMarkup = '<li class="pagination__item"></li>';					
			container.each(function(){
				for(var i=0; i<items.size(); i++){
					$('.pagination__list').append(dotMarkup);
				}			
			})
		}

		createDots();
		setActiveDot();

		function setActiveDot(){				
			$('.pagination__item')
				.eq(items.filter('.slide_active').index())					
				.addClass('pagination__item_active')
				.siblings()					
				.removeClass('pagination__item_active');			
		}	

	}

	return {
		init: init
	}
}


// Contact Form 
function Form(){
	function init() {
		$('#contact-form').on('submit', function(e) {
				e.preventDefault();

				var form = $(this),
						url = 'contact-form.php',
						data = form.serialize();
						console.log(data);
						
						$.ajax({
							url: url,
							type: 'POST',
							dataType: 'json',
							data: data,
						})
						.done(function(ans){							
							if(ans.message === "OK") {
								form.find('.contact-form__success-message').text(ans.text);
							} else {
								form.find('.contact-form__error-message').text(ans.text);
							}
						})
						.fail(function(){
							console.log('error');
						})
		});
	}
	return {
		init: init
	}
}


var blur = (function(){
    var 
	    blur = $('.contact-form-blur-bg'),
	    blurSection = $('.content-bottom');	    

	return {
		set : function () {

			var
				imgWidth = $('.blur-bg').width(),
				posLeft = blurSection.offset().left - blur.offset().left,
				posTop = blurSection.offset().top - blur.offset().top;

			console.log('ssss');
			blur.css({
				'background-size' : imgWidth + 'px' + ' ' + 'auto',
				'background-position' : posLeft + 'px' + ' ' + posTop + 'px'
			})
		}
	}
}());

$(window).resize(function(){
	if($('.contact-form-blur-bg').length){
		blur.set();
	}

});
$(document).ready(function(){
	var fsmenu = fsMenu().init(),
			flipcard = flipCard().init(),
			slider = Slider().init(),
			contactform = Form().init();
	if($('.blog-sidebar').length){
		var blogscroll = BlogScroll().init();
	}
	if($('.contact-form-blur-bg').length){
		blur.set();
	}
});

