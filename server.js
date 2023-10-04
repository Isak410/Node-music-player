const express = require('express')
const app = express();
const port = 8080
const multer = require('multer')


app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/AudioFiles')
  },
  filename: (req, file, cn) => {
    cb(null, file.originalname)
  },
});

const upload = multer({storage})

  app.post('/insert-object', upload.single('mp3File'), (req, res) => {


    //const { name, artist, album, audiofile } = req.body;
    //console.log(audiofile)
    
});   

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});