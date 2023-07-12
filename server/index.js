const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send('Api is running');
});

app.get('/download', (req, res) => {
    var url = req.query.url;
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(url, {format: 'mp4'}).pipe(res);
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
