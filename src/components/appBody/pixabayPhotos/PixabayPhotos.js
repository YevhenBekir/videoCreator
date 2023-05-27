import { useState, useEffect } from 'react';

import './pixabayPhotos.css';

const PixabayPhotos = ({photos, newSelectedPhotos}) => {
	const [activeIndexes, setActiveIndexes] = useState([]);
	const [selectPhotos, setSelectPhotos] = useState([]);

	useEffect(() => {
		newSelectedPhotos(selectPhotos)
	}, [selectPhotos])

	console.log(photos)
	useEffect(() => {
		photos.forEach(item => {
			item.forEach(el => {
				const isActive = activeIndexes.some(k => k === el.id)
				if(isActive){
					const isPhotoSelected = selectPhotos.some((photo) => photo === el.webformatURL);
					if (!isPhotoSelected) {
						setSelectPhotos((prevSelectPhotos) => [...prevSelectPhotos, el.webformatURL]);
					}
				} else {
					setSelectPhotos((prevSelectPhotos) =>
          	prevSelectPhotos.filter((photo) => photo !== el.webformatURL)
        );
				}
				
			})
		})

	}, [activeIndexes])

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
console.log(el)
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