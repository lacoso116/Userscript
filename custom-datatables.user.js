// ==UserScript==
// @name         Custom DataTables Row Hover Style
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Customize the row hover style in DataTables
// @author       Your Name
// @match        https://wfm-web.hkt.com/wfm/wm/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Load DataTables CSS
    var cssLink = document.createElement('link');
    cssLink.href = 'https://cdn.datatables.net/1.10.18/css/jquery.dataTables.min.css';
    cssLink.rel = 'stylesheet';
    document.head.appendChild(cssLink);

    // Load DataTables JavaScript
    var script = document.createElement('script');
    script.src = 'https://cdn.datatables.net/1.10.18/js/jquery.dataTables.min.js';
    document.head.appendChild(script);

    function applyCustomStyle() {
        // Apply custom hover style
        $('table.dataTable tbody tr').hover(
            function() {
                console.log('Hover on row');
                $(this).addClass('custom-hover');
            },
            function() {
                console.log('Hover off row');
                $(this).removeClass('custom-hover');
            }
        );

        // Add custom CSS for the hover style
        var style = document.createElement('style');
        style.textContent = `
            table.dataTable.dtr-inline.collapsed > tbody > tr.custom-hover > td:first-child:before,
            table.dataTable.dtr-inline.collapsed > tbody > tr.custom-hover > th:first-child:before {
                background-color: #e8e8fc;
            }
            table.dataTable.dtr-inline.collapsed > tbody > tr.custom-hover > td,
            table.dataTable.dtr-inline.collapsed > tbody > tr.custom-hover > th {
                background-color: #e8e8fc;
            }
        `;
        console.log('Adding custom CSS');
        document.head.appendChild(style);
    }

    // Wait for DataTables to be initialized
    var intervalId = setInterval(function() {
        if ($.fn.DataTable) {
            clearInterval(intervalId);
            applyCustomStyle();
        }
    }, 100);
})();