import { useState } from 'react'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    Nitrogen: '',
    Phosphorus: '',
    Potassium: '',
    Temperature: '',
    Humidity: '',
    pH_Value: '',
    Rainfall: ''
  });
  const [result, setResult] = useState('');
  const [showSpan, setShowSpan] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let inputData = { ...formData };
    inputData[name] = value;
    setFormData(inputData);
  };

  const handlereset = (event) => {
    window.location.reload();
  };

  const handlePredictClick = (event) => {
    event.preventDefault(); // Prevent form from submitting and reloading the page

    // Check if all fields are filled
    for (let key in formData) {
      if (formData[key] === '') {
        setErrorMessage('Please fill out each field in the form completely.');
        setShowSpan(false);
        return;
      }
    }

    setErrorMessage('');
    
    // Parse form data as floats
    const parsedFormData = {
      Nitrogen: parseFloat(formData.Nitrogen),
      Phosphorus: parseFloat(formData.Phosphorus),
      Potassium: parseFloat(formData.Potassium),
      Temperature: parseFloat(formData.Temperature),
      Humidity: parseFloat(formData.Humidity),
      pH_Value: parseFloat(formData.pH_Value),
      Rainfall: parseFloat(formData.Rainfall)
    };

    const url = "https://nextcrop.onrender.com/predict";
    setIsLoading(true);
    const jsonData = JSON.stringify(parsedFormData);

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
                <img src="./NextCrop_logo.png" alt="Logo" width="50" height="40" className="d-inline-block align-text-top" />
                <div className='logo-name'>Next Crop</div>
              </a>
            </div>
          </nav>
        </div>
        <img src="/man.png" alt="man" height={500} className='man-img' />
        <div className='content'>
          <div className='heading'>
            <h1 className='main-heading'>Predict your <br></br><span>NEXT CROP</span> here ,</h1>
            <img src="/Seeding.gif" alt="gif" height={420} />
          </div>
          <div className='form-content'>
            <form method="post" acceptCharset="utf-8" name="Modelform" onSubmit={handlePredictClick}>
              <div className='input-fields'>
                <label htmlFor="Nitrogen" className='n-label'>
                  Nitrogen
                </label>
                <input type="text" name="Nitrogen" id="Nitrogen"
                  onChange={handleChange} />
              </div>
              <div className='input-fields'>
                <label htmlFor="Phosphorus" className='p-label'>
                  Phosphorus
                </label>
                <input type="text" name="Phosphorus" id="Phosphorus"
                  onChange={handleChange} />
              </div>
              <div className='input-fields'>
                <label htmlFor="Potassium" className='k-label'>
                  Potassium
                </label>
                <input type="text" name="Potassium" id="Potassium"
                  onChange={handleChange} />
              </div>
              <div className='input-fields'>
                <label htmlFor="Temperature" className='temp-label'>
                  Temperature
                </label>
                <input type="text" name="Temperature" id="Temperature"
                  onChange={handleChange} />
              </div>
              <div className='input-fields'>
                <label htmlFor="Humidity" className='humid-label'>
                  Humidity
                </label>
                <input type="text" name="Humidity" id="Humidity"
                  onChange={handleChange} />
              </div>
              <div className='input-fields'>
                <label htmlFor="pH_Value" className='ph-label'>
                  pH_Value
                </label>
                <input type="text" name="pH_Value" id="pH_Value"
                  onChange={handleChange} />
              </div>
              <div className='input-fields'>
                <label htmlFor="Rainfall" className='rain-label'>
                  Rainfall
                </label>
                <input type="text" name="Rainfall" id="Rainfall"
                  onChange={handleChange} />
              </div>
              <div>
                <button className='predict-btn'
                  disabled={isLoading}>
                  Predict crop
                </button>
                <input type="reset" value="Reset" className='reset-btn' onClick={handlereset} />
              </div>
            </form>
            <div className="results">
              {errorMessage && (
                <p className="error-message">{errorMessage}</p>
              )}
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
