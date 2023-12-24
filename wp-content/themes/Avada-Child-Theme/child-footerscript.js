jQuery(document).ready(function(){
//     
//     jQuery("section.fusion-tb-header .fusion-breadcrumbs span:first-child span").html(icone);
// 	var breadseprator = '<img src="/wp-content/uploads/2022/05/Vector.svg" alt="arrow">';
//     jQuery(".top-header .fusion-breadcrumbs span span:after").attr('content','>');
// $('#theDiv').prepend(breadseprator);
    var applynw = 'Apply Now <img class="alignnone size-large wp-image-248" src="/wp-content/uploads/2022/04/right-arrow.svg" alt="" width="15px" height="15px" />';
    jQuery(" #owl-demo11post .applynow button").html('Apply Now');
	jQuery(" #owl-demo111post .applynow button").html('Apply Now');
});


jQuery(document).ready(function(){
 jQuery(document).on('click','.dcsLoadMorePostsbtn',function(){
 var ajaxurl = dcs_frontend_ajax_object.ajaxurl;
 var dcsPostType = jQuery('input[name="dcsPostType"]').val();
 var offset = parseInt(jQuery('input[name="offset"]').val() );
 var dcsloadMorePosts = parseInt(jQuery('input[name="dcsloadMorePosts"]').val() );
 var newOffset = offset+dcsloadMorePosts;
 jQuery('.btnLoadmoreWrapper').hide();
 jQuery.ajax({
 type: "POST",
 url: ajaxurl,
 data: ({
 action: "dcsAjaxLoadMorePostsAjaxReq",
 offset: newOffset,
 dcsloadMorePosts: dcsloadMorePosts,
 postType: dcsPostType,
 }),
 success: function(response){
 if (!jQuery.trim(response)){ 
 // blank output
 jQuery('.noMorePostsFound').show();
 }else{
 // append to last div
 jQuery(response).insertAfter(jQuery('.loadMoreRepeat').last());
 jQuery('input[name="offset"]').val(newOffset);
 jQuery('.btnLoadmoreWrapper').show();
 }
 },
 beforeSend: function() {
 jQuery('.dcsLoaderImg').show();
 },
 complete: function(){
 jQuery('.dcsLoaderImg').hide();
 },
 });
 });
});


jQuery(document).ready(function() {
 
  jQuery("#owl-demo11").owlCarousel({
 
    nav : true, // Show next and prev buttons
	navText : ['<img src="/wp-content/uploads/2022/06/left-arrow.svg" alt="arrow" style=" padding-left: 5px;width:25px">','<img src="/wp-content/uploads/2022/06/right-arrow.svg" alt="arrow" style=" padding-left: 5px;width:25px">'],
		// autoplay:true,
    slideSpeed : 300,
    paginationSpeed : 400,
 	singleItem: true,
 	loop:true,
 	margin:10,
	navClass: ['owl-prev11', 'owl-next11'],
    items : 1, 
    itemsDesktop : false,
    itemsDesktopSmall : false,
    itemsTablet: false,
    itemsMobile : false
 
  });
 
});
jQuery(document).ready(function() {
 
  jQuery("#owl-demo11post").owlCarousel({
 
    nav : true, // Show next and prev buttons
	navText : ['<img src="/wp-content/uploads/2022/06/left-arrow.svg" alt="arrow" style=" padding-left: 5px;width:25px">','<img src="/wp-content/uploads/2022/06/right-arrow.svg" alt="arrow" style=" padding-left: 5px;width:25px">'],
		// autoplay:true,
    slideSpeed : 900,
    paginationSpeed : 400,
 	singleItem: true,
 	loop:true,
 	margin:10,
	navClass: ['owl-prev11', 'owl-next11'],
    items : 1, 
    itemsDesktop : false,
    itemsDesktopSmall : false,
    itemsTablet: false,
    itemsMobile : false,
	  autoplay:true,
    autoPlaySpeed: 5000,
        autoPlayTimeout: 5000,
    autoplayHoverPause:true
 
  });
 
});

jQuery(document).ready(function() {
 
  jQuery("#owl-demo111post").owlCarousel({
 
    nav : true, // Show next and prev buttons
	navText : ['<img src="/wp-content/uploads/2022/06/left-arrow.svg" alt="arrow" style=" padding-left: 5px;width:25px">','<img src="/wp-content/uploads/2022/06/right-arrow.svg" alt="arrow" style=" padding-left: 5px;width:25px">'],
		// autoplay:true,
    slideSpeed : 300,
    paginationSpeed : 400,
 	singleItem: true,
 	loop:true,
 	margin:10,
	navClass: ['owl-prev11', 'owl-next11'],
    items : 1, 
    itemsDesktop : false,
    itemsDesktopSmall : false,
    itemsTablet: false,
    itemsMobile : false,
	autoplay:true,
    autoPlaySpeed: 5000,
    autoPlayTimeout: 5000,
    autoplayHoverPause:true
 
  });

//  var imgcard = jQuery("#myBtn").attr('name');
//  var popcard = jQuery(".image-lightbox").attr('name');
	
// 	jQuery('#myBtn').click(function(){
// 	if (imgcard === popcard) {
//       jQuery('.image-lightbox').addClass("ttfff");
//    }
// 	});
});

