/* globals chrome */
'use strict';

console.log('\'Allo \'Allo! Popup sappern');

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    chrome.tabs.sendMessage(tabs[0].id, {greeting: 'hello'}, function(response) {
        var el = document.querySelector('#evt');
        el.text = response.stack;
        console.log('responzeee');
        if (response) {
            console.log('hei nope');
        } else {
            console.log(response.farewell);
        }
    });
});
