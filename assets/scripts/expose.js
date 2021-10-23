// expose.js
window.addEventListener('DOMContentLoaded', init);
let hornvalue = 0; 
function init() {
  // TODO
    const jsConfetti = new JSConfetti()
    const hornSelect = document.querySelector('select');
    const audioSelect = document.querySelector('audio');
    const hornIcon = document.querySelector('img');
    hornImageListener(hornSelect, audioSelect, hornIcon);

    const currVolume = document.querySelector("#volume");
    const volumeIcon = document.querySelector('#volume-controls img');
    volumeIconListener(currVolume, volumeIcon);

    const buttonListener = document.querySelector('button');
    soundListener(buttonListener, audioSelect, jsConfetti, currVolume);
}

function hornImageListener(hornSelect, audioSelect, hornIcon)
{
    hornSelect.addEventListener('change', (event) => {
        if(event.target.value == 'air-horn')
        {
            hornIcon.src = "assets/images/air-horn.svg";
            hornvalue = 1;
            audioSelect.src = "assets/audio/air-horn.mp3";
        }
        else if(event.target.value == 'car-horn')
        {
            hornIcon.src = "assets/images/car-horn.svg";
            hornvalue = 2;
            audioSelect.src = "assets/audio/car-horn.mp3";
        }
        else if(event.target.value == 'party-horn')
        {
            hornIcon.src = "assets/images/party-horn.svg";
            hornvalue = 3;
            audioSelect.src = "assets/audio/party-horn.mp3";
        }
    });
}

function volumeIconListener(currVolume, volumeIcon)
{
        currVolume.addEventListener('change', (event) => {

        if(currVolume.value == 0)
        {
            volumeIcon.src = "assets/icons/volume-level-0.svg";
        }
        else if(currVolume.value >= 1 && currVolume.value < 33)
        {
            volumeIcon.src = "assets/icons/volume-level-1.svg";
        }
        else if(currVolume.value >= 33 && currVolume.value < 67)
        {
            volumeIcon.src = "assets/icons/volume-level-2.svg";
        }
        else
        {
            volumeIcon.src = "assets/icons/volume-level-3.svg";
        } 
    });
}

function soundListener(buttonListener, audioSelect, jsConfetti, currVolume)
{
    buttonListener.addEventListener('click', event => {
        
        if(hornvalue == 3 && currVolume.value != 0)
        {
            jsConfetti.addConfetti({
                emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                confettiRadius: 6,
                confettiNumber: 500,
            });
        }
        if(!currVolume.value == 0)
        {
            audioSelect.volume = currVolume.value/100;
            audioSelect.play();
        }
    });
}