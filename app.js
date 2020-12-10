const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const app = express();
const port = 3000;

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.sendFile(__dirname + "/views/index.html"));
app.use(express.static(__dirname + "/public"));

app.post('/api/file', upload.single('upfile'), (req, res) => {
  if (req.file === undefined) {
    res.json("No file is selected!")
  } else {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    })
  }
})

app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
})