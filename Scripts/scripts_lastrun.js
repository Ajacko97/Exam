
$(function () {
    //$('#news_story').addPrintButton();
});
jQuery.fn.addPrintButton = function () {
    return this.each(function () {
        $('<button>Print this page</button>')
      .click(function () { window.print(); })
      .appendTo(this);
    });
}

function printStart() {
    $('.contourNavigation,#RowFooter,#RowHeader,#login,#specialMenu,.Pane.Left,.cosmetic,.btnPrint').addClass('printModeHide');
    $('.bg,#RowContent1,#contentHolder,.Panes,.Pane.Main,.content').addClass('printModeClean');
    window.print();
    printStop();
}

function printStop() {
    //only called by printStart()
    $('*').removeClass('printModeHide');
    $('*').removeClass('printModeClean');
}


$(document).ready(function () {



    if ($('#textSlider').length) {
        var texSlidePause = $('#textSlider').attr('pause').replace('pause', '') * 1000;
        $('#textSlider').leanSlider({ directionNav: '#textSliderNav', pauseTime: texSlidePause, prevText: '', nextText: '' });

    }


    $('.btnPrint').click(function () {
        printStart();

    });


    $('.personSearch .criteria').bind('keyup keydown change', function () {






        if ($(this).val() == '') {
            $('.persons .item').show();
            $('.personSearch .noMatch').hide();
        } else {




            $('.persons .item').hide();
            $('.persons .item[data-fields*="' + $(this).val().toUpperCase() + '"]').show();

            if ($('.persons .item:visible').length == 0) {
                $('.personSearch .noMatch').show();

            } else {
                $('.personSearch .noMatch').hide();
            }
        }


    });

    var bigSlide = $('#BigSlide');
    var pickers = bigSlide.find('.picker');

    var pauseBetweenTransitions = 5000;
    if ($('#slideshowPause').length) {
        pauseBetweenTransitions = $('#slideshowPause').attr('class').replace('pause', '') * 1000;
    }

    Slide_activeslide = 1;
    Slide_count = $('#BigSlide .item').length;

    $.fn.Slide_autoplay = function () {

        Slide_autoplay = setInterval("$.fn.Slide_JumpTo('next')", pauseBetweenTransitions);
    }

    $.fn.Slide_restartautoplay = function () {
        if (typeof (Slide_autoplay) != 'undefined') {
            clearInterval(Slide_autoplay);
        }
        if (typeof (Slide_autoplayrestart) != 'undefined') {
            clearTimeout(Slide_autoplayrestart);
        }
        Slide_autoplayrestart = setTimeout(function () {
            $.fn.Slide_autoplay()
        }, 1500);
    }

    $.fn.Slide_JumpTo = function (slideNo) {
        $.fn.Slide_restartautoplay();
        if (!$('#BigSlide').hasClass('paused')) {

            switch (slideNo) {
                case "prev":

                    slideNo = Slide_activeslide - 1;
                    break;
                case "next":

                    slideNo = Slide_activeslide + 1;
                    break;
            }

            if (slideNo == 0) { slideNo = Slide_count; }
            if (slideNo >= $('#BigSlide .item').length) { slideNo = 1; }


            Slide_activeslide = slideNo;

            var _this = $('#BigSlide .items table');
            //console.log(slideNo);

            $('#BigSlide .item').eq(slideNo - 1).show().siblings().hide();




            pickers.removeClass('selected')
            if (pickers.eq(Slide_activeslide - 1).length) {
                pickers.eq(Slide_activeslide - 1).addClass('selected');
            } else {
                pickers.eq(0).addClass('selected');
            }
            /*Mark the current slide indicator*/
        }
    }

    $('#BigSlide .pickers .picker').hover(function () {

        $.fn.Slide_JumpTo($(this).index('.picker')+1);


    });


    $('#BigSlide .next').click(function () {
        $.fn.Slide_JumpTo("next");

    });

    $('#BigSlide .prev').click(function () {
        $.fn.Slide_JumpTo("prev");

    });


    $('#BigSlide .nav').hover(function () {

        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });

    


    $('#BigSlide .picker').eq(0).addClass('selected');


    $('#BigSlide td.item:first').clone().insertAfter($('#BigSlide td.item:last'));
$('#BigSlide .imagelink').hover(function () {
        $('#BigSlide').addClass('paused');
        $(this).closest('.item').addClass('hover');
        
    }, function () {
        $('#BigSlide').removeClass('paused');
        $(this).closest('.item').removeClass('hover');
    });

    $.fn.Slide_autoplay();








    if (!$('.C.menuholder ul').length) {
        $('.C.menuholder').remove();

    }





    $('.Menu.lvl1 li').not('.splitter').hover(function () {


        $(this).find('a').addClass('hover');

    }, function () {
        $(this).find('a').removeClass('hover');
    });



    $('.slideshow .item').hover(function () {


        $(this).addClass('selected');

    }, function () {
        $(this).removeClass('selected');
    });



    $('#sitemap td').find('a:first').addClass('first');

    $ShowroomInit("");





    //Default values for fields
    var defValue = $('.defValue');


    defValue.each(function () {
        $(this).attr('data-defaultValue', $(this).val());
    });


    defValue.blur(function () {
        if (this.value == '') { this.value = $(this).attr('data-defaultValue'); }
    }).focus(function () {
        if (this.value == $(this).attr('data-defaultValue')) { this.value = ''; }
    });


    var searchPh = $('#searchholder');
    searchPh.find('.criteria').blur(function () {
        searchPh.removeClass('focus');
    }
    ).focus(function () {
        searchPh.addClass('focus');
    }
    );


    function getTags() {

        var req = $.getUrlVars()["tags"];
        if (req != undefined) { $('body').addClass(decodeURIComponent(req)); }
    }

    getTags();

    $('.LinkMe').click(function () {
        window.location.href = $(this).find('a:first').attr('href');
    });
    $('.LinkMe').hover(
        function () { $(this).addClass('hover'); },
        function () { $(this).removeClass('hover'); }
        );


    $('.LinkMeCurrent').click(function () {
        window.location.href = $(this).find('.current a:first').attr('href');
    });


    if (window.location.href.toLowerCase().endsWith("signup-thank-you-page/")) {
        $('body').addClass('insideiFrame');


    }



});




$(window).load(function () {

});


$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

