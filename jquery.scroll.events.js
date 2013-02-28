/**
 * Jquery Scroll Events 1.0.1 - jQuery plugin for special events related to
 * the scrolling action
 *
 * Require: jQuery 1.9.x
 * Author: Filipi Zimermann / James Padolsey
 * Email:  filipiz at gmail dot com
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
*/

var uid1 = 'D' + (+new Date());
var uid2 = 'D' + (+new Date() + 1);
var uid3 = 'D' + (+new Date() + 2);
var uid4 = 'D' + (+new Date() + 3);

jQuery.event.special.scrollstart = {
	setup: function() {
		var timer;
		var handler =  function(evt) {

			var _self = this;
			var _args = arguments;

			if (timer) {
				clearTimeout(timer);
			} else {
				evt.type = 'scrollstart';
				jQuery.event.dispatch.apply(_self, _args);
			}

			timer = setTimeout( function(){
					timer = null;
			}, jQuery.event.special.scrollstop.latency);

		};

		jQuery(this)
            .bind('scroll', handler)
            .data(uid1, handler);

	},

    teardown: function() {
       jQuery(this).unbind('scroll', jQuery(this).data(uid1) );
    }
};



jQuery.event.special.scrollstop = {
	latency: 300,
	setup: function() {
		var timer;
		var handler = function(evt) {

			var _self = this;
			var _args = arguments;

			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout( function(){
					timer = null;
					evt.type = 'scrollstop';

					jQuery.event.dispatch.apply(_self, _args);
			}, jQuery.event.special.scrollstop.latency);

		};

		jQuery(this)
            .bind('scroll', handler)
            .data(uid2, handler);

	},
	
	teardown: function() {
		jQuery(this).unbind('scroll', jQuery(this).data(uid2) );
	}
};



jQuery.event.special.scrollreachtop = {
    setup: function() {
        jQuery(this)
            .bind('scroll', jQuery.event.special.scrollreachtop.handler)
            .data(uid3, jQuery.event.special.scrollreachtop.handler);
    },

    teardown: function() {
        jQuery(this).unbind('scroll', jQuery(this).data(uid3) );
    },

    handler: function(evt) {
        evt.type = 'scrollreachtop';
        if ( parseInt(jQuery(this).scrollTop(), 10) === 0 )
            jQuery.event.dispatch.apply(this, arguments);
    }
};



jQuery.event.special.scrollreachbottom = {
    setup: function() {
        jQuery(this)
            .bind('scroll', jQuery.event.special.scrollreachbottom.handler)
            .data(uid4, jQuery.event.special.scrollreachbottom.handler);
    },

    teardown: function() {
        jQuery(this).unbind('scroll', jQuery(this).data(uid4) );
    },

    handler: function(evt) {
		evt.type = 'scrollreachbottom';
        var scrollMaxTop = parseInt(jQuery(this).prop('scrollHeight'), 10) - parseInt(jQuery(this).innerHeight(), 10) - 1;
        if (parseInt(jQuery(this).scrollTop(), 10) >= scrollMaxTop )
            jQuery.event.dispatch.apply(this, arguments);
    }
};
