// ==UserScript==
// @name         Powiadomienie o kalendarzu
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Powiadomienie o kalendarzu
// @author       SPatryk3267
// @match        https://*.margonem.pl/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function checkCalendar() {

        if(Engine.widgetNoticeManager.getData().includes(2)){
            message("Uwaga! Kalendarz do odebrania!!!");
        }
    
    }

    setInterval(checkCalendar, 15000);
})();