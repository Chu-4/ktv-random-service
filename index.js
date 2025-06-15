const express = require('express');
const cors = require('cors');

const songs = require('./songs.json');

const app = express();
const port = process.env.PORT || 3000;

// 简单跨域支持
app.use(cors());
// 解析 JSON 请求体
app.use(express.json());

// 接口：返回随机一首歌
app.post('/random-song', (req, res) => {
  console.log('收到请求：/random-song');
  let filteredSongs = [...songs];

  // 如果有请求体参数，进行筛选
  if (req.body) {
    if (req.body.category) {
      filteredSongs = filteredSongs.filter(song =>
        song.category.toLowerCase().includes(req.body.category.toLowerCase())
      );
    }
  }

  // 如果筛选后没有歌曲，返回错误信息
  if (filteredSongs.length === 0) {
    return res.status(404).json({ error: '没有找到符合条件的歌曲' });
  }

  const randomSong = filteredSongs[Math.floor(Math.random() * filteredSongs.length)];
  res.json({ song: randomSong });
});

// 启动服务器
app.listen(port, '0.0.0.0', () => {
  console.log(`服务器已启动：http://0.0.0.0:${port}`);
});
