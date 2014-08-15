'use strict';
// width the given element:

// traverse up the DOM tree,
// and find the parent tag with the highest amount of tag-equal siblings (container).
// Then, find the unique path to container.

(function( $ ){

    var getSiblings = function (el) {
        return $(el).siblings(el.tagName);
    };

    $.fn.findMaxSiblings = function() {

        var el = $(this).first();
        var max = { num : 0, container : null };

        el.parents().not('html').each(function() {
            var siblings = getSiblings(this);
            if (siblings.length >= max.num) {
                max = { num : siblings.length, container : siblings.first() };
            }
        });

        // TODO: User should verify this is correct.

        $(max.container.getDomPath()).attr('feedr-plugin-article-container', 'true');
        return max.container.getDomPath();
    };
})( jQuery );
