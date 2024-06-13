import { useState } from 'react'
import './App.css'

function App() {
  const [isLoading,setIsLoading] = useState(false);
  const [formData,setFormData] = useState({
    Nitrogen:0,
    Phosphorus:0,
    Potassium:0,
    Temperature:0,
    Humidity:0,
    pH_Value:0,
    Rainfall:0
  });
  const [result,setResult] = useState('');
  const [showSpan,setShowSpan] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let inputData = { ...formData };
    inputData[name] = value;
    setFormData(inputData);
  };
  const handlereset=(event)=>{
    window.location.reload();
  };

  const handlePredictClick = () => {
    const url = "https://nextcrop.onrender.com/predict";
    setIsLoading(true);
    const jsonData = JSON.stringify(formData);
    // Fetch request to the Flask backend
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setResult(response.prediction);
        setIsLoading(false);
        setShowSpan(true);
      });
  };

  return (
    <>
      <div className='main-content'>
        <div className='navBar'>
          <nav className="navbar bg-light">
            <div className="container-fluid logo-cont">
              <a className="navbar-brand" href="#">
                <img src="./NextCrop_logo.png" alt="Logo" width="50" height="40" className="d-inline-block align-text-top"  />
                <div className='logo-name'>Next Crop</div>
              </a>
            </div>
          </nav>
        </div>
        <img src="/man.png" alt="man" height={500} className='man-img'/>
        <div className='content'>
          <div className='heading'>
            <h1 className='main-heading'>Predict your <br></br><span>NEXT CROP</span> here ,</h1>
            <img src="/Seeding.gif" alt="gif" height={420} />
          </div>
          <div className='form-content'>
            <form method="post" acceptCharset="utf-8" name="Modelform">
              <div className='input-fields'>
                <label htmlFor="Nitrogen" className='n-label'>
                  Nitrogen
                </label>
                <input type="number" name="Nitrogen" id="Nitrogen" 
                  onChange={handleChange} />
              </div>
              <div className='input-fields'>
                <label htmlFor="Phosphorus" className='p-label'>
                  Phosphorus
                </label>
                <input type="number" name="Phosphorus" id="Phosphorus" 
                  onChange={handleChange} />
              </div>
              <div className='input-fields'>
                <label htmlFor="Potassium" className='k-label'>
                  Potassium
                </label>
                <input type="number" name="Potassium" id="Potassium" 
                  onChange={handleChange} />
              </div>
              <div className='input-fields'>
                <label htmlFor="Temperature" className='temp-label'>
                  Temperature
                </label>
                <input type="number" name="Temperature" id="Temperature" 
                  onChange={handleChange} />
              </div>
              <div className='input-fields'>
                <label htmlFor="Humidity" className='humid-label'>
                  Humidity
                </label>
                <input type="number" name="Humidity" id="Humidity" 
                  onChange={handleChange} />
              </div>
              <div className='input-fields'>
                <label htmlFor="pH_Value" className='ph-label'>
                  pH_Value
                </label>
                <input type="number" name="pH_Value" id="pH_Value" 
                  onChange={handleChange} />
              </div>
              <div className='input-fields'>
                <label htmlFor="Rainfall" className='rain-label'>
                  Rainfall
                </label>
                <input type="number" name="Rainfall" id="Rainfall" 
                  onChange={handleChange} />
              </div>
              <div>
                <button className='predict-btn'
                disabled={isLoading} onClick={!isLoading ? handlePredictClick:null}>
                  Predict crop
                </button>
                <input type="reset" value="Reset" className='reset-btn' onClick={handlereset} />
              </div>
            </form>
            <div className="results">
              <h4>
                {showSpan && (
                  <span id="prediction">
                    {result && Object.keys(result).length !== 0 ? (
                      <p>most recommended crop is <span>{result} </span>.</p>
                    ) : (
                      <p>Please fill out each field in the form completely</p>
                    )}
                  </span>
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
