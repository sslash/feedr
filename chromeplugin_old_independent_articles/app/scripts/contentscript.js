/**
* This plugin lets u:
*
* Step 1:
* Mark header text
*
* Step 2:
* Mark image
*
* Step 3:
* Mark ingress
*
* Step 4:
* Mark date
*
*
* For each step; create the unique path from the clicked tag up to the root tag.
* Including tagnames, ids and classnames.
*
* If tryAgainuser click => the parser does the same process on the
* current parent element.
*
* If ease click => firstClick => parses tag and class
*                  secClick   => parses tag and id
*                  thirdClick => parses tag only
*
*
*
*
*/
'use strict';

console.log('\'Allo \'Allo! Content script');

var apiUrl = 'http://localhost:3000/feeds';

// Stack is a 2d array:
// [['div a.title', 'main a.main-title'], ['img.img1', 'img.img2']] ...
var stack = [],
$el,
state = 0,
stackY = 0,
    states = [
    {title: 'The Header',color:'rgba(19, 31, 44, 0.45)'},
    {title: 'Image', color: 'rgba(230, 64, 64, 0.45)'},
    {title: 'Ingress', color: 'rgba(67, 148, 67, 0.45)'},
    {title: 'Date Field', color: 'rgba(98, 98, 228, 0.43)'}
],

// event handlers
onSave, onCancel, onNextState, onTryAgain, onNewClicked, onEaseClicked,
$currentTag,
// easing level for the jquey.dompath
ease = null;


function debugTag($t) {
    if (!$t) { return; }

    // $(pureHtml).find($t).getDomPath(ease);
    return $t.getDomPath(ease);
}

function insertOverlay ($t) {
    if (!$t || !$t.length) { return; }

    $t.css('border-bottom', '1px solid ' + states[state].color);

    var position = $t.position();
    var positionTop = (position.top);
    var top = positionTop + 'px';
    var $overlay = $('<div class="feedr-plugin-overlay"/>').css({
        position : 'absolute',
        width : $t.width(),
        height : $t.height(),
        background : states[state].color,
        top : top,
        left : position.left
    });

    $t.after($overlay);
}

function getClickedElem () {
    return stack[stack.length-1][stackY];
}

// override existing tag
function setClickedElem (elem) {
    stack[stack.length-1][stackY] = elem;
}

function pushClickedElement (elem) {
    var currentTagList = stack[stack.length-1];
    currentTagList.push(elem);
}

function highlightElements (elems) {
    elems.each(function() {
        var $rootTag = $(this);
        insertOverlay($rootTag);
    });
}

function findSimilarTags ($t) {
    var elems = $($t.getDomPath(ease));
    highlightElements(elems);
}

function renderHeader () {
    // set next header text
    if ( state < states.length) {
        $('#feedr-plugin-header').text('Choose ' + states[state].title);

    } else {

        // were done! Create save form
        $('#feedr-plugin-header').text('Finished. Hit Save');
        $('#feedr-plugin-content').remove();
        $('#feedr-plugin-btns').html([
            '<div>Title: <input id="feedr-plugin-title" type="text" placeholder="Feed Title"></div>',
            '<div>Tags: <input id="feedr-plugin-tags" type="text" placeholder="sports, football"></div>',
            '<button id="feedr-plugin-save-btn">Save</button>',
            '<button id="feedr-plugin-cancel-btn">Cancel</button>',
        ]);

        // listen to these..
        $('#feedr-plugin-save-btn').click(onSave);
        $('#feedr-plugin-cancel-btn').click(onCancel);
    }
}

function renderSelectedTag (tagHtml) {
    var html = $('<p>You Selected: <span class="feedr-plugin-small"></span></p>');
    html.find('span').text(tagHtml);
    $('#feedr-plugin-content').html(html);
}

// Print the name of the state + the tag below it
function renderCurrentState () {
    var html = $('<h5>' + states[state].title + '<span class="feedr-plugin-small"></span></h5>');
    var tag = getClickedElem();
    html.find('span').text(debugTag(tag));
    $('#feedr-plugin-finished').prepend(html);
}

function addPluginOverlay () {
    $el = $([
        '<div id="feedr-plugin-wrapper" class="feedr-plugin-background">',
        '<div"><h4 id="feedr-plugin-header"></h4>',
        '<div id="feedr-plugin-content"></div>',
        '<div id="feedr-plugin-btns">',
        '<button id="feedr-plugin-next-btn" disabled>Try again</button>',
        '<button id="feedr-plugin-new-btn" disabled>New</button>',
        '<button id="feedr-plugin-ok-btn" disabled>Ok</button>',
        '<button id="feedr-plugin-ease-btn" disabled>Ease</button>',
        '</div>',
        '<div id="feedr-plugin-finished"></div>',
        '</div>',
        '</div>'
    ].join(''));

    document.body.insertBefore($el[0], document.body.firstChild);
    renderHeader();
}

// Creates an object liek this:
//  [
//      [ {'div>div.sap>a', 'the title_0'}], '[ {'main>header.lol>h2', 'the title_1'}]',
//      [ {'div>div.sap>img', 'Image_0'}], '[ {'main>header.lol>img', 'Image_1'}]'
//  ];
function serializeTags () {
    return stack.map(function(taglist, i) {
        return taglist.map(function(t, y) {
            return {
                tag : t ? t.getDomPath(ease) : '',
                title : states[i].title + '_' + y
            };
        });
    });
}

function iterateStack () {
    // reset the second index
    stackY = 0;

    // create the next tagslist
    stack.push([]);
}

function clearCurrentTagInIterateStack () {

    // If nothing has been selected, $currentTag is null,
    // and so we store the empty string for the current state
    if (!$currentTag) {
        pushClickedElement('');
    }
    $currentTag = null;

    iterateStack();
}

// Events

function tagSelected (e) {
    e.preventDefault();
    var $t = $(e.target);

    // return if clicked inside plugin
    if ($t.parents('#feedr-plugin-wrapper').length ||
        $t.is('#feedr-plugin-ok-btn')) { return; }

    // store selected tag
    pushClickedElement($t);
    $currentTag = $t;

    // try finding similar tags, and print overlay to them
    findSimilarTags($t);

    // print the tag to bottom right corner
    renderSelectedTag(debugTag($t));

    // enable buttons
    $('#feedr-plugin-btns button').removeAttr('disabled');
}

onSave = function () {
    var data = {
        selectors : serializeTags(),
        title : $('#feedr-plugin-title').val(),
        tags : $('#feedr-plugin-tags').val().split(/,\s*/),
        url : window.location.origin
    };

    $.post(apiUrl, data)
    .done(function () {
        console.log('yeah');
    })
    .fail(function () {
        console.log('fail');
    });
};

onCancel = function () {
    window.location.reload();
};

function doTryAgain ($newTag) {
    $('.feedr-plugin-overlay').remove();
    setClickedElem($newTag);

    // just adds highlight
    findSimilarTags($newTag);
    renderSelectedTag(debugTag($newTag));
}

// sets current tag equal its parent tag (i.e traverse one up the dom tree)
onTryAgain = function ()  {
    var $leafTag = getClickedElem();
    doTryAgain($leafTag.parent());
};

onNextState = function () {
    // must reset this so dom.path can try be smart again
    ease = null;

    renderCurrentState();
    clearCurrentTagInIterateStack();
    state ++;
    renderHeader();

    // clear the html displaying the previous tag
    renderSelectedTag('');
};

// add space for a new tag path
onNewClicked = function () {
    stackY++;
};

onEaseClicked = function () {
    ease++;
    doTryAgain(getClickedElem());
};


function listen () {
    document.addEventListener('click', tagSelected);
    $('#feedr-plugin-next-btn').click(onTryAgain);
    $('#feedr-plugin-ok-btn').click(onNextState);
    $('#feedr-plugin-new-btn').click(onNewClicked);
    $('#feedr-plugin-ease-btn').click(onEaseClicked);
}

$(function() {
    addPluginOverlay();
    listen();
    iterateStack();
});
