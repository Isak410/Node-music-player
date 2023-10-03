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

    var arr = []
    var audioUrl = URL.createObjectURL(selectFile.files[0])
    for (let t = 1; t < 4; t++ ) {arr[t-1] = (document.getElementById('input'+t).value)}
    var songObj = {
        "name": arr[0],
        "artist": arr[1],
        "album": arr[2],
        "audiofile": audioUrl
    }

    
    console.log(audioUrl)
    //console.log(songObj)
    //console.log(songObj.audiofile)
    //playAudio(songObj) //test om filen er lastet opp korrekt

    
    fetch('/insert-object', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(songObj), // Send the data to insert in the request body
      })
        .then(response => {
          response.json()
          console.log("Data inserted successfully")
        })
        .then(data => {
          console.log(data.message)
        })
        .catch(error => {
          console.log('Error: ' + error);
        });
}

function playAudio(songObj) {
    const audioUrl = URL.createObjectURL(songObj.audiofile)

    const audio = new Audio(audioUrl);
    audio.play();
}


createButton.addEventListener('click', createPressed)