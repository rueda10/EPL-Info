const express = require('express');
const path = require('path');
const app = express();

app.listen(process.env.PORT || 8080, function() {
  console.log('Server started...');
});

app.use(express.static(__dirname));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
});
