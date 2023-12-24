jQuery(document).ready(function($) {
 var testimonialOwl = $('.testimonials-carousel');
 var $speed = 300;
testimonialOwl.children().each( function( index ) {
  $(this).attr( 'data-position', index );
});

 testimonialOwl.owlCarousel({
     margin:20,
     loop : true,
     items : 5,
     nav : false,
//      dots : false,
     autoplay:false,
//      center:true,
     responsive:{
         0:{
             items:1,
         },
		  590:{
             items:1,
         },
	 599:{
             items:3,
         },
         600:{
             items:3,
         },
	 900:{
             items:3,
         },
         1000:{
             items:3,
         }
     }
 });

$('.owl-item>div').on('click',function() {
    testimonialOwl.trigger('to.owl.carousel', [$(this).data( 'position' ), $speed] );
      });
	
});