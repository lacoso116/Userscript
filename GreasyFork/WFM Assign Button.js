// ==UserScript==
// @name         WFM Assign Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a floating button to copy the "Bulk Assign" button
// @author       Laco
// @match        https://wfm-web.hkt.com/wfm/wm/JobConsoleList.action?*
// @match        https://wfm-web.hkt.com/wfm/wm/JobConsoleList.action
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create the floating button
    function createFloatingButton() {
        // Find the "Bulk Assign" button
        let bulkAssignButton = document.getElementById('bulkTechAssignBtu');

        if (bulkAssignButton) {
            // Create the floating button
            let floatingButton = document.createElement('button');
            floatingButton.textContent = 'Bulk Assign';
            floatingButton.className = 'floating-button';
            floatingButton.style.position = 'fixed';
            floatingButton.style.bottom = '20px';
            floatingButton.style.left = '135px';
            floatingButton.style.backgroundColor = '#4CAF50';
            floatingButton.style.color = 'white';
            floatingButton.style.padding = '6px 12px';
            floatingButton.style.border = 'none';
            floatingButton.style.borderRadius = '5px';
            floatingButton.style.cursor = 'pointer';
            floatingButton.style.zIndex = '9999';

            // Add a click event listener to copy the button
            floatingButton.addEventListener('click', function() {
                // Copy the "Bulk Assign" button's properties
                bulkAssignButton.click();
                console.log('Copied "Bulk Assign" button');
            });

            // Append the floating button to the document body
            document.body.appendChild(floatingButton);
        } else {
            console.error('Could not find the "Bulk Assign" button on the page.');
        }
    }

    // Function to handle the keyboard shortcut
    function handleKeyboardShortcut(event) {
        if (event.shiftKey && event.key.toLowerCase() === 'a') {
            event.preventDefault(); // Prevent the default browser behavior
            console.log('Shift+A detected, triggering floating button click...');
            let floatingButton = document.querySelector('.floating-button');
            if (floatingButton) {
                floatingButton.click();
            } else {
                console.error('Floating button not found on the page.');
            }
        }
    }

    // Call the function to create the floating button
    createFloatingButton();

    // Add the keyboard shortcut listener
    document.addEventListener('keydown', handleKeyboardShortcut);

    console.log('WFM Job Console Floating Copy Button script loaded');
})();
