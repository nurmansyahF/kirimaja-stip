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


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBqUXVlcnkoJ2ltZy5zdmcnKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuICAgICAgdmFyICRpbWcgPSBqUXVlcnkodGhpcyk7XHJcbiAgICAgIHZhciBpbWdJRCA9ICRpbWcuYXR0cignaWQnKTtcclxuICAgICAgdmFyIGltZ0NsYXNzID0gJGltZy5hdHRyKCdjbGFzcycpO1xyXG4gICAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgIGpRdWVyeS5nZXQoaW1nVVJMLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICB9LCAneG1sJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5JykuaGJhTG9hZEltYWdlcyh7XHJcbiAgICAgIGF0dHJpYnV0ZTogJ2ltZy1zcmMnLFxyXG4gICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHNvdXJjZSwgZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuc3JjID0gc291cmNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmMsIDEwMCk7XHJcbiAgICBzZXRUaW1lb3V0KGJnSW1nLCAxMDApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICQoJy5zZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZWN0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIHNpemUgPSAoc2VsZWN0LmRhdGEoJ3NpemUnKSAhPT0gdW5kZWZpbmVkKSA/IHNlbGVjdC5kYXRhKCdzaXplJykgOiA0O1xyXG4gICAgICAgIHNlbGVjdC5zZWxlY3RwaWNrZXIoe1xyXG4gICAgICAgICAgc3R5bGU6ICdzZWxlY3QtY29udHJvbCcsXHJcbiAgICAgICAgICBzaXplOiBzaXplLFxyXG4gICAgICAgICAgbGl2ZVNlYXJjaFBsYWNlaG9sZGVyOiAnU2VhcmNoIGhlcmUuLicsXHJcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coc2l6ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgODAwKTtcclxuXHJcbiAgfWluaXQoKTtcclxuXHJcbiAgZnVuY3Rpb24gYmdJbWcoKSB7XHJcbiAgICAkKCcuYmctaW1nJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJGRhdGEgPSAkdC5kYXRhKCdzcmMnKTtcclxuICAgICAgJHQuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybCgnKyRkYXRhKycpJyk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZnVuYygpIHtcclxuICAgICQoJ2JvZHknKS5hZGRDbGFzcygncmVhZHknKVxyXG5cclxuICAgICQoJy5iYWNrLXRvLXRvcCcpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCdzbG93Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL1NMSURFUlxyXG4gICAgJCgnLnNsaWRlcicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgbkl0ZW0gPSB0LmNoaWxkcmVuKCkubGVuZ3RoO1xyXG5cclxuICAgICAgaWYgKG5JdGVtID4gMSl7XHJcbiAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgIG5hdjogdHJ1ZSxcclxuICAgICAgICAgIG1hcmdpbjogMjQsXHJcbiAgICAgICAgICBjZW50ZXI6IHRydWUsXHJcbiAgICAgICAgICBuYXZUZXh0OiBbXCI8c3BhbiBjbGFzcz0naWNvbi1jaGV2cm9uLWxlZnQnPjwvc3Bhbj5cIixcIjxzcGFuIGNsYXNzPSdpY29uLWNoZXZyb24tcmlnaHQnPjwvc3Bhbj5cIl0sXHJcbiAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogODAwMCxcclxuICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDEyMDAsXHJcbiAgICAgICAgICBhbmltYXRlSW46ICdmYWRlSW4nLFxyXG4gICAgICAgICAgYW5pbWF0ZU91dDogJ2ZhZGVPdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIGZ1bmN0aW9uIHNsaWRlckJhbm5lcigpe1xyXG4gICAgICAkKCcuc2xpZGVyLWJhbm5lcicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIG5JdGVtID0gdC5jaGlsZHJlbigpLmxlbmd0aDtcclxuICAgICAgICBpZiAobkl0ZW0gPiAxKXtcclxuICAgICAgICAgIHQuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpO1xyXG4gICAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIGxhenlMb2FkOiB0cnVlLFxyXG4gICAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgIG1hcmdpbjogOCxcclxuICAgICAgICAgICAgY2VudGVyOiBmYWxzZSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDgwMDAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDEyMDAsXHJcbiAgICAgICAgICAgIC8vIGFuaW1hdGVJbjogJ2ZhZGVJbicsXHJcbiAgICAgICAgICAgIC8vIGFuaW1hdGVPdXQ6ICdmYWRlT3V0J1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBzbGlkZXJCYW5uZXIoKTtcclxuICAgIH0sIDgwMCk7XHJcbiAgICAvL1NMSURFUiBFWFRSQSBTTUFMTFxyXG4gICAgZnVuY3Rpb24gc2xpZGVyWFMoKSB7XHJcbiAgICAgIHZhciBzbGlkZXJTID0gJCgnLnNsaWRlci14cycpO1xyXG4gICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjcpIHtcclxuICAgICAgICBzbGlkZXJTLmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKTtcclxuICAgICAgICBzbGlkZXJTLm93bENhcm91c2VsKHtcclxuICAgICAgICAgIC8vIG5hdlRleHQ6IFtcIjxpIGNsYXNzPSdmYXMgZmEtY2hldnJvbi1sZWZ0Jz48L2k+XCIsXCI8aSBjbGFzcz0nZmFzIGZhLWNoZXZyb24tcmlnaHQnPjwvaT5cIl0sXHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgcmVzcG9uc2l2ZSA6IHtcclxuICAgICAgICAgICAgMCA6IHtcclxuICAgICAgICAgICAgICBpdGVtczogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICA0ODAgOiB7XHJcbiAgICAgICAgICAgICAgaXRlbXM6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNsaWRlclMudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICBzbGlkZXJTLmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xyXG4gICAgICB9XHJcbiAgICB9c2xpZGVyWFMoKTtcclxuXHJcbiAgICAkKCcuaW5wdXRmaWxlJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGUgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgYSA9IGUuc2libGluZ3MoXCJsYWJlbFwiKTtcclxuICAgICAgZS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnamFsYW4nKTtcclxuICAgICAgICAgIHZhciB0ID0gJCh0aGlzKS52YWwoKS5zcGxpdChcIlxcXFxcIikucG9wKCk7XHJcbiAgICAgICAgICBhLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtZmlsZS1vIG1yMTBcIj48L2k+ICcgKyB0KSwgZS5jbG9zZXN0KFwiLnVwbG9hZC1maWxlXCIpLmFkZENsYXNzKFwiaGFzLWZpbGVcIilcclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+ICQod2luZG93KS5oZWlnaHQoKS8yKSB7XHJcbiAgICAgICAgJCgnLmJhY2stdG8tdG9wJykuYWRkQ2xhc3MoJ3Nob3cnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcuYmFjay10by10b3AnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIG1hc3RQYXJhbGxheCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRklYRUQgTUVOVVxyXG4gICAgZnVuY3Rpb24gZml4ZWRIZWFkZXIoKSB7XHJcbiAgICAgIGlmKCQoJ2hlYWRlcicpLmxlbmd0aCA+IDAgJiYgJCh3aW5kb3cpLndpZHRoKCkgPiAxMDI1KXtcclxuICAgICAgICB2YXIgJGhlYWRlciA9ICQoJyNoZWFkZXInKSxcclxuICAgICAgICAgICAgJHdpbmRvd0ggPSAkKHdpbmRvdykuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgICRwb3MgPSAkaGVhZGVyLm91dGVySGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciAkdG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgaWYoJHRvcCA+ICRwb3MpIHtcclxuICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnZml4ZWQnKTtcclxuICAgICAgICAgICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgICAvLyB9LCA3MDApXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgIC8vIH0sIDcwMClcclxuICAgICAgICAgICAgJGhlYWRlci5yZW1vdmVDbGFzcygnZml4ZWQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKCR0b3AgPT0gMCkge1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgICQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuICAgICAgICAkKCdoZWFkZXInKS5yZW1vdmVDbGFzcygnZml4ZWQnKTtcclxuICAgICAgfVxyXG4gICAgfWZpeGVkSGVhZGVyKCk7XHJcblxyXG4gICAgJCgnLmhlYWRlcl9tZW51X2ljb24nKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgfSlcclxuXHJcbiAgICAkKCcuaGFzLXN1YicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAgICRsaW5rID0gJHQuZmluZCgnLmxpbmsnKTtcclxuICAgICAgJGxpbmsuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICBpZigkdC5oYXNDbGFzcygnc3ViLW9wZW4nKSl7XHJcbiAgICAgICAgICAkdC5yZW1vdmVDbGFzcygnc3ViLW9wZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJCgnLmhhcy1zdWInKS5yZW1vdmVDbGFzcygnc3ViLW9wZW4nKTtcclxuICAgICAgICAgICR0LmFkZENsYXNzKCdzdWItb3BlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgZml4ZWRIZWFkZXIoKTtcclxuICAgICAgLy8gbWFzdFBhcmFsbGF4KCk7XHJcbiAgICAgIHNsaWRlclhTKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBCdG4gUXR5XHJcbiAgICAkKCcuYnRuLW51bWJlcicpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICB2YXJcclxuICAgICAgICAgIGZpZWxkTmFtZSA9ICQodGhpcykuYXR0cignZGF0YS1maWVsZCcpLFxyXG4gICAgICAgICAgdHlwZSAgICAgID0gJCh0aGlzKS5hdHRyKCdkYXRhLXR5cGUnKSxcclxuICAgICAgICAgIGlucHV0ID0gJChcImlucHV0W25hbWU9J1wiK2ZpZWxkTmFtZStcIiddXCIpLFxyXG4gICAgICAgICAgY3VycmVudFZhbCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKTtcclxuICAgICAgaWYgKCFpc05hTihjdXJyZW50VmFsKSkge1xyXG4gICAgICAgICAgaWYodHlwZSA9PSAnbWludXMnKSB7XHJcblxyXG4gICAgICAgICAgICAgIGlmKGN1cnJlbnRWYWwgPiBpbnB1dC5hdHRyKCdtaW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICBpbnB1dC52YWwoY3VycmVudFZhbCAtIDEpLmNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZihwYXJzZUludChpbnB1dC52YWwoKSkgPT0gaW5wdXQuYXR0cignbWluJykpIHtcclxuICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9IGVsc2UgaWYodHlwZSA9PSAncGx1cycpIHtcclxuXHJcbiAgICAgICAgICAgICAgaWYoY3VycmVudFZhbCA8IGlucHV0LmF0dHIoJ21heCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlucHV0LnZhbChjdXJyZW50VmFsICsgMSkuY2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmKHBhcnNlSW50KGlucHV0LnZhbCgpKSA9PSBpbnB1dC5hdHRyKCdtYXgnKSkge1xyXG4gICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlucHV0LnZhbCgwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKCcuaW5wdXQtbnVtYmVyJykuZm9jdXNpbihmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLmRhdGEoJ29sZFZhbHVlJywgJCh0aGlzKS52YWwoKSk7XHJcbiAgICB9KTtcclxuICAgICQoJy5pbnB1dC1udW1iZXInKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBtaW5WYWx1ZSA9ICBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ21pbicpKSxcclxuICAgICAgICBtYXhWYWx1ZSA9ICBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ21heCcpKSxcclxuICAgICAgICB2YWx1ZUN1cnJlbnQgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpKTtcclxuXHJcbiAgICAgICAgdmFyIG5hbWUgPSAkKHRoaXMpLmF0dHIoJ25hbWUnKTtcclxuICAgICAgICBpZih2YWx1ZUN1cnJlbnQgPj0gbWluVmFsdWUpIHtcclxuICAgICAgICAgICAgJChcIi5idG4tbnVtYmVyW2RhdGEtdHlwZT0nbWludXMnXVtkYXRhLWZpZWxkPSdcIituYW1lK1wiJ11cIikucmVtb3ZlQXR0cignZGlzYWJsZWQnKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdTb3JyeSwgdGhlIG1pbmltdW0gdmFsdWUgd2FzIHJlYWNoZWQnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS52YWwoJCh0aGlzKS5kYXRhKCdvbGRWYWx1ZScpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodmFsdWVDdXJyZW50IDw9IG1heFZhbHVlKSB7XHJcbiAgICAgICAgICAgICQoXCIuYnRuLW51bWJlcltkYXRhLXR5cGU9J3BsdXMnXVtkYXRhLWZpZWxkPSdcIituYW1lK1wiJ11cIikucmVtb3ZlQXR0cignZGlzYWJsZWQnKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdTb3JyeSwgdGhlIG1heGltdW0gdmFsdWUgd2FzIHJlYWNoZWQnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS52YWwoJCh0aGlzKS5kYXRhKCdvbGRWYWx1ZScpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxufSkoKTtcclxuXHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9

//# sourceMappingURL=main.js.map
