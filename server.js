const express = require('express')
const app = express();
const multer = require('multer')
const cors = require('cors')
const port = 8080
const fs = require('fs');
const dir = './public/Audiofiles';

function dirLength() {
fs.readdir(dir, (err, files) => {return(files.length)});
}


app.use(express.json());
app.use(cors()) // tillater forespørsler fra hvilken som helst ip

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, __dirname + '/public/AudioFiles');
  },
  filename: function(req, file, callback) {
    callback(null, (file.originalname))
  }
})

const uploads = multer({storage: storage})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

app.get("/get-songs", (req, res) => {
    fs.readFile(__dirname + '/public/AudioFiles/objects.json', 'utf-8', function(err,data){
    if(err)console.log(err)
    else{
    res.json(JSON.parse(data))
    }
  })
})

app.post("/delete-song", (req, res) => {
  const { id } = req.body;
  //console.log(id);
  var dataFromJSON = {}
  fs.readFile(__dirname + '/public/AudioFiles/objects.json', 'utf-8', function(err,data){
    if(err)console.log(err)
    else{
    dataFromJSON = JSON.parse(data)
    var tall = 0
    for (let t = 0; t < dataFromJSON.songInfo.length; t++) {
      if (dataFromJSON.songInfo[t].filepath == dataFromJSON.songInfo[id].filepath)  {
        tall++
        console.log(tall)
      }
    }
    if (tall > 1) {console.log("yap yap")} else {
      var newStr = dataFromJSON.songInfo[id].filepath.slice(2)
      var newStr1 = ("public\\"+newStr)
      fs.unlink((newStr1), (err) => {
      if (err) {
        console.log("feil")
        console.log(err)
        return;
      }
      console.log("file successfully deleted")
    })}
    dataFromJSON.songInfo.splice(id, 1)
    for (let i = 0; i < dataFromJSON.songInfo.length; i++) {
      dataFromJSON.songInfo[i].song_id = i
    }}
  })
  setTimeout(() => {
    fs.writeFile(__dirname + '/public/AudioFiles/objects.json', JSON.stringify(dataFromJSON), function (err){
    if(err) console.log(err);
    else console.log("Successfully wrote file");
    res.json("Successfully deleted song")
    });
    
  }, 10);
})

app.post("/uploads", uploads.array("file"), (req, res) => {
  console.log(req.body)
  fs.readdir(dir, (err, files) => {console.log(files.length)});
  
var dataFromJSONFile = {};

fs.readFile(__dirname + '/public/AudioFiles/objects.json', 'utf8', function(err, data){
  if (err) {
    console.error(err);
    return;
  }

  try {
    dataFromJSONFile = JSON.parse(data);

    var myObj = {
      "song_id": dataFromJSONFile.songInfo.length,
      "song_name": req.body.song_name,
      "artist": req.body.artist,
      "album": req.body.album,
      "filepath": ('../AudioFiles/' + req.files[0].filename)
    }

    if (!Array.isArray(dataFromJSONFile.songInfo)) {
      dataFromJSONFile.songInfo = [];
    }

    dataFromJSONFile.songInfo.push(myObj);

    fs.writeFile(__dirname + '/public/AudioFiles/objects.json', JSON.stringify(dataFromJSONFile), function (err){
      if(err) console.log(err);
      else console.log("Successfully wrote file");
    });

    res.json({status: "files received"});
  } catch (error) {
    console.error("Error parsing JSON:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});
})
app.use(express.static('public'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})