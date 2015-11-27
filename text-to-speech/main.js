var utterThis  = new SpeechSynthesisUtterance();
var synth = window.speechSynthesis;
var $text = document.getElementById("text");
var $button = document.getElementById("button");
var $result = document.getElementById("result");

// Configure the speech instance.
utterThis.lang = "en-UK";
utterThis.rate = 0.7;

// startIndex is the position at the start of the current spoken word.
// This function returns the index at the end of the word for highlighting purposes.
function getIndex(startIndex, text) {
    var word = text.substr(startIndex).match(/\w+\.?/)[0];
    
    return startIndex + (word && word.length || 0);
}

// This event is triggered for each spoken word.
utterThis.onboundary = function(event) {
    var index = getIndex(event.charIndex, utterThis.text);
    var highlight = utterThis.text.substr(0, index);
    var rest = utterThis.text.substr(index);

    // Update the inner HTML to highlight the new portion of text.
    $result.innerHTML = [
        '<span style="background-color: yellow;">' + highlight + '</span>',
        '<span>' + rest + '</span>'
    ].join("");
};

// Add an event listener on the submit button to update the text to be spoken aloud.
$button.addEventListener("click", function() {
    utterThis.text = $text.value;
    
    synth.speak(utterThis);
});
