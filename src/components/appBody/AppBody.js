import './appBody.css';

import AppForm from './appForm/AppForm';
import AppCreatorSwitcher from './appCreatorSwitcher/AppCreatorSwitcher';
import PixabayPhotos from './pixabayPhotos/PixabayPhotos';
import AppVideoGenerator from './appVideoGenerator/AppVideoGenerator';

const AppBody = ({words, photos, loading, creatorSwitcher, setNewSwitcher, setNewWords, reqToServer}) => {
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
				reqToServer={reqToServer}/>
			<div className="line"></div>
			<PixabayPhotos 
				photos={photos}/>
		</div>
	)
}

export default AppBody;