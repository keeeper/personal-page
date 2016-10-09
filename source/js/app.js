(function() {
  'use strict';  

	// FullScreen menu
	$('.fs-nav__toggle-button').click(function(){
		$(this).toggleClass('open');
		$('.fs-nav__menu').toggleClass('open');
	});

	//Flip Card
	$('.authorize-btn').click(function(){
		$('.flip-card').toggleClass('flipped');
		$(this).toggleClass('hidden');
	});

	$('.back-to-home').click(function(){
		$('.flip-card').toggleClass('flipped');
		$('.authorize-btn').toggleClass('hidden');
	});



	//Blog scroll menu	
	$('.vertical-nav__link').click(function() {
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
	$(window).click(function(){
			$('.blog-sidebar').toggleClass('blog-sidebar_active');
	});




})();