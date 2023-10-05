const createButton = document.getElementById('createbutton')
const selectFile = document.getElementById('input4')
const retField = document.getElementById('retField')
const form = document.querySelector('form')
const nameField = document.getElementById('input1')
const ArtistField = document.getElementById('input2')
const AlbumField = document.getElementById('input3')
const loadButton = document.getElementById('loadSongs')
const songDiv = document.getElementById('displaySongDiv')


form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("createButton pressed")
  for (let i = 1; i < 5; i++) {
      if (document.getElementById('input'+i).value == "") {
          retField.textContent = "All Fields must be filled"
          return;}}
      if (selectFile.files[0].type != "audio/mpeg") {
          retField.textContent = "Filetype must be mp3"; return;}
      var fileName = selectFile.files[0].name
      if (fileName.includes(' ')){retField.innerHTML = "filename must not contain spaces"; return;}
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
  fetch('http://127.0.0.1:8080/get-songs')
  .then(res => res.json())
  .then (data => {
    const parsedData = data
    displaySongs(parsedData)
  })
}

function playSpecificSong(parsedData) {
  console.log(parsedData.songInfo[0].filepath);
  const urlFilePath = parsedData.songInfo[0].filepath;
  const audio = new Audio(urlFilePath);
  audio.play();
}

function displaySongs(parsedData) {
  console.log(parsedData)

  for (let i = 0; i < parsedData.songInfo.length; i++) {
    var navn = document.createTextNode(parsedData.songInfo[i].song_name)
    var artist = document.createTextNode(parsedData.songInfo[i].artist)
    var album = document.createTextNode(parsedData.songInfo[i].album)
    var audioplayer = document.createElement("audio")
    audioplayer.src = parsedData.songInfo[i].filepath
    audioplayer.type="audio/mp3"
    audioplayer.controls = true
    var newDiv = document.createElement("div")
    newDiv.id = "newDiv"
    newDiv.appendChild(navn)
    newDiv.appendChild(document.createElement("br"))
    newDiv.appendChild(artist)
    newDiv.appendChild(document.createElement("br"))
    newDiv.appendChild(album)
    newDiv.appendChild(document.createElement("br"))
    newDiv.appendChild(audioplayer)
    console.log(newDiv)
    songDiv.appendChild(newDiv)
  }
}


loadButton.addEventListener('click', loadSongs)