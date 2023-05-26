import { useState } from 'react';

import './pixabayPhotos.css';

const PixabayPhotos = ({photos}) => {
	const [activeIndexes, setActiveIndexes] = useState([]);

	const handleImageClick = (index) => {
		const isActive = activeIndexes.includes(index)

		if(isActive){
			const updatedIndexes = activeIndexes.filter(i => i !== index)
			setActiveIndexes(updatedIndexes);
		} else {
			setActiveIndexes([...activeIndexes, index])
		}
	}

	const photosList = photos.map(item => {
		return item.map(el => {

			const isActive = activeIndexes.includes(el.id);

			return <img
				className={isActive ? 'active' : 'img-result'}
				src={el.webformatURL}
				onClick={() => handleImageClick(el.id)}
				key={el.id}
				alt={el.tags} />
		})
	})

	return (
		<div className="app-photos">
			<div className="photos">
				{photosList}
			</div>
		</div>
    )
}

export default PixabayPhotos;