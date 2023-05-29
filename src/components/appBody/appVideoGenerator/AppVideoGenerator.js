import { useState, useEffect, useCallback } from 'react';

// import video from '../../../assets/videos/test.mp4';
import axios from 'axios';

import Spinner from '../../spinner/Spinner'

import './appVideoGenerator.css';

const AppVideoGenerator = ({selectedPhotos}) => {
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [serverResponse, setServerResponse] = useState();
  const [importDynamicVideo, setImportDynamicVideo] = useState('')

  useEffect(() => {
    const importVideo = async () => {
      if(serverResponse){
        const module = await import(`../../../assets/videos/${serverResponse}`)
        setImportDynamicVideo(module.default);
      }
    }

    importVideo();
  }, [serverResponse])

  const onRequest = useCallback((url, photoUrls) => {
    try{
      setRequestLoading(true);
      
      axios.get(url, {
        params: {
          photoUrls: photoUrls
        }
      })
      .then((res) => {
        console.log('Відповідь сервера:', res.data);
        setRequestLoading(false);
        setRequestError(false);
        setServerResponse(res.data);
      })
      .catch(error => {
        console.error('Помилка запиту:', error);
        setRequestLoading(false);
        setRequestError(true)
      });

    } catch(err) {
      console.log(err);
    }
  }, [])

  const clearError = useCallback(() => {
    setRequestError(false)
    setRequestLoading(false);
  }, [])

  const spinner = requestLoading ? <Spinner/> : null;
  const view = serverResponse
    ? <div style={{display: 'flex', alignItems: 'top', justifyContent: 'center', position: 'relative', marginTop: 30}}>
      <video width="1280" height="720"controls>
        <source src={importDynamicVideo} type="video/mp4"/>
      </video>
      <button style={{width: 30, height: 30, position: 'absolute', right: 0}}onClick={() => setServerResponse(false)}>
        X
      </button>
    </div>
    : null;
  const error = requestError ? "Something wen't wrong" : null;

  return(
    <>
      <input 
        type="button"
        id="request-button"
        onClick={() => onRequest('https://localhost:3005/generate-video', selectedPhotos)}
        value="Згенерувати відео"/>

      <br />

      {spinner}
      {view}
      {error}
    </>
  )
}

export default AppVideoGenerator;