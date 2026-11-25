from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .predictionserializers import *
import pandas as pd
import joblib
from pathlib import Path
from django.conf import settings
import numpy as np

MODEL_PATH = Path(settings.BASE_DIR).parent/"artifacts"/"capstone.joblib"
model_data = joblib.load(MODEL_PATH)
model = model_data["model"]
scaler = model_data["scalar"]
model_columns = model_data["model_columns"]
numeric_features = model_data["numeric_features"]
binary_features = model_data["binary_features"]
categorical_features = model_data["categorical_features"]
train_medians = model_data["train_medians"]
threshold = model_data["threshold"]

print(model)
print(scaler)
print(model_columns)
print(numeric_features)
print(categorical_features)
print(binary_features)
print(train_medians)
print(threshold)
print("--------------------------------")

class prediction(APIView):
    def post(self, request):
        serial_data = predictionserializer(data = request.data)
        if serial_data.is_valid():
            data = serial_data.validated_data
            print()
            print("DATA SENT FROM REACT")
            print(data)
            result = predict_return(data) 
            return Response({
                "message" : "Prediction sucessfully",
                "data" : result
            })
        return Response(serial_data.errors, status = 400)

def predict_return(data):
    X = pd.DataFrame([data])
    X['log_price'] = np.log1p(X['product_price'])
    X['total_support_contacts'] = X['chat_messages'] + X['support_calls']
    for col in numeric_features + binary_features:
        X[col] = X[col].fillna(train_medians[col])
    X[numeric_features] = scaler.transform(X[numeric_features])
    X = pd.get_dummies(X, columns = categorical_features, dtype = int)
    X = X.reindex(columns = model_columns, fill_value = 0)
    y_pred = model.predict(X)
    class_index = list(model.classes_).index(1)
    y_pred_proba = model.predict_proba(X)[0][class_index]
    result = int(y_pred_proba >= threshold)
    return{
        "prediction" : result,
        "probability" : float(y_pred_proba)
    }



    
    
        
