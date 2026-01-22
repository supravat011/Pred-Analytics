# PredAnalytics

**AI-Powered Predictive Analytics Platform with Machine Learning**

A full-stack web application that enables users to perform linear regression analysis on multiple datasets, upload custom CSV files, and visualize predictions through an intuitive dashboard powered by Python Flask and React.

---

## 🌟 Features

### 🤖 Machine Learning Engine
- **Linear Regression Model** built with Scikit-learn
- **Multi-Dataset Support** with pre-loaded datasets:
  - Study Hours vs Exam Score
  - House Size vs Price
  - Years of Experience vs Salary
  - Advertising Spend vs Sales
- **Custom CSV Upload** - Train models on your own data
- **Real-time Predictions** with instant results
- **Model Metrics** - R² Score, MSE, regression equation

### 📊 Interactive Dashboard
- **Dynamic Dataset Switching** - Seamlessly switch between datasets
- **Live Predictions** - Input values and get instant predictions
- **Model Visualization** - View regression lines and data points
- **Performance Metrics** - Track model accuracy and performance
- **Responsive Design** - Beautiful UI with glassmorphism effects

### 🎨 Modern UI/UX
- **Dark Theme** with gradient accents
- **Glassmorphism Design** - Modern glass-effect cards
- **Smooth Animations** - Enhanced user experience
- **Mobile Responsive** - Works on all devices
- **Real-time Status** - Backend connection indicators

### 🔧 Technical Features
- **RESTful API** - Clean Flask backend architecture
- **CORS Enabled** - Seamless frontend-backend communication
- **File Upload** - Secure CSV file handling
- **Data Preprocessing** - Automatic data cleaning and validation
- **Train-Test Split** - Proper model evaluation
- **Error Handling** - Comprehensive error messages

---

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons
- **CSS3** - Custom styling with animations

### Backend
- **Python 3.x** - Core language
- **Flask 3.0** - Web framework
- **Scikit-learn** - Machine learning
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **Matplotlib & Seaborn** - Data visualization
- **Flask-CORS** - Cross-origin support

---

## 📦 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **pip** (Python package manager)

### 1. Clone the Repository
```bash
git clone https://github.com/supravat011/Pred-Analytics.git
cd Pred-Analytics
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Set up environment variables
# Create .env.local file and add your Gemini API key
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt
```

---

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
python app.py
```
The Flask server will start on `http://localhost:5000`

### Start Frontend Development Server
```bash
# In the root directory
npm run dev
```
The React app will start on `http://localhost:5173`

---

## 📖 Usage Guide

### 1. **Select a Dataset**
   - Choose from pre-loaded datasets (Study Hours, House Price, Salary, Sales)
   - Or upload your own CSV file with two columns (X and Y values)

### 2. **Upload Custom CSV** (Optional)
   - Click "Upload Custom CSV"
   - Select a CSV file with two columns
   - The model will automatically train on your data

### 3. **Make Predictions**
   - Enter a value in the input field
   - Click "Run Prediction"
   - View the predicted output instantly

### 4. **View Model Details**
   - Check the regression equation
   - Review R² Score and MSE metrics
   - Monitor backend connection status

### 5. **Visualize Data**
   - Navigate to the Visualization page
   - View scatter plots with regression lines
   - Analyze data distribution and trends

---

## 📁 Project Structure

```
PredAnalytics/
├── backend/
│   ├── app.py                 # Flask API server
│   ├── model.py               # Linear regression model
│   ├── data_handler.py        # Data loading and preprocessing
│   ├── visualizer.py          # Visualization utilities
│   ├── requirements.txt       # Python dependencies
│   └── data/
│       ├── dataset.csv        # Study hours dataset
│       ├── house_price.csv    # House price dataset
│       ├── salary_prediction.csv
│       ├── sales_forecast.csv
│       └── uploads/           # Custom uploaded CSVs
├── pages/
│   ├── Landing.tsx            # Landing page
│   ├── Dashboard.tsx          # Main prediction dashboard
│   ├── Visualization.tsx      # Data visualization page
│   └── About.tsx              # About page
├── components/
│   ├── Navbar.tsx             # Navigation bar
│   └── Footer.tsx             # Footer component
├── services/
│   └── geminiService.ts       # Gemini AI integration
├── utils/
│   ├── api.ts                 # API client
│   └── regression.ts          # Regression utilities
├── App.tsx                    # Main app component
├── index.tsx                  # Entry point
├── constants.ts               # App constants
├── types.ts                   # TypeScript types
├── package.json               # Node dependencies
└── README.md                  # This file
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/datasets` | List available datasets |
| `POST` | `/api/switch-dataset` | Switch to different dataset |
| `POST` | `/api/upload-csv` | Upload custom CSV file |
| `GET` | `/api/model-info` | Get model coefficients & metrics |
| `POST` | `/api/predict` | Make prediction |
| `GET` | `/api/visualize` | Get visualization data |
| `GET` | `/api/dataset` | Get full dataset |

---

## 🎯 Key Features Explained

### Multi-Dataset Support
The application comes with four pre-loaded datasets covering different use cases:
- **Education**: Study hours vs exam scores
- **Real Estate**: House size vs price
- **HR Analytics**: Experience vs salary
- **Marketing**: Ad spend vs sales

### Custom CSV Upload
Users can upload their own CSV files with the following format:
```csv
x,y
1.5,45
2.0,50
3.5,65
...
```

### Real-time Predictions
The ML model provides instant predictions based on user input, displaying:
- Input value (X)
- Predicted output (Y)
- Regression equation
- Model accuracy metrics

---

## 🎨 Design Philosophy

- **Modern Aesthetics**: Dark theme with vibrant orange accents
- **Glassmorphism**: Frosted glass effects for depth
- **Responsive Layout**: Mobile-first design approach
- **Smooth Animations**: Subtle transitions for better UX
- **Clear Typography**: Easy-to-read fonts and spacing

---

## 🔒 Security

- File upload validation (CSV only)
- Maximum file size limit (16MB)
- Secure filename handling
- CORS configuration
- Input validation and sanitization

---

## 🧪 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Environment Variables
Create a `.env.local` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Supravat**
- GitHub: [@supravat011](https://github.com/supravat011)
- Repository: [Pred-Analytics](https://github.com/supravat011/Pred-Analytics)

---

## 🙏 Acknowledgments

- **Scikit-learn** for machine learning capabilities
- **React** for the powerful UI framework
- **Flask** for the lightweight backend
- **Recharts** for beautiful data visualizations
- **Vite** for blazing-fast development experience

---

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/supravat011/Pred-Analytics/issues) on GitHub.

---

**Made with ❤️ by Supravat**
