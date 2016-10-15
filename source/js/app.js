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

// Arrow down
function arrowDown(){
	function init() {
		$('.arrow-down').on('click', function(e){
			e.preventDefault();
			var coords = $('.content').offset().top;
			console.log(coords);
			$('body').animate({scrollTop: coords}, 500);			
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
		
		$('.vertical-nav__link').click(function () {
			var href = $(this).attr("href");		
			var coords = $('#' + href).offset().top;
			$('body').animate({scrollTop: coords}, 500);
			return false;
		});

		var lastID; // Last visited artcicle
		var elemID; // Current artcicle

		$(window).scroll(function () {			
			var docScroll = $(document).scrollTop();			
			$('.blog-post').each(function () {				
				var curr = $(this).offset().top ;

				if (docScroll >= curr - $(this).height()) {				
					elemID = $(this).attr('id');					
					if (elemID != lastID) {
						lastID = elemID;
						$('.vertical-nav__list a').closest('li').removeClass('vertical-nav__item_active');
						$('.vertical-nav__list a[href=' + elemID + ']').closest('li').addClass('vertical-nav__item_active');
						$('.blog-post').removeClass('blog-post_current');
						$(this).addClass('blog-post_current');
					}
				}
			});
		});

		var blogSidebar = $('.blog-sidebar'),
			sidebarPosition = $('.vertical-nav__list').offset().top;

		$(window).scroll(function() {
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
		var slides = $('.slider__inner-wrapper').children('.slide'),
			width = $('.slider').width(),
			i = slides.length,
			offset = i * width;

		$('.slider__inner-wrapper').css('width', offset);
		$('.slide').css('width', width);
		for (var j = 0; j < slides.length; j++) {
			if (j == 0) {
				$('.slider-wrapper .pagination__list').append("<li class='pagination__item pagination__item_active'><a class='pagination__link' href='#'></a></li>");
			} else {
				$('.slider-wrapper .pagination__list').append("<li class='pagination__item'><a class='pagination__link' href='#'></a></li>");
			}
		}

		var dots = $('.slider-wrapper .pagination__list').children(".pagination__item");
		offset = 0;
		i = 0;

		$('.slider-wrapper .pagination__list .pagination__item').click(function (e) {
			e.preventDefault();
			$('.slider-wrapper .pagination__item').removeClass('pagination__item_active');
			$(this).addClass('pagination__item_active');
			i = $(this).index();
			offset = i * width;
			setOffset();
		});

		$('.slider-wrapper .navigation__arrow_right').click(function (e) {
			e.preventDefault();
			if (offset < width * (slides.length-1)) {
				offset += width;
				setOffset();
				toggleActive(++i);
			} else {
				offset = 0;
				i = 0;
				setOffset();
				toggleActive(i);
			}
		});

		$('.slider-wrapper .navigation__arrow_left').click(function (e) {
			e.preventDefault();
			if (offset > 0) {
				offset -= width;
				setOffset();
				toggleActive(--i);
			} else {
				i = slides.length - 1;
				offset = i * width;
				setOffset();
				toggleActive(i);
			}
		});

		function setOffset() {
			$('.slider-wrapper > .slider >.slider__inner-wrapper').css("transform", "translate3d(-" + offset + "px, 0px, 0px)");
		}
		function toggleActive(i) {
			$('.pagination__item').removeClass('pagination__item_active');
			$(dots[i]).addClass('pagination__item_active');
		};
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
	if($('.arrow-down').length){
		arrowDown().init();
	}
});