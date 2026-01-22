# PredAnalytics Backend

Python Flask backend for Linear Regression ML model.

## Setup

1. **Create virtual environment** (recommended):
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the server**:
   ```bash
   python app.py
   ```

Server will start on `http://localhost:5000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/model-info` | Get model coefficients (slope, intercept, R², MSE) |
| POST | `/api/predict` | Make prediction for study hours |
| GET | `/api/visualize` | Get visualization data for charts |
| GET | `/api/dataset` | Get full dataset |
| POST | `/api/retrain` | Retrain the model |

## Example Usage

### Predict Score
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"study_hours": 7.5}'
```

Response:
```json
{
  "study_hours": 7.5,
  "predicted_score": 86.23,
  "equation": "y = 5.4321x + 45.6789"
}
```

## Project Modules

1. **Data Collection** (`data_handler.py`) - Load CSV dataset
2. **Data Preprocessing** (`data_handler.py`) - Handle missing values, feature selection
3. **Model Training** (`model.py`) - Train Linear Regression model
4. **Model Testing** (`model.py`) - Calculate R², MSE, MAE
5. **Prediction** (`app.py` - `/api/predict`) - Predict scores for new inputs
6. **Visualization** (`visualizer.py`) - Generate plot data for frontend
