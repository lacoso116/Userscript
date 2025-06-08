// ==UserScript==
// @name         Simulate Clicking Checkbox - JobConsoleList
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Simulate clicking specified checkboxes with Shift+D shortcut and create a Select All button on JobConsoleList
// @author       Laco
// @match        https://wfm-web.hkt.com/wfm/wm/JobConsoleList.action
// @icon         https://cdn-icons-png.freepik.com/256/6988/6988878.png?semt=ais_hybrid
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function simulateCheckboxClick(checkboxSelector) {
        const checkbox = document.querySelector(checkboxSelector);

        if (checkbox) {
            checkbox.click();
        } else {
            console.error('Cannot find the specified checkbox!');
        }
    }

    function createSelectAllButton() {
        const selectDeselectAllButton = document.createElement('button');
        selectDeselectAllButton.textContent = 'Select All';
        selectDeselectAllButton.style.position = 'fixed';
        selectDeselectAllButton.style.bottom = '20px';
        selectDeselectAllButton.style.left = '20px';
        selectDeselectAllButton.style.backgroundColor = '#007bff';
        selectDeselectAllButton.style.color = '#fff';
        selectDeselectAllButton.style.borderRadius = '5px';
        selectDeselectAllButton.style.padding = '4.5px 12px';
        selectDeselectAllButton.style.fontSize = '15px';
        selectDeselectAllButton.style.zIndex = '9999';
        document.body.appendChild(selectDeselectAllButton);

        selectDeselectAllButton.addEventListener('click', function() {
            simulateCheckboxClick('input[type="checkbox"]');
            selectDeselectAllButton.textContent = 'Deselect All';
            selectDeselectAllButton.style.backgroundColor = '#6c757d';

            setTimeout(function() {
                selectDeselectAllButton.style.backgroundColor = '#007bff';
                selectDeselectAllButton.textContent = 'Select All';
            }, 500);
        });
    }

    createSelectAllButton();

    document.addEventListener('keydown', function(event) {
        if (event.shiftKey && event.key === 'D') {
            event.preventDefault();

            if (window.location.href.includes('JobConsoleList.action')) {
                simulateCheckboxClick('input.dt-select-checkbox[type="checkbox"][aria-label="Select all rows"]');
            }
        }
    });
})();
