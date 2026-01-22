"""
Enhanced Data Handler with Multi-Dataset Support
Supports multiple predefined datasets and custom CSV uploads
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
import os

# Dataset configurations
DATASETS = {
    'study_hours': {
        'file': 'data/dataset.csv',
        'x_col': 'study_hours',
        'y_col': 'exam_score',
        'x_label': 'Study Hours',
        'y_label': 'Exam Score',
        'x_unit': 'hours',
        'y_unit': 'points',
        'description': 'Predict exam scores based on study time'
    },
    'salary': {
        'file': 'data/salary_prediction.csv',
        'x_col': 'years_experience',
        'y_col': 'salary',
        'x_label': 'Years of Experience',
        'y_label': 'Annual Salary',
        'x_unit': 'years',
        'y_unit': 'USD',
        'description': 'Predict salary based on work experience'
    },
    'house_price': {
        'file': 'data/house_price.csv',
        'x_col': 'square_feet',
        'y_col': 'price',
        'x_label': 'Square Feet',
        'y_label': 'House Price',
        'x_unit': 'sq ft',
        'y_unit': 'USD',
        'description': 'Predict house prices based on size'
    },
    'sales': {
        'file': 'data/sales_forecast.csv',
        'x_col': 'ad_budget',
        'y_col': 'revenue',
        'x_label': 'Advertising Budget',
        'y_label': 'Revenue',
        'x_unit': 'USD',
        'y_unit': 'USD',
        'description': 'Forecast revenue based on ad spend'
    }
}

class DataHandler:
    def __init__(self, dataset_name='study_hours', custom_csv_path=None):
        self.dataset_name = dataset_name
        self.custom_csv_path = custom_csv_path
        self.df = None
        self.X = None
        self.y = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.config = None
        
        # Set configuration
        if custom_csv_path:
            self.config = self._detect_csv_config(custom_csv_path)
        elif dataset_name in DATASETS:
            self.config = DATASETS[dataset_name]
        else:
            raise ValueError(f"Unknown dataset: {dataset_name}")
    
    def _detect_csv_config(self, csv_path):
        """Auto-detect CSV configuration for custom uploads"""
        try:
            df = pd.read_csv(csv_path)
            cols = df.columns.tolist()
            
            if len(cols) < 2:
                raise ValueError("CSV must have at least 2 columns")
            
            return {
                'file': csv_path,
                'x_col': cols[0],
                'y_col': cols[1],
                'x_label': cols[0].replace('_', ' ').title(),
                'y_label': cols[1].replace('_', ' ').title(),
                'x_unit': '',
                'y_unit': '',
                'description': f'Custom dataset: {cols[0]} vs {cols[1]}'
            }
        except Exception as e:
            raise ValueError(f"Failed to parse CSV: {str(e)}")
    
    def load_data(self):
        """Load CSV dataset"""
        try:
            csv_path = self.config['file']
            self.df = pd.read_csv(csv_path)
            print(f"✅ Dataset loaded: {self.config['description']}")
            print(f"Shape: {self.df.shape}")
            print(f"\nFirst 5 rows:\n{self.df.head()}")
            return True
        except FileNotFoundError:
            print(f"❌ Error: File not found at {csv_path}")
            return False
        except Exception as e:
            print(f"❌ Error loading data: {str(e)}")
            return False
    
    def preprocess_data(self):
        """Data Preprocessing"""
        if self.df is None:
            print("❌ No data loaded. Call load_data() first.")
            return False
        
        # Check for missing values
        missing_values = self.df.isnull().sum()
        print(f"\n📊 Missing values:\n{missing_values}")
        
        # Handle missing values
        initial_rows = len(self.df)
        self.df = self.df.dropna()
        rows_dropped = initial_rows - len(self.df)
        
        if rows_dropped > 0:
            print(f"⚠️  Dropped {rows_dropped} rows with missing values")
        else:
            print("✅ No missing values found")
        
        # Feature selection
        try:
            x_col = self.config['x_col']
            y_col = self.config['y_col']
            
            self.X = self.df[[x_col]].values
            self.y = self.df[y_col].values
            print(f"\n✅ Features extracted:")
            print(f"   X ({x_col}): {self.X.shape}")
            print(f"   y ({y_col}): {self.y.shape}")
            return True
        except KeyError as e:
            print(f"❌ Column not found: {e}")
            return False
    
    def split_data(self, test_size=0.2, random_state=42):
        """Split data into training and testing sets"""
        if self.X is None or self.y is None:
            print("❌ Features not extracted. Call preprocess_data() first.")
            return False
        
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            self.X, self.y, test_size=test_size, random_state=random_state
        )
        
        print(f"\n✅ Data split complete:")
        print(f"   Training set: {len(self.X_train)} samples")
        print(f"   Testing set: {len(self.X_test)} samples")
        return True
    
    def get_data_summary(self):
        """Get statistical summary"""
        if self.df is not None:
            return self.df.describe().to_dict()
        return None
    
    def get_all_data(self):
        """Return all data points"""
        if self.X is not None and self.y is not None:
            return {
                'x': self.X.flatten().tolist(),
                'y': self.y.tolist()
            }
        return None
    
    def get_config(self):
        """Return dataset configuration"""
        return self.config
    
    @staticmethod
    def get_available_datasets():
        """Get list of available predefined datasets"""
        return {
            name: {
                'description': config['description'],
                'x_label': config['x_label'],
                'y_label': config['y_label']
            }
            for name, config in DATASETS.items()
        }
