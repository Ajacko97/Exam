
$ShowroomInit = function (inTransitionType) {

    var $showroom = null;
    var $imageholder = null;
    var $images = null;
    var $boxholder = null;
    var $boxes = null;
    var $activebox = null;

    $showroom = $(".slideshow");
    $imageholder = $showroom.find(".slides");
    $images = $imageholder.find(".slide");

    $boxholder = $showroom.find(".Infoboxes");
    $boxes = $boxholder.find(".Infobox");


    if ($images.size() == 0) {
        $showroom.hide();
    } else {

        //Initialization settings!

        $transitionType = 'fade';

        var $activeSlide = 1;

        var $transitionSpeed = 600;
        var $transitionSpeedManual = 200;
        var $transitionEasing = 'easeOutCirc';
        var $pauseBeforeAutoplayRestarts = $('#slideshowPause').attr('class').replace('pause', '') * 1000;
        var $pauseBetweenTransitions = $('#slideshowPause').attr('class').replace('pause', '') * 1000;
        var $navigationTransitionSpeed = 200;
        var $navigationTransitionEasing = 'easeOutCirc';

        //Navigation holders.
        var $navPrev = $showroom.find(".prev");
        var $navNext = $showroom.find(".next");
        var $navLink = $showroom.find("div.link");

        //Find height and width from the first image
        var $slideHeight = $imageholder.find(".slide:first").height();
        var $slideWidth = $imageholder.find(".slide:first").width();




        if ($transitionType == 'fade') {
            $images.css({ 'top': 0, 'left': 0, 'display': 'block', 'position': 'absolute' });
        }



        $(".slideshow").find('.item').click(function () {


            window.location.replace($(this).find("a").attr("href"));
        });




        $.fn.nextSlideNo = function () {
            var tmp = $activeSlide;
            tmp++;
            if (tmp > $images.length) { tmp = 1; }


            return tmp;
        }
        $.fn.activeSlideNo = function () {
            return $activeSlide;
        }


        //Used for the fading slide cause of stacked images.
        $.fn.SetZIndex = function () {

            var z = 1000;
            $imageholder.find("a").each(function () {
                z--;
                $(this).css("z-index", z);

            });
        }



        $('.slideshow .item').hover(function () {

            $showroom.find('.item').removeClass('selected');
            var toShow = $(this).attr('class').split(' ').slice(1, 2)[0];
            var noToShow = toShow[2];
            $(this).addClass('selected');

            $imageholder.find(".slide").hide();
            $imageholder.find(".slide.no" + noToShow).show();

            $activeSlide = noToShow;


            $(this).bind('click', function () {
                window.location.replace($imageholder.find(".slide.no" + noToShow).attr("href"));
            });


        }, function () {
            $(this).addClass('selected');
            $.fn.restartautoplay();
        });




        $('.slideshow .item').bind('click', function () {
            window.location.replace($showroom.find(".link").attr("href"));
        });



        $.fn.restartautoplay = function () {
            if (typeof (autoplay) != 'undefined') {
                clearInterval(autoplay);
            }
            if (typeof (autoplayrestart) != 'undefined') {
                clearTimeout(autoplayrestart);
            }
            autoplayrestart = setTimeout(function () {
                $.fn.autoplay()
            }, $pauseBeforeAutoplayRestarts);
        }

        $.fn.nextSlide = function (typeOfRun) {

            $activeSlide++;
            var tmp = $activeSlide;
            if (tmp > $images.length) { tmp = 1; }
            $activeSlide = tmp;

            //Manual should go faster than auto..
            switch (typeOfRun) {
                case "manual": $transitionSpeed = $transitionSpeedManual;
            }

            //Fade or slide?
            if ($transitionType == 'fade') {



                $imageholder.find(".slide").hide();
                $imageholder.find(".slide.no" + $activeSlide).show();

                $showroom.find(".item").removeClass('selected');
                $showroom.find(".item.no" + $activeSlide).addClass('selected');









                //Display correct infobox



                /*Set correct link
                $navLink.bind('click', function () {
                window.location.replace($activeBox.find(".link").attr("href"));
                });
                */




            } else {
                $imageholder.stop(true, true);
                if ($imageholder.width() + parseInt($imageholder.css("left"), 10) == $images[0].width) {

                    $imageholder.find(".slide:first").appendTo($imageholder);

                    $imageholder.css({
                        left: function (index, value) {
                            return parseFloat(value) + $images[0].width;
                        }
                    });
                }
                $imageholder.animate({ left: '-=' + $images[0].width }, $transitionSpeed, $transitionEasing);
            }
        }



        $.fn.prevSlide = function (typeOfRun) {


            //Manual should go faster than auto..
            switch (typeOfRun) {
                case "manual": $transitionSpeed = $transitionSpeedManual;
            }

            //Fade or slide?
            if ($transitionType == 'fade') {

                $boxes.removeClass("visible");
                $imageholder.find(".slide:last").stop(true, true).hide(0, function () {

                    $(this).prependTo($imageholder);
                    $.fn.SetZIndex();
                    $(this).fadeIn($transitionSpeed);
                    $activeBox = $boxholder.find("div." + $(this).attr("class"));
                });

                //Display correct infobox
                //$activeBox = $boxholder.find("div." + $imageholder.find("img:last").attr("class"));
                $activeBox.addClass("visible");
                //Set correct link
                $navLink.bind('click', function () {
                    window.location.replace($activeBox.find(".link").attr("href"));
                });


            } else {
                $imageholder.stop(true, true);
                if (parseInt($imageholder.css("left"), 10) == 0) {

                    $imageholder.find(".slide:last").prependTo($imageholder);
                    $imageholder.css({
                        left: function (index, value) {
                            return parseFloat(value) - $images[0].width;
                        }
                    });
                }
                $imageholder.animate({ left: '+=' + $images[0].width }, $transitionSpeed, $transitionEasing);
            }
        }


        $.fn.autoplay = function () {
            autoplay = setInterval("$.fn.nextSlide()", $pauseBetweenTransitions);
        }


        $.fn.restartautoplay = function () {
            if (typeof (autoplay) != 'undefined') {
                clearInterval(autoplay);
            }
            if (typeof (autoplayrestart) != 'undefined') {
                clearTimeout(autoplayrestart);
            }
            autoplayrestart = setTimeout(function () {
                $.fn.autoplay()
            }, $pauseBeforeAutoplayRestarts);
        }


        //Only allow navigation if there are multiple images.
        if ($images.size() > 1) {
            $navPrev.click(function () {
                $.fn.prevSlide("manual");
                $.fn.restartautoplay();
            });


            $navNext.click(function () {
                $.fn.nextSlide("manual");
                $.fn.restartautoplay();
            });


            $(document).keydown(function (e) {
                if (e.keyCode == 37) {
                    $.fn.prevSlide("manual");
                    $.fn.restartautoplay();
                    return false;
                }
            });


            $(document).keydown(function (e) {
                if (e.keyCode == 39) {
                    $.fn.nextSlide("manual");
                    $.fn.restartautoplay();
                    return false;
                }
            });
            $navPrev.hover(function () {
                $(this).find("div").stop(true, true).animate({ marginLeft: 0 }, $navigationTransitionSpeed, $navigationTransitionEasing);
            }, function () {
                $(this).find("div").stop(true, true).animate({ marginLeft: -65 }, $navigationTransitionSpeed, $navigationTransitionEasing);
            });

            $navNext.hover(function () {
                $(this).find("div").stop(true, true).animate({ marginRight: 0 }, $navigationTransitionSpeed, $navigationTransitionEasing);
            }, function () {
                $(this).find("div").stop(true, true).animate({ marginRight: -65 }, $navigationTransitionSpeed, $navigationTransitionEasing);
            });
        }


        $(function () {
            $.extend($.fn.disableSelect = function () {
                return this.each(function () {
                    if ($.browser.mozilla) {//Firefox
                        $(this).css('MozUserSelect', 'none');
                    } else if ($.browser.msie) {//IE
                        $(this).bind('selectstart', function () { return false; });
                    } else {//Opera, etc.
                        $(this).mousedown(function () { return false; });
                    }
                });
            });
            $showroom.disableSelect(); //No text selection on elements with a class of 'noSelect'
        });


        //If there are no or just a single image..
        //Start autoplay
        $activebox = $boxholder.find("div." + $imageholder.find(".slide:first").attr("class"));
        $activebox.addClass("visible");

        //Set correct link
        $navLink.bind('click', function () {
            window.location.replace($activebox.find(".link").attr("href"));
        });



        switch ($images.size()) {
            case 1:
                $navPrev.hide();
                $navNext.hide();
                break;
            default:
                if ($transitionType == 'fade') {
                    $.fn.SetZIndex();

                    $imageholder.css("width", $images[0].width);



                } else { $imageholder.css("width", $images[0].width * $images.size()); }

                $.fn.autoplay();
                break;
        }

    }



}
