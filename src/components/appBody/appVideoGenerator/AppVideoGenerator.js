import './appVideoGenerator.css';
import axios from 'axios';

const AppVideoGenerator = ({reqToServer, selectedPhotos}) => {

  const req = (url, photoUrls) => {
    axios.get(url, {
    params: {
      photoUrls: photoUrls
    }
  })
    .then(response => {
      console.log('Відповідь сервера:', response.data);
      // Обробка відповіді сервера тут
    })
    .catch(error => {
      console.error('Помилка запиту:', error);
      // Обробка помилки тут
    });
  }

  return(
    <input 
      type="button"
      id="request-button"
      onClick={() => req('https://localhost:3005/generate-video', selectedPhotos)}
      value="Request"/>
  )
}

export default AppVideoGenerator;