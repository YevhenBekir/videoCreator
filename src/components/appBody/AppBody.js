import { useState } from 'react';

import AppForm from './appForm/AppForm';
import AppCreatorSwitcher from './appCreatorSwitcher/AppCreatorSwitcher';
import PixabayPhotos from './pixabayPhotos/PixabayPhotos';
import AppVideoGenerator from './appVideoGenerator/AppVideoGenerator';

import './appBody.css';

const AppBody = ({words, photos, loading, creatorSwitcher, setNewSwitcher, setNewWords, reqToServer}) => {
	const [selectedPhotos, setSelectedPhotos] = useState([]);

	const newSelectedPhotos = (arr) => {
		setSelectedPhotos(arr)
	}

	return(
		<div className="app-body">
			<div className="creator">
				<AppForm
					words={words}
					photos={photos}
					loading={loading}
					setNewWords={setNewWords}
					reqToServer={reqToServer}/>
				<AppCreatorSwitcher 
					creatorSwitcher={creatorSwitcher}
					setNewSwitcher={setNewSwitcher}/>
			</div>
			<AppVideoGenerator 
				reqToServer={reqToServer}
				selectedPhotos={selectedPhotos}/>
			<div className="line"></div>
			<PixabayPhotos 
				photos={photos}
				newSelectedPhotos={newSelectedPhotos}/>
		</div>
	)
}

export default AppBody;