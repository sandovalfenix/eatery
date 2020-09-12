$(window).on('load', function () {
  // Page preloader
  setTimeout(function () {
    $('#jsPreloader').fadeOut(500, function () {
      $('[data-toggle="tooltip"]').tooltip();
      $('[data-toggle="popover"]').popover();
      $('body').removeClass('overflow-hidden');
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
  // initialization of select picker
  $.HSCore.components.HSSelectPicker.init('.js-select');
});
