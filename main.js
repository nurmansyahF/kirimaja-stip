/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
    'use strict';

    function init(){
        jQuery('img.svg').each(function(i){
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
        setTimeout(func,500);
    }
    function func(){
        $('.timer').each(function(){
            var date = $(this).data('end');
            $(this).countdown(date, function(event) {
                $(this).text(
                    event.strftime('%-I:%M:%S')
                );
            });
        });
        $('[data-toggle="depend"]').click(function(e){
            e.preventDefault();
            var t = $(this),
                target = $(t.attr('href')),
                hide = $(t.data('hide'));

            target.slideDown('slow');
            if(hide.length>0){
                hide.slideUp('slow');
            }

        })
        $('[data-toggle="depend-radio"]').change(function(){
            var t = $(this),
                target = $(t.data('target')),
                hide = $(t.data('hide')),
                sib = $('input[name="'+t.attr('name')+'"]'),
                isCheck = $(this).is(':checked');
            Do(isCheck);


            sib.change(function(){
                var c = t.is(':checked');
                Do(c);
            })
            function Do(bol){
                if(bol){
                    target.slideDown('slow');
                    if(hide.length>0){
                        hide.slideUp('slow');
                    }
                }else{
                    target.slideUp('slow');
                }
            }
        })
        $('footer').find('h3').each(function(){
            $(this).click(function(){
                $(this).parent().toggleClass('open');

            })
        })
        $('.burger-icon').unbind().click(function(e){
            e.preventDefault();
            $('body').toggleClass('open');
        });
        $('[data-toggle="tooltip"]').tooltip()

        var ct=0;
        $(window).scroll(function(){

            $('header').each(function(){

                var hh = $('header').height();
                //$(window).scroll(function(){
                var top = $(window).scrollTop(),
                    h = $(window).height(),
                    header = $('header');
                if(!$('.nav-menu').hasClass('open')){
                    if(top > hh){
                        header.addClass('fixed');
                        $('.cart').removeClass('in');
                    }else{
                        header.removeClass('fixed')
                    }
                    if(ct> top){
                        header.addClass('sticky');
                    }else{
                        header.removeClass('sticky');
                    }

                    if(top>h){
                        jQuery('.back-to-top').removeClass('h');
                    }else{
                        jQuery('.back-to-top').addClass('h');
                    }

                    ct = top;
                }
                //});
            });
            /*$('footer').each(function(){
             var screenbot = $(this).offset().top - $(window).height(),
             screentop = $(this).offset().top + $(this).height(),
             screencurr = $(document).scrollTop()+$(window).height();
             if(screencurr >= screentop ){
             $('.wrap').addClass('scale');
             }else{
             $('.wrap').removeClass('scale');
             }
             })*/
        })


        $('.scroll').click(function(e){
            e.preventDefault();
            var t = $(this).attr('href'),top,
                hm = $(window).width()<768? 20: 0;
            top= t=="#" ? 0:$(t).offset().top;
            top = top;
            $('body').removeClass('open-nav');
            $("html, body").animate({ scrollTop: top+"px" },'slow');
        });

        function slidermobile(){
            var w =$(window).width(),slider = $('.slider-xs');
            if(w<768){
                slider.addClass('owl-carousel').removeClass('ns');
                slider.each(function(){
                    var t = $(this),
                        item = t.attr('data-items') ? t.attr('data-items') : 1,
                        navs = t.attr('data-nav') && t.attr('data-nav')=="no" ? false : true,
                        dot = navs ? false : true,
                        loops = t.attr('data-loop') && t.attr('data-loop')=="no" ? false : true,
                        itemtab = item > 3 ? 3 : item,
                        itemltab =item > 4 ? 4 : item;
                    t.owlCarousel({
                        loop:false,
                        dots:true,
                        nav: false,
                        autoplay: true,
                        autoHeight: true,
                        autoplayTimeout: 4000,
                        autoplaySpeed: 800,
                        responsive : {
                            0 : {
                                items: item
                            },
                            992 : {
                                items: 3
                            },
                        }
                    })
                })


            }else{
                slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                slider.find('.owl-stage-outer').children().unwrap();
            }
        }
        slidermobile();
        $(window).resize(function(){
            slidermobile();
        });

        $("body").find('.buddies.kontak  input').keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            console.log(e.keyCode);
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

        $('.slider').each(function(){
            var t = $(this),
                item = t.attr('data-items') ? t.attr('data-items') : 1,
                navs = t.attr('data-nav') && t.attr('data-nav')=="no" ? false : true,
                centers = t.attr('data-center') && t.attr('data-center')=="yes" ? true : false,
                dot = navs ? false : true,
                loops = t.attr('data-loop') && t.attr('data-loop')=="no" ? false : true,
                itemtab = item > 3 ? 3 : item,
                itemltab =item > 4 ? 4 : item,
                child = t.children().length;
            console.log(dot);
            if(child>=item){
                t.addClass('owl-carousel').each(function(){
                    var t = $(this);
                    t.owlCarousel({
                        loop: loops,
                        dots: dot,
                        nav: navs,
                        navText : ["<span class='fa fa-angle-left'></span>","<span class='fa fa-angle-right'></span>"],
                        autoplay: true,
                        autoplayTimeout: 4000,
                        autoplaySpeed: 800,
                        center: centers,
                        responsive: {
                            0: {
                                items: 1
                            },
                            768:{
                                items: itemtab
                            },
                            992:{
                                items: itemltab
                            },1200:{
                                items: item
                            }
                        }
                    })
                })
            }else{
                t.addClass('no-slider');
                function res(){
                  var w = $(window).width();
                  if(w<992){
                      t.addClass('owl-carousel').removeClass('no-slider');
                      t.each(function(){
                          var t = $(this),
                              item = t.attr('data-items') ? t.attr('data-items') : 1,
                              navs = t.attr('data-nav') && t.attr('data-nav')=="no" ? false : true,
                              dot = navs ? false : true,
                              loops = t.attr('data-loop') && t.attr('data-loop')=="no" ? false : true,
                              itemtab = item > 3 ? 3 : item,
                              itemltab =item > 4 ? 4 : item;
                          t.owlCarousel({
                              loop:false,
                              dots:true,
                              nav: false,
                              autoplay: true,
                              center: centers,
                              autoHeight: true,
                              autoplayTimeout: 4000,
                              autoplaySpeed: 800,
                              responsive : {
                                  0 : {
                                      items: 1
                                  },
                                  768 : {
                                      items: 3
                                  },
                              }
                          })
                      })


                  }else{
                      t.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                      t.find('.owl-stage-outer').children().unwrap();
                      t.addClass('no-slider');
                  }
                }
                res();
                $(window).resize(res);
                  
            }

        });

        $('ul.tab').each(function(){
            var t = $(this),
                a = t.find('a'),
                html = "",
                select = $('<select>'),
                st = $("<div class='select-tab' />");
            a.each(function(){
                html+="<option>"+$(this).find('span').text()+"</option>";
            })
            select.html(html);
            st.append(select);
            st.insertAfter(t);

            select.change(function(){
                var sel = $(this).find("option:selected").index();
                a.eq(sel).click();
            })
        });
        $('select').addClass('select').selectpicker({
            style: 'select-control',
            size: 4
        });

        $(document).bind('gform_post_render', function(){
            $('select.gfield_select').addClass('select').each(function(){
                $(this).selectpicker({
                    style: 'select-control',
                    size: 4
                });
            });
        });

        $('.hero h1 b').each(function(){
            $(this).wrapInner('<span/>');
        })


    }
    $(document).ready(function(){
        var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        var is_safari = navigator.userAgent.indexOf("Safari") > -1;
        var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
        if ((is_chrome)&&(is_safari)) {is_safari=false;}
        if ((is_chrome)&&(is_opera)) {is_chrome=false;}
        function getOS() {
            var userAgent = window.navigator.userAgent,
                platform = window.navigator.platform,
                macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
                windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
                iosPlatforms = ['iPhone', 'iPad', 'iPod'],
                os = null;

            if (macosPlatforms.indexOf(platform) !== -1) {
                os = 'mac';
            } else if (iosPlatforms.indexOf(platform) !== -1) {
                os = 'iOS';
            } else if (windowsPlatforms.indexOf(platform) !== -1) {
                os = 'Windows';
            } else if (/Android/.test(userAgent)) {
                os = 'Android';
            } else if (!os && /Linux/.test(platform)) {
                os = 'Linux';
            }

            return os;
        }

        var os = getOS();
        console.log(os);
        if(os=="mac"){
            $('body').addClass('safari');
        }

        init();
        $('#help').on('shown.bs.modal',function(){
            $('.modal-backdrop').addClass('blue');
        })
        $('.app').each(function(){
            var t = $(this),
                con = t.find('.con'),
                item = t.find("[data-img]"),
                slider = t.find('.owl-carousel');


            item.click(function(){
                var img = $(this).data('img');
                con.find('img').attr('src',img);
                $(this).addClass('active').siblings().removeClass('active');
            });
            item.eq(0).click();

            $('body').on('translated.owl.carousel','.app .slider-xs',function(){
                var t = $(this),
                    active = t.find('.owl-item.active').eq(0),
                    item = active.find('[data-img]');

                item.click();
            })
        })

        $('.testimonial').each(function(){
            var t = $(this),
                con = t.find('.con'),
                item = t.find(".item"),
                slider = t.find('.owl-carousel');


            item.click(function(){
                var n = $(this).data('item');
                con.eq(n).show().siblings().hide();
                item.removeClass('active');
                $(this).addClass('active');
            })

            $('body').on('translated.owl.carousel','.testimonial .slider',function(){
                var t = $(this),
                    active = t.find('.owl-item.active').eq(0),
                    item = active.find('.item');

                item.click();
            })
            item.eq(0).click();
        })

        // $('.subscribe form').validate({
        //     submitHandler: function(el){
        //
        //         $(el).find('button').text("loading...");
        //         setTimeout(function(){
        //             $('#alert').modal('show');
        //             $(el).find(":input").val("");
        //             $(el).find('button').text("subscribe");
        //         },500)
        //
        //     }
        // })





    })

})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG4gKlxyXG4gKiAgV2ViIFN0YXJ0ZXIgS2l0XHJcbiAqICBDb3B5cmlnaHQgMjAxNSBHb29nbGUgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwczovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlXHJcbiAqXHJcbiAqL1xyXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cclxuKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgICBqUXVlcnkoJ2ltZy5zdmcnKS5lYWNoKGZ1bmN0aW9uKGkpe1xyXG4gICAgICAgIHZhciAkaW1nID0galF1ZXJ5KHRoaXMpO1xyXG4gICAgICAgIHZhciBpbWdJRCA9ICRpbWcuYXR0cignaWQnKTtcclxuICAgICAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgICAgdmFyIGltZ1VSTCA9ICRpbWcuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICAgIGpRdWVyeS5nZXQoaW1nVVJMLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgU1ZHIHRhZywgaWdub3JlIHRoZSByZXN0XHJcbiAgICAgICAgICAgIHZhciAkc3ZnID0galF1ZXJ5KGRhdGEpLmZpbmQoJ3N2ZycpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHJlcGxhY2VkIGltYWdlJ3MgSUQgdG8gdGhlIG5ldyBTVkdcclxuICAgICAgICAgICAgaWYodHlwZW9mIGltZ0lEICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignaWQnLCBpbWdJRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQWRkIHJlcGxhY2VkIGltYWdlJ3MgY2xhc3NlcyB0byB0aGUgbmV3IFNWR1xyXG4gICAgICAgICAgICBpZih0eXBlb2YgaW1nQ2xhc3MgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzKycgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbnkgaW52YWxpZCBYTUwgdGFncyBhcyBwZXIgaHR0cDovL3ZhbGlkYXRvci53My5vcmdcclxuICAgICAgICAgICAgJHN2ZyA9ICRzdmcucmVtb3ZlQXR0cigneG1sbnM6YScpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVwbGFjZSBpbWFnZSB3aXRoIG5ldyBTVkdcclxuICAgICAgICAgICAgJGltZy5yZXBsYWNlV2l0aCgkc3ZnKTtcclxuXHJcbiAgICAgICAgfSwgJ3htbCcpO1xyXG5cclxuICAgIH0pO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmMsNTAwKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gZnVuYygpe1xyXG4gICAgJCgnLnRpbWVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgZGF0ZSA9ICQodGhpcykuZGF0YSgnZW5kJyk7XHJcbiAgICAgICQodGhpcykuY291bnRkb3duKGRhdGUsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgJCh0aGlzKS50ZXh0KFxyXG4gICAgICAgICAgZXZlbnQuc3RyZnRpbWUoJyUtSTolTTolUycpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cImRlcGVuZFwiXScpLmNsaWNrKGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIHRhcmdldCA9ICQodC5hdHRyKCdocmVmJykpLFxyXG4gICAgICAgICAgaGlkZSA9ICQodC5kYXRhKCdoaWRlJykpO1xyXG5cclxuICAgICAgdGFyZ2V0LnNsaWRlRG93bignc2xvdycpO1xyXG4gICAgICBpZihoaWRlLmxlbmd0aD4wKXtcclxuICAgICAgICBoaWRlLnNsaWRlVXAoJ3Nsb3cnKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0pXHJcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJkZXBlbmQtcmFkaW9cIl0nKS5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgdGFyZ2V0ID0gJCh0LmRhdGEoJ3RhcmdldCcpKSxcclxuICAgICAgICAgIGhpZGUgPSAkKHQuZGF0YSgnaGlkZScpKSxcclxuICAgICAgICAgIHNpYiA9ICQoJ2lucHV0W25hbWU9XCInK3QuYXR0cignbmFtZScpKydcIl0nKSxcclxuICAgICAgICAgIGlzQ2hlY2sgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xyXG4gICAgICAgICAgRG8oaXNDaGVjayk7XHJcblxyXG5cclxuICAgICAgc2liLmNoYW5nZShmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBjID0gdC5pcygnOmNoZWNrZWQnKTtcclxuICAgICAgICBEbyhjKTtcclxuICAgICAgfSlcclxuICAgICAgZnVuY3Rpb24gRG8oYm9sKXtcclxuICAgICAgICBpZihib2wpe1xyXG4gICAgICAgICAgdGFyZ2V0LnNsaWRlRG93bignc2xvdycpO1xyXG4gICAgICAgICAgaWYoaGlkZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGhpZGUuc2xpZGVVcCgnc2xvdycpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgdGFyZ2V0LnNsaWRlVXAoJ3Nsb3cnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAkKCdmb290ZXInKS5maW5kKCdoMycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnb3BlbicpO1xyXG5cclxuICAgIH0pXHJcbiAgIH0pXHJcbiAgICAkKCcuYnVyZ2VyLWljb24nKS51bmJpbmQoKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgIH0pO1xyXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKVxyXG5cclxuICAgIHZhciBjdD0wO1xyXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAkKCdoZWFkZXInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgdmFyIGhoID0gJCgnaGVhZGVyJykuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAvLyQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSxcclxuICAgICAgICAgICAgICAgIGggPSAkKHdpbmRvdykuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICBoZWFkZXIgPSAkKCdoZWFkZXInKTtcclxuICAgICAgICAgICAgaWYoISQoJy5uYXYtbWVudScpLmhhc0NsYXNzKCdvcGVuJykpe1xyXG4gICAgICAgICAgICAgIGlmKHRvcCA+IGhoKXtcclxuICAgICAgICAgICAgICAgIGhlYWRlci5hZGRDbGFzcygnZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgICQoJy5jYXJ0JykucmVtb3ZlQ2xhc3MoJ2luJyk7XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXIucmVtb3ZlQ2xhc3MoJ2ZpeGVkJylcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYoY3Q+IHRvcCl7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXIuYWRkQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmKHRvcD5oKXtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSgnLmJhY2stdG8tdG9wJykucmVtb3ZlQ2xhc3MoJ2gnKTtcclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSgnLmJhY2stdG8tdG9wJykuYWRkQ2xhc3MoJ2gnKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGN0ID0gdG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAvL30pO1xyXG4gICAgICAgfSk7XHJcbiAgICAgICAgLyokKCdmb290ZXInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgc2NyZWVuYm90ID0gJCh0aGlzKS5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykuaGVpZ2h0KCksIFxyXG4gICAgICAgICAgICAgIHNjcmVlbnRvcCA9ICQodGhpcykub2Zmc2V0KCkudG9wICsgJCh0aGlzKS5oZWlnaHQoKSwgXHJcbiAgICAgICAgICAgICAgc2NyZWVuY3VyciA9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpKyQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICAgIGlmKHNjcmVlbmN1cnIgPj0gc2NyZWVudG9wICl7XHJcbiAgICAgICAgICAgICQoJy53cmFwJykuYWRkQ2xhc3MoJ3NjYWxlJyk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJCgnLndyYXAnKS5yZW1vdmVDbGFzcygnc2NhbGUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSovXHJcbiAgICAgIH0pXHJcblxyXG5cclxuICAgICQoJy5zY3JvbGwnKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgdCA9ICQodGhpcykuYXR0cignaHJlZicpLHRvcCxcclxuICAgICAgICAgIGhtID0gJCh3aW5kb3cpLndpZHRoKCk8NzY4PyAyMDogMDtcclxuICAgICAgdG9wPSB0PT1cIiNcIiA/IDA6JCh0KS5vZmZzZXQoKS50b3A7XHJcbiAgICAgIHRvcCA9IHRvcDtcclxuICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdvcGVuLW5hdicpO1xyXG4gICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0b3ArXCJweFwiIH0sJ3Nsb3cnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNsaWRlcm1vYmlsZSgpe1xyXG4gICAgICB2YXIgdyA9JCh3aW5kb3cpLndpZHRoKCksc2xpZGVyID0gJCgnLnNsaWRlci14cycpO1xyXG4gICAgICBpZih3PDc2OCl7XHJcbiAgICAgICAgc2xpZGVyLmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnbnMnKTtcclxuICAgICAgICBzbGlkZXIuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgIGl0ZW0gPSB0LmF0dHIoJ2RhdGEtaXRlbXMnKSA/IHQuYXR0cignZGF0YS1pdGVtcycpIDogMSxcclxuICAgICAgICAgICAgICBuYXZzID0gdC5hdHRyKCdkYXRhLW5hdicpICYmIHQuYXR0cignZGF0YS1uYXYnKT09XCJub1wiID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICAgICAgICAgIGRvdCA9IG5hdnMgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgbG9vcHMgPSB0LmF0dHIoJ2RhdGEtbG9vcCcpICYmIHQuYXR0cignZGF0YS1sb29wJyk9PVwibm9cIiA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICBpdGVtdGFiID0gaXRlbSA+IDMgPyAzIDogaXRlbSxcclxuICAgICAgICAgICAgICBpdGVtbHRhYiA9aXRlbSA+IDQgPyA0IDogaXRlbTtcclxuICAgICAgICAgIHQub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgICBsb29wOmZhbHNlLFxyXG4gICAgICAgICAgICBkb3RzOnRydWUsXHJcbiAgICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDQwMDAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDgwMCxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZSA6IHtcclxuICAgICAgICAgICAgICAwIDoge1xyXG4gICAgICAgICAgICAgICAgICBpdGVtczogaXRlbVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgOTkyIDoge1xyXG4gICAgICAgICAgICAgICAgICBpdGVtczogM1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgc2xpZGVyLmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzbGlkZXJtb2JpbGUoKTtcclxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcclxuICAgICAgc2xpZGVybW9iaWxlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiYm9keVwiKS5maW5kKCcuYnVkZGllcy5rb250YWsgIGlucHV0Jykua2V5ZG93bihmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIC8vIEFsbG93OiBiYWNrc3BhY2UsIGRlbGV0ZSwgdGFiLCBlc2NhcGUsIGVudGVyIGFuZCAuXHJcbiAgICAgICAgY29uc29sZS5sb2coZS5rZXlDb2RlKTtcclxuICAgICAgICBpZiAoJC5pbkFycmF5KGUua2V5Q29kZSwgWzQ2LCA4LCA5LCAyNywgMTMsIDExMCwgMTkwXSkgIT09IC0xIHx8XHJcbiAgICAgICAgICAgICAvLyBBbGxvdzogQ3RybCtBLCBDb21tYW5kK0FcclxuICAgICAgICAgICAgKGUua2V5Q29kZSA9PT0gNjUgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpKSB8fFxyXG4gICAgICAgICAgICAgLy8gQWxsb3c6IGhvbWUsIGVuZCwgbGVmdCwgcmlnaHQsIGRvd24sIHVwXHJcbiAgICAgICAgICAgIChlLmtleUNvZGUgPj0gMzUgJiYgZS5rZXlDb2RlIDw9IDQwKSkge1xyXG4gICAgICAgICAgICAgICAgIC8vIGxldCBpdCBoYXBwZW4sIGRvbid0IGRvIGFueXRoaW5nXHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBFbnN1cmUgdGhhdCBpdCBpcyBhIG51bWJlciBhbmQgc3RvcCB0aGUga2V5cHJlc3NcclxuICAgICAgICBpZiAoKGUuc2hpZnRLZXkgfHwgKGUua2V5Q29kZSA8IDQ4IHx8IGUua2V5Q29kZSA+IDU3KSkgJiYgKGUua2V5Q29kZSA8IDk2IHx8IGUua2V5Q29kZSA+IDEwNSkpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5zbGlkZXInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIGl0ZW0gPSB0LmF0dHIoJ2RhdGEtaXRlbXMnKSA/IHQuYXR0cignZGF0YS1pdGVtcycpIDogMSxcclxuICAgICAgICAgIG5hdnMgPSB0LmF0dHIoJ2RhdGEtbmF2JykgJiYgdC5hdHRyKCdkYXRhLW5hdicpPT1cIm5vXCIgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICBjZW50ZXJzID0gdC5hdHRyKCdkYXRhLWNlbnRlcicpICYmIHQuYXR0cignZGF0YS1jZW50ZXInKT09XCJ5ZXNcIiA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgIGRvdCA9IG5hdnMgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICBsb29wcyA9IHQuYXR0cignZGF0YS1sb29wJykgJiYgdC5hdHRyKCdkYXRhLWxvb3AnKT09XCJub1wiID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICAgICAgaXRlbXRhYiA9IGl0ZW0gPiAzID8gMyA6IGl0ZW0sXHJcbiAgICAgICAgICBpdGVtbHRhYiA9aXRlbSA+IDQgPyA0IDogaXRlbSxcclxuICAgICAgICAgIGNoaWxkID0gdC5jaGlsZHJlbigpLmxlbmd0aDtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGRvdCk7XHJcbiAgICAgIGlmKGNoaWxkPj1pdGVtKXtcclxuICAgICAgICB0LmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgICAgbG9vcDogbG9vcHMsXHJcbiAgICAgICAgICAgICAgZG90czogZG90LFxyXG4gICAgICAgICAgICAgIG5hdjogbmF2cyxcclxuICAgICAgICAgICAgICBuYXZUZXh0IDogW1wiPHNwYW4gY2xhc3M9J2ZhIGZhLWFuZ2xlLWxlZnQnPjwvc3Bhbj5cIixcIjxzcGFuIGNsYXNzPSdmYSBmYS1hbmdsZS1yaWdodCc+PC9zcGFuPlwiXSxcclxuICAgICAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDQwMDAsXHJcbiAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwLFxyXG4gICAgICAgICAgICAgIGNlbnRlcjogY2VudGVycyxcclxuICAgICAgICAgICAgICByZXNwb25zaXZlOiB7XHJcbiAgICAgICAgICAgICAgMDoge1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IDFcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIDc2ODp7XHJcbiAgICAgICAgICAgICAgICBpdGVtczogaXRlbXRhYlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgOTkyOntcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiBpdGVtbHRhYlxyXG4gICAgICAgICAgICAgIH0sMTIwMDp7XHJcbiAgICAgICAgICAgICAgICBpdGVtczogaXRlbVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICB0LmFkZENsYXNzKCduby1zbGlkZXInKTtcclxuICAgICAgICB2YXIgdyA9ICQod2luZG93KS53aWR0aCgpO1xyXG4gICAgICAgIGlmKHc8OTkyKXtcclxuICAgICAgICAgIHQuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCduby1zbGlkZXInKTtcclxuICAgICAgICAgIHQuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICBpdGVtID0gdC5hdHRyKCdkYXRhLWl0ZW1zJykgPyB0LmF0dHIoJ2RhdGEtaXRlbXMnKSA6IDEsXHJcbiAgICAgICAgICAgICAgICBuYXZzID0gdC5hdHRyKCdkYXRhLW5hdicpICYmIHQuYXR0cignZGF0YS1uYXYnKT09XCJub1wiID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZG90ID0gbmF2cyA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGxvb3BzID0gdC5hdHRyKCdkYXRhLWxvb3AnKSAmJiB0LmF0dHIoJ2RhdGEtbG9vcCcpPT1cIm5vXCIgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpdGVtdGFiID0gaXRlbSA+IDMgPyAzIDogaXRlbSxcclxuICAgICAgICAgICAgICAgIGl0ZW1sdGFiID1pdGVtID4gNCA/IDQgOiBpdGVtO1xyXG4gICAgICAgICAgICB0Lm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgICBsb29wOmZhbHNlLFxyXG4gICAgICAgICAgICAgIGRvdHM6dHJ1ZSxcclxuICAgICAgICAgICAgICBuYXY6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgIGNlbnRlcjogY2VudGVycyxcclxuICAgICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxyXG4gICAgICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogNDAwMCxcclxuICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgICAgICAgcmVzcG9uc2l2ZSA6IHtcclxuICAgICAgICAgICAgICAgIDAgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3NjggOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IDMgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICB0LnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgICB0LmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpLmFkZENsYXNzKCduby1zbGlkZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCd1bC50YWInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIGEgPSB0LmZpbmQoJ2EnKSxcclxuICAgICAgICAgIGh0bWwgPSBcIlwiLFxyXG4gICAgICAgICAgc2VsZWN0ID0gJCgnPHNlbGVjdD4nKSxcclxuICAgICAgICAgIHN0ID0gJChcIjxkaXYgY2xhc3M9J3NlbGVjdC10YWInIC8+XCIpO1xyXG4gICAgICBhLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBodG1sKz1cIjxvcHRpb24+XCIrJCh0aGlzKS5maW5kKCdzcGFuJykudGV4dCgpK1wiPC9vcHRpb24+XCI7XHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbGVjdC5odG1sKGh0bWwpO1xyXG4gICAgICBzdC5hcHBlbmQoc2VsZWN0KTtcclxuICAgICAgc3QuaW5zZXJ0QWZ0ZXIodCk7XHJcblxyXG4gICAgICBzZWxlY3QuY2hhbmdlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHNlbCA9ICQodGhpcykuZmluZChcIm9wdGlvbjpzZWxlY3RlZFwiKS5pbmRleCgpO1xyXG4gICAgICAgIGEuZXEoc2VsKS5jbGljaygpO1xyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICAkKCdzZWxlY3QnKS5hZGRDbGFzcygnc2VsZWN0Jykuc2VsZWN0cGlja2VyKHtcclxuICAgICAgc3R5bGU6ICdzZWxlY3QtY29udHJvbCcsXHJcbiAgICAgIHNpemU6IDRcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ2dmb3JtX3Bvc3RfcmVuZGVyJywgZnVuY3Rpb24oKXtcclxuICAgICAgICQoJ3NlbGVjdC5nZmllbGRfc2VsZWN0JykuYWRkQ2xhc3MoJ3NlbGVjdCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLnNlbGVjdHBpY2tlcih7XHJcbiAgICAgICAgICBzdHlsZTogJ3NlbGVjdC1jb250cm9sJyxcclxuICAgICAgICAgIHNpemU6IDRcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuaGVybyBoMSBiJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLndyYXBJbm5lcignPHNwYW4vPicpO1xyXG4gICAgfSlcclxuXHJcbiAgICBcclxuICB9XHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgIHZhciBpc19jaHJvbWUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZScpID4gLTE7XHJcbiAgICB2YXIgaXNfc2FmYXJpID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpID4gLTE7XHJcbiAgICAgdmFyIGlzX29wZXJhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJvcFwiKSA+IC0xO1xyXG4gICAgaWYgKChpc19jaHJvbWUpJiYoaXNfc2FmYXJpKSkge2lzX3NhZmFyaT1mYWxzZTt9XHJcbiAgICBpZiAoKGlzX2Nocm9tZSkmJihpc19vcGVyYSkpIHtpc19jaHJvbWU9ZmFsc2U7fVxyXG4gICAgZnVuY3Rpb24gZ2V0T1MoKSB7XHJcbiAgICAgIHZhciB1c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuICAgICAgICAgIHBsYXRmb3JtID0gd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSxcclxuICAgICAgICAgIG1hY29zUGxhdGZvcm1zID0gWydNYWNpbnRvc2gnLCAnTWFjSW50ZWwnLCAnTWFjUFBDJywgJ01hYzY4SyddLFxyXG4gICAgICAgICAgd2luZG93c1BsYXRmb3JtcyA9IFsnV2luMzInLCAnV2luNjQnLCAnV2luZG93cycsICdXaW5DRSddLFxyXG4gICAgICAgICAgaW9zUGxhdGZvcm1zID0gWydpUGhvbmUnLCAnaVBhZCcsICdpUG9kJ10sXHJcbiAgICAgICAgICBvcyA9IG51bGw7XHJcblxyXG4gICAgICBpZiAobWFjb3NQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybSkgIT09IC0xKSB7XHJcbiAgICAgICAgb3MgPSAnbWFjJztcclxuICAgICAgfSBlbHNlIGlmIChpb3NQbGF0Zm9ybXMuaW5kZXhPZihwbGF0Zm9ybSkgIT09IC0xKSB7XHJcbiAgICAgICAgb3MgPSAnaU9TJztcclxuICAgICAgfSBlbHNlIGlmICh3aW5kb3dzUGxhdGZvcm1zLmluZGV4T2YocGxhdGZvcm0pICE9PSAtMSkge1xyXG4gICAgICAgIG9zID0gJ1dpbmRvd3MnO1xyXG4gICAgICB9IGVsc2UgaWYgKC9BbmRyb2lkLy50ZXN0KHVzZXJBZ2VudCkpIHtcclxuICAgICAgICBvcyA9ICdBbmRyb2lkJztcclxuICAgICAgfSBlbHNlIGlmICghb3MgJiYgL0xpbnV4Ly50ZXN0KHBsYXRmb3JtKSkge1xyXG4gICAgICAgIG9zID0gJ0xpbnV4JztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG9zO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgb3MgPSBnZXRPUygpO1xyXG4gICAgY29uc29sZS5sb2cob3MpO1xyXG4gICAgaWYob3M9PVwibWFjXCIpe1xyXG4gICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3NhZmFyaScpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKTtcclxuICAgICQoJyNoZWxwJykub24oJ3Nob3duLmJzLm1vZGFsJyxmdW5jdGlvbigpe1xyXG4gICAgICAkKCcubW9kYWwtYmFja2Ryb3AnKS5hZGRDbGFzcygnYmx1ZScpO1xyXG4gICAgfSlcclxuICAgICQoJy5hcHAnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIGNvbiA9IHQuZmluZCgnLmNvbicpLFxyXG4gICAgICAgICAgaXRlbSA9IHQuZmluZChcIltkYXRhLWltZ11cIiksXHJcbiAgICAgICAgICBzbGlkZXIgPSB0LmZpbmQoJy5vd2wtY2Fyb3VzZWwnKTtcclxuXHJcblxyXG4gICAgICBpdGVtLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGltZyA9ICQodGhpcykuZGF0YSgnaW1nJyk7XHJcbiAgICAgICAgY29uLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycsaW1nKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0ZW0uZXEoMCkuY2xpY2soKTtcclxuXHJcbiAgICAgICQoJ2JvZHknKS5vbigndHJhbnNsYXRlZC5vd2wuY2Fyb3VzZWwnLCcuYXBwIC5zbGlkZXIteHMnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBhY3RpdmUgPSB0LmZpbmQoJy5vd2wtaXRlbS5hY3RpdmUnKS5lcSgwKSxcclxuICAgICAgICAgICAgaXRlbSA9IGFjdGl2ZS5maW5kKCdbZGF0YS1pbWddJyk7XHJcblxyXG4gICAgICAgIGl0ZW0uY2xpY2soKTtcclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgJCgnLnRlc3RpbW9uaWFsJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICBjb24gPSB0LmZpbmQoJy5jb24nKSxcclxuICAgICAgICAgIGl0ZW0gPSB0LmZpbmQoXCIuaXRlbVwiKSxcclxuICAgICAgICAgIHNsaWRlciA9IHQuZmluZCgnLm93bC1jYXJvdXNlbCcpO1xyXG5cclxuXHJcbiAgICAgIGl0ZW0uY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgbiA9ICQodGhpcykuZGF0YSgnaXRlbScpO1xyXG4gICAgICAgIGNvbi5lcShuKS5zaG93KCkuc2libGluZ3MoKS5oaWRlKCk7XHJcbiAgICAgICAgaXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAkKCdib2R5Jykub24oJ3RyYW5zbGF0ZWQub3dsLmNhcm91c2VsJywnLnRlc3RpbW9uaWFsIC5zbGlkZXInLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBhY3RpdmUgPSB0LmZpbmQoJy5vd2wtaXRlbS5hY3RpdmUnKS5lcSgwKSxcclxuICAgICAgICAgICAgaXRlbSA9IGFjdGl2ZS5maW5kKCcuaXRlbScpO1xyXG5cclxuICAgICAgICBpdGVtLmNsaWNrKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5zdWJzY3JpYmUgZm9ybScpLnZhbGlkYXRlKHtcclxuICAgICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24oZWwpe1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoZWwpLmZpbmQoJ2J1dHRvbicpLnRleHQoXCJsb2FkaW5nLi4uXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICQoJyNhbGVydCcpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgICAkKGVsKS5maW5kKFwiOmlucHV0XCIpLnZhbChcIlwiKTtcclxuICAgICAgICAgICQoZWwpLmZpbmQoJ2J1dHRvbicpLnRleHQoXCJzdWJzY3JpYmVcIik7XHJcbiAgICAgICAgfSw1MDApXHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBcclxuICAgIFxyXG5cclxuXHJcblxyXG4gIH0pXHJcblxyXG59KSgpO1xyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.js.map
