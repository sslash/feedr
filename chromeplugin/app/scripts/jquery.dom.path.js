// CHALLENGES

// 1.
// If parsing is not good enough, you can filter last leaf by:
//  > i.e element before is parent
// :first-schild first child of parent
// :first-of-type first child of parent with this type

// 2.
// some articles lack parts (e.g not all headers have an ingress).
// these

(function( $ ) {

    // starting container
    var _articleContainer, _artContainerAttr = '';

    // Some tags are added by chrome.
    // examples:
    // tbody, thead
    // if they dont have attributes, dont save them
    var notAValidTag = function (tag, el) {
        if (tag === 'tbody' || tag === 'thead') {
            if (el.id || el.className) {
                return false;
            }
            return true;
        }

        return false;
    }



    var createSelectorForEl = function (el, ease) {
        var string = el.tagName.toLowerCase();
        console.log('ease: ' + ease);

        if (notAValidTag(string, el)) { return; }

        // filtering:
        // ease = 0 => tag, id and class
        // ease = 1 => tag and class
        // ease = 2 => tag and id
        // ease = 3 => tag
        if ((ease === 0 || ease === 2) && el.id) {
            string += "#" + el.id;
        }

        if ((ease === 0 || ease === 1) && el.className) {
            string += "." + el.className.trim().replace(/ /g, '.');
        }

        return string;
    };

    var createPath = function (el, ease) {
        var p = [];

        // el.parents().not('html').each(function() {

        // instead of not, stop a while loop when we reach the container attr
        var tmp = el.parent();
        while (!tmp.is(_artContainerAttr) && !tmp.is('html') ) {
            var str = createSelectorForEl(tmp[0], ease);
            if (str) { p.push(str); }
            tmp = tmp.parent();
        };

        p.reverse();

        p.push(createSelectorForEl(el[0], ease));

        // would like to use ">" instead of space,
        // but because we try to remove the tags that chrome appends,
        // that is simply not reliable
        var selectorStr = p.join(' ');

        try {
            var fullPath = selectorStr;

            // push the container part first
            if ( _articleContainer ) { fullPath = _articleContainer + ' ' + fullPath; }

            var testResult = $(fullPath).length;
            return {
                children : testResult,
                path : selectorStr
            };
        } catch(e) {
            console.log('domPath Failed: ' + e);
            return {children : 0};
        }
    }

    var getBestResult = function (results) {
        var best = results[0], len = results.length;
        for (var i = 1; i < len; i++) {
            if (results[i].children > best.children) {
                console.log('better: ' + results[i].path);
                best = results[i];
            }
        }
        return best.path;
    }

    // Tries multiple paths to find the one
    // with the most results
    var trySmartParse = function (el) {
        var results = [];
        results.push(createPath(el, 0));
        results.push(createPath(el, 1));
        results.push(createPath(el, 2));
        results.push(createPath(el, 3));

        return getBestResult(results);
    }

    // ease is not in use. Instead this parser tries all values itself
$.fn.getDomPath = function(container, ease) {
    _articleContainer = container;

    // If received a container, then there is the feed param is available (i.e maxSiblings has been run)
    if ( _articleContainer ) { _artContainerAttr = '[feedr-plugin-article-container]';}


    var finalResult, el = $(this).first();
    if ( ease ) {
        finalResult = createPath(el, ease).path;
    } else {
        finalResult = trySmartParse(el);
    }

    console.log('Returning: ' + finalResult);
    return finalResult;
    };
})( jQuery );
