
$(document).ready(function () {
    if (cookiebanner_readCookie('acceptCookies') != null) {
        if (cookiebanner_readCookie('acceptCookies') == "yes") {
            $('#cookiebanner').remove();
        }
    }

    $('#cookiebanner').find('.close').click(function () {
        cookiebanner_createCookie("acceptCookies", "yes", 365);
        $('#cookiebanner').remove();
    });
    $('#cookiebanner').show();
});


function cookiebanner_createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function cookiebanner_readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
