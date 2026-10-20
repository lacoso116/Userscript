// ==UserScript==
// @name         Acknowledge Shortcut
// @namespace    http://tampermonkey.net/
// @version      1.1
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 自動按 OK
    window.confirm = function(msg) {
        console.log("Auto Confirm:", msg);
        return true;
    };

    document.addEventListener('keydown', function(event) {

        if (event.shiftKey && event.key.toLowerCase() === 'a') {

            event.preventDefault();

            console.log('Shift+A detected');

            const acknowledgeButton =
                document.querySelector('a.btn.btn-danger[onclick*="doAjaxAction"]');

            if (!acknowledgeButton) {
                console.log('Button not found');
                return;
            }

            acknowledgeButton.click();

            console.log('Acknowledge completed');
        }
    });

})();