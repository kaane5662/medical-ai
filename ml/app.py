from flask import Flask, request, jsonify
import joblib
import pandas as pd
# Load model and encoders

print("Hello gous")
app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    aiModel = joblib.load("./model3.pkl")
    label_encoders = joblib.load("./label3_encoders.pkl")
    target_encoder = joblib.load("./target3_encoder.pkl")
    try:
        input_data = request.json
        print("Input data:", input_data)

        # Convert to DataFrame
        df = pd.DataFrame([input_data])
        print("DataFrame:", df)

        # Check for missing columns
        

        # Preprocess input data
        for col, encoder in label_encoders.items():
            if col in df.columns:
                df[col] = encoder.transform(df[col])
        print("Processed DataFrame:", df)

        # Check if the 'monotonic_cst' attribute exists and remove it
        print(aiModel)
        if hasattr(aiModel, 'monotonic_cst'):
            delattr(aiModel, 'monotonic_cst')
        # Check for null values
        if df.isnull().any().any():
            return jsonify({"error": "Input data contains null values"})

        # Predict outcome
        prediction = aiModel.predict(df)
        print("oks")
        print('Predictions:', prediction)
        predicted_label = target_encoder.inverse_transform(prediction)[0]
        
        return jsonify({"prediction": predicted_label})


    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=8000)