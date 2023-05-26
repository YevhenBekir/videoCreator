import { nanoid } from 'nanoid';

const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3005;

// CORS - налаштування
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Запити з цього домену - дозволені
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // HTTP-методи - дозволені
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Заголовки Content-Type - дозволені
  next();
});

// Маршрут для обробки запиту
app.get('/generate-video', (req, res) => {

  // Виконую команду для генерації через ffmpeg
  const command = 'ffmpeg -framerate 1/2 -i ./src/assets/images/img%d.jpg -i ./src/assets/audios/dream.mp3 -vf scale=1280:720 -c:v libx264 -c:a aac -pix_fmt yuv420p -r 10 ./src/assets/videos/result.mp4';
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Виникла помилка: ${error}`);
      return res.status(500).send('Виникла помилка під час генерації відео');
    }

    console.log('Відео успішно згенеровано');
    
    // Надсилаю відео як відповідь на запит - потрібно надсилати посилання на файл у директорії
    res.sendFile(__dirname + '/result.mp4');
  });
});

app.listen(port, () => {
  console.log(`Сервер запущений на порті - ${port}`);
});


// http://localhost:3005/generate-video