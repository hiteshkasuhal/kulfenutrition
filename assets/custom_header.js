$(document).on("click", "#drawer-toggle", function (e) {
      $('#menu-drawer').addClass('open');
      $('.custom_overlay').addClass('active');
    });
$(document).on("click", "#drawer-close", function (e) {
      $('#menu-drawer').removeClass('open');
      $('.custom_overlay').removeClass('active');
    });

    // Optional: Close on clicking outside
$(document).on("click", function (e) {
      if (!$(e.target).closest('#menu-drawer, #drawer-toggle').length) {
        $('#menu-drawer').removeClass('open');
      $('.custom_overlay').removeClass('active');
      }
    });

// Toggle drawer
$(document).on("click", "#cart-toggle", function (e) {
      //$('#cart-drawer').addClass('open');
      //$('.custom_overlay2').addClass('active');
      window.upcartOpenCart();
    });

$(document).on("click", "#cart-close,.cart_empty_button", function (e) {
      $('#cart-drawer').removeClass('open');
      $('.custom_overlay2').removeClass('active');
    });

    // Optional: Click outside to close
    $(document).on('click', function (e) {
      if (!$(e.target).closest('#cart-drawer, #cart-toggle').length) {
        $('#cart-drawer').removeClass('open');
      $('.custom_overlay2').removeClass('active');
      }
    });




  function refreshCartDrawer() {
    $.ajax({
      url: window.location.pathname, // reload current page
      type: 'GET',
      dataType: 'html',
      success: function (data) {
        const $newDrawer = $(data).find('#cart_drawer_content');
        $('#cart_drawer_content').replaceWith($newDrawer);
         // Update cart count
      const $newCartCount = $(data).find('.cart_count_js');
      const cartCount = parseInt($newCartCount.text().trim(), 10);
      
      if (cartCount > 0) {
        $('.cart_count_js').text(cartCount).show();
      } else {
        $('.cart_count_js').text('').hide();
      }
      }
    });
  }


 function updateCart(variantId, quantity, key, sellingPlan = null) {
    const payload = {
      id: key,
      quantity: quantity
    };

    if (sellingPlan) {
      payload.selling_plan = sellingPlan;
    }

    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      data: JSON.stringify(payload),
      dataType: 'json',
      contentType: 'application/json',
      success: function () {
        refreshCartDrawer();
      },
      error: function (xhr) {
        console.error('Cart update failed:', xhr);
      }
    });
  }

 


// Plus
$(document).on('click', '.quantity_plus', function () {
  $('div#cart_drawer_content').addClass('loading_hk');
  const $wrap = $(this).closest('.cart_quantity_wrapper');
  const $real = $wrap.find('input[name="quantity_single"]');
  const $fake = $wrap.find('.fake_quantity_display');

  let realQty = parseInt($real.val());
  let fakeQty = parseInt($fake.val());

  realQty++;
  fakeQty++;

  $real.val(realQty);
  $fake.val(fakeQty);

  updateCart($real.attr('variant_id'), realQty, $real.attr('key'), $real.attr('selling_plan') || null);
});

// Minus
$(document).on('click', '.quantity_minus', function () {
  $('div#cart_drawer_content').addClass('loading_hk');
  const $wrap = $(this).closest('.cart_quantity_wrapper');
  const $real = $wrap.find('input[name="quantity_single"]');
  const $fake = $wrap.find('.fake_quantity_display');

  let realQty = parseInt($real.val());
  let fakeQty = parseInt($fake.val());

  if (realQty <= 0) return;

  realQty--;
  fakeQty--;

  $real.val(realQty);
  $fake.val(fakeQty);

  updateCart($real.attr('variant_id'), realQty, $real.attr('key'), $real.attr('selling_plan') || null);
});

$(document).on("change", ".recommended_product_quantity select", function (e) {
  var quantity = $(this).val();
$(this).parents('.recommended_product_bottom_flex').find('.recommended_product_button').attr('quantity',quantity);
});
  
$(document).on("click", ".recommended_product_button", function (e) {
  e.preventDefault();
  var $btn = $(this).addClass("loading_hk"),
      id = $btn.attr("variant_id"),
      quantity = $btn.attr("quantity");

  $.post("/cart/add.js", { id, quantity }, function () {
    $.get(window.location.pathname, function (res) {
      var $newContent = $(res).find("#cart_drawer_content");
      $("#cart_drawer_content").replaceWith($newContent);
      $("#cart-drawer").removeClass("is_empty").addClass("open");
      $btn.removeClass("loading_hk");
    });
  }, "json");
});


$(document).on('click', '.cart_item_single_right_remove', function () {
  const $btn    = $(this);
  const $drawer = $('#cart_drawer_content').addClass('loading_hk');
  const variantId = $btn.attr('variant_id'); // you said this is correct

  $btn.prop('disabled', true);

  removeVariantEverywhere(variantId, 6)
    .done(function (cart) {
      if (typeof refreshCartDrawer === 'function') refreshCartDrawer(cart);
    })
    .fail(function (xhr) {
      console.error('Remove loop failed:', xhr?.responseText || xhr);
    })
    .always(function () {
      $drawer.removeClass('loading_hk');
      $btn.prop('disabled', false);
    });
});
// Remove all split lines for a variant by repeating update→check
function removeVariantEverywhere(variantId, maxTries = 5) {
  const dfd = $.Deferred();
  let tries = 0;

  function step() {
    tries++;

    // 1) Force total qty for this variant to 0
    $.ajax({
      type: 'POST',
      url: '/cart/update.js',
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json',
      data: JSON.stringify({ updates: { [variantId]: 0 } })
    })
    .done(function () {
      // 2) Check if any split lines with same variant still exist
      $.getJSON('/cart.js')
        .done(function (cart) {
          const stillThere = cart.items.some(it => String(it.id) === String(variantId));
          if (stillThere && tries < maxTries) {
            // keep trying until all lines are gone or we hit maxTries
            step();
          } else {
            dfd.resolve(cart);
          }
        })
        .fail(dfd.reject);
    })
    .fail(dfd.reject);
  }

  step();
  return dfd.promise();
}
function updateVh() {
  document.documentElement.style.setProperty('--real-vh', `${window.innerHeight}px`);
}
window.addEventListener('resize', updateVh);
window.addEventListener('load', updateVh);

  
  

$(document).on("click", '.search_trigger_button', function (e) {
var text = $(this).prev().val();
text = text.trim();
text = text.replace(" ", "+");
var link = '/search';
var new_link = link+'?q='+text;
  location.href=new_link;
});
