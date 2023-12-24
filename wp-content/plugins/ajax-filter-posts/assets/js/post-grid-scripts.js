(function($) {
    'use strict';
	 
    jQuery(document).ready(function() {
    	$("#list").hide();

    	// Post loading
    	$('.asr_texonomy').on('click',function(){
    		var term_id = $(this).attr('data_id');   		

    		if(!$(this).hasClass('active')){
                $(this).addClass('active').siblings().removeClass('active');
                //console.log(term_id);
                asr_ajax_get_postdata(term_id, $(this));
            }

    	});
		


        // Pagination
        $( document ).on('click', '#am_posts_navigation_init a.page-numbers, .am-post-grid-load-more', function(e){
            e.preventDefault();

            var term_id = "-1";

            var paged = $(this).text();
            var loadMore = false;
console.log(paged);
            // Try infinity loading
            if ( $(this).hasClass('am-post-grid-load-more') ) {
                paged = $(this).data('next');
                loadMore = true;
            }

            var theSelector = $(this).closest('.am_ajax_post_grid_wrap');
            var activeSelector = $(this).closest('.am_ajax_post_grid_wrap');

            if( activeSelector.length > 0 ){
                term_id = activeSelector.attr('data_id');
            } else {
                activeSelector = theSelector;
            }

            // Load Posts
            asr_ajax_get_postdata(term_id, activeSelector, paged, loadMore);

            //console.log(pageNow,activeSelector,term_id);

        });

        // Set scroll flag
        var flag = false;

    	//ajax filter function
    	function asr_ajax_get_postdata(term_ID, selector, paged, loadMore){
			var activatelist = $(".orange").attr("id");
            var getLayout = $(selector).closest('.am_ajax_post_grid_wrap').find(".asr-filter-div").attr("data-layout");
            var pagination_type = $(selector).closest('.am_ajax_post_grid_wrap').attr("data-pagination_type");
            var jsonData = $(selector).closest('.am_ajax_post_grid_wrap').attr('data-am_ajax_post_grid');
            var args = JSON.parse(jsonData);
			
			var c_term = [];
			var t_term = [];
			var s_term = [];
			
			
			$("input[name='category[]']:checked").each(function () {
					c_term.push($(this).attr('data-id'));
			});
			$("input[name='type[]']:checked").each(function () {
					t_term.push($(this).attr('data-id'));
			});
			$("input[name='sponsors[]']:checked").each(function () {
					s_term.push($(this).attr('data-id'));
			});
			// console.log('c_term  :', c_term);
            var data = {
                action: 'asr_filter_posts',
                asr_ajax_nonce: asr_ajax_params.asr_ajax_nonce,
				
				c_term_all:$("input[name='category_all']").prop('checked'),
				t_term_all:$("input[name='type_all']").prop('checked'),
				s_term_all:$("input[name='sponsors_all']").prop('checked'),
				c_term:c_term,
				t_term:t_term,
				s_term:s_term,
				allpost:$('.all_post').val(),
                term_ID: term_ID,
                layout: (getLayout) ? getLayout : "1",
                jsonData: jsonData,
                pagination_type: pagination_type,
                loadMore: loadMore,
				searchterm:$('#searchtitle').val(),
// 				order:$('.sm_select').attr('id')
				// orderby:$('.sm_select').val()
            }
// 			var order=$('.sm_select').attr('id');
// 			console.log(order);
// 				console.log("datadatadatadata2 : ", data);
            if( paged ){
                data['paged'] = paged;
            }

    		$.ajax({
    			type: 'post',
    			url: asr_ajax_params.asr_ajax_url,
    			data: data,
    			beforeSend: function(data){
    				
                    if ( loadMore ) {
                        // Loading Animation Start
                        $(selector).closest('.am_ajax_post_grid_wrap').find('.am-post-grid-load-more').addClass('loading');
                        flag = true;
                    } else {
                        $(selector).closest('.am_ajax_post_grid_wrap').find('.asr-loader').show();
                    }
    			},
    			complete: function(data){
    				
                    if ( loadMore ) {
                        // Loading Animation End
                        $(selector).closest('.am_ajax_post_grid_wrap').find('.am-post-grid-load-more').removeClass('loading');
                    } else {
                        $(selector).closest('.am_ajax_post_grid_wrap').find('.asr-loader').hide();
                    }
    			},
    			success: function(data){
    				
                    if ( loadMore ) {

                        var newPosts = $('.am_post_grid', data).html();
                        var newPagination = $('.am_posts_navigation', data).html();
						
						if(args.additional_class){
							 $(selector).closest('.am_ajax_post_grid_wrap').find('.'+args.additional_class+' .am_post_grid').append(newPosts);
                        $(selector).closest('.am_ajax_post_grid_wrap').find('.'+args.additional_class+' .am_posts_navigation').html(newPagination);

						}else{
							 $(selector).closest('.am_ajax_post_grid_wrap').find('.asrafp-filter-result .am_post_grid').append(newPosts);
                        $(selector).closest('.am_ajax_post_grid_wrap').find('.asrafp-filter-result .am_posts_navigation').html(newPagination);

						}

                       
                    } else {
						//console.log(args);
						if(args.additional_class){
                        $(selector).closest('.am_ajax_post_grid_wrap').find('.notouroff').hide().html(data).fadeIn(0, function() {
                            //$(this).html(data).fadeIn(300);
                        });
							}else{
                        $(selector).closest('.am_ajax_post_grid_wrap').find('.asrafp-filter-result').hide().html(data).fadeIn(0, function() {
                            //$(this).html(data).fadeIn(300);
                        });								
							}
                    }
					if(activatelist == 'list_view'){
						$("#list").show();
						$("#grid").hide();
					}else{
						$("#list").hide();
						$("#grid").show();
					}

                    flag = false;
                    $( window ).trigger('scroll');

                    // Animation
                    if( args.animation == "true" ){
                        $(selector).closest('.am_ajax_post_grid_wrap').find('.am_grid_col').slideDown();
                    }
                    
    			},
    			error: function(data){
    				alert('Cannot load the Post Grid.');
    			},

    		});
    	}

        // Initial Custom Trigger
        $(document).on('am_ajax_post_grid_init', function(){
            
            $('.am_ajax_post_grid_wrap').each(function(i,el){                
                var amPGdata = $(this).data('am_ajax_post_grid');
                if(amPGdata && amPGdata.initial){
                    asr_ajax_get_postdata(amPGdata.initial,$(this).find('.asr-ajax-container'));
                }
            });
        });

        // Handle Infinite scroll
        $( window ).on('scroll', function(e){
            $('.infinite_scroll.am-post-grid-load-more').each(function(i,el){

                var $this = $(this);

                var H = $(window).height(),
                    r = el.getBoundingClientRect(),
                    t=r.top,
                    b=r.bottom;

                var tAdj = parseInt(t-(H/2));

                if ( flag === false && (H >= tAdj) ) {
                    //console.log( 'inview' );
                    $this.trigger('click');
                } else {
                    //console.log( 'outview' );
                }
            });
        });


    });

    $(window).load(function(){
        $(document).trigger('am_ajax_post_grid_init');        
    });

})(jQuery);


(function($) {
    'use strict';

$("#list").hide();
$(document).ready(function () {


	$('#ttsbtn-cancel').on('click',function(){
		$('#test')[0].reset();
		//$('.filter-show').css('display', 'none');
		$('.all_post').val(1);
	});
	$(".mx_button").click(function () {
		$(".filter-show").show();
	});
	$(".btn-apply").click(function () {
		$(".filter-show").hide();
	});
	
	/*$('.filter-show').blur(function() {
    $(this).hide();
});*/
	 // close modal on click outside at anywhere
  $(document).on('click',function(e){
    if(!(($(e.target).closest("#filter-showid").length > 0 ) || ($(e.target).closest(".mx_button").length > 0))){
    $("#filter-showid").hide();
   }
  });
	$("#list_view").click(function () {
		$("#list_view").addClass("orange");
		$("#grid_view").removeClass("orange");
		$("#list").show();
		$("#grid").hide();
	});
	$("#grid_view").click(function () {
		$("#grid_view").addClass("orange");
		$("#list_view").removeClass("orange");
		$("#list").hide();
		$("#grid").show();
	});
	
	$(document).on('click',"input[name='category_all']",function() {
		if($(this).is(':checked') == true){
			$("input[name='category[]']").each(function () {
					$(this).prop('checked',false);
			});
		}
	});
	$(document).on('click',"input[name='category[]']",function() {
		$("input[name='category_all']").prop('checked',false);	
	});
	
	$(document).on('click',"input[name='type_all']",function() {
		if($(this).is(':checked') == true){
			$("input[name='type[]']").each(function () {
					$(this).prop('checked',false);
			});
		}
	});
	$(document).on('click',"input[name='type[]']",function() {
		$("input[name='type_all']").prop('checked',false);	
	});
	
	$(document).on('click',"input[name='sponsors_all']",function() {
		if($(this).is(':checked') == true){
			$("input[name='sponsors[]']").each(function () {
					$(this).prop('checked',false);
			});
		}
	});
	$(document).on('click',"input[name='sponsors[]']",function() {
		$("input[name='sponsors_all']").prop('checked',false);	
	});
	
	function apply_filters(t,n){
			var activatelist = $(".orange").attr("id");
			var ttstartdate = $("#ttstartdate").val();
			var ttenddate = $("#ttenddate").val();
		    var getLayout = 2;
            var pagination_type = '';
            var jsonData = $('.am_ajax_post_grid_wrap').attr('data-am_ajax_post_grid');
            var args = JSON.parse(jsonData);
		    var flag = false;  
			var c_term = [];
			var t_term = [];
			var s_term = [];
			$("input[name='category[]']:checked").each(function () {
					c_term.push($(this).attr('data-id'));
			});
			$("input[name='type[]']:checked").each(function () {
					t_term.push($(this).attr('data-id'));
			});
			$("input[name='sponsors[]']:checked").each(function () {
					s_term.push($(this).attr('data-id'));
			});
            
            var data = {
                action: 'asr_filter_posts',
                asr_ajax_nonce: asr_ajax_params.asr_ajax_nonce,
				
				c_term_all:$("input[name='category_all']").prop('checked'),
				t_term_all:$("input[name='type_all']").prop('checked'),
				s_term_all:$("input[name='sponsors_all']").prop('checked'),
				c_term:c_term,
				t_term:t_term,
				s_term:s_term,
				allpost:$('.all_post').val(),
				
                term_ID: '',
                layout: (getLayout) ? getLayout : "1",
                jsonData: jsonData,
                pagination_type: pagination_type,
                loadMore: false,
				searchterm:$('#searchtitle').val(),
				//order:$('.sm_select').attr('id'),
// 				order:t,
				ttstartdate:ttstartdate,
				ttenddate:ttenddate,
				cur:n
				// orderby:$('.sm_select').val()
            }
			
	//console.log("datadatadatadata3 : ", data );
    		$.ajax({
				type: 'post',
    			url: asr_ajax_params.asr_ajax_url,
    			data: data,
    			beforeSend: function(data){
					$('.am_ajax_post_grid_wrap').find('.asr-loader').show();
    			},
    			complete: function(data){
                        $('.am_ajax_post_grid_wrap').find('.asr-loader').hide();
    			},
    			success: function(data){
					if(args.additional_class){
					$('.am_ajax_post_grid_wrap').find('.notouroff').hide().html(data).fadeIn(0, function() {
                        });
					}
					else{
						$('.am_ajax_post_grid_wrap').find('.asrafp-filter-result').hide().html(data).fadeIn(0, function() {
                        });
					}
					if(activatelist == 'list_view'){
						$("#list").show();
						$("#grid").hide();
					}else{
						$("#list").hide();
						$("#grid").show();
					}

                    flag = false;
                    $( window ).trigger('scroll');

                    $('.am_ajax_post_grid_wrap').find('.am_grid_col').slideDown();
                
    			},
    			error: function(data){
    				alert('Cannot load the Post Grid.');
    			},

    		});
	}
	$(document).on("click","#ttsbtn-apply",function() {
		   	  	  $('.all_post').val(0);
    	apply_filters();
	});
	$(document).on("keyup","#searchtitle",function() {
		var sr=$('#searchtitle').val();
		if( $(this).val().length >= 4) {
       // $(this).parents('p').addClass('warning');
       var title=$('#searchtitle').val();
			apply_filters();
			$("#warning").hide();
    }else if($(this).val().length < 4){
		//alert('failed');
		var txt="Please Enter Atleast 4 characters";
		$("#warning").text(txt);
		$("#warning").show();
		//apply_filters();
		if(sr.length==0){
			$("#warning").hide();
		var title =	$('.all_post').val();
			apply_filters();
		}
		
		/*else if(sr.length<4){
			$("#warning").show();
			$('.all_post').val();
			apply_filters();
		}*/
		//$('.all_post').val();
		//apply_filters();
	}
// 		if(sr.length>=4){}
		  
	});
	$(document).on("click",".sm_select",function() {
		var t = $(this).attr('id');
		var d = new Date();
    
  		var  n = d.getMonth()+1;
	
		console.log(n);
		  apply_filters(t,n)
	});
	
});
})(jQuery);


// Date picker
/*jQuery(function() {
  jQuery('input[name="ttstartdate"]').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'),10),
	  locale: {
		  format: 'DD/MM/YYYY'
	  }
  }, function(start, end, label) {
    var years = moment().diff(start, 'years');
//     alert("You are " + years + " years old!");
  });
});*/
jQuery(function() {

  jQuery('input[name="ttstartdate"]').daterangepicker({
	  singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'),10),
      autoUpdateInput: false,
	  autoApply:true,
      locale: {
          cancelLabel: 'Clear'
      }
  });

  jQuery('input[name="ttstartdate"]').on('apply.daterangepicker', function(ev, picker) {
      jQuery(this).val(picker.startDate.format('DD/MM/YYYY') );
  });

  jQuery('input[name="ttstartdate"]').on('cancel.daterangepicker', function(ev, picker) {
      jQuery(this).val('');
  });

});

// Date picker
/*jQuery(function() {
  jQuery('input[name="ttenddate"]').daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'),10),
	  locale: {
		  format: 'DD/MM/YYYY'
	  }
  }, function(start, end, label) {
    var years = moment().diff(start, 'years');
//     alert("You are " + years + " years old!");
  });
});*/
 
jQuery(function() {

  jQuery('input[name="ttenddate"]').daterangepicker({
	  singleDatePicker: true,
    showDropdowns: true,
    minYear: 1901,
    maxYear: parseInt(moment().format('YYYY'),10),
      autoUpdateInput: false,
	  autoApply:true,
      locale: {
          cancelLabel: 'Clear'
      }
  });

  jQuery('input[name="ttenddate"]').on('apply.daterangepicker', function(ev, picker) {
      jQuery(this).val(picker.endDate.format('DD/MM/YYYY') );
  });

  jQuery('input[name="ttenddate"]').on('cancel.daterangepicker', function(ev, picker) {
      jQuery(this).val('');
  });

});
// n =  new Date();
// y = n.getFullYear();
// m = n.getMonth() + 1;
// d = n.getDate();
// document.getElementById("ttstartdate").val = d + "/" + m + "/" + y;
// document.getElementById("ttenddate").val = d + "/" + m + "/" + y;