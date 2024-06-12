from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
import pickle 
import json

# Create a Flask application instance
app = Flask(__name__)

# Enable CORS for all routes, allowing requests from any origin
CORS(app,resources={r"/*":{"origins":"*"}})

model = pickle.load(open('ml_model.pkl', 'rb'))

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)
  
# Define a route for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # print(data)
        query_df = pd.DataFrame([data])
        # print(query_df)
        query_df['Nitrogen']=query_df['Nitrogen'].astype(str).astype(int)
        query_df['Phosphorus']=query_df['Phosphorus'].astype(str).astype(int)
        query_df['Potassium']=query_df['Potassium'].astype(str).astype(int)
        query_df['Temperature']=query_df['Temperature'].astype(str).astype(float)
        query_df['Humidity']=query_df['Humidity'].astype(str).astype(float)
        query_df['pH_Value']=query_df['pH_Value'].astype(str).astype(float)
        query_df['Rainfall']=query_df['Rainfall'].astype(str).astype(float)
        prediction = model.predict(query_df)
        # print(prediction[0])
        # prediction = list(prediction)
        # prediction = json.dumps(prediction)
        # return jsonify({'preidction' : list(prediction)})
        prediction_list = prediction.tolist()  # Convert to list of Python native types

        # Define the mapping of numerical values to crop names
        crop_mapping = {
            0: 'Rice',           
            1: 'Maize',          
            2: 'Jute',           
            3: 'Cotton',         
            4: 'Coconut',       
            5: 'Papaya',         
            6: 'Orange',         
            7: 'Apple',          
            8: 'Muskmelon',      
            9: 'Watermelon',     
            10: 'Grapes',         
            11: 'Mango',          
            12: 'Banana',         
            13: 'Pomegranate',    
            14: 'Lentil',         
            15: 'Blackgram',      
            16: 'MungBean',       
            17: 'MothBeans',      
            18: 'PigeonPeas',     
            19: 'KidneyBeans',    
            20: 'ChickPea',       
            21: 'Coffee'      
        }
        
        # Convert numerical predictions to crop names
        crop_predictions = [crop_mapping[pred] for pred in prediction_list]
        
        return jsonify({'prediction': crop_predictions})
        
        # return jsonify({'prediction': prediction_list})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
