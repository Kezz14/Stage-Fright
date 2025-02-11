let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioContext.createAnalyser();
let audioElement = null;
let isPlaying = false;

// Function to open the song modal
function openSongModal(modalId) {
    console.log("Opening modal:", modalId); // Debugging
    const modal = document.getElementById(modalId);
    modal.classList.add('active'); // Add 'active' class to display modal
}

// Function to close the song modal
function closeSongModal(modalId) {
    console.log("Closing modal:", modalId); // Debugging
    const modal = document.getElementById(modalId);
    modal.classList.remove('active'); // Remove 'active' class to hide modal
}

// Close modal if the user clicks outside of it
window.onclick = function(event) {
    const modals = document.querySelectorAll('.song-modal');
    modals.forEach(modal => {
        if (event.target == modal) { // Close modal if user clicks outside modal content
            closeSongModal(modal.id);
        }
    });
}

// Function to toggle audio (Play or Pause) and manage background change
function toggleAudio(audioId, button) {
    console.log("Toggling audio:", audioId); // Debugging
    let audio = document.getElementById(audioId);

    // Stop all currently playing audio elements
    const allAudios = document.querySelectorAll("audio");
    allAudios.forEach(aud => {
        if (aud !== audio) {
            aud.pause();
            aud.currentTime = 0;
        }
    });

    // If audio is already playing, stop it
    if (audio.paused) {
        if (!isPlaying) {
            startAnalyser(audio);
            audio.play();
            button.textContent = "Pause";
            isPlaying = true;
        }
    } else {
        audio.pause();
        button.textContent = "Listen Now";
        isPlaying = false;
    }
}

// Function to start the audio analyser and track volume
function startAnalyser(audio) {
    audioElement = audio;
    
    // Connect the audio element to the analyser
    let source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // Set analyser properties
    analyser.fftSize = 256; // This affects the frequency range
    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    // Monitor the audio data and update the background color
    function updateBackground() {
        analyser.getByteFrequencyData(dataArray);
        let average = getAverageVolume(dataArray);
        changeBackgroundColor(average);

        if (isPlaying) {
            requestAnimationFrame(updateBackground); // Keep updating the background as the song plays
        }
    }
    updateBackground();
}

// Function to calculate the average volume from the frequency data
function getAverageVolume(dataArray) {
    let sum = dataArray.reduce((acc, val) => acc + val, 0);
    return sum / dataArray.length;
}

// Function to change the background color based on the audio's volume
function changeBackgroundColor(averageVolume) {
    // Map the average volume to a color range
    let red = Math.min(255, averageVolume * 2); // The louder the music, the more red it gets
    let green = Math.min(255, averageVolume * 1.5); // Green increases with volume
    let blue = Math.min(255, averageVolume * 1.2); // Blue increases slightly as well

    // Apply the background color change
    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}