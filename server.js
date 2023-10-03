const express = require('express')
const sql = require('msnodesqlv8')
const app = express();
const port = 8080

var config = {
    server: "DESKTOP-N9GI0V9\\SQLEXPRESS",
    database: "fdb",
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true,
    },
  };

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

  app.post('/insert-object', (req, res) => {
    const { name, artist, album, audiofile } = req.body;
    console.log(audiofile)
    sql.connect(config, function (err) {
        if (err) console.log(err);
        else {
            var request = new sql.Request();
            request.query("INSERT INTO songs (Song_Name, Artist, Album, Sang_Fil) VALUES ('"+name+"','"+artist+"','"+album+"','"+audiofile+"')"), function (err, result) {
                if (err) console.log(err);
                else {
                    res.json("successfully inserted file / info")
                }
            };
        }
    });
});   

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});