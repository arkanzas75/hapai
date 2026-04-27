window.addEventListener('load', function () {

  // Tel Menu
  $(".tel-menu-btn, .tel-menu-close").on("click", function () {
    $(".tel-menu").toggleClass("showNav");
    $("body").toggleClass("no-scroll");
  });

  // Filter Menu
  $(".mob-filter-btn, .mob-filter-menu-close").on("click", function () {
    $(".hapaiavto-shop-showcase aside").toggleClass("showNav");
    $("body").toggleClass("no-scroll");
  });

  // Sort Menu
  $(".mob-sort-btn, .mob-sort-menu-close").on("click", function () {
    $(".hapaiavto-shop-sort-wrapper").toggleClass("showNav");
    $("body").toggleClass("no-scroll");
  });

  // City tabs
  $(".hapaiavto-shop-cities li").on("click", function () {
    $(".hapaiavto-shop-cities li").removeClass("hapaiavto-shop-city-active");
    $(this).addClass("hapaiavto-shop-city-active");
  });

  // Masked Input
  if ($('input[type="tel"]').length) {
    $('input[type="tel"]').mask('+38(999) 999-99-99');
  }

  // Custom Select Inputs
  $('select').each(function () {
    const $this = $(this),
      $selectOption = $this.find('option'),
      selectOptionLength = $selectOption.length,
      duration = 450;

    $this.hide().wrap('<div class="select"></div>');

    $('<div>', {
      class: 'new-select',
      text: $this.children('option:first-child').text()
    }).insertAfter($this);

    const $selectHead = $this.next('.new-select');

    $('<div>', {
      class: 'new-select__list'
    }).insertAfter($selectHead);

    const $selectList = $selectHead.next('.new-select__list');

    for (let i = 1; i < selectOptionLength; i++) {
      $('<div>', {
          class: 'new-select__item',
          html: $('<span>', {
            text: $selectOption.eq(i).text()
          })
        })
        .attr('data-value', $selectOption.eq(i).val())
        .appendTo($selectList);
    }

    const $selectItem = $selectList.find('.new-select__item');

    $selectList.slideUp(0);

    if ($(window).width() < 992) {
      const currentVal = $this.val();
      $selectItem.filter(`[data-value="${currentVal}"]`).addClass('active-select');
    }

    $selectHead.on('click', function () {
      $(this).toggleClass('on');
      $selectList.slideToggle(duration);
    });

    $selectItem.on('click', function () {
      const chooseItem = $(this).data('value');

      $this.val(chooseItem).attr('selected', 'selected');
      $selectHead.text($(this).find('span').text());
      $selectList.slideUp(duration);
      $selectHead.removeClass('on');

      if ($(window).width() < 992) {
        $selectItem.removeClass('active-select');
        $(this).addClass('active-select');
      } else {
        $selectItem.removeClass('active-select');
      }
    });
  });

  $('.new-select').each(function (i) {
    const $this = $(this);
    $this.addClass(`ark-select-${i}`).text($this.parent().find('option').filter(':selected').text());

    $(document).on('click', function (e) {
      if (e.target.className !== `new-select ark-select-${i} on`) {
        $this.removeClass('on').parent().find('.new-select__list').fadeOut();
      }
    });
  });

  $('.hapaiavto-shop-info-sort .new-select__item').on('click', function () {
    let selectedValue = $(this).data('value');
    $('.hapaiavto-shop-info-sort').find('select').val(selectedValue);
    $('.hapaiavto-shop-info-sort').find('select').trigger('change');
  });

  // Toggle filter item
  $('.hapaiavto-shop-filter-item-title').on('click', function () {
    const $parent = $(this).closest('.hapaiavto-shop-filter-item');
    const $content = $(this).siblings('.hapaiavto-shop-filter-item-content');

    if ($parent.hasClass('hapaiavto-shop-filter-item-opened')) {
      $parent.removeClass('hapaiavto-shop-filter-item-opened').addClass('hapaiavto-shop-filter-item-closed');
      $content.show().slideUp(300);
    } else {
      $parent.removeClass('hapaiavto-shop-filter-item-closed').addClass('hapaiavto-shop-filter-item-opened');
      $content.hide().slideDown(300);
    }
  });

  // Filter Search Dropdown
  function initFilterDropdown($wrap) {
    const $input = $wrap.find('input');
    const $list = $wrap.find('.hapaiavto-filter-dropdown');
    const $items = $list.find('.hapaiavto-filter-dropdown-item');

    // Open on focus
    $input.on('focus', function () {
      closeAllDropdowns();
      filterItems($wrap, '');
      $wrap.addClass('is-open');
      $wrap.closest('.hapaiavto-shop-filter-item').addClass('has-open-dropdown');
    });

    // Filter on type
    $input.on('input', function () {
      const val = $(this).val().trim().toLowerCase();
      filterItems($wrap, val);
      if (!$wrap.hasClass('is-open')) $wrap.addClass('is-open');
    });


    // Select item
    $items.on('click', function () {
      const value = $(this).data('value');
      $input.val(value);
      $items.removeClass('hapaiavto-filter-dropdown-item--active');
      $(this).addClass('hapaiavto-filter-dropdown-item--active');
      $wrap.removeClass('is-open');
    });
  }

  function filterItems($wrap, query) {
    const $items = $wrap.find('.hapaiavto-filter-dropdown-item');
    $items.each(function () {
      const text = $(this).text().toLowerCase();
      if (text.indexOf(query) !== -1) {
        $(this).removeClass('is-hidden');
      } else {
        $(this).addClass('is-hidden');
      }
    });
  }

  function closeAllDropdowns() {
    $('.hapaiavto-filter-dropdown-wrap').removeClass('is-open');
    $('.hapaiavto-shop-filter-item').removeClass('has-open-dropdown');
  }

  // Init all dropdown wraps
  $('.hapaiavto-filter-dropdown-wrap').each(function () {
    initFilterDropdown($(this));
  });

  // Close on outside click
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.hapaiavto-filter-dropdown-wrap').length) {
      closeAllDropdowns();
    }
  });

  // Close on Escape
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') closeAllDropdowns();
  });


  // SEO Readmore
  $('.seo-text-section.ark-content-block').each(function () {
    if ($(this)[0].scrollHeight <= 160) {
      $(this).next('.seo-readmore').hide();
    }
  });

  $('.seo-readmore').on('click', function () {
    const $btn = $(this);
    const $content = $btn.prev('.seo-text-section.ark-content-block');
    const isExpanded = $content.hasClass('is-expanded');

    if (isExpanded) {
      const minHeight = window.innerWidth < 576 ? '528px' : '270px';
      $content.removeClass('is-expanded').css('max-height', minHeight);
      $btn.removeClass('active');
      $btn.find('span').text('Читати більше');
    } else {
      const scrollHeight = $content[0].scrollHeight;
      $content.addClass('is-expanded').css('max-height', scrollHeight + 'px');
      $btn.addClass('active');
      $btn.find('span').text('Згорнути');
    }
  });


  // MapBox
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXJrYW56YXMiLCJhIjoiY2xicTFoaTFpMDBqcDNvcW5jYmdiYzdmZSJ9.h6-AplTABlE2Juh2XO-Jjw';

  const initialCenter = [30.5222, 50.4876];

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    zoom: 12,
    center: initialCenter,
  });

  map.on('load', () => {
    map.loadImage(
      window.location.origin + '/img/marker.png',
      (error, image) => {
        if (error) {
          console.warn('Mapbox marker image not found', error);
        } else {
          map.addImage('cat', image);

          map.addSource('point1', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [{
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': initialCenter
                }
              }]
            }
          });

          map.addLayer({
            'id': 'points1',
            'type': 'symbol',
            'source': 'point1',
            'layout': {
              'icon-image': 'cat',
              'icon-size': 1
            }
          });
        }
      }
    );
  });
  map.scrollZoom.disable();

  // Find Us List Dropdown (Mobile)
  if (window.innerWidth <= 768) {
    const findUsList = document.querySelector('.find-us-list');
    if (findUsList) {
      const activeItem = findUsList.querySelector('li.active');

      if (activeItem) {
        activeItem.addEventListener('click', function (e) {
          // Toggle dropdown only if clicking on the active item
          if (this.classList.contains('active')) {
            findUsList.classList.toggle('is-open');
          }
        });
      }

      // When clicking on non-active items
      findUsList.querySelectorAll('li:not(.active)').forEach(item => {
        item.addEventListener('click', function () {
          // Remove active from all
          findUsList.querySelectorAll('li').forEach(el => el.classList.remove('active'));
          // Add active to clicked
          this.classList.add('active');
          // Close dropdown
          findUsList.classList.remove('is-open');

          // Trigger map update
          const centerStr = this.getAttribute('data-center');
          if (centerStr) {
            const center = JSON.parse(centerStr);
            map.flyTo({
              center: center,
              zoom: 12,
              speed: 1.2
            });

            const source = map.getSource('point1');
            if (source) {
              source.setData({
                'type': 'FeatureCollection',
                'features': [{
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Point',
                    'coordinates': center
                  }
                }]
              });
            }
          }

          // Re-attach click handler to new active item
          const newActiveItem = findUsList.querySelector('li.active');
          if (newActiveItem) {
            newActiveItem.addEventListener('click', function (e) {
              if (this.classList.contains('active')) {
                findUsList.classList.toggle('is-open');
              }
            });
          }
        });
      });
    }
  }

  document.querySelectorAll('.find-us-list li').forEach(item => {
    item.addEventListener('click', function () {
      // Skip if mobile dropdown is active
      if (window.innerWidth <= 768) {
        return;
      }

      document.querySelectorAll('.find-us-list li').forEach(el => el.classList.remove('active'));
      this.classList.add('active');

      const centerStr = this.getAttribute('data-center');
      if (centerStr) {
        const center = JSON.parse(centerStr);
        map.flyTo({
          center: center,
          zoom: 12,
          speed: 1.2
        });

        const source = map.getSource('point1');
        if (source) {
          source.setData({
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': center
              }
            }]
          });
        }
      }
    });
  });


  // Single Product Swiper Gallery
  if ($('.hapaiavto-main-swiper').length > 0) {
    const thumbsSwiper = new Swiper('.hapaiavto-thumbs-swiper', {
      spaceBetween: 15,
      slidesPerView: 3.5,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        0: {
          slidesPerView: 4,
          spaceBetween: 8,
        },
        576: {
          slidesPerView: 3.5,
          spaceBetween: 15,
        }
      }
    });

    const mainSwiper = new Swiper('.hapaiavto-main-swiper', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
      on: {
        init: function () {
          updateGalleryCounter(this);
        },
        slideChange: function () {
          updateGalleryCounter(this);
        }
      }
    });

    function updateGalleryCounter(swiper) {
      if (!$('.hapaiavto-gallery-counter').length) return;
      const activeIndex = swiper.realIndex + 1;
      const totalSlides = swiper.slides.length;
      $('.hapaiavto-gallery-counter').text(`${activeIndex} з ${totalSlides}`);
    }
  }


  // Related Products Swiper
  if ($('.hapaiavto-related-swiper').length > 0) {
    const relatedSwiper = new Swiper('.hapaiavto-related-swiper', {
      slidesPerView: 1.2,
      spaceBetween: 15,
      navigation: {
        nextEl: '.hapaiavto-related-next',
        prevEl: '.hapaiavto-related-prev',
      },
      pagination: {
        el: '.hapaiavto-related-pagination',
        clickable: true,
      },
      breakpoints: {
        576: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3.2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        }
      }
    });
  }

  // FAQ Tabs
  $('.hapaiavto-faq-tabs li').on('click', function () {
    $('.hapaiavto-faq-tabs li').removeClass('active');
    $(this).addClass('active');

    const tabId = $(this).data('tab');
    $('.hapaiavto-faq-content').removeClass('active');
    $('#faq-' + tabId).addClass('active');
  });

  // FAQ Accordion
  $('.hapaiavto-faq-question').on('click', function () {
    const $item = $(this).closest('.hapaiavto-faq-item');
    const $answer = $(this).siblings('.hapaiavto-faq-answer');

    if ($item.hasClass('active')) {
      $item.removeClass('active');
      $answer.slideUp(300);
    } else {
      $('.hapaiavto-faq-item').removeClass('active');
      $('.hapaiavto-faq-answer').slideUp(300);

      $item.addClass('active');
      $answer.slideDown(300);
    }
  });


  // Modal
  $(".get-in-touch-btn").click(function (e) {
    e.preventDefault();
    $(".ark-overlay-get-in-touch").fadeIn();
    $("body").addClass('no-scroll');
  });

  $(".ark-popup-close-get-in-touch, .ark-overlay-get-in-touch").click(function (e) {
    if ($(this).is(".ark-popup-close-get-in-touch") || $(e.target).is(".ark-overlay-get-in-touch")) {
      $(".ark-overlay-get-in-touch").fadeOut();
      $("body").removeClass('no-scroll');
    }
  });


  $(".get-an-estimate-btn").click(function (e) {
    e.preventDefault();
    $(".ark-overlay-get-an-estimate").fadeIn();
    $("body").addClass('no-scroll');
  });

  $(".ark-popup-close-get-an-estimate, .ark-overlay-get-an-estimate").click(function (e) {
    if ($(this).is(".ark-popup-close-get-an-estimate") || $(e.target).is(".ark-overlay-get-an-estimate")) {
      $(".ark-overlay-get-an-estimate").fadeOut();
      $("body").removeClass('no-scroll');
    }
  });

  $(".test-drive-btn").click(function (e) {
    e.preventDefault();
    $(".ark-overlay-test-drive").fadeIn();
    $("body").addClass('no-scroll');
  });

  $(".ark-popup-close-test-drive, .ark-overlay-test-drive").click(function (e) {
    if ($(this).is(".ark-popup-close-test-drive") || $(e.target).is(".ark-overlay-test-drive")) {
      $(".ark-overlay-test-drive").fadeOut();
      $("body").removeClass('no-scroll');
    }
  });

  $(".trade-btn").click(function (e) {
    e.preventDefault();
    $(".ark-overlay-trade").fadeIn();
    $("body").addClass('no-scroll');
  });

  $(".ark-popup-close-trade, .ark-overlay-trade").click(function (e) {
    if ($(this).is(".ark-popup-close-trade") || $(e.target).is(".ark-overlay-trade")) {
      $(".ark-overlay-trade").fadeOut();
      $("body").removeClass('no-scroll');
    }
  });

  $(".exchange-btn").click(function (e) {
    e.preventDefault();
    $(".ark-overlay-exchange").fadeIn();
    $("body").addClass('no-scroll');
  });

  $(".ark-popup-close-exchange, .ark-overlay-exchange").click(function (e) {
    if ($(this).is(".ark-popup-close-exchange") || $(e.target).is(".ark-overlay-exchange")) {
      $(".ark-overlay-exchange").fadeOut();
      $("body").removeClass('no-scroll');
    }
  });

  $(".consultation-btn").click(function (e) {
    e.preventDefault();
    $(".ark-overlay-consultation").fadeIn();
    $("body").addClass('no-scroll');
  });

  $(".ark-popup-close-consultation, .ark-overlay-consultation").click(function (e) {
    if ($(this).is(".ark-popup-close-consultation") || $(e.target).is(".ark-overlay-consultation")) {
      $(".ark-overlay-consultation").fadeOut();
      $("body").removeClass('no-scroll');
    }
  });

  $(".inspection-btn").click(function (e) {
    e.preventDefault();
    const $modal = $(".ark-overlay-inspection");

    // Reset all steps to initial state
    $modal.find(".ark-step-1").show().addClass("active");
    $modal.find(".ark-step-2").hide().removeClass("active");

    $modal.fadeIn();
    $("body").addClass('no-scroll');
  });

  $(".ark-popup-close-inspection, .ark-overlay-inspection").click(function (e) {
    if ($(this).is(".ark-popup-close-inspection") || $(e.target).is(".ark-overlay-inspection")) {
      const $modal = $(".ark-overlay-inspection");

      // Reset steps when closing
      $modal.find(".ark-step-1").show().addClass("active");
      $modal.find(".ark-step-2").hide().removeClass("active");

      $modal.fadeOut();
      $("body").removeClass('no-scroll');
    }
  });

  // Next step button
  $(".btn-next-step").click(function (e) {
    e.preventDefault();
    const $step1 = $(this).closest(".ark-step-1");
    const $popupBody = $(this).closest(".ark-popup-body");

    // Dynamic Leave Request Modal Logic
    const $leaveRequestModal = $(this).closest('.ark-modal-leave-request');
    if ($leaveRequestModal.length > 0) {
      const selectedOption = $leaveRequestModal.find('input[name="requestOption"]:checked').val();
      const $title = $leaveRequestModal.find('.ark-popup-title');
      const $popupContainer = $leaveRequestModal.find('.ark-popup.ark-popup-leave-request');

      // Hide step 1
      $step1.hide().removeClass("active");

      // Hide all step 2 variants first
      $popupBody.find(".ark-step-2-buy, .ark-step-2-test-drive, .ark-step-2-exchange").hide().removeClass("active");

      if (selectedOption === 'buy') {
        $title.text('Купити авто');
        $popupContainer.removeClass('wide-layout');
        $popupBody.find('.ark-step-2-buy').show().addClass("active");
      } else if (selectedOption === 'test-drive') {
        $title.text('Тест-драйв');
        $popupContainer.addClass('wide-layout');
        $popupBody.find('.ark-step-2-test-drive').show().addClass("active");
      } else if (selectedOption === 'exchange') {
        $title.text('Обмін авто');
        $popupContainer.addClass('wide-layout');
        $popupBody.find('.ark-step-2-exchange').show().addClass("active");
      }
    } else {
      // Regular modal behavior (Inspection, etc.)
      $step1.hide().removeClass("active");
      $popupBody.find(".ark-step-2").show().addClass("active");
    }
  });

  // Leave Request Modal Open
  $(".leave-request-btn").click(function (e) {
    e.preventDefault();
    const $modal = $(".ark-overlay-leave-request");
    const $button = $(this);

    // Reset all steps first
    $modal.find(".ark-step-1, .ark-step-2-buy, .ark-step-2-test-drive, .ark-step-2-exchange").hide().removeClass("active");

    // Reset indicator visibility
    $modal.find(".ark-step-indicator").css('display', '');

    // Check if button is in hapaiavto-single-top-bar
    if ($button.closest('.hapaiavto-single-top-bar').length > 0) {
      // Open directly on step 2 with "buy" option
      $modal.find(".ark-step-2-buy").show().addClass("active");

      // Set modal title and width for "buy" option
      $modal.find(".ark-popup-leave-request").removeClass("wide-layout");
      $modal.find(".ark-popup-title").text("Купити авто");

      // Pre-select "buy" radio button
      $modal.find('input[name="requestOption"][value="buy"]').prop('checked', true);

      // Hide step indicator if button is in hapaiavto-single-top-right
      if ($button.closest('.hapaiavto-single-top-right').length > 0) {
        $modal.find(".ark-step-indicator").hide();
      }
    } else {
      // Show step 1 for other buttons
      $modal.find(".ark-step-1").show().addClass("active");

      // Reset modal title and width
      $modal.find(".ark-popup-leave-request").removeClass("wide-layout");
      $modal.find(".ark-popup-title").text("Залишити заявку");

      // Reset radio buttons
      $modal.find('input[name="requestOption"]').prop('checked', false);
    }

    $modal.fadeIn();
    $("body").addClass('no-scroll');
  });

  $(".ark-popup-close-leave-request, .ark-overlay-leave-request").click(function (e) {
    if ($(this).is(".ark-popup-close-leave-request") || $(e.target).is(".ark-overlay-leave-request")) {
      const $modal = $(".ark-overlay-leave-request");

      // Reset all steps when closing
      $modal.find(".ark-step-1, .ark-step-2-buy, .ark-step-2-test-drive, .ark-step-2-exchange").hide().removeClass("active");
      $modal.find(".ark-step-1").show().addClass("active");
      $modal.find('input[name="requestOption"]').prop('checked', false);

      $modal.fadeOut();
      $("body").removeClass('no-scroll');
    }
  });

  // Simple Request Modal Open
  $(".simple-request-btn").click(function (e) {
    e.preventDefault();
    $(".ark-overlay-simple-request").fadeIn();
    $("body").addClass('no-scroll');
  });

  $(".ark-popup-close-simple-request, .ark-overlay-simple-request").click(function (e) {
    if ($(this).is(".ark-popup-close-simple-request") || $(e.target).is(".ark-overlay-simple-request")) {
      $(".ark-overlay-simple-request").fadeOut();
      $("body").removeClass('no-scroll');
    }
  });

  // Callback Modal Open
  $(".callback-btn").click(function (e) {
    e.preventDefault();
    $(".ark-overlay-callback").fadeIn();
    $("body").addClass('no-scroll');
  });

  $(".ark-popup-close-callback, .ark-overlay-callback").click(function (e) {
    if ($(this).is(".ark-popup-close-callback") || $(e.target).is(".ark-overlay-callback")) {
      $(".ark-overlay-callback").fadeOut();
      $("body").removeClass('no-scroll');
    }
  });

  // Estimated Payment Calculator
  $('.hapaiavto-ep-calculate-btn').on('click', function () {
    const $block = $(this).closest('.hapaiavto-estimated-payment');
    $block.find('.hapaiavto-ep-collapsed').fadeOut(200, function () {
      $block.find('.hapaiavto-ep-calculator').addClass('is-visible');
    });
  });

  function updateEpCalc() {
    const deposit = parseFloat($('#ep-deposit').val()) || 0;
    const months = parseInt($('#ep-months').val()) || 48;
    const carPriceUsd = 42000; // price of the car in USD
    const usdToUah = 41.5; // approx exchange rate

    const loanUsd = Math.max(0, carPriceUsd - deposit);
    const monthlyUsd = months > 0 ? Math.round(loanUsd / months) : 0;
    const monthlyUah = Math.round(monthlyUsd * usdToUah / 100) * 100;

    const formattedUah = monthlyUah.toLocaleString('uk-UA').replace(/,/g, '\u00a0');
    $('#ep-result-uah').text(formattedUah + '\u00a0грн/міс.');
    $('#ep-result-usd').text(monthlyUsd + '$');
    $('#ep-months-val').text(months);

    // Update slider track fill
    const min = parseInt($('#ep-months').attr('min'));
    const max = parseInt($('#ep-months').attr('max'));
    const percent = ((months - min) / (max - min)) * 100;
    $('#ep-months').css('background', `linear-gradient(to right, #FF4800 ${percent}%, #D9D9D9 ${percent}%)`);
  }

  // Init slider gradient
  updateEpCalc();

  $('#ep-months').on('input', function () {
    updateEpCalc();
  });

  $('#ep-deposit').on('input', function () {
    updateEpCalc();
  });

  // Mobile Single Top Bar Dropdown
  if (window.innerWidth < 576) {
    $('.hapaiavto-single-tabs a:first-child').on('click', function (e) {
      e.preventDefault();
      $('.hapaiavto-single-tabs').toggleClass('is-open');
    });

    $('.hapaiavto-single-tabs a:not(:first-child)').on('click', function (e) {
      e.preventDefault();
      const clickedText = $(this).text();
      const $firstLink = $('.hapaiavto-single-tabs a:first-child');
      const firstText = $firstLink.text();

      $firstLink.text(clickedText);
      $(this).text(firstText);

      $('.hapaiavto-single-tabs').removeClass('is-open');
    });

    $(document).on('click', function (e) {
      if (!$(e.target).closest('.hapaiavto-single-tabs').length) {
        $('.hapaiavto-single-tabs').removeClass('is-open');
      }
    });
  }

}, false);