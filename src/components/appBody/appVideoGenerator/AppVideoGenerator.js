import { useState, useEffect, useCallback } from 'react';

import axios from 'axios';

// import video from '../../../assets/videos/video.mp4'
import Spinner from '../../spinner/Spinner'

import './appVideoGenerator.css';

const AppVideoGenerator = ({selectedPhotos, newSelectedPhotos}) => {
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [serverResponse, setServerResponse] = useState();
  const [importDynamicVideo, setImportDynamicVideo] = useState('');


  // useEffect(() => {
  //   const importVideo = async () => {
  //     if(serverResponse){
  //       const resp = await import(`../../../assets/videos/${serverResponse}`)
  //       console.log(resp)
  //       setImportDynamicVideo(resp.default);
  //     }
  //   }

  //   importVideo();
  // }, [serverResponse])

  const clearError = useCallback(() => {
    setRequestError(false);
  }, [])

  const onRequest = useCallback((url, photoUrls) => {

    clearError()

    try{
      setRequestLoading(true);
      
      axios.get(url, {
        params: {
          photoUrls: photoUrls
        }
      })
      .then((res) => {
        console.log('Відповідь сервера:', res);
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

  // console.dir(process.env.PUBLIC_URL);

  const spinner = requestLoading ? <Spinner/> : null;
  const view = serverResponse
    ? <div style={{display: 'flex', alignItems: 'top', justifyContent: 'center', position: 'relative', marginTop: 30}}>
      <video width="1280" height="720" controls>
        <source src={process.env.PUBLIC_URL + serverResponse} type="video/mp4"/>
      </video>
      <button style={{width: 30, height: 30, position: 'absolute', right: 0}} onClick={() => setServerResponse(false)}>
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
        value='Згенерувати відео'/>

      <br />

      <input 
        type="button"
        id="clear-button"
        // onClick={}
        value="Очистити список"/>

      <br />

      {spinner}
      {view}
      {error}
    </>
  )
}

export default AppVideoGenerator;