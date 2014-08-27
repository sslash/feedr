'use strict';

var $ = require('jquery');

window.__feedrPlugin__ = window.__feedrPlugin__ || {};

// width the given element:

// traverse up the DOM tree,
// and find the parent tag with the highest amount of tag-equal siblings (container).
// Then, find the unique path to container.

(function( $ ){
    var path = '';

    // Siblings should have the same tag as our el tag (i.e. path)
    // Expect if the first sibling has it, then the rest does too.
    // this can be improved to testing all siblings for having our path.
    var siblingsHaveLeaf = function (siblings) {
        return siblings.length > 1 && $(siblings[0]).find(path).length > 0;
    };

    var getSiblings = function (el) {
        var siblings = $(el).siblings(el.tagName);

        if (siblingsHaveLeaf(siblings)) {
            return siblings.length;

        } else {
            return 0;
        }
    };

    $.fn.findMaxSiblings = function() {

        var el = $(this).first();
        path = el[0].tagName.toLowerCase();
        var max = { num : 0, container : null };

        el.parents().not('html').each(function() {
            var curr = this;
            var numSiblings = getSiblings(curr);
            path = curr.tagName.toLowerCase() + ' > ' + path;

            if (numSiblings >= max.num) {
                max = { num : numSiblings, container : curr };
            }
        });

        console.log('DONE: container: ' + max.container.tagName);
        // TODO: User should verify this is correct.
        var articleContainer = $(max.container).getDomPath();

        // mark the container with container attribute
        // have to make sure container does not include '>'s. Incase server returned these.
        // They might not apply in this DOM.
        var simpleContainer = window.__feedrPlugin__.getSimpleContainer(articleContainer);
        $(simpleContainer).attr('feedr-plugin-article-container', 'true');

        return articleContainer;
    };
})( $ );
