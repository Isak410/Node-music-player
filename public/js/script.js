const createButton = document.getElementById('createbutton')
const selectFile = document.getElementById('input4')
const retField = document.getElementById('retField')





function createPressed() {
    console.log("createButton pressed")
    for (let i = 1; i < 5; i++) {
        if (document.getElementById('input'+i).value == "") {
            retField.textContent = "All Fields must be filled"
            return;}}
        if (selectFile.files[0].type != "audio/mpeg") {
            retField.textContent = "Filetype must be mp3"; return;}
    retField.textContent = ""

    const form = document.getElementById('uploadForm')
    const formData = new FormData(form)
    
    fetch('/insert-object', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData, // Send the data to insert in the request body
      })
      .then(response => response.text())
      .then(message => {
        console.log(message);
        // Handle success (e.g., show a success message to the user)
      })
      .catch(error => {
        console.error('Error uploading file:', error.message);
        // Handle error (e.g., show an error message to the user)
      });
}

function playAudio(songObj) {
    const audio = new Audio(songObj.audiofile);
    audio.play();
}


createButton.addEventListener('click', createPressed)