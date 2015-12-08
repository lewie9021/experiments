var $timer = document.getElementById("timer");
var count = 1500;
var interval;

function convertCounToTime(count) {
    var minutes = Math.floor(count / 60);
    var seconds = count - (minutes * 60);

    return ((minutes < 10 ? "0" : "") + minutes) + ":" + ((seconds < 10 ? "0" : "") + seconds);
}

function startTimer() {
    $timer.innerHTML = convertCounToTime(count);

    stopTimer();
    
    interval = setInterval(function() {
        $timer.innerHTML = convertCounToTime(count);

        if (count == 0) {
            stopTimer();
            
            return notifyUser();
        }
        
        count -= 1;
    }, 1000);
}

function stopTimer(reset) {
    if (reset)
        $timer.innerHTML = convertCounToTime(count = 1500);
    
    clearInterval(interval);
}

function notifyUser() {


    
}

document.getElementById("app").addEventListener("click", function(e) {
    var target = e.target;

    if (target.tagName !== "BUTTON")
        return;

    switch (target.id) {
        case "start": startTimer(); break;
        case "stop": stopTimer(); break;
        case "reset": stopTimer(true); break;
    }
});
