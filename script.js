// JavaScript Document
//When you clicked arrowdown you going to new section.
$(document).ready(function () {
	$("#clicknextpost").click(function () {
		$('html, body').animate({
			scrollTop: $("#boxes").offset().top
		}, 1250);
	});
});