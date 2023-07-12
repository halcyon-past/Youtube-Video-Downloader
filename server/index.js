const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send('Api is running');
});

app.get('/download', async (req, res) => {
    const url = req.query.url;
    const info = await ytdl.getInfo(url);
    const videoTitle = info.videoDetails.title;

    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    const videoSize = videoFormat.contentLength;

    res.setHeader('Content-Disposition', `attachment; filename="${videoTitle}.mp4"`);
    res.setHeader('Content-Length', videoSize);
    res.setHeader('Content-Type', 'video/mp4');

    ytdl(url, { format: 'mp4' }).pipe(res);
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
