"""
Module 3: Model Training & Module 4: Model Testing
Linear Regression model using Scikit-learn
"""

from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
import numpy as np
import pickle
import os

class LinearRegressionModel:
    def __init__(self):
        self.model = LinearRegression()
        self.is_trained = False
        self.slope = None
        self.intercept = None
        self.r2_score = None
        self.mse = None
        self.mae = None
    
    def train(self, X_train, y_train):
        """Module 3: Train the Linear Regression model"""
        try:
            print("\n🔄 Training Linear Regression model...")
            self.model.fit(X_train, y_train)
            
            # Extract coefficients
            self.slope = float(self.model.coef_[0])
            self.intercept = float(self.model.intercept_)
            self.is_trained = True
            
            print(f"✅ Model trained successfully!")
            print(f"   Slope (m): {self.slope:.4f}")
            print(f"   Intercept (b): {self.intercept:.4f}")
            print(f"   Equation: y = {self.slope:.4f}x + {self.intercept:.4f}")
            
            return True
        except Exception as e:
            print(f"❌ Training failed: {str(e)}")
            return False
    
    def test(self, X_test, y_test):
        """Module 4: Test the model and calculate metrics"""
        if not self.is_trained:
            print("❌ Model not trained yet. Call train() first.")
            return False
        
        try:
            print("\n🔄 Testing model on test set...")
            y_pred = self.model.predict(X_test)
            
            # Calculate metrics
            self.r2_score = r2_score(y_test, y_pred)
            self.mse = mean_squared_error(y_test, y_pred)
            self.mae = mean_absolute_error(y_test, y_pred)
            
            print(f"✅ Model evaluation complete!")
            print(f"   R² Score: {self.r2_score:.4f}")
            print(f"   Mean Squared Error (MSE): {self.mse:.4f}")
            print(f"   Mean Absolute Error (MAE): {self.mae:.4f}")
            
            # Interpretation
            if self.r2_score > 0.9:
                print("   📊 Excellent fit!")
            elif self.r2_score > 0.7:
                print("   📊 Good fit")
            else:
                print("   ⚠️  Model may need improvement")
            
            return True
        except Exception as e:
            print(f"❌ Testing failed: {str(e)}")
            return False
    
    def predict(self, study_hours):
        """Module 5: Make prediction for new input"""
        if not self.is_trained:
            raise ValueError("Model not trained. Train the model first.")
        
        # Reshape input for sklearn
        if isinstance(study_hours, (int, float)):
            study_hours = np.array([[study_hours]])
        elif isinstance(study_hours, list):
            study_hours = np.array(study_hours).reshape(-1, 1)
        
        prediction = self.model.predict(study_hours)
        return float(prediction[0])
    
    def get_model_info(self):
        """Get model coefficients and metrics"""
        if not self.is_trained:
            return None
        
        return {
            'slope': self.slope,
            'intercept': self.intercept,
            'r2_score': self.r2_score,
            'mse': self.mse,
            'mae': self.mae,
            'equation': f"y = {self.slope:.4f}x + {self.intercept:.4f}"
        }
    
    def save_model(self, filepath='model.pkl'):
        """Save trained model to disk"""
        if not self.is_trained:
            raise ValueError("Cannot save untrained model")
        
        with open(filepath, 'wb') as f:
            pickle.dump(self.model, f)
        print(f"✅ Model saved to {filepath}")
    
    def load_model(self, filepath='model.pkl'):
        """Load trained model from disk"""
        if not os.path.exists(filepath):
            raise FileNotFoundError(f"Model file not found: {filepath}")
        
        with open(filepath, 'rb') as f:
            self.model = pickle.load(f)
        
        self.slope = float(self.model.coef_[0])
        self.intercept = float(self.model.intercept_)
        self.is_trained = True
        print(f"✅ Model loaded from {filepath}")
