// ==UserScript==
// @name         WFM - Search Simulation Hotkey
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Simulate search functionality when pressing Numpad Enter
// @author       Laco
// @match        https://wfm-web.hkt.com/wfm/wm/JobConsoleList.action*
// @grant        none
// @icon         https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/search-video-clip-icon.png
// ==/UserScript==

(function() {
    'use strict';

    // Function to simulate clicking the search button
    function simulateSearch() {
        // Find the search button by ID
        const searchButton = document.getElementById('job-search-btn');

        if (searchButton) {
            searchButton.click(); // Simulate click on the search button
        } else {
            console.log('Search button not found.');
        }
    }

    // Event listener for key press
    document.addEventListener('keydown', function(event) {
        const keyPressed = event.key.toUpperCase(); // Convert the pressed key to uppercase

if (event.code === 'NumpadEnter') {

            simulateSearch(); // Call the simulateSearch function when Numpad Enter is pressed
        }
    });
})();
