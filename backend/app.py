"""
Flask API Server for Linear Regression ML Model
Multi-Dataset Support + CSV Upload
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from data_handler import DataHandler
from model import LinearRegressionModel
from visualizer import Visualizer
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# File upload configuration
UPLOAD_FOLDER = 'data/uploads'
ALLOWED_EXTENSIONS = {'csv'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Global instances
data_handler = None
ml_model = None
visualizer = None
current_dataset = 'study_hours'

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def initialize_model(dataset_name='study_hours', custom_csv=None):
    """Initialize and train the model"""
    global data_handler, ml_model, visualizer, current_dataset
    
    print("\n" + "="*50)
    print(f"🚀 Initializing ML Model: {dataset_name}")
    print("="*50)
    
    # Module 1 & 2: Load and preprocess data
    data_handler = DataHandler(dataset_name=dataset_name, custom_csv_path=custom_csv)
    if not data_handler.load_data():
        print("❌ Failed to load dataset")
        return False
    
    if not data_handler.preprocess_data():
        print("❌ Failed to preprocess data")
        return False
    
    if not data_handler.split_data():
        print("❌ Failed to split data")
        return False
    
    # Module 3 & 4: Train and test model
    ml_model = LinearRegressionModel()
    if not ml_model.train(data_handler.X_train, data_handler.y_train):
        print("❌ Failed to train model")
        return False
    
    if not ml_model.test(data_handler.X_test, data_handler.y_test):
        print("❌ Failed to test model")
        return False
    
    # Module 6: Initialize visualizer
    visualizer = Visualizer(ml_model, data_handler)
    current_dataset = dataset_name
    
    print("\n✅ Model initialization complete!")
    print("="*50 + "\n")
    return True

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_trained': ml_model.is_trained if ml_model else False,
        'current_dataset': current_dataset
    })

@app.route('/api/datasets', methods=['GET'])
def get_available_datasets():
    """Get list of available datasets"""
    datasets = DataHandler.get_available_datasets()
    return jsonify({
        'datasets': datasets,
        'current': current_dataset
    })

@app.route('/api/switch-dataset', methods=['POST'])
def switch_dataset():
    """Switch to a different dataset"""
    try:
        data = request.get_json()
        dataset_name = data.get('dataset_name')
        
        if not dataset_name:
            return jsonify({'error': 'dataset_name required'}), 400
        
        success = initialize_model(dataset_name)
        if success:
            config = data_handler.get_config()
            return jsonify({
                'message': f'Switched to {dataset_name}',
                'model_info': ml_model.get_model_info(),
                'config': config
            })
        else:
            return jsonify({'error': 'Failed to switch dataset'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/upload-csv', methods=['POST'])
def upload_csv():
    """Upload custom CSV file"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Only CSV files allowed'}), 400
        
        # Save file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Train model on uploaded CSV
        success = initialize_model(dataset_name='custom', custom_csv=filepath)
        
        if success:
            config = data_handler.get_config()
            return jsonify({
                'message': 'CSV uploaded and model trained successfully',
                'model_info': ml_model.get_model_info(),
                'config': config
            })
        else:
            return jsonify({'error': 'Failed to train model on uploaded CSV'}), 500
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/model-info', methods=['GET'])
def get_model_info():
    """Get model coefficients and metrics"""
    if not ml_model or not ml_model.is_trained:
        return jsonify({'error': 'Model not trained'}), 400
    
    info = ml_model.get_model_info()
    config = data_handler.get_config() if data_handler else {}
    
    return jsonify({
        **info,
        'config': config
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """Module 5: Make prediction"""
    if not ml_model or not ml_model.is_trained:
        return jsonify({'error': 'Model not trained'}), 400
    
    try:
        data = request.get_json()
        x_value = data.get('x_value')
        
        if x_value is None:
            return jsonify({'error': 'x_value parameter required'}), 400
        
        # Make prediction
        x_value = float(x_value)
        predicted_y = ml_model.predict(x_value)
        
        config = data_handler.get_config()
        
        return jsonify({
            'x_value': x_value,
            'predicted_y': round(predicted_y, 2),
            'x_label': config['x_label'],
            'y_label': config['y_label'],
            'equation': f"y = {ml_model.slope:.4f}x + {ml_model.intercept:.4f}"
        })
    
    except ValueError as e:
        return jsonify({'error': f'Invalid input: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/visualize', methods=['GET'])
def get_visualization_data():
    """Module 6: Get visualization data"""
    if not visualizer or not ml_model.is_trained:
        return jsonify({'error': 'Model not trained'}), 400
    
    try:
        plot_data = visualizer.generate_plot_data()
        analysis = visualizer.get_chart_analysis()
        config = data_handler.get_config()
        
        return jsonify({
            'plot_data': plot_data,
            'analysis': analysis,
            'model_info': ml_model.get_model_info(),
            'config': config
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/dataset', methods=['GET'])
def get_dataset():
    """Get the full dataset"""
    if not data_handler:
        return jsonify({'error': 'Data not loaded'}), 400
    
    data = data_handler.get_all_data()
    summary = data_handler.get_data_summary()
    config = data_handler.get_config()
    
    return jsonify({
        'data': data,
        'summary': summary,
        'config': config,
        'total_samples': len(data_handler.X) if data_handler.X is not None else 0
    })

if __name__ == '__main__':
    # Initialize with default dataset
    if initialize_model('study_hours'):
        print("\n🌐 Starting Flask server on http://localhost:5000")
        print("📡 API Endpoints:")
        print("   GET  /api/health           - Health check")
        print("   GET  /api/datasets         - List available datasets")
        print("   POST /api/switch-dataset   - Switch dataset")
        print("   POST /api/upload-csv       - Upload custom CSV")
        print("   GET  /api/model-info       - Model coefficients & metrics")
        print("   POST /api/predict          - Make prediction")
        print("   GET  /api/visualize        - Get visualization data")
        print("   GET  /api/dataset          - Get full dataset")
        print("\n" + "="*50 + "\n")
        
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("\n❌ Failed to initialize model. Server not started.")
