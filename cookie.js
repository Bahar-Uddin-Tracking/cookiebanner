const event_prefix = "ss_";
const dataLayerEnable = true;
const GTM_container_url = 'https://www.googletagmanager.com';
const GTM_container_id = 'GTM-TXTL27KS';
    // tag manager 
    (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = GTM_container_url + '/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', GTM_container_id);

if(!dataLayerEnable) return;
window.dataLayer = window.dataLayer || [],
window.dataLayer.push({
  event: event_prefix + "context_data",
  window_data: {
  page_location: init.context.document.location.href,
  page_referrer: init.context.document.referrer,
  page_title: init.context.document.title,
  page_path: init.context.document.location.pathname
}
});

//Mention the ad platform you want to track in the below array.Example - ['Facebook','Snapchat'...]
var trackingPlatform = ["Facebook"];
var page_view_fired = false,
  checkout_contact_info_submitted_fired = false,
  checkout_address_info_submitted_fired = false,
  checkout_shipping_info_submitted_fired = false,
  customerData = {};

function contextData() {
  let t, e, a;
  for (let d = 0; d < window.dataLayer.length; d++)
    if ("context_data" === window.dataLayer[d].event) {
      delete (a = JSON.parse(JSON.stringify(e = window.dataLayer[d])))["gtm.uniqueEventId"],
      delete a.event,
      t = a;
      break
    }
  return t
}
analytics.subscribe("page_viewed", t => {
  if (!page_view_fired) {
    var e = contextData() || {},
      a = {
        event: event_prefix + "page_view",
        client_id: t.clientId,
        event_time: t.timestamp,
        event_time_seconds: Math.round(new Date(t.timestamp) / 1e3)
      };
    window.dataLayer.push({ ...a, ...e })
  }
  page_view_fired = !0
});

analytics.subscribe('clicked', (event) => {
  const element = event.data.element;
  const elementId = element.id;
  const elementValue = element.value;
  const elementHref = element.href;

  const payload = {
    event_name: event.name,
    click_data: {
      id: elementId,
      value: elementValue,
      url: elementHref,
    }
  };
window.dataLayer.push({
  event: "click",
  click_data: payload.click_data
});  
});

analytics.subscribe("collection_viewed", (event) => {
var products = event.data.collection.productVariants;
var itemsArray = [];
var currency = event.data.collection.productVariants[0].price.currencyCode;

for (var i = 0; i < products.length; i++) {
  var item_variant = products[i].id;
  var item_id = products[i].product.id;
  var item_name = products[i].product.title;
  var item_category = products[i].product.type;
  var item_brand = products[i].product.vendor;
  var price = products[i].price.amount;
  var quantity = 1;

  var productObject = {
    item_id: item_id,
    item_variant: item_variant,
    item_name: item_name,
    item_category: item_category,
    item_brand: item_brand,
    item_delivery: 'in_store',
    price: price,
    quantity: quantity
  };

  itemsArray.push(productObject);
}

var quantityFromArray = itemsArray;
var quantityInitialValue = 0;
var totalQuantity = quantityFromArray.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue.quantity;
}, quantityInitialValue);

var priceFromArray = itemsArray;
var priceInitialValue = 0;
var total = priceFromArray.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue.price;
}, priceInitialValue);

var countryCode = currency || 'US';
var gadsItems = itemsArray.map(function(product) {
  return {
    id: 'shopify_' + countryCode + '_' + product.item_id + '_' + product.item_variant,
    google_business_vertical: 'retail'
  };
});

var contentId = itemsArray.map(function(product) {
  return product.item_id;
}).length === 1 ? itemsArray[0].item_id : itemsArray.map(product => product.item_id);

var contentName = itemsArray.map(function(product) {
  return product.item_name;
}).length === 1 ? itemsArray[0].item_name : itemsArray.map(product => product.item_name);

var uniqueCategories = [...new Set(itemsArray.map(product => product.item_category))];
var contentCategory = uniqueCategories.length === 1 ? uniqueCategories[0] : uniqueCategories.join(', ');

  // Facebook schema data
var fbItems = itemsArray.map(function(product) {
  return {
    id: product.item_id,
    item_price: product.price,
    delivery_category: product.item_delivery,
    quantity: product.quantity || 1
  };
});
  
// Tiktok contents build-up
var tiktokItems = itemsArray.map(function(product) {
  return {
    content_id: product.item_id,
    content_name: product.item_name,
    content_category: product.item_category,
    brand: product.item_brand,
    price: product.price,
    quantity: product.quantity || 1
  };
});

// Pinterest contents array build-up
var pinterestItems = itemsArray.map(function(product) {
  return {
    product_id: product.item_id,
    product_name: product.item_name,
    product_price: product.price,
    product_brand: product.item_brand,
    product_quantity: product.quantity || 1,
    product_category: product.item_category,
  };
})
  

window.dataLayer.push({
  event: event_prefix + 'view_item_list',
  client_id: event.clientId,
  event_id: event.id,
  time_stamp: event.timestamp,
  time_stamp_unix: Math.round(new Date(event.timestamp).getTime() / 1000), 
  page_location: event.context.document.location.href,
  page_path: event.context.document.location.pathname,
  page_hostname: event.context.document.location.hostname,
    ecommerce: {
    value: total,
    currency: currency,
    items: itemsArray
  },
  google_ads: {
    remarketing: gadsItems
  },
  facebook: {
    content_type: 'product_group',
    content_ids: contentId,
    content_name: contentName,
    content_category: contentCategory,
    value: total,
    currency: currency,
    num_items: totalQuantity,
    contents: fbItems
  },
  tiktok: {
    content_type: 'product_group',
    content_id: contentId,
    content_name: contentName,
    content_category: contentCategory,
    value: total,
    currency: currency,
    quantity: totalQuantity,
    contents: tiktokItems
  },
  pinterest: {
    product_ids: contentId,
    product_names: contentName,
    value: total,
    product_quantity: totalQuantity,
    product_category: contentCategory,
    line_items: pinterestItems
  },
  snapchat: {
    item_ids: contentId,
    item_category: contentCategory,
    price: total,
    number_items: totalQuantity
  }
  });  
});

analytics.subscribe("product_viewed", t => {
  var e = contextData() || {},
    a = {
      event: event_prefix + "view_item",
      client_id: t.clientId,
      event_time: t.timestamp,
      event_time_seconds: Math.round(new Date(t.timestamp) / 1e3),
      product_variant_id: [t.data.productVariant.id],
      product_sku: [t.data.productVariant.sku],
      ecommerce: {
        currency: t.data.productVariant.price.currencyCode,
        value: t.data.productVariant.price.amount,
        items: [{
          item_id: t.data.productVariant.product.id,
          item_name: t.data.productVariant.product.title,
          item_brand: t.data.productVariant.product.vendor,
          item_category: t.data.productVariant.product.type,
          item_variant: t.data.productVariant.title ? t.data.productVariant.title : "",
          price: t.data.productVariant.price.amount,
          quantity: 1,
        }]
      }
    };
  trackingPlatform.filter(t => t.toLowerCase().includes("pinterest")).length > 0 && (a.pt_browser_side = {
    value: t.data.productVariant.price.amount,
    order_quantity: 1,
    currency: t.data.productVariant.price.currencyCode,
    line_items: [{
      product_name: t.data.productVariant.product.title,
      product_id: t.data.productVariant.product.id,
      product_variant_id: t.data.productVariant.id,
      product_category: t.data.productVariant.product.type,
      product_brand: t.data.productVariant.product.vendor ? t.data.productVariant.product.vendor : "",
      product_price: t.data.productVariant.price.amount,
      product_quantity: 1,
    }, ]
  }), trackingPlatform.filter(t => t.toLowerCase().includes("snapchat")).length > 0 && (a.snap_browser_side = {
    price: t.data.productVariant.price.amount,
    currency: t.data.productVariant.price.currencyCode,
    item_ids: [t.data.productVariant.product.id],
    item_category: t.data.productVariant.product.type,
    brands: [t.data.productVariant.product.vendor].includes("") ? "" : [t.data.productVariant.product.vendor]
  }), trackingPlatform.filter(t => t.toLowerCase().includes("facebook")).length > 0 && (a.fb_browser_side = {
    content_ids: [t.data.productVariant.product.id],
    content_category: t.data.productVariant.product.type,
    content_name: t.data.productVariant.product.title,
    content_type: "product",
    contents: [{
      id: t.data.productVariant.product.id,
      quantity: 1,
      item_price: t.data.productVariant.price.amount
    }],
    currency: t.data.productVariant.price.currencyCode,
    value: t.data.productVariant.price.amount
  }), window.dataLayer.push({ ...a, ...e })
});

analytics.subscribe('search_submitted', (s) => {
  const searchResult = s.data.searchResult;
  const searchQuery = searchResult.query;
  const firstProductReturnedFromSearch =
  searchResult.productVariants[0]?.product.title;
  const payload = {
      event_name: event_prefix + 'product_search',
      searchData: {
      searchQuery: searchQuery,
      firstProductTitle: firstProductReturnedFromSearch,
      }
  };
  dataLayer.push({ event: payload.event_name, search_data: payload.searchData });
  
});

analytics.subscribe("product_added_to_cart", t => {
  var e = contextData() || {},
    a = {
      event: event_prefix + "add_to_cart",
      client_id: t.clientId,
      event_time: t.timestamp,
      event_time_seconds: Math.round(new Date(t.timestamp) / 1e3),
      product_variant_id: [t.data.cartLine.merchandise.id],
      product_sku: [t.data.cartLine.merchandise.sku],
      ecommerce: {
        currency: t.data.cartLine.cost.totalAmount.currencyCode,
        value: t.data.cartLine.cost.totalAmount.amount,
        items: [{
          item_id: t.data.cartLine.merchandise.product.id,
          item_name: t.data.cartLine.merchandise.product.title,
          item_brand: t.data.cartLine.merchandise.product.vendor,
          item_category: t.data.cartLine.merchandise.product.type,
          item_variant: t.data.cartLine.merchandise.title ? t.data.cartLine.merchandise.title : "",
          price: t.data.cartLine.merchandise.price.amount,
          quantity: t.data.cartLine.quantity,
        }]
      },
        remarketing: {
        id: 'shopify_' + t.data.cartLine.cost.totalAmount.currencyCode + '_' + t.data.cartLine.merchandise.product.id + '_' + t.data.cartLine.merchandise.id,
    google_business_vertical: 'retail'
      }
    };
  trackingPlatform.filter(t => t.toLowerCase().includes("facebook")).length > 0 && (a.fb_browser_side = {
    content_ids: [t.data.cartLine.merchandise.product.id],
    content_category: t.data.cartLine.merchandise.product.type,
    content_name: t.data.cartLine.merchandise.product.title,
    content_type: "product",
    contents: [{
      id: t.data.cartLine.merchandise.product.id,
      quantity: t.data.cartLine.quantity,
      item_price: t.data.cartLine.merchandise.price.amount
    }, ],
    currency: t.data.cartLine.cost.totalAmount.currencyCode,
    value: t.data.cartLine.cost.totalAmount.amount
  }), trackingPlatform.filter(t => t.toLowerCase().includes("pinterest")).length > 0 && (a.pt_browser_side = {
    value: t.data.cartLine.cost.totalAmount.amount,
    order_quantity: t.data.cartLine.quantity,
    currency: t.data.cartLine.cost.totalAmount.currencyCode,
    line_items: [{
      product_name: t.data.cartLine.merchandise.product.title,
      product_id: t.data.cartLine.merchandise.product.id,
      product_variant_id: t.data.cartLine.merchandise.id,
      product_category: t.data.cartLine.merchandise.product.type,
      product_brand: t.data.cartLine.merchandise.product.vendor ? t.data.cartLine.merchandise.product.vendor : "",
      product_price: t.data.cartLine.merchandise.price.amount,
      product_quantity: t.data.cartLine.quantity,
    }, ]
  }), trackingPlatform.filter(t => t.toLowerCase().includes("snapchat")).length > 0 && (a.snap_browser_side = {
    price: t.data.cartLine.cost.totalAmount.amount,
    currency: t.data.cartLine.cost.totalAmount.currencyCode,
    item_ids: [t.data.cartLine.merchandise.product.id],
    item_category: t.data.cartLine.merchandise.product.type,
    brands: [t.data.cartLine.merchandise.product.vendor].includes("") ? "" : [t.data.cartLine.merchandise.product.vendor]
  }), window.dataLayer.push({ ...a, ...e })
}), analytics.subscribe("product_removed_from_cart", t => {
  var e = contextData() || {},
    a = {
      event: event_prefix + "remove_from_cart",
      client_id: t.clientId,
      event_time: t.timestamp,
      event_time_seconds: Math.round(new Date(t.timestamp) / 1e3),
      product_variant_id: [t.data.cartLine.merchandise.id],
      product_sku: [t.data.cartLine.merchandise.sku],
      ecommerce: {
        currency: t.data.cartLine.cost.totalAmount.currencyCode,
        value: t.data.cartLine.cost.totalAmount.amount,
        items: [{
          item_id: t.data.cartLine.merchandise.product.id,
          item_name: t.data.cartLine.merchandise.product.title ? t.data.cartLine.merchandise.product.title : t.data.cartLine.merchandise.product.untranslatedTitle,
          item_brand: t.data.cartLine.merchandise.product.vendor,
          item_category: t.data.cartLine.merchandise.product.type,
          item_variant: t.data.cartLine.merchandise.title ? t.data.cartLine.merchandise.title : "",
          price: t.data.cartLine.merchandise.price.amount,
          quantity: t.data.cartLine.quantity,
        }, ]
      }
    };
  trackingPlatform.filter(t => t.toLowerCase().includes("facebook")).length > 0 && (a.fb_browser_side = {
    content_ids: [t.data.cartLine.merchandise.product.id],
    content_category: t.data.cartLine.merchandise.product.type,
    content_name: t.data.cartLine.merchandise.product.title ? t.data.cartLine.merchandise.product.title : t.data.cartLine.merchandise.product.untranslatedTitle,
    content_type: "product",
    contents: [{
      id: t.data.cartLine.merchandise.product.id,
      quantity: t.data.cartLine.quantity,
      item_price: t.data.cartLine.merchandise.price.amount
    }, ],
    currency: t.data.cartLine.cost.totalAmount.currencyCode,
    value: t.data.cartLine.cost.totalAmount.amount
  }), trackingPlatform.filter(t => t.toLowerCase().includes("pinterest")).length > 0 && (a.pt_browser_side = {
    value: t.data.cartLine.cost.totalAmount.amount,
    order_quantity: t.data.cartLine.quantity,
    currency: t.data.cartLine.cost.totalAmount.currencyCode,
    line_items: [{
      product_name: t.data.cartLine.merchandise.product.title ? t.data.cartLine.merchandise.product.title : t.data.cartLine.merchandise.product.untranslatedTitle,
      product_id: t.data.cartLine.merchandise.product.id,
      product_variant_id: t.data.cartLine.merchandise.id,
      product_category: t.data.cartLine.merchandise.product.type,
      product_brand: t.data.cartLine.merchandise.product.vendor ? t.data.cartLine.merchandise.product.vendor : "",
      product_price: t.data.cartLine.merchandise.price.amount,
      product_quantity: t.data.cartLine.quantity,
    }, ]
  }), trackingPlatform.filter(t => t.toLowerCase().includes("snapchat")).length > 0 && (a.snap_browser_side = {
    price: t.data.cartLine.cost.totalAmount.amount,
    currency: t.data.cartLine.cost.totalAmount.currencyCode,
    item_ids: [t.data.cartLine.merchandise.product.id],
    item_category: t.data.cartLine.merchandise.product.type,
    brands: [t.data.cartLine.merchandise.product.vendor].includes("") ? "" : [t.data.cartLine.merchandise.product.vendor]
  }), window.dataLayer.push({ ...a, ...e })
});
analytics.subscribe("cart_viewed", t => {
  var e, a, d, c, i, r, o, n, s, u = contextData() || {},
    p = {};
  if (t.data.cart) {
    var h = t.data.cart.lines,
      l = h.map(t => {
        var e;
        return {
          item_id: t.merchandise.product.id,
          item_name: t.merchandise.product.title,
          item_brand: t.merchandise.product.vendor,
          item_category: t.merchandise.product.type,
          item_variant: t.merchandise.title ? t.merchandise.title : "",
          price: t.merchandise.price.amount,
          quantity: t.quantity
        }
      });
    r = h.map(t => {
      var e;
      return {
        product_id: t.merchandise.product.id,
        product_name: t.merchandise.product.title,
        product_variant_id: t.merchandise.id,
        product_brand: t.merchandise.product.vendor ? t.merchandise.product.vendor : "",
        product_category: t.merchandise.product.type,
        product_price: t.merchandise.price.amount,
        product_quantity: t.quantity
      }
    }), s = h.map(t => t.merchandise.sku), n = h.map(t => t.merchandise.id), a = h.map(t => t.merchandise.product.id), d = h.map(t => t.merchandise.product.type).includes("") ? "" : h.map(t => t.merchandise.product.type).join(), o = h.map(t => t.merchandise.product.vendor ? t.merchandise.product.vendor : "").includes("") ? "" : h.map(t => t.merchandise.product.vendor), c = h.map(t => t.merchandise.product.title).join(), i = h.map(t => {
      var e;
      return {
        id: t.merchandise.product.id,
        quantity: t.quantity,
        item_price: t.merchandise.price.amount
      }
    }), p.currency = t.data.cart.cost.totalAmount.currencyCode, p.value = t.data.cart.cost.totalAmount.amount, p.items = l
  }
  e = {
    event: event_prefix + "view_cart",
    client_id: t.clientId,
    event_time: t.timestamp,
    event_time_seconds: Math.round(new Date(t.timestamp) / 1e3),
    product_variant_id: n,
    product_sku: s,
    totalItemQuantity: t.data.cart.totalQuantity,
    ecommerce: p
  }, trackingPlatform.filter(t => t.toLowerCase().includes("facebook")).length > 0 && (e.fb_browser_side = {
    content_ids: a,
    content_category: d,
    content_name: c,
    content_type: "product",
    contents: i,
    currency: t.data.cart.cost.totalAmount.currencyCode,
    value: t.data.cart.cost.totalAmount.amount,
    num_items: t.data.cart.totalQuantity
  }), trackingPlatform.filter(t => t.toLowerCase().includes("pinterest")).length > 0 && (e.pt_browser_side = {
    value: t.data.cart.cost.totalAmount.amount,
    order_quantity: t.data.cart.totalQuantity,
    currency: t.data.cart.cost.totalAmount.currencyCode,
    line_items: r
  }), trackingPlatform.filter(t => t.toLowerCase().includes("snapchat")).length > 0 && (e.snap_browser_side = {
    price: t.data.cart.cost.totalAmount.amount,
    currency: t.data.cart.cost.totalAmount.currencyCode,
    item_ids: a,
    item_category: d,
    brands: o,
    number_items: t.data.cart.totalQuantity
  }), window.dataLayer.push({ ...e, ...u })
});
analytics.subscribe("checkout_started", t => {
  console.log(t);
  var e, a, d, c, i, r, o, n, s, u, p = contextData() || {},
    h = {};
  if (null !== t.data.checkout) {
    var l = t.data.checkout.lineItems,
      m = l.map(t => {
        var e;
        return {
          item_id: t.variant.product.id,
          item_name: t.variant.product.title,
          item_brand: t.variant.product.vendor,
          item_category: t.variant.product.type,
          item_variant: t.variant.title ? t.variant.title : "",
          price: t.variant.price.amount,
          coupon: t.discountAllocations.length > 0 ? t.discountAllocations[0].discountApplication.title : "",
          quantity: t.quantity
        }
      });
    o = l.map(t => {
      var e;
      return {
        product_id: t.variant.product.id,
        product_name: t.variant.product.title,
        product_variant_id: t.variant.id,
        product_brand: t.variant.product.vendor ? t.variant.product.vendor : "",
        product_category: t.variant.product.type,
        product_price: t.variant.price.amount,
        product_quantity: t.quantity
      }
    }), u = l.map(t => void 0 === t.variant.sku ? "" : t.variant.sku), s = l.map(t => t.variant.id), a = l.map(t => t.variant.product.id), d = l.map(t => t.variant.product.type).includes("") ? "" : l.map(t => t.variant.product.type).join(), n = l.map(t => t.variant.product.vendor ? t.variant.product.vendor : "").includes("") ? "" : l.map(t => t.variant.product.vendor), c = l.map(t => t.variant.product.title).join(), i = l.map(t => {
      var e;
      return {
        id: t.variant.product.id,
        quantity: t.quantity,
        item_price: t.variant.price.amount
      }
    }), r = l.reduce((t, e) => t += e.quantity, 0), h.currency = t.data.checkout.currencyCode, h.value = t.data.checkout.totalPrice.amount, h.coupon = t.data.checkout.discountApplications.length > 0 ? t.data.checkout.discountApplications[0].title : "", h.items = m
  }
  e = {
    event: event_prefix + "begin_checkout",
    client_id: t.clientId,
    event_time: t.timestamp,
    event_time_seconds: Math.round(new Date(t.timestamp) / 1e3),
    product_variant_id: s,
    product_sku: u,
    itemTotalQuantity: r,
    total_tax: t.data.checkout.totalTax.amount,
    subTotal_price: t.data.checkout.subtotalPrice.amount,
    ecommerce: h,
    remarketing: {
    id: 'shopify_' + h.currency + '_' + a, google_business_vertical: 'retail'
  }
}; trackingPlatform.filter(t => t.toLowerCase().includes("facebook")).length > 0 && (e.fb_browser_side = {
    content_ids: a,
    content_category: d,
    content_name: c,
    content_type: "product",
    contents: i,
    currency: t.data.checkout.currencyCode,
    value: t.data.checkout.totalPrice.amount,
    num_items: r
  }), trackingPlatform.filter(t => t.toLowerCase().includes("pinterest")).length > 0 && (e.pt_browser_side = {
    value: t.data.checkout.totalPrice.amount,
    order_quantity: r,
    currency: t.data.checkout.currencyCode,
    line_items: o
  }), trackingPlatform.filter(t => t.toLowerCase().includes("snapchat")).length > 0 && (e.snap_browser_side = {
    price: t.data.checkout.totalPrice.amount,
    currency: t.data.checkout.currencyCode,
    item_ids: a,
    item_category: d,
    brands: n,
    number_items: r,
    payment_info_available: 1
  }), window.dataLayer.push({ ...e, ...p })
});
analytics.subscribe("checkout_contact_info_submitted", t => {
  if (!checkout_contact_info_submitted_fired) {
    var e, a, d, c, i, r, o, n, s, u, p = contextData() || {},
      h = {};
    if (null !== t.data.checkout) {
      var l = t.data.checkout.lineItems,
        m = l.map(t => {
          var e;
          return {
            item_id: t.variant.product.id,
            item_name: t.variant.product.title,
            item_brand: t.variant.product.vendor,
            item_category: t.variant.product.type,
            item_variant: t.variant.title ? t.variant.title : "",
            price: t.variant.price.amount,
            coupon: t.discountAllocations.length > 0 ? t.discountAllocations[0].discountApplication.title : "",
            quantity: t.quantity
          }
        });
      o = l.map(t => {
        var e;
        return {
          product_id: t.variant.product.id,
          product_name: t.variant.product.title,
          product_variant_id: t.variant.id,
          product_brand: t.variant.product.vendor ? t.variant.product.vendor : "",
          product_category: t.variant.product.type,
          product_price: t.variant.price.amount,
          product_quantity: t.quantity
        }
      }), u = l.map(t => void 0 === t.variant.sku ? "" : t.variant.sku), s = l.map(t => t.variant.id), a = l.map(t => t.variant.product.id), d = l.map(t => t.variant.product.type).includes("") ? "" : l.map(t => t.variant.product.type).join(), n = l.map(t => t.variant.product.vendor ? t.variant.product.vendor : "").includes("") ? "" : l.map(t => t.variant.product.vendor), c = l.map(t => t.variant.product.title).join(), i = l.map(t => {
        var e;
        return {
          id: t.variant.product.id,
          quantity: t.quantity,
          item_price: t.variant.price.amount
        }
      }), r = l.reduce((t, e) => t += e.quantity, 0), h.currency = t.data.checkout.currencyCode, h.value = t.data.checkout.totalPrice.amount, h.coupon = t.data.checkout.discountApplications.length > 0 ? t.data.checkout.discountApplications[0].title : "", h.items = m
    }
    e = {
      event: event_prefix + "checkout_contact_info_submitted",
      client_id: t.clientId,
      event_time: t.timestamp,
      event_time_seconds: Math.round(new Date(t.timestamp) / 1e3),
      product_variant_id: s,
      product_sku: u,
      itemTotalQuantity: r,
      total_tax: t.data.checkout.totalTax.amount,
      subTotal_price: t.data.checkout.subtotalPrice.amount,
      shipping: t.data.checkout.shippingLine.price.amount ? t.data.checkout.shippingLine.price.amount : "",
      transaction_id: t.data.checkout.order.id ? t.data.checkout.order.id : "",
      email: t.data.checkout.email ? t.data.checkout.email : "",
      phone: t.data.checkout.phone ? t.data.checkout.phone : "",
      customer_address_Line1: t.data.checkout.shippingAddress.address1 ? t.data.checkout.shippingAddress.address1 : t.data.checkout.billingAddress.address1,
      customer_address_Line2: t.data.checkout.shippingAddress.address2 ? t.data.checkout.shippingAddress.address2 : t.data.checkout.billingAddress.address2,
      customer_city: t.data.checkout.shippingAddress.city ? t.data.checkout.shippingAddress.city : t.data.checkout.billingAddress.city,
      customer_country: t.data.checkout.shippingAddress.country ? t.data.checkout.shippingAddress.country : t.data.checkout.billingAddress.country,
      customer_countryCode: t.data.checkout.shippingAddress.countryCode ? t.data.checkout.shippingAddress.countryCode : t.data.checkout.billingAddress.countryCode,
      customer_firstName: t.data.checkout.shippingAddress.firstName ? t.data.checkout.shippingAddress.firstName : t.data.checkout.billingAddress.firstName,
      customer_lastName: t.data.checkout.shippingAddress.lastName ? t.data.checkout.shippingAddress.lastName : t.data.checkout.billingAddress.lastName,
      customer_phoneNo: t.data.checkout.shippingAddress.phone ? t.data.checkout.shippingAddress.phone : t.data.checkout.billingAddress.phone,
      customer_state: t.data.checkout.shippingAddress.province ? t.data.checkout.shippingAddress.province : t.data.checkout.billingAddress.province,
      customer_stateCode: t.data.checkout.shippingAddress.provinceCode ? t.data.checkout.shippingAddress.provinceCode : t.data.checkout.billingAddress.provinceCode,
      customer_zip: t.data.checkout.shippingAddress.zip ? t.data.checkout.shippingAddress.zip : t.data.checkout.billingAddress.zip,
      ecommerce: h
    }, trackingPlatform.filter(t => t.toLowerCase().includes("facebook")).length > 0 && (e.fb_browser_side = {
      content_ids: a,
      content_category: d,
      content_name: c,
      content_type: "product",
      contents: i,
      currency: t.data.checkout.currencyCode,
      value: t.data.checkout.totalPrice.amount,
      num_items: r
    }), trackingPlatform.filter(t => t.toLowerCase().includes("pinterest")).length > 0 && (e.pt_browser_side = {
      value: t.data.checkout.totalPrice.amount,
      order_quantity: r,
      currency: t.data.checkout.currencyCode,
      line_items: o
    }), trackingPlatform.filter(t => t.toLowerCase().includes("snapchat")).length > 0 && (e.snap_browser_side = {
      price: t.data.checkout.totalPrice.amount,
      currency: t.data.checkout.currencyCode,
      item_ids: a,
      item_category: d,
      brands: n,
      number_items: r,
      payment_info_available: 1
    }), window.dataLayer.push({ ...e, ...p })
  }
  checkout_contact_info_submitted_fired = !0
});
analytics.subscribe("checkout_address_info_submitted", t => {
  if (!checkout_address_info_submitted_fired) {
    var e, a, d, c, i, r, o, n, s, u, p = contextData() || {},
      h = {};
    if (null !== t.data.checkout) {
      var l = t.data.checkout.lineItems,
        m = l.map(t => {
          var e;
          return {
            item_id: t.variant.product.id,
            item_name: t.variant.product.title,
            item_brand: t.variant.product.vendor,
            item_category: t.variant.product.type,
            item_variant: t.variant.title ? t.variant.title : "",
            price: t.variant.price.amount,
            coupon: t.discountAllocations.length > 0 ? t.discountAllocations[0].discountApplication.title : "",
            quantity: t.quantity
          }
        });
      o = l.map(t => {
        var e;
        return {
          product_id: t.variant.product.id,
          product_name: t.variant.product.title,
          product_variant_id: t.variant.id,
          product_brand: t.variant.product.vendor ? t.variant.product.vendor : "",
          product_category: t.variant.product.type,
          product_price: t.variant.price.amount,
          product_quantity: t.quantity
        }
      }), u = l.map(t => void 0 === t.variant.sku ? "" : t.variant.sku), s = l.map(t => t.variant.id), a = l.map(t => t.variant.product.id), d = l.map(t => t.variant.product.type).includes("") ? "" : l.map(t => t.variant.product.type).join(), n = l.map(t => t.variant.product.vendor ? t.variant.product.vendor : "").includes("") ? "" : l.map(t => t.variant.product.vendor), c = l.map(t => t.variant.product.title).join(), i = l.map(t => {
        var e;
        return {
          id: t.variant.product.id,
          quantity: t.quantity,
          item_price: t.variant.price.amount
        }
      }), r = l.reduce((t, e) => t += e.quantity, 0), h.currency = t.data.checkout.currencyCode, h.value = t.data.checkout.totalPrice.amount, h.coupon = t.data.checkout.discountApplications.length > 0 ? t.data.checkout.discountApplications[0].title : "", h.items = m
    }
    e = {
      event: event_prefix + "checkout_address_info_submitted",
      client_id: t.clientId,
      event_time: t.timestamp,
      event_time_seconds: Math.round(new Date(t.timestamp) / 1e3),
      product_variant_id: s,
      product_sku: u,
      itemTotalQuantity: r,
      total_tax: t.data.checkout.totalTax.amount,
      subTotal_price: t.data.checkout.subtotalPrice.amount,
      shipping: t.data.checkout.shippingLine.price.amount ? t.data.checkout.shippingLine.price.amount : "",
      transaction_id: t.data.checkout.order.id ? t.data.checkout.order.id : "",
      email: t.data.checkout.email ? t.data.checkout.email : "",
      phone: t.data.checkout.phone ? t.data.checkout.phone : "",
      customer_address_Line1: t.data.checkout.shippingAddress.address1 ? t.data.checkout.shippingAddress.address1 : t.data.checkout.billingAddress.address1,
      customer_address_Line2: t.data.checkout.shippingAddress.address2 ? t.data.checkout.shippingAddress.address2 : t.data.checkout.billingAddress.address2,
      customer_city: t.data.checkout.shippingAddress.city ? t.data.checkout.shippingAddress.city : t.data.checkout.billingAddress.city,
      customer_country: t.data.checkout.shippingAddress.country ? t.data.checkout.shippingAddress.country : t.data.checkout.billingAddress.country,
      customer_countryCode: t.data.checkout.shippingAddress.countryCode ? t.data.checkout.shippingAddress.countryCode : t.data.checkout.billingAddress.countryCode,
      customer_firstName: t.data.checkout.shippingAddress.firstName ? t.data.checkout.shippingAddress.firstName : t.data.checkout.billingAddress.firstName,
      customer_lastName: t.data.checkout.shippingAddress.lastName ? t.data.checkout.shippingAddress.lastName : t.data.checkout.billingAddress.lastName,
      customer_phoneNo: t.data.checkout.shippingAddress.phone ? t.data.checkout.shippingAddress.phone : t.data.checkout.billingAddress.phone,
      customer_state: t.data.checkout.shippingAddress.province ? t.data.checkout.shippingAddress.province : t.data.checkout.billingAddress.province,
      customer_stateCode: t.data.checkout.shippingAddress.provinceCode ? t.data.checkout.shippingAddress.provinceCode : t.data.checkout.billingAddress.provinceCode,
      customer_zip: t.data.checkout.shippingAddress.zip ? t.data.checkout.shippingAddress.zip : t.data.checkout.billingAddress.zip,
      ecommerce: h
    }, trackingPlatform.filter(t => t.toLowerCase().includes("facebook")).length > 0 && (e.fb_browser_side = {
      content_ids: a,
      content_category: d,
      content_name: c,
      content_type: "product",
      contents: i,
      currency: t.data.checkout.currencyCode,
      value: t.data.checkout.totalPrice.amount,
      num_items: r
    }), trackingPlatform.filter(t => t.toLowerCase().includes("pinterest")).length > 0 && (e.pt_browser_side = {
      value: t.data.checkout.totalPrice.amount,
      order_quantity: r,
      currency: t.data.checkout.currencyCode,
      line_items: o
    }), trackingPlatform.filter(t => t.toLowerCase().includes("snapchat")).length > 0 && (e.snap_browser_side = {
      price: t.data.checkout.totalPrice.amount,
      currency: t.data.checkout.currencyCode,
      item_ids: a,
      item_category: d,
      brands: n,
      number_items: r,
      payment_info_available: 1
    }), window.dataLayer.push({ ...e, ...p })
  }
  checkout_address_info_submitted_fired = !0
});
analytics.subscribe("checkout_shipping_info_submitted", t => {
  if (!checkout_shipping_info_submitted_fired) {
    var e, a, d, c, i, r, o, n, s, u, p = contextData() || {},
      h = {};
    if (null !== t.data.checkout) {
      var l = t.data.checkout.lineItems,
        m = l.map(t => {
          var e;
          return {
            item_id: t.variant.product.id,
            item_name: t.variant.product.title,
            item_brand: t.variant.product.vendor,
            item_category: t.variant.product.type,
            item_variant: t.variant.title ? t.variant.title : "",
            price: t.variant.price.amount,
            coupon: t.discountAllocations.length > 0 ? t.discountAllocations[0].discountApplication.title : "",
            quantity: t.quantity
          }
        });
      o = l.map(t => {
        var e;
        return {
          product_id: t.variant.product.id,
          product_name: t.variant.product.title,
          product_variant_id: t.variant.id,
          product_brand: t.variant.product.vendor ? t.variant.product.vendor : "",
          product_category: t.variant.product.type,
          product_price: t.variant.price.amount,
          product_quantity: t.quantity
        }
      }), u = l.map(t => void 0 === t.variant.sku ? "" : t.variant.sku), s = l.map(t => t.variant.id), a = l.map(t => t.variant.product.id), d = l.map(t => t.variant.product.type).includes("") ? "" : l.map(t => t.variant.product.type).join(), n = l.map(t => t.variant.product.vendor ? t.variant.product.vendor : "").includes("") ? "" : l.map(t => t.variant.product.vendor), c = l.map(t => t.variant.product.title).join(), i = l.map(t => {
        var e;
        return {
          id: t.variant.product.id,
          quantity: t.quantity,
          item_price: t.variant.price.amount
        }
      }), r = l.reduce((t, e) => t += e.quantity, 0), h.currency = t.data.checkout.currencyCode, h.value = t.data.checkout.totalPrice.amount, h.coupon = t.data.checkout.discountApplications.length > 0 ? t.data.checkout.discountApplications[0].title : "", h.items = m
    }
    e = {
      event: event_prefix + "add_shipping_info",
      client_id: t.clientId,
      event_time: t.timestamp,
      event_time_seconds: Math.round(new Date(t.timestamp) / 1e3),
      product_variant_id: s,
      product_sku: u,
      itemTotalQuantity: r,
      total_tax: t.data.checkout.totalTax.amount,
      subTotal_price: t.data.checkout.subtotalPrice.amount,
      shipping: t.data.checkout.shippingLine.price.amount ? t.data.checkout.shippingLine.price.amount : "",
      transaction_id: t.data.checkout.order.id ? t.data.checkout.order.id : "",
      email: t.data.checkout.email ? t.data.checkout.email : "",
      phone: t.data.checkout.phone ? t.data.checkout.phone : "",
      customer_address_Line1: t.data.checkout.shippingAddress.address1 ? t.data.checkout.shippingAddress.address1 : t.data.checkout.billingAddress.address1,
      customer_address_Line2: t.data.checkout.shippingAddress.address2 ? t.data.checkout.shippingAddress.address2 : t.data.checkout.billingAddress.address2,
      customer_city: t.data.checkout.shippingAddress.city ? t.data.checkout.shippingAddress.city : t.data.checkout.billingAddress.city,
      customer_country: t.data.checkout.shippingAddress.country ? t.data.checkout.shippingAddress.country : t.data.checkout.billingAddress.country,
      customer_countryCode: t.data.checkout.shippingAddress.countryCode ? t.data.checkout.shippingAddress.countryCode : t.data.checkout.billingAddress.countryCode,
      customer_firstName: t.data.checkout.shippingAddress.firstName ? t.data.checkout.shippingAddress.firstName : t.data.checkout.billingAddress.firstName,
      customer_lastName: t.data.checkout.shippingAddress.lastName ? t.data.checkout.shippingAddress.lastName : t.data.checkout.billingAddress.lastName,
      customer_phoneNo: t.data.checkout.shippingAddress.phone ? t.data.checkout.shippingAddress.phone : t.data.checkout.billingAddress.phone,
      customer_state: t.data.checkout.shippingAddress.province ? t.data.checkout.shippingAddress.province : t.data.checkout.billingAddress.province,
      customer_stateCode: t.data.checkout.shippingAddress.provinceCode ? t.data.checkout.shippingAddress.provinceCode : t.data.checkout.billingAddress.provinceCode,
      customer_zip: t.data.checkout.shippingAddress.zip ? t.data.checkout.shippingAddress.zip : t.data.checkout.billingAddress.zip,
      ecommerce: h
    }, trackingPlatform.filter(t => t.toLowerCase().includes("facebook")).length > 0 && (e.fb_browser_side = {
      content_ids: a,
      content_category: d,
      content_name: c,
      content_type: "product",
      contents: i,
      currency: t.data.checkout.currencyCode,
      value: t.data.checkout.totalPrice.amount,
      num_items: r
    }), trackingPlatform.filter(t => t.toLowerCase().includes("pinterest")).length > 0 && (e.pt_browser_side = {
      value: t.data.checkout.totalPrice.amount,
      order_quantity: r,
      currency: t.data.checkout.currencyCode,
      line_items: o
    }), trackingPlatform.filter(t => t.toLowerCase().includes("snapchat")).length > 0 && (e.snap_browser_side = {
      price: t.data.checkout.totalPrice.amount,
      currency: t.data.checkout.currencyCode,
      item_ids: a,
      item_category: d,
      brands: n,
      number_items: r,
      payment_info_available: 1
    }), window.dataLayer.push({ ...e, ...p })
  }
  checkout_shipping_info_submitted_fired = !0
});
analytics.subscribe("payment_info_submitted", t => {
  var e, a, d, c, i, r, o, n, s, u, p = contextData() || {},
    h = {};
  if (null !== t.data.checkout) {
    var l = t.data.checkout.lineItems,
      m = l.map(t => {
        var e;
        return {
          item_id: t.variant.product.id,
          item_name: t.variant.product.title,
          item_brand: t.variant.product.vendor,
          item_category: t.variant.product.type,
          item_variant: t.variant.title ? t.variant.title : "",
          price: t.variant.price.amount,
          coupon: t.discountAllocations.length > 0 ? t.discountAllocations[0].discountApplication.title : "",
          quantity: t.quantity
        }
      });
    o = l.map(t => {
      var e;
      return {
        product_id: t.variant.product.id,
        product_name: t.variant.product.title,
        product_variant_id: t.variant.id,
        product_brand: t.variant.product.vendor ? t.variant.product.vendor : "",
        product_category: t.variant.product.type,
        product_price: t.variant.price.amount,
        product_quantity: t.quantity
      }
    }), u = l.map(t => void 0 === t.variant.sku ? "" : t.variant.sku), s = l.map(t => t.variant.id), a = l.map(t => t.variant.product.id), d = l.map(t => t.variant.product.type).includes("") ? "" : l.map(t => t.variant.product.type).join(), n = l.map(t => t.variant.product.vendor ? t.variant.product.vendor : "").includes("") ? "" : l.map(t => t.variant.product.vendor), c = l.map(t => t.variant.product.title).join(), i = l.map(t => {
      var e;
      return {
        id: t.variant.product.id,
        quantity: t.quantity,
        item_price: t.variant.price.amount
      }
    }), r = l.reduce((t, e) => t += e.quantity, 0), h.currency = t.data.checkout.currencyCode, h.value = t.data.checkout.totalPrice.amount, h.coupon = t.data.checkout.discountApplications.length > 0 ? t.data.checkout.discountApplications[0].title : "", h.items = m
  }
  e = {
    event: event_prefix + "add_payment_info",
    client_id: t.clientId,
    event_time: t.timestamp,
    event_time_seconds: Math.round(new Date(t.timestamp) / 1e3),
    product_variant_id: s,
    product_sku: u,
    itemTotalQuantity: r,
    total_tax: t.data.checkout.totalTax.amount,
    subTotal_price: t.data.checkout.subtotalPrice.amount,
    shipping: t.data.checkout.shippingLine.price.amount ? t.data.checkout.shippingLine.price.amount : "",
    transaction_id: t.data.checkout.order.id ? t.data.checkout.order.id : "",
    email: t.data.checkout.email ? t.data.checkout.email : "",
    phone: t.data.checkout.phone ? t.data.checkout.phone : "",
    customer_address_Line1: t.data.checkout.shippingAddress.address1 ? t.data.checkout.shippingAddress.address1 : t.data.checkout.billingAddress.address1,
    customer_address_Line2: t.data.checkout.shippingAddress.address2 ? t.data.checkout.shippingAddress.address2 : t.data.checkout.billingAddress.address2,
    customer_city: t.data.checkout.shippingAddress.city ? t.data.checkout.shippingAddress.city : t.data.checkout.billingAddress.city,
    customer_country: t.data.checkout.shippingAddress.country ? t.data.checkout.shippingAddress.country : t.data.checkout.billingAddress.country,
    customer_countryCode: t.data.checkout.shippingAddress.countryCode ? t.data.checkout.shippingAddress.countryCode : t.data.checkout.billingAddress.countryCode,
    customer_firstName: t.data.checkout.shippingAddress.firstName ? t.data.checkout.shippingAddress.firstName : t.data.checkout.billingAddress.firstName,
    customer_lastName: t.data.checkout.shippingAddress.lastName ? t.data.checkout.shippingAddress.lastName : t.data.checkout.billingAddress.lastName,
    customer_phoneNo: t.data.checkout.shippingAddress.phone ? t.data.checkout.shippingAddress.phone : t.data.checkout.billingAddress.phone,
    customer_state: t.data.checkout.shippingAddress.province ? t.data.checkout.shippingAddress.province : t.data.checkout.billingAddress.province,
    customer_stateCode: t.data.checkout.shippingAddress.provinceCode ? t.data.checkout.shippingAddress.provinceCode : t.data.checkout.billingAddress.provinceCode,
    customer_zip: t.data.checkout.shippingAddress.zip ? t.data.checkout.shippingAddress.zip : t.data.checkout.billingAddress.zip,
    ecommerce: h
  }, trackingPlatform.filter(t => t.toLowerCase().includes("facebook")).length > 0 && (e.fb_browser_side = {
    content_ids: a,
    content_category: d,
    content_name: c,
    content_type: "product",
    contents: i,
    currency: t.data.checkout.currencyCode,
    value: t.data.checkout.totalPrice.amount,
    num_items: r
  }), trackingPlatform.filter(t => t.toLowerCase().includes("pinterest")).length > 0 && (e.pt_browser_side = {
    value: t.data.checkout.totalPrice.amount,
    order_quantity: r,
    currency: t.data.checkout.currencyCode,
    line_items: o
  }), trackingPlatform.filter(t => t.toLowerCase().includes("snapchat")).length > 0 && (e.snap_browser_side = {
    price: t.data.checkout.totalPrice.amount,
    currency: t.data.checkout.currencyCode,
    item_ids: a,
    item_category: d,
    brands: n,
    number_items: r,
    payment_info_available: 1
  }), window.dataLayer.push({ ...e, ...p })
});
analytics.subscribe("checkout_completed", t => {
  var e, a, d, c, i, r, o, n, s, u, p = contextData() || {},
    h = {};
  if (null !== t.data.checkout) {
    var l = t.data.checkout.lineItems,
      m = l.map(t => {
        var e;
        return {
          item_id: t.variant.product.id,
          item_name: t.variant.product.title,
          item_brand: t.variant.product.vendor,
          item_category: t.variant.product.type,
          item_variant: t.variant.title ? t.variant.title : "",
          price: t.variant.price.amount,
          coupon: t.discountAllocations.length > 0 ? t.discountAllocations[0].discountApplication.title : "",
          quantity: t.quantity
        }
      });
    o = l.map(t => {
      var e;
      return {
        product_id: t.variant.product.id,
        product_name: t.variant.product.title,
        product_variant_id: t.variant.id,
        product_brand: t.variant.product.vendor ? t.variant.product.vendor : "",
        product_category: t.variant.product.type,
        product_price: t.variant.price.amount,
        product_quantity: t.quantity
      }
    }), u = l.map(t => void 0 === t.variant.sku ? "" : t.variant.sku), s = l.map(t => t.variant.id), a = l.map(t => t.variant.product.id), d = l.map(t => t.variant.product.type).includes("") ? "" : l.map(t => t.variant.product.type).join(), n = l.map(t => t.variant.product.vendor ? t.variant.product.vendor : "").includes("") ? "" : l.map(t => t.variant.product.vendor), c = l.map(t => t.variant.product.title).join(), i = l.map(t => {
      var e;
      return {
        id: t.variant.product.id,
        quantity: t.quantity,
        item_price: t.variant.price.amount
      }
    }), r = l.reduce((t, e) => t += e.quantity, 0), h.currency = t.data.checkout.currencyCode, h.value = t.data.checkout.totalPrice.amount, h.tax = t.data.checkout.totalTax.amount, h.coupon = t.data.checkout.discountApplications.length > 0 ? t.data.checkout.discountApplications[0].title : "", h.shipping = t.data.checkout.shippingLine.price.amount ? t.data.checkout.shippingLine.price.amount : "", h.transaction_id = t.data.checkout.order.id ? t.data.checkout.order.id.split("/").pop() : "", h.items = m
  }
var customerData = {
    payment_gateway: t.data.checkout.transactions.length > 0 ? t.data.checkout.transactions[0].gateway : "",
    customer_id: t.data.checkout.order.customer.id ? t.data.checkout.order.customer.id : "",
    email: t.data.checkout.email ? t.data.checkout.email : "",
    phone: t.data.checkout.phone ? t.data.checkout.phone : "",
    customer_address_Line1: null === t.data.checkout.billingAddress || void 0 === t.data.checkout.billingAddress ? null === t.data.checkout.shippingAddress || void 0 === t.data.checkout.shippingAddress ? "" : null === t.data.checkout.shippingAddress.address1 || void 0 === t.data.checkout.shippingAddress.address1 ? "" : t.data.checkout.shippingAddress.address1 : null === t.data.checkout.billingAddress.address1 || void 0 === t.data.checkout.billingAddress.address1 ? "" : t.data.checkout.billingAddress.address1,
    customer_address_Line2: null === t.data.checkout.billingAddress || void 0 === t.data.checkout.billingAddress ? null === t.data.checkout.shippingAddress || void 0 === t.data.checkout.shippingAddress ? "" : null === t.data.checkout.shippingAddress.address2 || void 0 === t.data.checkout.shippingAddress.address2 ? "" : t.data.checkout.shippingAddress.address2 : null === t.data.checkout.billingAddress.address2 || void 0 === t.data.checkout.billingAddress.address2 ? "" : t.data.checkout.billingAddress.address2,
    customer_city: null === t.data.checkout.billingAddress || void 0 === t.data.checkout.billingAddress ? null === t.data.checkout.shippingAddress || void 0 === t.data.checkout.shippingAddress ? "" : null === t.data.checkout.shippingAddress.city || void 0 === t.data.checkout.shippingAddress.city ? "" : t.data.checkout.shippingAddress.city : null === t.data.checkout.billingAddress.city || void 0 === t.data.checkout.billingAddress.city ? "" : t.data.checkout.billingAddress.city,
    customer_country: null === t.data.checkout.billingAddress || void 0 === t.data.checkout.billingAddress ? null === t.data.checkout.shippingAddress || void 0 === t.data.checkout.shippingAddress ? "" : null === t.data.checkout.shippingAddress.country || void 0 === t.data.checkout.shippingAddress.country ? "" : t.data.checkout.shippingAddress.country : null === t.data.checkout.billingAddress.country || void 0 === t.data.checkout.billingAddress.country ? "" : t.data.checkout.billingAddress.country,
    customer_countryCode: null === t.data.checkout.billingAddress || void 0 === t.data.checkout.billingAddress ? null === t.data.checkout.shippingAddress || void 0 === t.data.checkout.shippingAddress ? "" : null === t.data.checkout.shippingAddress.countryCode || void 0 === t.data.checkout.shippingAddress.countryCode ? "" : t.data.checkout.shippingAddress.countryCode : null === t.data.checkout.billingAddress.countryCode || void 0 === t.data.checkout.billingAddress.countryCode ? "" : t.data.checkout.billingAddress.countryCode,
    customer_firstName: null === t.data.checkout.billingAddress || void 0 === t.data.checkout.billingAddress ? null === t.data.checkout.shippingAddress || void 0 === t.data.checkout.shippingAddress ? "" : null === t.data.checkout.shippingAddress.firstName || void 0 === t.data.checkout.shippingAddress.firstName ? "" : t.data.checkout.shippingAddress.firstName : null === t.data.checkout.billingAddress.firstName || void 0 === t.data.checkout.billingAddress.firstName ? "" : t.data.checkout.billingAddress.firstName,
    customer_lastName: null === t.data.checkout.billingAddress || void 0 === t.data.checkout.billingAddress ? null === t.data.checkout.shippingAddress || void 0 === t.data.checkout.shippingAddress ? "" : null === t.data.checkout.shippingAddress.lastName || void 0 === t.data.checkout.shippingAddress.lastName ? "" : t.data.checkout.shippingAddress.lastName : null === t.data.checkout.billingAddress.lastName || void 0 === t.data.checkout.billingAddress.lastName ? "" : t.data.checkout.billingAddress.lastName,
    customer_phoneNo: null === t.data.checkout.billingAddress || void 0 === t.data.checkout.billingAddress ? null === t.data.checkout.shippingAddress || void 0 === t.data.checkout.shippingAddress ? "" : null === t.data.checkout.shippingAddress.phone || void 0 === t.data.checkout.shippingAddress.phone ? "" : t.data.checkout.shippingAddress.phone : null === t.data.checkout.billingAddress.phone || void 0 === t.data.checkout.billingAddress.phone ? "" : t.data.checkout.billingAddress.phone,
    customer_state: null === t.data.checkout.billingAddress || void 0 === t.data.checkout.billingAddress ? null === t.data.checkout.shippingAddress || void 0 === t.data.checkout.shippingAddress ? "" : null === t.data.checkout.shippingAddress.province || void 0 === t.data.checkout.shippingAddress.province ? "" : t.data.checkout.shippingAddress.province : null === t.data.checkout.billingAddress.province || void 0 === t.data.checkout.billingAddress.province ? "" : t.data.checkout.billingAddress.province,
    customer_stateCode: null === t.data.checkout.billingAddress || void 0 === t.data.checkout.billingAddress ? null === t.data.checkout.shippingAddress || void 0 === t.data.checkout.shippingAddress ? "" : null === t.data.checkout.shippingAddress.provinceCode || void 0 === t.data.checkout.shippingAddress.provinceCode ? "" : t.data.checkout.shippingAddress.provinceCode : null === t.data.checkout.billingAddress.provinceCode || void 0 === t.data.checkout.billingAddress.provinceCode ? "" : t.data.checkout.billingAddress.provinceCode,
    customer_zip: null === t.data.checkout.billingAddress || void 0 === t.data.checkout.billingAddress ? null === t.data.checkout.shippingAddress || void 0 === t.data.checkout.shippingAddress ? "" : null === t.data.checkout.shippingAddress.zip || void 0 === t.data.checkout.shippingAddress.zip ? "" : t.data.checkout.shippingAddress.zip : null === t.data.checkout.billingAddress.zip || void 0 === t.data.checkout.billingAddress.zip ? "" : t.data.checkout.billingAddress.zip,
};
  e = {
    event: event_prefix + "purchase",
    client_id: t.clientId,
    event_time: t.timestamp,
    event_time_seconds: Math.round(new Date(t.timestamp) / 1e3),
    itemTotalQuantity: r,
    subTotal_price: t.data.checkout.subtotalPrice.amount,
    product_variant_id: s,
    product_sku: u,
    ecommerce: h,
    remarketing: {
    id: 'shopify_' + h.currency + '_' + a, google_business_vertical: 'retail'
  },
    customerData: customerData
  }; trackingPlatform.filter(t => t.toLowerCase().includes("facebook")).length > 0 && (e.fb_browser_side = {
    content_ids: a,
    content_category: d,
    content_name: c,
    content_type: "product",
    contents: i,
    currency: t.data.checkout.currencyCode,
    value: t.data.checkout.totalPrice.amount,
    num_items: r
  }), trackingPlatform.filter(t => t.toLowerCase().includes("pinterest")).length > 0 && (e.pt_browser_side = {
    value: t.data.checkout.totalPrice.amount,
    order_quantity: r,
    currency: t.data.checkout.currencyCode,
    order_id: t.data.checkout.order.id ? t.data.checkout.order.id.split("/").pop() : "",
    promo_code: t.data.checkout.discountApplications.length > 0 ? t.data.checkout.discountApplications[0].title : "",
    line_items: o
  }), trackingPlatform.filter(t => t.toLowerCase().includes("snapchat")).length > 0 && (e.snap_browser_side = {
    price: t.data.checkout.totalPrice.amount,
    currency: t.data.checkout.currencyCode,
    item_ids: a,
    item_category: d,
    brands: n,
    number_items: r,
    transaction_id: t.data.checkout.order.id ? t.data.checkout.order.id.split("/").pop() : ""
  }), window.dataLayer.push({ ...e, ...p })
});
