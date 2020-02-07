// ローディング判定
jQuery(window).on("load", function() {
	jQuery("body").attr("data-loading", "true");
});

jQuery(function() {
	// スクロール判定
	jQuery(window).on("scroll", function() {
		let scrollTop = jQuery(this).scrollTop();
		let windowHeight = jQuery(this).height();
		let documentHeight = jQuery(document).height();

		if (100 < scrollTop) {
			jQuery("body").attr("data-scroll", "true");
		} else {
			jQuery("body").attr("data-scroll", "false");
		}

		if (documentHeight - (windowHeight + scrollTop) <= 0) {
			jQuery("body").attr("data-scroll-bottom", "true");
		} else {
			jQuery("body").attr("data-scroll-bottom", "false");
		}
	});

	/* ドロワー */
	jQuery(".js-drawer").on("click", function(e) {
		e.preventDefault();
		let targetClass = jQuery(this).attr("data-target");
		let ariaControls = jQuery(this).attr("aria-controls");
		jQuery("." + targetClass).toggleClass("is-checked");

		if (jQuery("#" + ariaControls).attr("aria-hidden") === "true") {
			jQuery("#" + ariaControls).attr("aria-hidden", "false");
		} else {
			jQuery("#" + ariaControls).attr("aria-hidden", "ture");
		}

		if (jQuery(this).attr("aria-expanded") === "true") {
			jQuery(this).attr("aria-expanded", "false");
		} else {
			jQuery(this).attr("aria-expanded", "ture");
		}
		return false;
	});

	/* スムーススクロール */
	jQuery('a[href^="#"]').click(function() {
		let header = jQuery("#header").height();
		let speed = 300;
		let id = jQuery(this).attr("href");
		let target = jQuery("#" == id ? "html" : id);
		let position = jQuery(target).offset().top - header;
		if ("fixed" !== jQuery("#header").css("position")) {
			position = jQuery(target).offset().top;
		}
		if (0 > position) {
			position = 0;
		}
		jQuery("html, body").animate(
			{
				scrollTop: position
			},
			speed
		);
		return false;
	});

	/* 電話リンク */
	let ua = navigator.userAgent;
	if (ua.indexOf("iPhone") < 0 && ua.indexOf("Android") < 0) {
		jQuery('a[href^="tel:"]')
			.css("cursor", "default")
			.on("click", function(e) {
				e.preventDefault();
			});
	}
});
