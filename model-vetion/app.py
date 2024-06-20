from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import requests

app = Flask(__name__)

# Load the trained model
model_path = 'model/MyModel.h5'  # Update this path to your model's path
model = load_model(model_path)

# Labels dictionary (update this dictionary according to your model's classes)
labels = {
    0: 'Brokoli Hijau Bagus',
    1: 'Brokoli Hijau Jelek',
    2: 'Daun Pepaya Bagus',
    3: 'Daun Pepaya Jelek',
    4: 'Daun Singkong Bagus',
    5: 'Daun Singkong Jelek',
    6: 'Daun Kelor Bagus',
    7: 'Daun Kelor Jelek',
    8: 'Kembang Kol Bagus',
    9: 'Kembang Kol Jelek',
    10: 'Kubis Hijau Bagus',
    11: 'Kubis Hijau Jelek',
    12: 'Paprika Merah Bagus',
    13: 'Paprika Merah Jelek',
    14: 'Sawi sendok atau Pakcoy Bagus',
    15: 'Sawi sendok atau Pakcoy Jelek',
    16: 'Tomat Merah Bagus',
    17: 'Tomat Merah Jelek',
    18: 'Wortel Nantes Bagus',
    19: 'Wortel Nantes Jelek',
}

def preprocess_image(img_path):
    """
    Preprocess the input image to fit the model input requirements.

    Parameters:
    - img_path: Path to the image file.

    Returns:
    - img_array: Preprocessed image array.
    """
    img = image.load_img(img_path, target_size=(224, 224))  # Resize image
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array / 255.0  # Normalize the image
    return img_array

def predict_image(model, img_array, labels):
    """
    Predict the class of the input image using the trained model.

    Parameters:
    - model: The trained model.
    - img_array: Preprocessed image array.
    - labels: Dictionary of class labels.

    Returns:
    - prediction: Predicted class label.
    - confidence: Prediction confidence score.
    """
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)[0]
    confidence = float(predictions[0][predicted_class])
    return labels[predicted_class], confidence

def get_additional_data(vegetable_name):
    """
    Get additional vegetable data from deployed Node.js API endpoints.
    """
    vegetable_data_url = f"https://vetion-app-be-baru-m7d2r5xhua-et.a.run.app/vegetables/{vegetable_name}"
    
    vegetable_data_response = requests.get(vegetable_data_url)
    
    vegetable_data = vegetable_data_response.json() if vegetable_data_response.status_code == 200 else None
    
    return vegetable_data

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        file_path = os.path.join('/tmp', file.filename)
        file.save(file_path)
        
        img_array = preprocess_image(file_path)
        predicted_class, confidence = predict_image(model, img_array, labels)
        confidence_percentage = confidence * 100
        
        # Get vegetable name from predicted class
        vegetable_name = ' '.join(predicted_class.split(' ')[:-1])  # Remove 'Bagus' or 'Jelek' part
        print(vegetable_name)
        
        # Get additional data from Node.js API
        additional_data_vegetable = get_additional_data(vegetable_name)
        
        response_data = {
            'predicted_class': predicted_class,
            'confidence': confidence,
            'confidence_percentage': f"{confidence_percentage:.2f}%"
        }
        
        if additional_data_vegetable:
            response_data['additional_data_vegetable'] = additional_data_vegetable
        else:
            response_data['additional_data_vegetable'] = 'No additional data found'
        
        return jsonify(response_data)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))