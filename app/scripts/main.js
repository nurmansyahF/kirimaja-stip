(function() {
  'use strict';

  function init() {
    jQuery('img.svg').each(function(i) {
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      jQuery.get(imgURL, function(data) {
        var $svg = jQuery(data).find('svg');
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);
      }, 'xml');
    });

    $('body').hbaLoadImages({
      attribute: 'img-src',
      onSuccess: function(source, element) {
        element.src = source;
      }
    });

    setTimeout(func, 100);
    setTimeout(bgImg, 100);

    setTimeout(function() {
      $('.select').each(function () {
        var select = $(this),
          size = (select.data('size') !== undefined) ? select.data('size') : 4;
        select.selectpicker({
          style: 'select-control',
          size: size,
          liveSearchPlaceholder: 'Search here..',
          width: "100%",
        });
        // console.log(size);
      });
    }, 800);

  }init();

  function bgImg() {
    $('.bg-img').each(function(){
      var $t = $(this),
          $data = $t.data('src');
      $t.css('background-image', 'url('+$data+')');
    })
  }

  function func() {
    // $('body').addClass('ready')

    $('.back-to-top').on('click',function(){
      $("html, body").animate({ scrollTop: 0 },'slow');
    });

    //SLIDER
    $('.slider').each(function(){
      var t = $(this),
          nItem = t.children().length;

      if (nItem > 1){
        t.owlCarousel({
          items: 1,
          loop: true,
          dots: false,
          nav: true,
          margin: 24,
          center: true,
          navText: ["<span class='icon-chevron-left'></span>","<span class='icon-chevron-right'></span>"],
          autoplay: true,
          autoplayTimeout: 8000,
          autoplaySpeed: 1200,
          animateIn: 'fadeIn',
          animateOut: 'fadeOut'
        })
      }
    })
    function sliderBanner(){
      $('.slider-banner').each(function(){
        var t = $(this),
            nItem = t.children().length;
        if (nItem > 1){
          t.addClass('owl-carousel');
          t.owlCarousel({
            lazyLoad: true,
            items: 1,
            loop: true,
            dots: false,
            nav: false,
            margin: 8,
            center: false,
            autoplay: false,
            autoplayTimeout: 8000,
            autoplaySpeed: 1200,
            // animateIn: 'fadeIn',
            // animateOut: 'fadeOut'
          })
        }
      });
    }


    setTimeout(function() {
      sliderBanner();
    }, 800);
    //SLIDER EXTRA SMALL
    function sliderXS() {
      var sliderS = $('.slider-xs');
      if ($(window).width() < 767) {
        sliderS.addClass('owl-carousel');
        sliderS.owlCarousel({
          // navText: ["<i class='fas fa-chevron-left'></i>","<i class='fas fa-chevron-right'></i>"],
          items: 1,
          loop: true,
          nav: false,
          dots: true,
          autoplay: true,
          responsive : {
            0 : {
              items: 1
            },
            480 : {
              items: 1
            }
          }
        });
      } else {
        sliderS.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        sliderS.find('.owl-stage-outer').children().unwrap();
      }
    }sliderXS();

    $('.inputfile').each(function() {
      var e = $(this),
          a = e.siblings("label");
      e.change(function() {
          console.log('jalan');
          var t = $(this).val().split("\\").pop();
          a.html('<i class="fa fa-file-o mr10"></i> ' + t), e.closest(".upload-file").addClass("has-file")
      })
    })

    $(window).scroll(function() {
      if ($(window).scrollTop() > $(window).height()/2) {
        $('.back-to-top').addClass('show');
      } else {
        $('.back-to-top').removeClass('show');
      }
      // mastParallax();
    });

    // FIXED MENU
    function fixedHeader() {
      if($('header').length > 0 && $(window).width() > 1025){
        var $header = $('#header'),
            $windowH = $(window).height(),
            $pos = $header.outerHeight();

        $(window).scroll(function(){
          var $top = $(window).scrollTop();
          if($top > $pos) {
            $header.addClass('fixed');
            // setTimeout(function(){
              $header.addClass('sticky');
            // }, 700)
          } else {
            // setTimeout(function(){
              $header.removeClass('sticky');
            // }, 700)
            $header.removeClass('fixed');
          }
          if($top == 0) {
          }
        })
      }else{
        $('header').removeClass('sticky');
        $('header').removeClass('fixed');
      }
    }fixedHeader();

    $('.header_menu_icon').click(function(){
      $('body').toggleClass('menu-open');
    })

    $('.has-sub').each(function(){
      var $t = $(this),
          $link = $t.find('.link');
      $link.click(function(){
        if($t.hasClass('sub-open')){
          $t.removeClass('sub-open');
        } else {
          $('.has-sub').removeClass('sub-open');
          $t.addClass('sub-open');
        }
      })
    })

    $(window).resize(function() {
      fixedHeader();
      // mastParallax();
      sliderXS();
    });

    // Btn Qty
    $('.btn-number').click(function(e){
      e.preventDefault();

      var
          fieldName = $(this).attr('data-field'),
          type      = $(this).attr('data-type'),
          input = $("input[name='"+fieldName+"']"),
          currentVal = parseInt(input.val());
      if (!isNaN(currentVal)) {
          if(type == 'minus') {

              if(currentVal > input.attr('min')) {
                  input.val(currentVal - 1).change();
              }
              if(parseInt(input.val()) == input.attr('min')) {
                  $(this).attr('disabled', true);
              }

          } else if(type == 'plus') {

              if(currentVal < input.attr('max')) {
                  input.val(currentVal + 1).change();
              }
              if(parseInt(input.val()) == input.attr('max')) {
                  $(this).attr('disabled', true);
              }

          }
      } else {
          input.val(0);
      }
    });
    $('.input-number').focusin(function(){
      $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function() {

        var minValue =  parseInt($(this).attr('min')),
        maxValue =  parseInt($(this).attr('max')),
        valueCurrent = parseInt($(this).val());

        var name = $(this).attr('name');
        if(valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if(valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }
    });

  }

})();

