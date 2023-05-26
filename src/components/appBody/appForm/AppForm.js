import './appForm.css';

const AppForm = ({setNewWords, reqToServer}) => {

	const transformWords = (e) => {
		e.preventDefault();
		
		//(3) [{…}, {…}, {…}]
		const data = Object.keys(e.target)
			.map( key => ({ input: e.target[key] }))
			.filter(key => key.input.name === 'main-field');
		
		setNewWords(data)
	}

	return(
		<div className="app-form">
			<form
				action="#"
				className="form"
				onSubmit={(e) => transformWords(e)}>
				<p>ENTER KEYWORDS:</p>
				<input type="text" className="input-field" name="main-field" required/>
				<input type="text" className="input-field" name="main-field" placeholder="This is not a required field"/>
				<input type="text" className="input-field" name="main-field" placeholder="This is not a required field"/>
				<br />
				<input type="submit" id="submit-button"/>				
			</form>
		</div>
	)
}

export default AppForm;