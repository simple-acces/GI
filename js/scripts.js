(function($) {
    "use strict";

    /* -------------------
    Parallax Sections
    ---------------------*/
    if(!Modernizr.touch){
        $('#home-parallax-fullscreen').parallax("50%", 0.5);
        $('#home-parallax-fullwidth').parallax("50%", 0.5);
        $('.parallax-section-1').parallax("50%", 0.5);
        $('.parallax-section-2').parallax("50%", 0.5);
        $('.parallax-section-3').parallax("50%", 0.5);
        $('.parallax-section-4').parallax("50%", 0.5);
        $('.parallax-section-5').parallax("50%", 0.5);
        $('.parallax-section-6').parallax("50%", 0.5);
        $('.parallax-section-7').parallax("50%", 0.5);
        $('.parallax-section-8').parallax("50%", 0.5);
        $('.parallax-section-9').parallax("50%", 0.5);
        $('#home-landing').parallax("50%", 0.5);

        /* -------------------
        Animation.css calling
        ---------------------*/
        new WOW().init();
    }

    /* -------------------
    Scroll functions
    ---------------------*/
    $(window).scroll(function(){
        parallax();
        /* -------------------
        Header Animation
        ---------------------*/
        if ($(this).scrollTop() > 5){
            $('nav').addClass("navbar-small")
        }
        else{
            $('nav').removeClass("navbar-small")
        }
        /* -------------------
        Back to top button popup
        ---------------------*/
        if($(window).scrollTop() > 400){
            $("#back-to-top").stop().animate({ bottom:'16px' },300,'easeInOutCubic')
        }
        else{
            $("#back-to-top").stop().animate({ bottom:'-50px' },300,'easeInOutCubic')
        }
    });
    /* -------------------
    Preloader
    ---------------------*/
    $(window).load(function(){
        // Preloader
        $('#loader').fadeOut('slow');
        $('.spinner').fadeOut('slow');
    }); // End Window Load
    /* -------------------
    Page Hero Parallax
    ---------------------*/
    function parallax(){
        var scrolled = $(window).scrollTop();
        $('.hero').css('top',-(scrolled*0.0515)+'rem');
        $('.home-container').css('bottom',-(scrolled*0.0515)+'rem');
        $('.op-1,.op-2,.op-3').css('opacity',1-(scrolled*.00110));
    };
    /* -------------------
    Smooth scrolling to anchor
    ---------------------*/
    $('.to-section a,.btn-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 54
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
    /* -------------------
    Back to top button function
    ---------------------*/
    $('#back-to-top,.to-top').click(function() {
        $('html, body').animate({ scrollTop: 0}, 1000, 'easeInOutExpo');
        return false;
    });
    /* -------------------
    Active menu item on page scroll
    ---------------------*/
    var sections = $('section')
    , nav = $('nav')
    , nav_height = nav.outerHeight();
    $(window).on('scroll', function () {
      var cur_pos = $(this).scrollTop();
      sections.each(function() {
        var top = $(this).offset().top - nav_height,
            bottom = top + $(this).outerHeight();
        if (cur_pos >= top && cur_pos <= bottom) {
          nav.find('a').removeClass('current');
          sections.removeClass('current');
          $(this).addClass('current');
          nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('current');
        }
      });
    });
    /* -------------------
    Auto-close responsive navbar
    ---------------------*/
    function close_toggle() {
        if ($(window).width() <= 992) {
          $('.navbar-collapse a').on('click', function(){
              if (!$(this).hasClass('dropdown-toggle')) {
                $('.navbar-collapse').collapse('hide')
              }
          });
        }
        else {
         $('.navbar .navbar-default a').off('click')
        }
    }
    close_toggle();
    $(window).resize(close_toggle);
    $(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });
    /* -------------------
    Contact form
    ---------------------*/

    $( '#contactform' ).on( 'submit', function( e ) {
            e.preventDefault();
            var $el = $( this ),
                $alert = $el.find( '.form-validation' ),
                $submit = $el.find( '#submit' ),
                action = $el.attr( 'action' );
            $alert.removeClass( 'alert-danger alert-success' );
            $alert.html( '' );

            if (!$el.find('input#name').val() || !$el.find('input#email').val() || !$el.find('input#subject').val() || !$el.find('textarea#comments').val()) {
                $alert.html( 'Les champs marqués d\'une étoile sont requis' );
                $alert.addClass( 'alert-danger' ).fadeIn( 500 );
                return
            }

            $submit
                .after('<img src="img/assets/contact-form-loader.gif" class="loader" />')
                .attr('disabled','disabled');

            $.ajax({
                type     : 'POST',
                url      : action,
                data     : $el.serialize(),
                success  : function( response ) {
                    if ( response.status == 'error' ) {
                        $alert.html( 'Error!' );
                        $alert.addClass( 'alert-danger' ).fadeIn( 500 );
                    }
                    else {
                        $el.trigger( 'reset' );
                        $alert.html( 'Success!' );
                        $alert.addClass( 'alert-success' ).fadeIn( 500 );
                        $('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
                    }
                },
            })
        });

    /* -------------------
    Bootstrap Tooltip, Alert, Tabs
    ---------------------*/
    $(function () { $("[data-toggle='tooltip']").tooltip();
        $(".alert").alert()
    });
    $(function () {
        var active = true;
        $('#collapse-init').click(function () {
            if (active) {
                active = false;
                $('.panel-collapse').collapse('show');
                $('.panel-title').attr('data-toggle', '');
                $(this).text('Close All');
            } else {
                active = true;
                $('.panel-collapse').collapse('hide');
                $('.panel-title').attr('data-toggle', 'collapse');
                $(this).text('Open All');
            }
        });
        $('#accordion').on('show.bs.collapse', function () {
            if (active) $('#accordion .in').collapse('hide');
        });
    });
    $('#myTab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })

    window.octoboot_before_save = function(done) {
        window.scrollTo(0,0)
        $('*.animated').removeClass('animated')
        $('html').get(0).className = ""
        $('.parallax').each(function(i, e) {
            e.style.backgroundPosition = ""
        })
        $('.wow.fadeInUp').each(function(i, e) {
            e.style = ""
        })
        $('#loader, .spinner').css('display', 'block')
        close_galery()
        $('.dropdown').find('.dropdown-menu').stop(true, true).fadeOut();
        $('.dropdown').removeClass('open');
        setTimeout(done, 500)
    }

    /* LA SALLE PHOTO */
    if ($(window).width() < $(window).height()) {
        $('#lasalle_photo').addClass('mobile')
        $('#lasalle_photo').css('height', $(window).height())
    }
    var update_photo = function(index) {
        // get index
        var old = $('#lasalle_photo .main_photo img.current')
        index = index || (index === 0 ? index : old.index() + 1)

        if (index > $('#lasalle_photo .main_photo img').length - 1) {
            index = 0
        }
        // reset current
        $('#lasalle_photo .current').removeClass('current')

        // get new one
        var current = $($('#lasalle_photo .main_photo img').get(index))
        var current_min = $($('#lasalle_photo .min_photo img').get(index))
        var current_title = $($('#lasalle_photo .title_photo div').get(index))

        // set new as current
        current.addClass('current')
        current_min.addClass('current')
        current_title.addClass('current')
    }
    var lasalle_inter = setInterval(update_photo, 8000)

    $('#lasalle_photo .min_photo img').click(function() {
        update_photo($(this).index())
        clearInterval(lasalle_inter)
        lasalle_inter = setInterval(update_photo, 8000)
    })

    update_photo(0)

    $('section#lescours .district_bt').hover(function() {
        $(this).addClass('hover')
    }, function() {
        $(this).removeClass('hover')
    })

    /** GALERIE */
    var close_galery = function() {
        var imgs = $('.full_size_img')
        $('.full_size_img.current').removeClass('current')
        $('.full_size_img.next').removeClass('next')
        $('.full_size_img.prev').removeClass('prev')
        var img_btns = $('.image_btn')
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].style.display = 'none'
            img_btns[i].appendChild(imgs[i])
        }
        var galery = document.getElementById('galery')
        if (galery) {
            document.body.removeChild(galery)
        }
    }

    var prepare_neighbours = function(index) {
        var indexNext = index + 1
        var indexPrev = index - 1
        if (indexNext > $('.full_size_img').length - 1) {
            indexNext = 0
        }
        if (indexPrev < 0) {
            indexPrev = $('.full_size_img').length - 1
        }
        var next = $($('.full_size_img').get(indexNext))
        var prev = $($('.full_size_img').get(indexPrev))
        next.addClass('next')
        next.removeClass('prev')
        prev.addClass('prev')
        prev.removeClass('next')
    }

    var move_in_galery = function(to) {
        // get index
        var old = $('.full_size_img.current')
        var index = old.index() + to

        if (index > $('.full_size_img').length - 1) {
            index = 0
        } else if (index < 0) {
            index = $('.full_size_img').length - 1
        }
        // reset current
        old.removeClass('current')
        prepare_neighbours(index)
        var current = $($('.full_size_img').get(index))
        current.removeClass('next')
        current.removeClass('prev')
        current.addClass('current')
    }

    var open_galery = function(index) {
        var galery = document.createElement('div')
        galery.id = 'galery'
        var close_btn = document.createElement('div')
        var go_to_right_btn = document.createElement('div')
        var go_to_left_btn = document.createElement('div')
        var imgs_div = document.createElement('div')
        close_btn.className = 'close_galery glyphicon glyphicon-remove'
        go_to_right_btn.className = 'go_to_right_galery glyphicon glyphicon-chevron-right'
        go_to_left_btn.className = 'go_to_left_galery glyphicon glyphicon-chevron-left'
        imgs_div.id = 'galery_imgs'
        galery.appendChild(close_btn)
        galery.appendChild(go_to_right_btn)
        galery.appendChild(go_to_left_btn)
        galery.appendChild(imgs_div)

        var imgs = $('.full_size_img')
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].style.display = 'block'
            imgs_div.appendChild(imgs[i])
        }
        document.body.appendChild(galery)

        $('.close_galery').click(close_galery)
        $('.go_to_right_galery').click(function() {move_in_galery(1)})
        $('.go_to_left_galery').click(function() {move_in_galery(-1)})

        var current = $($('.full_size_img').get(index))
        // set new as current
        current.addClass('current')
        prepare_neighbours(index)
    }

    $('.image_btn').hover(function() {
        $(this).addClass('hover')
    }, function() {
        $(this).removeClass('hover')
    })

    $('.image_btn').click(function() {
        open_galery($(this).index())
    })

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                move_in_galery(-1)
            break;

            case 39: // right
                move_in_galery(1)
            break;

            case 27: // escape
                close_galery()
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    /** HANDLE TOP-VIDEO PAUSE/PLAY */
    var video = document.getElementById('top-video')
    var navBar = document.getElementById('nav-bar')
    var isPlaying = true
    var handleOnScrollVideoPlaying = function() {
        var videoRect = video.getBoundingClientRect()
        if (navBar) {
            var navBarRect = navBar.getBoundingClientRect()
        }
        var ratioInView
        if (navBar && window.getComputedStyle(navBar).opacity !== "0") {
            ratioInView = (videoRect.bottom - navBarRect.height) / videoRect.height
        } else {
            ratioInView = videoRect.bottom / videoRect.height
        }
        if (isPlaying && ratioInView < 0.25) {
            video.pause()
            isPlaying = false
        } else if (!isPlaying && ratioInView >= 0.25) {
            video.play()
            isPlaying = true
        }
    }
    if (video) {
        window.addEventListener('scroll', handleOnScrollVideoPlaying)
        window.addEventListener('touchstart', handleOnScrollVideoPlaying)
        window.addEventListener('touchmove', handleOnScrollVideoPlaying)
        window.addEventListener('touchend', handleOnScrollVideoPlaying)
    }

    /** Replace home-bottom */
    var homeButtonPosition = function() {
         if (video) {
            var top = video.getBoundingClientRect().height * 0.9
            document.getElementsByClassName('home-bottom')[0].style.top = top + 'px'
        } else {
            document.getElementsByClassName('home-bottom')[0].style.bottom = 0
        }
    }
    homeButtonPosition()
    $(window).resize(homeButtonPosition);

    /** DROPDOWN DISTRICTS */
    var timerIn = 200;
    var timerOut = 200;
    var prepareDropdown = function() {
        if ($(window).width() <= 992) {
            $('.dropdown').off('hover')
        }
        else {
            $('.dropdown').hover(function() {
                $(this).find('.dropdown-menu').stop(true, true).fadeIn(timerIn)
                $(this).addClass('open')
                console.error($(this))
            }, function() {
                $(this).find('.dropdown-menu').stop(true, true).fadeOut(timerOut)
                $(this).removeClass('open')
            });
        }
    }
    prepareDropdown()
    $(window).resize(prepareDropdown);


})(jQuery);
