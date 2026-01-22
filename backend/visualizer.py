"""
Module 6: Visualization
Generate visualization data for frontend rendering
"""

import matplotlib
matplotlib.use('Agg')  # Non-interactive backend
import matplotlib.pyplot as plt
import numpy as np
import io
import base64

class Visualizer:
    def __init__(self, model, data_handler):
        self.model = model
        self.data_handler = data_handler
    
    def generate_plot_data(self):
        """Generate scatter plot and regression line data for frontend"""
        if not self.model.is_trained:
            raise ValueError("Model not trained yet")
        
        # Get all data points
        X = self.data_handler.X.flatten()
        y = self.data_handler.y
        
        # Generate regression line points
        x_range = np.linspace(X.min(), X.max(), 100)
        y_pred = self.model.model.predict(x_range.reshape(-1, 1))
        
        return {
            'scatter_data': {
                'x': X.tolist(),
                'y': y.tolist()
            },
            'regression_line': {
                'x': x_range.tolist(),
                'y': y_pred.tolist()
            }
        }
    
    def create_matplotlib_plot(self, save_path=None):
        """Create actual matplotlib plot (optional - for report generation)"""
        if not self.model.is_trained:
            raise ValueError("Model not trained yet")
        
        X = self.data_handler.X.flatten()
        y = self.data_handler.y
        
        # Create figure
        plt.figure(figsize=(10, 6))
        plt.style.use('dark_background')
        
        # Scatter plot
        plt.scatter(X, y, color='#f97316', s=100, alpha=0.8, label='Actual Data', edgecolors='white', linewidth=1)
        
        # Regression line
        x_range = np.linspace(X.min(), X.max(), 100)
        y_pred = self.model.model.predict(x_range.reshape(-1, 1))
        plt.plot(x_range, y_pred, color='white', linewidth=2, linestyle='--', label='Regression Line')
        
        # Labels and title
        plt.xlabel('Study Hours', fontsize=12, color='#a1a1aa')
        plt.ylabel('Exam Score', fontsize=12, color='#a1a1aa')
        plt.title('Linear Regression: Study Hours vs Exam Score', fontsize=14, fontweight='bold')
        plt.legend(loc='upper left', framealpha=0.9)
        plt.grid(True, alpha=0.2)
        
        # Add equation text
        equation_text = f'y = {self.model.slope:.2f}x + {self.model.intercept:.2f}\nR² = {self.model.r2_score:.4f}'
        plt.text(0.05, 0.95, equation_text, transform=plt.gca().transAxes,
                fontsize=10, verticalalignment='top',
                bbox=dict(boxstyle='round', facecolor='black', alpha=0.7, edgecolor='#f97316'))
        
        if save_path:
            plt.savefig(save_path, dpi=150, bbox_inches='tight', facecolor='#000000')
            print(f"✅ Plot saved to {save_path}")
        
        # Convert to base64 for API response (optional)
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight', facecolor='#000000')
        buffer.seek(0)
        image_base64 = base64.b64encode(buffer.read()).decode()
        plt.close()
        
        return image_base64
    
    def get_chart_analysis(self):
        """Generate textual analysis of the chart"""
        if not self.model.is_trained:
            return None
        
        analysis = []
        
        # R² interpretation
        if self.model.r2_score > 0.9:
            analysis.append(f"The model shows an excellent fit with R² = {self.model.r2_score:.4f}, explaining {self.model.r2_score*100:.2f}% of variance.")
        elif self.model.r2_score > 0.7:
            analysis.append(f"The model shows a good fit with R² = {self.model.r2_score:.4f}.")
        else:
            analysis.append(f"The model shows moderate fit with R² = {self.model.r2_score:.4f}. Consider adding more features.")
        
        # Slope interpretation
        if self.model.slope > 0:
            analysis.append(f"Positive correlation: Each additional study hour increases exam score by approximately {self.model.slope:.2f} points.")
        else:
            analysis.append(f"Negative correlation detected (slope = {self.model.slope:.2f}).")
        
        # MSE interpretation
        analysis.append(f"Mean Squared Error: {self.model.mse:.4f} - Average prediction error magnitude.")
        
        return " ".join(analysis)
