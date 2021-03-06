/**
 * Script to watch a group of elements on scroll and add a
 * class to them at a specific scroll point, allowing css animations to
 * be triggered.
 * */

 ;(function($, window, undefined) {

 	var eles = $();
 	var $win = $(window);
 	var winX = window.innerHeight;
 	var scrollTimer = null;
 	var resizeTimer = null;
 	var topPos = 0;

 	$win.on('scroll', function() {
 		if(scrollTimer) {
 			clearTimeout(scrollTimer);
 		}
 		scrollTimer = setTimeout(scrolled, 50);
 	});

 	$win.on('resize', function() {
 		if(resizeTimer) {
 			clearTimeout(resizeTimer);
 		}
 		resizeTimer = setTimeout(function() {
 			winX = window.innerHeight;
 			eles.trigger('recalcWhen');
 		}, 50);
 	});

 	function scrolled() {
 		topPos = $win.scrollTop();
 		eles.trigger('checkScroll');
 	}

 	$.fn.inView = function(options) {

 		var settings = $.extend({
 			addClass: 'show',
 			autoPercent: 0.50, // Percentage from top of the window to trigger animation when set to auto - 1 = bottom, 0 = top
 			reverse: false, // Remove class when scrolling up
 			callbacks: {} // A set of callbacks that can be triggered from a data-ivcallback attribute
 		}, options);

 		eles = $(this); // So we can trigger events from our scroll handler.

 		return this.each(function() {
 			var $this = $(this);
 			var when = $this.data('when') || "auto";
 			var screenX = $this.data('screen') || "";
 			var functionName = $this.data('ivcallback') || "";

 			function setWhen() {
 				if(when == 'auto') {
	 				var at = 0;
	 				if(screenX !== "") {
	 					at = winX * screenX;
	 				} else {
	 					at = winX * settings.autoPercent;
	 				}
	 				when = ($this.offset().top - at);
	 			}
 			}
 			setWhen();


 			$this.on('checkScroll', function(e) {
 				if(topPos >= when && !$this.hasClass(settings.addClass)) {
 					$this.addClass(settings.addClass);
 					
 					if (typeof settings.callbacks[functionName] === 'function') {
 						var fn = settings.callbacks[functionName];
 						fn.call(this, $this, true);
 					}

 					if(!settings.reverse) {
 						$this.off('checkScroll'); // One less event to check
 					}
 				}
 				if(settings.reverse) {
 					if(topPos <= when && $this.hasClass(settings.addClass)) {
 						$this.removeClass(settings.addClass);

 						if (typeof settings.callbacks[functionName] === 'function') {
 							var fn = settings.callbacks[functionName];
 							fn.call(this, $this, false);
 						}
 					}
 				}
 			})
 			.on('recalcWhen', function() {
 				when = $this.data('when') || "auto";
 				setWhen();
 			});
 		});
 	};

 })(jQuery, window);
