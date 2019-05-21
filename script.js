// JavaScript Document
//When you clicked arrowdown you going to new section.
$(document).ready(function () {
	$("#clicknextpost").click(function () {
		$('html, body').animate({
			scrollTop: $("#boxes").offset().top
		}, 1250);
	});
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
	scrollFunction()
};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("myBtn").style.display = "block";
	} else {
		document.getElementById("myBtn").style.display = "none";
	}
}
//When you clicked arrowup you going to top of the website.
$(document).ready(function () {
	$("#myBtn").click(function () {
		$('html, body').animate({
			scrollTop: $(".container").offset().top
		}, 1000);
	});
});