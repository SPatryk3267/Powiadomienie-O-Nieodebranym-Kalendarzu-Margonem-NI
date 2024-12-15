// ==UserScript==
// @name         Powiadomienie o kalendarzu
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Powiadomienie o kalendarzu
// @author       SPatryk3267
// @match        https://*.margonem.pl/
// @grant        none
// ==/UserScript==


function showWarning() {
    var message = document.createElement("div");
    message.id = "unclaimed-calendar-window";
    message.classList.add("border-window", "ui-draggable", "transparent", "ui-draggable-handle");
    message.style.cssText = `
       position: absolute;
       z-index: 9999;
       display: block;
       width: 250px;
       height: 75px;
       background-color: rgba(0, 0, 0, 0.8);
       border: 1px solid rgba(161, 160, 160, 255);
       border-radius: 5px;
    `;

    document.body.appendChild(message);

    message.style.left = `${(window.innerWidth - message.offsetWidth) / 2}px`;
    message.style.top = `${(window.innerHeight - message.offsetHeight) / 2}px`;

    var content = document.createElement("div");

    content.style.cssText = `
    font-family: Arimo, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif;
    line-height: 30px;
    color: #F5F5DC;
    overflow: hidden;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    `;

    content.innerHTML = `
    <p>Uwaga, masz nieodebrany kalendarz!!!</p>
    <div style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
        <button id="open_button" style="background-color: #00ff0088; color: white; padding: 5px 10px; border: 1px solid rgba(161, 160, 160, 255);
        border-radius: 5px; cursor: pointer;">
            Otworz
        </button>
        <button id="close_button" style="background-color: #ff0000; color: white; padding: 5px 10px; border: 1px solid rgba(161, 160, 160, 255);
        border-radius: 5px; cursor: pointer;">
            Zamknij
        </button>
    </div>`;
    message.appendChild(content);

    document.getElementById("close_button").addEventListener("click", function () {
        message.style.display = "none";
    });

    document.getElementById("open_button").addEventListener("click", function () {
        message.style.display = "none";
        _g('rewards_calendar&action=show');

        setTimeout(() => {
            if(Engine.rewardsCalendar){
                const todayTs = String(Engine.rewardsCalendar.getTodayWithoutMinutes(Engine.getWorldTime()));
                _g('rewards_calendar&action=open&day_no=' +(parseInt(Engine.rewardsCalendar.rewardDays[todayTs]) + 1));
            }
        }, 500);

        setTimeout(() => {
            if(Engine.rewardsCalendar){
                Engine.rewardsCalendar.close();
            }
        }, 700);

    });
}

function run() {

    if (Engine.widgetNoticeManager.getData().includes(2) || 1) {
        showWarning();
    }

}

setTimeout(() => {
    run();
}, 2500);