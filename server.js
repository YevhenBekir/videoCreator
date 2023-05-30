const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const https = require('https');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3005;

// Створення та надання ssl сертифікату(самопідписаного) для серверу
const privateKey = fs.readFileSync('./keys/private.key', 'utf8');
const certificate = fs.readFileSync('./keys/certificate.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

// Ствроюю динамічну назву відео при виклику функції (на початку кожного нового запиту)
let videoName;
const setVideoName = () => {
  videoName = uuidv4();
}

// CORS - налаштування
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Запити з цього домену - дозволені
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // HTTP-методи - дозволені
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Заголовки Content-Type - дозволені
  next();
});

// Обробка запиту за маршрутом. Маршрут - https://localhost:3005/generate-video
app.get('/generate-video', async (req, res) => {

  // Отримую масив з фотографіями
  const photosUrl = req.query.photoUrls;

  // Створюю та перевіряю чи існує директорія з фотографіями
  const photosDirectory = './src/assets/images/';
  if (!fs.existsSync(photosDirectory)){
    fs.mkdirSync(photosDirectory);
  } else {  
    fs.readdirSync(photosDirectory).forEach(file => {
      const photoPathFile = path.join(photosDirectory, file);
      fs.unlinkSync(photoPathFile);
    });

    fs.rmdirSync(photosDirectory);
    fs.mkdirSync(photosDirectory);
  }


  // else {
  //   fs.readdirSync(videosDirectory).forEach(file => {
  //     const videoPathFile = path.join(videosDirectory, file);
  //     fs.unlinkSync(videoPathFile);
  //   })
    
  //   fs.rmdirSync(videosDirectory);
  //   fs.mkdirSync(videosDirectory);
  // }

  // Завантажую отримані фотографії в директорію
  try {
    await Promise.all(photosUrl.map(async (photoUrl, i) => {
      const photoName = `img${i + 1}.jpg`;
      const photosPath = `${photosDirectory}${photoName}`;
      const file = fs.createWriteStream(photosPath);
      const request = https.get(photoUrl, function (res) {
        res.pipe(file);
      });
      await new Promise((resolve, reject) => {
        file.on('finish', resolve);
        file.on('error', reject);
      });
    }));
  } catch (error) {
    console.error(`Виникла помилка під час завантаження фотографій: ${error}`);
    return res.status(500).send('Виникла помилка під час завантаження фотографій');
  }

  // Створюю нову назву для відео
  setVideoName();
  console.log(`Video name - ${videoName}`);

  // Створюю та перевіряю чи існує директорія з відео
  const videosDirectory = path.join(__dirname, '/public/static');
  if(!fs.existsSync(videosDirectory)){
    fs.mkdirSync(videosDirectory);
  }

  // Перевіряю, чи є раніше створене відео, якщо є - видаляю його
  const videoFilePath = path.join(videosDirectory, `${videoName}.mp4`);;
  if (fs.existsSync(videoFilePath)) {
    fs.unlinkSync(videoFilePath);
  }

  // Створюю команду для генерації відео з налаштуваннями
  const imageInput = `${photosDirectory}img%d.jpg`;
  const command = `ffmpeg -framerate 1/2 -i ${imageInput} -i ./src/assets/audios/dream.mp3 -vf "scale=1280:720, drawtext=text='sometext':x=10:y=10:fontsize=24:fontcolor=red" -c:v libx265 -c:a aac -pix_fmt yuv420p -r 25 ${videoFilePath}`;
  
  // Виконую генерацію, якщо виникнуть - обробляю помилки, надсилаю відповідь
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Виникла помилка: ${error}`);
      return res.status(500).send('Виникла помилка під час генерації відео');
    }

    console.log('Відео успішно згенеровано');

    res.send(`/static/${videoName}.mp4`);
  });
});

// Запускаю сервер з ssl-сертифікатом
https.createServer(credentials, app).listen(port, () => {
  console.log(`Сервер запущений на порті - ${port}`);
});