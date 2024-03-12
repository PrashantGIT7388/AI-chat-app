import {useState} from 'react';
import axios from 'axios';
import CGLogo from './chatGPT.png';
import AppLogo from './app-logo.png';
import './App.css';
import {BsMicFill} from 'react-icons/bs';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  let [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { listening, transcript } = useSpeechRecognition();
  
// console.log(transcript)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // communicate with API
    // post input value 'prompt' to API end point 
    axios
      .post("https://kind-rose-hare-robe.cyclic.app/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
    
  };
// console.log(response)
  return (
    <div className="wrapper">
      
      <img src={AppLogo} alt="" className="app-logo" />	
      <form onSubmit={handleSubmit}>
        <img src={CGLogo} alt="" className={loading ? 'cg-logo loading' : 'cg-logo'} />
        <input
          type="text"
          value={prompt=transcript}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything... :)"
        />
        <div className="speech">
            {
                listening ?
                  <div>
                      <BsMicFill className="micOn"/>
                      <div className="pulse-ring"></div>
                  </div>
                :
                  <button onClick={SpeechRecognition.startListening}>
                      <BsMicFill className="micOff"/>
                      
                  </button>
            }
        </div>
        <button type="submit">Ask</button>
      </form>
      <p className="response-area">
        {loading ? 'loading...' : response}
      </p>
    
      <div className="footer">~ webstylepress ~</div>
</div>
  );
}

export default App;