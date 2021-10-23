// explore.js

window.addEventListener('DOMContentLoaded', init);

var synth = window.speechSynthesis;
var voices = [];
var voiceSelect = document.querySelector('select');

function init() {
  // TODO
  onPageLoad();

  const buttonListener = document.querySelector('button');
  onButtonClicked(buttonListener);
}

//THIS METHOD WAS GOTTEN FROM MDN FOR SPEECH SYNTHESIS
function populateVoiceList() {
  voices = synth.getVoices();

  for(var i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

function onPageLoad()
{
  populateVoiceList();
  //THIS IF STATEMENT WAS ALSO GOTTEN FROM MDN FOR SPEECH SYNTHESIS
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
}

function onButtonClicked(buttonListener)
{ 
  const emojiMan = document.querySelector('img');
  const textArea = document.querySelector('textarea');

  

  buttonListener.addEventListener('click', event => {
      if(textArea.value != "")
      {
        emojiMan.src = "assets/images/smiling-open.png"
        speakTheWords(textArea.value, emojiMan);
      }
  });
}

function speakTheWords(words, pic)
{
  //I GOT THIS CODE FROM THE MDN FOR GETTING THE VOICE OUT OF THE SELECT 
  let utterThis = new SpeechSynthesisUtterance(words);

  let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

  for(let i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }

  synth.speak(utterThis);

  //GOT THIS CODE FROM MDN FOR end Event for speech
  utterThis.addEventListener('end', function(event) {
        pic.src = "assets/images/smiling.png";
      
  });
  //END OF CODE FROM MDN
}