$(document).on("click", ".question_product,.faq_question,.custom_icons_faq_main .icons_with_text_item_title", function (e) {
  if (jQuery(this).hasClass("active")) {
    jQuery(this).toggleClass('active');
    jQuery(this).next().slideToggle();
  } else {
    jQuery('.question_product,.faq_question,.custom_icons_faq_main .icons_with_text_item_title').removeClass('active');
    jQuery('.question_product,.faq_question,.custom_icons_faq_main .icons_with_text_item_title').next().slideUp();
    jQuery(this).toggleClass('active');
    jQuery(this).next().slideToggle();
  }
});



$(document).on("click", "a[href='#customize']", function (e) {
  e.preventDefault();
  $(this).toggleClass('active');
    jQuery('.customize_quantity').slideToggle();
});



 $(document).on("click", ".custom_button", function (e) {
     var video = jQuery(this).parents('.video_wrapper_custom').find('video');
 if (jQuery(this).hasClass("active")) {
    jQuery(this).parents('.video_wrapper_custom').removeClass('video-active');
     jQuery(this).removeClass('active');
 video.trigger('pause');
 } else {
 video.trigger('play');
   jQuery(this).parents('.video_wrapper_custom').addClass('video-active');
     jQuery(this).addClass('active');
 }
 });







$(document).on("click", "a[href='#compare']", function (e) {
  e.preventDefault();
  document.querySelector('#compare').scrollIntoView({
    behavior: 'smooth'
  })
});

$(document).on("click", "a[href='#reviews']", function (e) {
  e.preventDefault();
  document.querySelector('#judgeme_product_reviews').scrollIntoView({
    behavior: 'smooth'
  })
});

$(document).on("click", "a[href='#faq']", function (e) {
  e.preventDefault();
  document.querySelector('#faq').scrollIntoView({
    behavior: 'smooth'
  })
});

$(document).on("click", "a[href='#']", function (e) {
  e.preventDefault();
  document.querySelector('.landing_page_product').scrollIntoView({
    behavior: 'smooth'
  })
});



jQuery(document).ready(function(){
if(navigator.userAgent.indexOf('Mac') > 0) {
jQuery('body').addClass('mac-os');
} else {
jQuery('body').addClass('window-os');
}
});

function isAtViewportMidline(el) {
  if (!el || !el.getBoundingClientRect) return false;
  if (!$(el).is(':visible')) return false;

  const rect = el.getBoundingClientRect();
  const vw = window.innerWidth || document.documentElement.clientWidth;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const midY = vh / 2;

  // horizontally on-screen AND the element spans the middle line
  return rect.left < vw && rect.right > 0 && rect.top < midY && rect.bottom > midY;
}

function runCounters($block) {
  $block.addClass('start_count');
  $block.find('.count_js').each(function () {
    const $c = $(this);
    const target = +($c.data('value') || 0);
    $c.prop('Counter', 0).stop(true).animate(
      { Counter: target },
      {
        duration: 2000,
        easing: 'swing',
        step: function (now) { $c.text(Math.ceil(now)); }
      }
    );
  });
}

function checkCountersInView() {
  $('.custom_counter .icons_with_text_flex').each(function () {
    const $block = $(this);
    if ($block.hasClass('start_count')) return;          // only once
    if (isAtViewportMidline(this)) runCounters($block); // trigger when truly visible
  });
}

$(window).on('scroll load', checkCountersInView);




$(document).on("click", ".tab_item_pdp", function (e) {
var data_tab = $(this).attr('data_tab');
$('.tab_item_pdp').removeClass('active');
$(this).addClass('active');
$('.tab_content_pdp').hide();
$('.tab_content_pdp[data_tab="'+data_tab+'"]').show();
});


$(document).on("click", '.product_slider_custom_slider_button a.custom_hk_button, .ajax_add_cart ', function(e) {
 e.preventDefault(); 
var this_element =  jQuery(this);
this_element.addClass('loading_hk');
var id = jQuery(this).attr('variant_id');
jQuery.ajax({
type: 'POST',
url: '/cart/add.js',
data: {
  quantity: 1,
  id: id
},
  dataType: 'json', 
 success: function (data) { 
    $.get(window.location.pathname, function (res) {
      var $new = $(res).find('#cart_drawer_content');
      $('#cart_drawer_content').replaceWith($new);
         // Update cart count
      const $newCartCount = $(res).find('.cart_count_js');
      const cartCount = parseInt($newCartCount.text().trim(), 10);
      
      if (cartCount > 0) {
        $('.cart_count_js').text(cartCount).show();
      } else {
        $('.cart_count_js').text('').hide();
      }
      $('#cart-drawer').removeClass('is_empty').addClass('open');
      $('.custom_overlay2').addClass('active');
      this_element.removeClass('loading_hk');
    });
 } 
 });
  });



   $(window).scroll(function(){
      if ($(this).scrollTop() > 30) {
         $('body').addClass('remove_transparent');
      } else {
         $('body').removeClass('remove_transparent');
      }
  });


  function isScrolledIntoView2(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
docViewBottom = docViewBottom-($(window).height()/2)+($(elem).height())+100;
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom));
}

$(window).scroll(function () {
    $('.pp1_result_list1 .icons_with_text_flex .icons_with_text_item').each(function () {
        if (isScrolledIntoView2(this) === true) {
            $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
    });
});


$(document).on("click", '.custom_ajax_atc', function(e) {
  e.preventDefault();
  var $btn = $(this).addClass('loading_hk'),
      id = $btn.attr('variant_id'),
      quantity = $btn.attr('quantity'),
      selling_plan = $btn.attr('selling_plan'),
      data = { id: id, quantity: quantity };

  if (selling_plan) data.selling_plan = selling_plan;

  $.post('/cart/add.js', data, function () {
    $.get(window.location.pathname, function (res) {
      var $new = $(res).find('#cart_drawer_content');
      $('#cart_drawer_content').replaceWith($new);
         // Update cart count
      const $newCartCount = $(res).find('.cart_count_js');
      const cartCount = parseInt($newCartCount.text().trim(), 10);
      
      if (cartCount > 0) {
        $('.cart_count_js').text(cartCount).show();
      } else {
        $('.cart_count_js').text('').hide();
      }
      $('#cart-drawer').removeClass('is_empty').addClass('open');
      $('.custom_overlay2').addClass('active');
      $btn.removeClass('loading_hk');
    });
  }, 'json');
});



$(document).on("click", ".tab_item", function (e) {
var data_tab = $(this).attr('data_tab');
var slider_index = parseInt(data_tab)-1;
$('.tab_item').removeClass('active');
$(this).addClass('active');
$('.tabs_slider_main.slick-slider').slick('slickGoTo', slider_index);
});




$(document).on("click", ".trigger_tabs_item", function (e) {
var data_tab = $(this).attr('data_tab');
var slider_index = parseInt(data_tab)-1;
$('.tab_item').removeClass('active');
$(this).addClass('active');
$('.richtext_main_slider.slick-slider').slick('slickGoTo', slider_index);
});


$(window).on('scroll', function() {
  const section = $('.hp_better_list1');
  const container = $('.custom_abs_img_ingredients');
  const img = container.find('img');

  if (section.length === 0 || container.length === 0) return;

  const sectionTop = section.offset().top;
  const sectionHeight = section.outerHeight();
  const scrollTop = $(window).scrollTop();
  const windowHeight = $(window).height();

  // Only run while the section is visible
  if (scrollTop + windowHeight > sectionTop && scrollTop < sectionTop + sectionHeight) {
    // Calculate scroll progress (0 → 1)
    const progress = (scrollTop + windowHeight - sectionTop) / (sectionHeight + windowHeight);
    
    // Clamp between 0 and 1
    const clamped = Math.max(0, Math.min(1, progress));

    // Interpolate between bottomStart and bottomEnd
    const bottomStart = sectionHeight - 238; // corresponds to calc(100% - 238px)
    const bottomEnd = 0;
    const currentBottom = bottomStart - (bottomStart - bottomEnd) * clamped;

    // Apply to image
    img.css('bottom', currentBottom + 'px');
  }
});



$(window).on('load', function () {
$('.tabs_slider_main.slick-slider').on('afterChange', function(event, slick, currentSlide) {
  $('.tab_item').removeClass('active');
  var tabIndex = currentSlide + 1; // 1-based
  var $match = $('.tab_item[data_tab="'+ tabIndex +'"]');
  if ($match.length) {
    $match.addClass('active');
    return;
  }

  $('.tab_item').eq(currentSlide).addClass('active');
});

$('.richtext_main_slider.slick-slider').on('afterChange', function(event, slick, currentSlide) {
  $('.trigger_tabs_item').removeClass('active');
  var tabIndex = currentSlide + 1; // 1-based
  var $match = $('.trigger_tabs_item[data_tab="'+ tabIndex +'"]');
  if ($match.length) {
    $match.addClass('active');
    return;
  }

  $('.tab_item').eq(currentSlide).addClass('active');
});
 });





