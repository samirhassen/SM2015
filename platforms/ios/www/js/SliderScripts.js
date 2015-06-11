function initSlider()
{
	var container = jQuery(".marvel-slider");
	jQuery(".marvel-slider li.is-active")
		.next()
		.fadeIn("default")
		.addClass("is-active")
		.end()
		.fadeOut()
		.removeClass("is-active")
		.appendTo( container );
}

function onMainMenu()
{
	if(typeof jQuery.fn.hammer == "undefined") return;

	jQuery(".marvel-enter").hammer().on("tap", function(event) {
		var circles = jQuery(this).find(".menu-circle");
		circles.each(function(index, el) {
			jQuery(el).toggleClass("circle" + index);
		});
	});
}

// on dom ready
jQuery(function() {
	setInterval(function() {
		initSlider();
	}, 4000);
	onMainMenu();
}); 