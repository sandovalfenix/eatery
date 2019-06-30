$(window).on('load', function () {
  // Page preloader
  setTimeout(function() {    
    $('#textLoader').html("Bienvenido");
    $('#jsPreloader').fadeOut(500, function () {
      $('[data-toggle="tooltip"]').tooltip();    
      $(this).remove(); 
    });
  }, 1000);
});
$(document).on('ready', function () {
	// initialization of slick carousel
	$.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');

	// initialization of form validation
	$.HSCore.components.HSValidation.init('.js-validate');

	$.HSCore.components.HSShowAnimation.init('[data-animation]');
});