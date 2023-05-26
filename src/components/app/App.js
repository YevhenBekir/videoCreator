import { useState, useEffect } from "react";
import { useHttp } from '../../service/http.hook'

import AppHeader from '../appHeader/AppHeader';
import AppBody from "../appBody/AppBody";

import '../../style/main.css';

const App = () => {
  // or Redux
  const [words, setWords] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [creatorSwitcher, setCreatorSwitcher] = useState('Midjourney');

  const {request, requestLoading, requestError} = useHttp();

  useEffect(() => {

    if(words.length){
      words.forEach(item => {

        console.log(item)

      // value from field
      if(!item.input.value){
        return;
      }

      const req = fetch(`https://pixabay.com/api/?key=36712417-e6e21df403fda001a94137008&q=${item.input.value}&image_type=photo`)
        .then(data => data.json())
        .then(data => {
          setPhotos([...photos, data.hits]);
        });

    })
    }
  }, [words])

  const setNewSwitcher = () => {
    setCreatorSwitcher(creatorSwitcher => creatorSwitcher === 'Pixabay' ? 'Midjourney' : 'Pixabay')
  }

  const setNewWords = (data) => {
    setWords(data)
  }

  const reqToServer = (url, method = "GET", body = null, headers = { "Content-type": "application/json" }) => {
    request(url, method, body, headers)
  }

  return(
    <>
      <AppHeader/>
      <AppBody 
        words={words}
        photos={photos}
        creatorSwitcher={creatorSwitcher}
        setNewSwitcher={setNewSwitcher}
        setNewWords={setNewWords}
        reqToServer={reqToServer}/>
    </>
  )
}

export default App; 