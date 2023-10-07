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
  fetch('/uploads', {
    method: 'POST',
    body: formData,
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .then(
    setTimeout(() => {
      loadSongs()
    }, 20)
    )
});

function playAudio(songObj) {
    const audio = new Audio(songObj.audiofile);
    audio.play();
}

function loadSongs() {
  fetch('/get-songs')
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
songDiv.textContent = ""
for (let i = 0; i < parsedData.songInfo.length; i++) {
  var arr = [parsedData.songInfo[i].song_name, parsedData.songInfo[i].artist, parsedData.songInfo[i].album]
  var newDiv = document.createElement("div")
  newDiv.className = "newDiv"
  newDiv.id = parsedData.songInfo[i].song_id
  var audioplayer = document.createElement("audio")
  var navn = document.createElement("p"); navn.textContent = arr[0]; navn.id = "textNavn"
  var artist = document.createElement("p"); artist.textContent = arr[1]; artist.id = "textArtist"
  var album = document.createElement("p"); album.textContent = "Album: "+arr[2]; album.id = "textAlbum"
  newDiv.appendChild(navn);
  newDiv.appendChild(artist);
  newDiv.appendChild(album);
  
  audioplayer.src = parsedData.songInfo[i].filepath
  audioplayer.type="audio/mp3"
  audioplayer.controls = true
  audioplayer.id = "audioPlayers"
  newDiv.appendChild(audioplayer)
  var delKnapp = document.createElement("button")
  delKnapp.textContent = "Delete"
  delKnapp.className = "delButtons"
  var delid = parsedData.songInfo[i].song_id
    delKnapp.addEventListener('click', (function(id) {
      return function() {
        deleteFunc(id);
      };
    })(delid));
  newDiv.appendChild(delKnapp)
  songDiv.appendChild(newDiv)
}
}

function deleteFunc(id) {
  console.log(id)
  var testObj = {"id": ""}
  testObj.id = id
  fetch('/delete-song', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testObj),
  })
  .then(res => res.json())
  .then((data => {
    const parsedData = data
    console.log(parsedData)
  }))
  .then(
    setTimeout(() => {
      loadSongs()
    }, 30)
  )
}



loadSongs()

loadButton.addEventListener('click', loadSongs)