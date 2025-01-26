from flask import Flask, request, jsonify
import joblib
import pandas as pd
# Load model and encoders
model = joblib.load("./random_forest_model.pkl")
label_encoders = joblib.load("./label_encoders.pkl")
target_encoder = joblib.load("./target_encoder.pkl")
print("Hello gous")
app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        print("hello from predict")
        # Parse input data
        input_data = request.json

        # Convert to DataFrame
        df = pd.DataFrame([input_data])

        # Preprocess input data
        for col, encoder in label_encoders.items():
            if col in df.columns:
                df[col] = encoder.transform(df[col])

        # Predict outcome
        prediction = model.predict(df)
        print(prediction)
        predicted_label = target_encoder.inverse_transform(prediction)[0]
        
        return jsonify({"prediction": predicted_label})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=8000)