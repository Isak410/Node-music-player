const express = require('express')
const cors = require('cors')
const app = express();
const port = 8080


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});