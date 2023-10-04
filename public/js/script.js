const createButton = document.getElementById('createbutton')
const selectFile = document.getElementById('input4')
const retField = document.getElementById('retField')
const form = document.querySelector('form')
const nameField = document.getElementById('input1')
const ArtistField = document.getElementById('input2')
const AlbumField = document.getElementById('input3')
const loadButton = document.getElementById('loadSongs')



form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("createButton pressed")
  for (let i = 1; i < 5; i++) {
      if (document.getElementById('input'+i).value == "") {
          retField.textContent = "All Fields must be filled"
          return;}}
      if (selectFile.files[0].type != "audio/mpeg") {
          retField.textContent = "Filetype must be mp3"; return;}
  retField.textContent = ""

  
  const formData = new FormData()
  formData.append("song_name", nameField.value)
  formData.append("artist", ArtistField.value)
  formData.append("album", AlbumField.value)
  formData.append("file", selectFile.files[0]);

  console.log(...formData)
  
  fetch('http://127.0.0.1:8080/uploads', {
    method: 'POST',
    body: formData,
  })
  .then(res => res.json())
  .then(data => console.log(data))
});

function playAudio(songObj) {
    const audio = new Audio(songObj.audiofile);
    audio.play();
}

function loadSongs() {
  var objectFromFetch = {}
  fetch('http://127.0.0.1:8080/get-songs')
  .then(res => res.json())
  .then (data => {
    const parsedData = data
    playSpecificSong(parsedData)
    displaySongs(parsedData)
  })
}

function playSpecificSong(parsedData) {
  console.log(parsedData.songInfo[1].filepath);
  const urlFilePath = parsedData.songInfo[document.getElementById('numberInput').value].filepath;
  const audio = new Audio(urlFilePath);
  audio.play();
}

function displaySongs(parsedData) {
  console.log(parsedData)
}


loadButton.addEventListener('click', loadSongs)