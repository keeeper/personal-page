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


 	// Form validation
 // 	const cForm = document.querySelector('.contact-form');
 // 	const validate = {
	// 	isValid: true,
	// 	validation(field) {
	// 		return !!field.value.trim();
	// 	}
	// };

 // 	function onSubmit(e){
 // 		e.preventDefault();
 // 		validate.validation(e.tagret);
 // 	}

 // 	cForm.addEventListener('submit', onSubmit);

})();