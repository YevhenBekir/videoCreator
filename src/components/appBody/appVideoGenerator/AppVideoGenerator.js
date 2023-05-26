import './appVideoGenerator.css';

const AppVideoGenerator = ({reqToServer}) => {
  return(
    <input 
      type="button"
      id="request-button"
      onClick={() => reqToServer('http://localhost:3005/generate-video')}
      value="Request"/>
  )
}

export default AppVideoGenerator;