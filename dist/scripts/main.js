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
          width: "100%"
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
    $('body').addClass('ready')

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

    $('.slider-prdct').each(function(){
      var t = $(this),
          nItem = t.children().length;
      if (nItem > 1){
        t.owlCarousel({
          lazyLoad: false,
          items: 1,
          loop: false,
          dots: false,
          nav: false,
          margin: 0,
          center: false,
          autoplay: false,
          autoplayTimeout: 8000,
          autoplaySpeed: 1200,
          onInitialized  : counter, //When the plugin has initialized.
          onTranslated : counter //When the translation of the stage has finished.
          // animateIn: 'fadeIn',
          // animateOut: 'fadeOut'
        })
      }
      function counter(event) {
        var element   = event.target;         // DOM element, in this example .owl-carousel
         var items     = event.item.count;     // Number of items
         var item      = event.item.index + 1;     // Position of the current item

       // it loop is true then reset counter from 1
       if(item > items) {
         item = item - items
       }
       $('#counter').html(item+"/"+items)
     }
    });
    function sliderBanner(){
      $('.slider-banner').each(function(){
        var t = $(this),
            nItem = t.children().length;
        if (nItem > 1){
          t.owlCarousel({
            lazyLoad: false,
            items: 1,
            loop: false,
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
    }sliderBanner();

    //SLIDER EXTRA SMALL
    function sliderXS() {
      var sliderS = $('.slider-xs');
      console.log($(window).width());
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
      if($('header').length > 0){
        var $header = $('#header'),
            $windowH = $(window).height(),
            $pos = $header.outerHeight(),
            $pos2 = 128;

        $(window).scroll(function(){
          var $top = $(window).scrollTop();
          if($top > $pos2) {
            $header.addClass('fixed');
              $header.addClass('sticky');
          } else {
              $header.removeClass('sticky');
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

    // Btn copy
    function copyme(){
      $('.connotes').each(function(){
        var t = $(this),
            s = t.find('span'),
            c = t.find('.copy');
        c.on('click', function(){
          var d = s.html();
          var valueText = s.select().html();
            document.execCommand("copy");
            // alert("data '" + valueText + "' berhasil di salin" )
          // document.execCommand("copy");
          // console.log(d);
        })
      })
    }copyme();

    var $document = $(document),
        $element = $('.footer'),
        className = 'hasScrolled';

    if($('.add_cart-wrap').length > 0  || $('.grandtotal').length > 0){
      console.log($('.add_cart-wrap').length)
      console.log($('.grandtotal').length)
      $element.addClass(className);
    }
    // if($('.grandtotal').length < 1){
    //   $('.footer').addClass('fixed-to-footer');
    // }

    // $document.scroll(function() {
    //   if ($document.scrollTop() >= 50) {
    //     // user scrolled 50 pixels or more;
    //     // do stuff
    //     // if($('.add_cart-wrap').length > 0){
    //     //   $('.add_cart-wrap').addClass('fixed-to-footer');
    //     // }
    //     // if($('.grandtotal').length > 0){
    //     //   $('.grandtotal').addClass('fixed-to-footer');
    //     // }
    //     // $element.addClass(className);
    //   } else {
    //     // if($('.add_cart-wrap').length > 0){
    //     //   $('.add_cart-wrap').removeClass('fixed-to-footer');
    //     // }
    //     // if($('.grandtotal').length > 0){
    //     //   $('.grandtotal').removeClass('fixed-to-footer');
    //     // }
    //     // $element.removeClass(className);
    //   }
    // });

    $('.message-box').each(function(){
      var t = $(this),
          x = t.find('.close');
      if(t.hasClass('w-close')){
        x.click(function(){
          t.hide();
        })
      }
    })

  }

})();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBqUXVlcnkoJ2ltZy5zdmcnKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuICAgICAgdmFyICRpbWcgPSBqUXVlcnkodGhpcyk7XHJcbiAgICAgIHZhciBpbWdJRCA9ICRpbWcuYXR0cignaWQnKTtcclxuICAgICAgdmFyIGltZ0NsYXNzID0gJGltZy5hdHRyKCdjbGFzcycpO1xyXG4gICAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgIGpRdWVyeS5nZXQoaW1nVVJMLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICB9LCAneG1sJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5JykuaGJhTG9hZEltYWdlcyh7XHJcbiAgICAgIGF0dHJpYnV0ZTogJ2ltZy1zcmMnLFxyXG4gICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHNvdXJjZSwgZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuc3JjID0gc291cmNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmMsIDEwMCk7XHJcbiAgICBzZXRUaW1lb3V0KGJnSW1nLCAxMDApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICQoJy5zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZWN0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIHNpemUgPSAoc2VsZWN0LmRhdGEoJ3NpemUnKSAhPT0gdW5kZWZpbmVkKSA/IHNlbGVjdC5kYXRhKCdzaXplJykgOiA0O1xyXG4gICAgICAgIHNlbGVjdC5zZWxlY3RwaWNrZXIoe1xyXG4gICAgICAgICAgc3R5bGU6ICdzZWxlY3QtY29udHJvbCcsXHJcbiAgICAgICAgICBzaXplOiBzaXplLFxyXG4gICAgICAgICAgbGl2ZVNlYXJjaFBsYWNlaG9sZGVyOiAnU2VhcmNoIGhlcmUuLicsXHJcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCJcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzaXplKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCA4MDApO1xyXG5cclxuICB9aW5pdCgpO1xyXG5cclxuICBmdW5jdGlvbiBiZ0ltZygpIHtcclxuICAgICQoJy5iZy1pbWcnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAkZGF0YSA9ICR0LmRhdGEoJ3NyYycpO1xyXG4gICAgICAkdC5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKCcrJGRhdGErJyknKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmdW5jKCkge1xyXG4gICAgJCgnYm9keScpLmFkZENsYXNzKCdyZWFkeScpXHJcblxyXG4gICAgJCgnLmJhY2stdG8tdG9wJykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sJ3Nsb3cnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vU0xJREVSXHJcbiAgICAkKCcuc2xpZGVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICBuSXRlbSA9IHQuY2hpbGRyZW4oKS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAobkl0ZW0gPiAxKXtcclxuICAgICAgICB0Lm93bENhcm91c2VsKHtcclxuICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgbWFyZ2luOiAyNCxcclxuICAgICAgICAgIGNlbnRlcjogdHJ1ZSxcclxuICAgICAgICAgIG5hdlRleHQ6IFtcIjxzcGFuIGNsYXNzPSdpY29uLWNoZXZyb24tbGVmdCc+PC9zcGFuPlwiLFwiPHNwYW4gY2xhc3M9J2ljb24tY2hldnJvbi1yaWdodCc+PC9zcGFuPlwiXSxcclxuICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA4MDAwLFxyXG4gICAgICAgICAgYXV0b3BsYXlTcGVlZDogMTIwMCxcclxuICAgICAgICAgIGFuaW1hdGVJbjogJ2ZhZGVJbicsXHJcbiAgICAgICAgICBhbmltYXRlT3V0OiAnZmFkZU91dCdcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5zbGlkZXItcHJkY3QnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIG5JdGVtID0gdC5jaGlsZHJlbigpLmxlbmd0aDtcclxuICAgICAgaWYgKG5JdGVtID4gMSl7XHJcbiAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBsYXp5TG9hZDogZmFsc2UsXHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICAgICAgbWFyZ2luOiAwLFxyXG4gICAgICAgICAgY2VudGVyOiBmYWxzZSxcclxuICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogODAwMCxcclxuICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDEyMDAsXHJcbiAgICAgICAgICBvbkluaXRpYWxpemVkICA6IGNvdW50ZXIsIC8vV2hlbiB0aGUgcGx1Z2luIGhhcyBpbml0aWFsaXplZC5cclxuICAgICAgICAgIG9uVHJhbnNsYXRlZCA6IGNvdW50ZXIgLy9XaGVuIHRoZSB0cmFuc2xhdGlvbiBvZiB0aGUgc3RhZ2UgaGFzIGZpbmlzaGVkLlxyXG4gICAgICAgICAgLy8gYW5pbWF0ZUluOiAnZmFkZUluJyxcclxuICAgICAgICAgIC8vIGFuaW1hdGVPdXQ6ICdmYWRlT3V0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgZnVuY3Rpb24gY291bnRlcihldmVudCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ICAgPSBldmVudC50YXJnZXQ7ICAgICAgICAgLy8gRE9NIGVsZW1lbnQsIGluIHRoaXMgZXhhbXBsZSAub3dsLWNhcm91c2VsXHJcbiAgICAgICAgIHZhciBpdGVtcyAgICAgPSBldmVudC5pdGVtLmNvdW50OyAgICAgLy8gTnVtYmVyIG9mIGl0ZW1zXHJcbiAgICAgICAgIHZhciBpdGVtICAgICAgPSBldmVudC5pdGVtLmluZGV4ICsgMTsgICAgIC8vIFBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IGl0ZW1cclxuXHJcbiAgICAgICAvLyBpdCBsb29wIGlzIHRydWUgdGhlbiByZXNldCBjb3VudGVyIGZyb20gMVxyXG4gICAgICAgaWYoaXRlbSA+IGl0ZW1zKSB7XHJcbiAgICAgICAgIGl0ZW0gPSBpdGVtIC0gaXRlbXNcclxuICAgICAgIH1cclxuICAgICAgICQoJyNjb3VudGVyJykuaHRtbChpdGVtK1wiL1wiK2l0ZW1zKVxyXG4gICAgIH1cclxuICAgIH0pO1xyXG4gICAgZnVuY3Rpb24gc2xpZGVyQmFubmVyKCl7XHJcbiAgICAgICQoJy5zbGlkZXItYmFubmVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgbkl0ZW0gPSB0LmNoaWxkcmVuKCkubGVuZ3RoO1xyXG4gICAgICAgIGlmIChuSXRlbSA+IDEpe1xyXG4gICAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIGxhenlMb2FkOiBmYWxzZSxcclxuICAgICAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgbmF2OiBmYWxzZSxcclxuICAgICAgICAgICAgbWFyZ2luOiA4LFxyXG4gICAgICAgICAgICBjZW50ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogODAwMCxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMTIwMCxcclxuICAgICAgICAgICAgLy8gYW5pbWF0ZUluOiAnZmFkZUluJyxcclxuICAgICAgICAgICAgLy8gYW5pbWF0ZU91dDogJ2ZhZGVPdXQnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9c2xpZGVyQmFubmVyKCk7XHJcblxyXG4gICAgLy9TTElERVIgRVhUUkEgU01BTExcclxuICAgIGZ1bmN0aW9uIHNsaWRlclhTKCkge1xyXG4gICAgICB2YXIgc2xpZGVyUyA9ICQoJy5zbGlkZXIteHMnKTtcclxuICAgICAgY29uc29sZS5sb2coJCh3aW5kb3cpLndpZHRoKCkpO1xyXG4gICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjcpIHtcclxuICAgICAgICBzbGlkZXJTLmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKTtcclxuICAgICAgICBzbGlkZXJTLm93bENhcm91c2VsKHtcclxuICAgICAgICAgIC8vIG5hdlRleHQ6IFtcIjxpIGNsYXNzPSdmYXMgZmEtY2hldnJvbi1sZWZ0Jz48L2k+XCIsXCI8aSBjbGFzcz0nZmFzIGZhLWNoZXZyb24tcmlnaHQnPjwvaT5cIl0sXHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgcmVzcG9uc2l2ZSA6IHtcclxuICAgICAgICAgICAgMCA6IHtcclxuICAgICAgICAgICAgICBpdGVtczogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICA0ODAgOiB7XHJcbiAgICAgICAgICAgICAgaXRlbXM6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNsaWRlclMudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICBzbGlkZXJTLmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xyXG4gICAgICB9XHJcbiAgICB9c2xpZGVyWFMoKTtcclxuXHJcbiAgICAkKCcuaW5wdXRmaWxlJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGUgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgYSA9IGUuc2libGluZ3MoXCJsYWJlbFwiKTtcclxuICAgICAgZS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnamFsYW4nKTtcclxuICAgICAgICAgIHZhciB0ID0gJCh0aGlzKS52YWwoKS5zcGxpdChcIlxcXFxcIikucG9wKCk7XHJcbiAgICAgICAgICBhLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtZmlsZS1vIG1yMTBcIj48L2k+ICcgKyB0KSwgZS5jbG9zZXN0KFwiLnVwbG9hZC1maWxlXCIpLmFkZENsYXNzKFwiaGFzLWZpbGVcIilcclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+ICQod2luZG93KS5oZWlnaHQoKS8yKSB7XHJcbiAgICAgICAgJCgnLmJhY2stdG8tdG9wJykuYWRkQ2xhc3MoJ3Nob3cnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcuYmFjay10by10b3AnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIG1hc3RQYXJhbGxheCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRklYRUQgTUVOVVxyXG4gICAgZnVuY3Rpb24gZml4ZWRIZWFkZXIoKSB7XHJcbiAgICAgIGlmKCQoJ2hlYWRlcicpLmxlbmd0aCA+IDApe1xyXG4gICAgICAgIHZhciAkaGVhZGVyID0gJCgnI2hlYWRlcicpLFxyXG4gICAgICAgICAgICAkd2luZG93SCA9ICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgJHBvcyA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKSxcclxuICAgICAgICAgICAgJHBvczIgPSAxMjg7XHJcblxyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciAkdG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgaWYoJHRvcCA+ICRwb3MyKSB7XHJcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoJ2ZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoJHRvcCA9PSAwKSB7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgJCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9Zml4ZWRIZWFkZXIoKTtcclxuXHJcbiAgICAkKCcuaGVhZGVyX21lbnVfaWNvbicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbWVudS1vcGVuJyk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5oYXMtc3ViJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJGxpbmsgPSAkdC5maW5kKCcubGluaycpO1xyXG4gICAgICAkbGluay5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCR0Lmhhc0NsYXNzKCdzdWItb3BlbicpKXtcclxuICAgICAgICAgICR0LnJlbW92ZUNsYXNzKCdzdWItb3BlbicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkKCcuaGFzLXN1YicpLnJlbW92ZUNsYXNzKCdzdWItb3BlbicpO1xyXG4gICAgICAgICAgJHQuYWRkQ2xhc3MoJ3N1Yi1vcGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICBmaXhlZEhlYWRlcigpO1xyXG4gICAgICAvLyBtYXN0UGFyYWxsYXgoKTtcclxuICAgICAgc2xpZGVyWFMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEJ0biBRdHlcclxuICAgICQoJy5idG4tbnVtYmVyJykuY2xpY2soZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIHZhclxyXG4gICAgICAgICAgZmllbGROYW1lID0gJCh0aGlzKS5hdHRyKCdkYXRhLWZpZWxkJyksXHJcbiAgICAgICAgICB0eXBlICAgICAgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdHlwZScpLFxyXG4gICAgICAgICAgaW5wdXQgPSAkKFwiaW5wdXRbbmFtZT0nXCIrZmllbGROYW1lK1wiJ11cIiksXHJcbiAgICAgICAgICBjdXJyZW50VmFsID0gcGFyc2VJbnQoaW5wdXQudmFsKCkpO1xyXG4gICAgICBpZiAoIWlzTmFOKGN1cnJlbnRWYWwpKSB7XHJcbiAgICAgICAgICBpZih0eXBlID09ICdtaW51cycpIHtcclxuXHJcbiAgICAgICAgICAgICAgaWYoY3VycmVudFZhbCA+IGlucHV0LmF0dHIoJ21pbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlucHV0LnZhbChjdXJyZW50VmFsIC0gMSkuY2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmKHBhcnNlSW50KGlucHV0LnZhbCgpKSA9PSBpbnB1dC5hdHRyKCdtaW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0gZWxzZSBpZih0eXBlID09ICdwbHVzJykge1xyXG5cclxuICAgICAgICAgICAgICBpZihjdXJyZW50VmFsIDwgaW5wdXQuYXR0cignbWF4JykpIHtcclxuICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKGN1cnJlbnRWYWwgKyAxKS5jaGFuZ2UoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYocGFyc2VJbnQoaW5wdXQudmFsKCkpID09IGlucHV0LmF0dHIoJ21heCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaW5wdXQudmFsKDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoJy5pbnB1dC1udW1iZXInKS5mb2N1c2luKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQodGhpcykuZGF0YSgnb2xkVmFsdWUnLCAkKHRoaXMpLnZhbCgpKTtcclxuICAgIH0pO1xyXG4gICAgJCgnLmlucHV0LW51bWJlcicpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIG1pblZhbHVlID0gIHBhcnNlSW50KCQodGhpcykuYXR0cignbWluJykpLFxyXG4gICAgICAgIG1heFZhbHVlID0gIHBhcnNlSW50KCQodGhpcykuYXR0cignbWF4JykpLFxyXG4gICAgICAgIHZhbHVlQ3VycmVudCA9IHBhcnNlSW50KCQodGhpcykudmFsKCkpO1xyXG5cclxuICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xyXG4gICAgICAgIGlmKHZhbHVlQ3VycmVudCA+PSBtaW5WYWx1ZSkge1xyXG4gICAgICAgICAgICAkKFwiLmJ0bi1udW1iZXJbZGF0YS10eXBlPSdtaW51cyddW2RhdGEtZmllbGQ9J1wiK25hbWUrXCInXVwiKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoJ1NvcnJ5LCB0aGUgbWluaW11bSB2YWx1ZSB3YXMgcmVhY2hlZCcpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnZhbCgkKHRoaXMpLmRhdGEoJ29sZFZhbHVlJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih2YWx1ZUN1cnJlbnQgPD0gbWF4VmFsdWUpIHtcclxuICAgICAgICAgICAgJChcIi5idG4tbnVtYmVyW2RhdGEtdHlwZT0ncGx1cyddW2RhdGEtZmllbGQ9J1wiK25hbWUrXCInXVwiKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoJ1NvcnJ5LCB0aGUgbWF4aW11bSB2YWx1ZSB3YXMgcmVhY2hlZCcpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnZhbCgkKHRoaXMpLmRhdGEoJ29sZFZhbHVlJykpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEJ0biBjb3B5XHJcbiAgICBmdW5jdGlvbiBjb3B5bWUoKXtcclxuICAgICAgJCgnLmNvbm5vdGVzJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgcyA9IHQuZmluZCgnc3BhbicpLFxyXG4gICAgICAgICAgICBjID0gdC5maW5kKCcuY29weScpO1xyXG4gICAgICAgIGMub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciBkID0gcy5odG1sKCk7XHJcbiAgICAgICAgICB2YXIgdmFsdWVUZXh0ID0gcy5zZWxlY3QoKS5odG1sKCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcclxuICAgICAgICAgICAgLy8gYWxlcnQoXCJkYXRhICdcIiArIHZhbHVlVGV4dCArIFwiJyBiZXJoYXNpbCBkaSBzYWxpblwiIClcclxuICAgICAgICAgIC8vIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGQpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9Y29weW1lKCk7XHJcblxyXG4gICAgdmFyICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpLFxyXG4gICAgICAgICRlbGVtZW50ID0gJCgnLmZvb3RlcicpLFxyXG4gICAgICAgIGNsYXNzTmFtZSA9ICdoYXNTY3JvbGxlZCc7XHJcblxyXG4gICAgaWYoJCgnLmFkZF9jYXJ0LXdyYXAnKS5sZW5ndGggPiAwICB8fCAkKCcuZ3JhbmR0b3RhbCcpLmxlbmd0aCA+IDApe1xyXG4gICAgICBjb25zb2xlLmxvZygkKCcuYWRkX2NhcnQtd3JhcCcpLmxlbmd0aClcclxuICAgICAgY29uc29sZS5sb2coJCgnLmdyYW5kdG90YWwnKS5sZW5ndGgpXHJcbiAgICAgICRlbGVtZW50LmFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcbiAgICAvLyBpZigkKCcuZ3JhbmR0b3RhbCcpLmxlbmd0aCA8IDEpe1xyXG4gICAgLy8gICAkKCcuZm9vdGVyJykuYWRkQ2xhc3MoJ2ZpeGVkLXRvLWZvb3RlcicpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vICRkb2N1bWVudC5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgIGlmICgkZG9jdW1lbnQuc2Nyb2xsVG9wKCkgPj0gNTApIHtcclxuICAgIC8vICAgICAvLyB1c2VyIHNjcm9sbGVkIDUwIHBpeGVscyBvciBtb3JlO1xyXG4gICAgLy8gICAgIC8vIGRvIHN0dWZmXHJcbiAgICAvLyAgICAgLy8gaWYoJCgnLmFkZF9jYXJ0LXdyYXAnKS5sZW5ndGggPiAwKXtcclxuICAgIC8vICAgICAvLyAgICQoJy5hZGRfY2FydC13cmFwJykuYWRkQ2xhc3MoJ2ZpeGVkLXRvLWZvb3RlcicpO1xyXG4gICAgLy8gICAgIC8vIH1cclxuICAgIC8vICAgICAvLyBpZigkKCcuZ3JhbmR0b3RhbCcpLmxlbmd0aCA+IDApe1xyXG4gICAgLy8gICAgIC8vICAgJCgnLmdyYW5kdG90YWwnKS5hZGRDbGFzcygnZml4ZWQtdG8tZm9vdGVyJyk7XHJcbiAgICAvLyAgICAgLy8gfVxyXG4gICAgLy8gICAgIC8vICRlbGVtZW50LmFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgLy8gaWYoJCgnLmFkZF9jYXJ0LXdyYXAnKS5sZW5ndGggPiAwKXtcclxuICAgIC8vICAgICAvLyAgICQoJy5hZGRfY2FydC13cmFwJykucmVtb3ZlQ2xhc3MoJ2ZpeGVkLXRvLWZvb3RlcicpO1xyXG4gICAgLy8gICAgIC8vIH1cclxuICAgIC8vICAgICAvLyBpZigkKCcuZ3JhbmR0b3RhbCcpLmxlbmd0aCA+IDApe1xyXG4gICAgLy8gICAgIC8vICAgJCgnLmdyYW5kdG90YWwnKS5yZW1vdmVDbGFzcygnZml4ZWQtdG8tZm9vdGVyJyk7XHJcbiAgICAvLyAgICAgLy8gfVxyXG4gICAgLy8gICAgIC8vICRlbGVtZW50LnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0pO1xyXG5cclxuICAgICQoJy5tZXNzYWdlLWJveCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgeCA9IHQuZmluZCgnLmNsb3NlJyk7XHJcbiAgICAgIGlmKHQuaGFzQ2xhc3MoJ3ctY2xvc2UnKSl7XHJcbiAgICAgICAgeC5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdC5oaWRlKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG5cclxufSkoKTtcclxuXHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9

//# sourceMappingURL=main.js.map
