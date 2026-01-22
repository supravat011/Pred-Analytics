import React, { useState, useEffect, useRef } from 'react';
import { Calculator, CheckCircle2, AlertCircle, Sparkles, ArrowRight, Database, Upload } from 'lucide-react';
import api, { ModelInfo, DatasetInfo } from '../utils/api';

const Dashboard: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);

  // Multi-dataset support
  const [availableDatasets, setAvailableDatasets] = useState<Record<string, DatasetInfo>>({});
  const [currentDataset, setCurrentDataset] = useState<string>('study_hours');
  const [xLabel, setXLabel] = useState<string>('Study Hours');
  const [yLabel, setYLabel] = useState<string>('Exam Score');
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch available datasets and model info on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [datasetsRes, modelInfoRes] = await Promise.all([
          api.getAvailableDatasets(),
          api.getModelInfo()
        ]);

        setAvailableDatasets(datasetsRes.datasets);
        setCurrentDataset(datasetsRes.current);
        setModelInfo(modelInfoRes);

        // Set labels from config
        if (modelInfoRes.config) {
          setXLabel(modelInfoRes.config.x_label);
          setYLabel(modelInfoRes.config.y_label);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, []);

  const handleDatasetSwitch = async (datasetName: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setInputVal('');

    try {
      const response = await api.switchDataset(datasetName);
      setCurrentDataset(datasetName);
      setModelInfo(response.model_info);

      // Update labels
      if (response.config) {
        setXLabel(response.config.x_label);
        setYLabel(response.config.y_label);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to switch dataset');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setResult(null);
    setInputVal('');

    try {
      const response = await api.uploadCSV(file);
      setCurrentDataset('custom');
      setModelInfo(response.model_info);

      // Update labels from uploaded CSV
      if (response.config) {
        setXLabel(response.config.x_label);
        setYLabel(response.config.y_label);
      }

      alert('CSV uploaded and model trained successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to upload CSV');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handlePredict = async () => {
    setError(null);
    setLoading(true);

    const x = parseFloat(inputVal);
    if (isNaN(x)) {
      setError('Please enter a valid numeric value.');
      setResult(null);
      setLoading(false);
      return;
    }

    try {
      const response = await api.predict(x);
      setResult(response.predicted_y);
    } catch (err: any) {
      setError(err.message || 'Failed to get prediction from server');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0"></div>
      <div className="bg-noise"></div>

      <div className="mb-8 relative z-10">
        <span className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2 block">Prediction Engine</span>
        <h1 className="text-4xl font-bold text-white tracking-tighter">ML Dashboard</h1>
        <p className="text-zinc-500 mt-2 text-lg">
          Select a dataset or upload your own CSV to train and predict.
        </p>
      </div>

      {/* Dataset Selector & CSV Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 relative z-10">
        {/* Dataset Selector */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 mb-3">
            <Database className="h-4 w-4 text-orange-500" />
            Select Dataset
          </label>
          <select
            value={currentDataset}
            onChange={(e) => handleDatasetSwitch(e.target.value)}
            disabled={loading || uploading}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-50"
          >
            {Object.entries(availableDatasets).map(([key, info]) => (
              <option key={key} value={key}>
                {info.description}
              </option>
            ))}
            {currentDataset === 'custom' && (
              <option value="custom">Custom Dataset (Uploaded)</option>
            )}
          </select>
        </div>

        {/* CSV Upload */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <label className="flex items-center gap-2 text-sm font-bold text-zinc-300 mb-3">
            <Upload className="h-4 w-4 text-emerald-500" />
            Upload Custom CSV
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={loading || uploading}
            className="hidden"
            id="csv-upload"
          />
          <label
            htmlFor="csv-upload"
            className={`w-full flex items-center justify-center gap-2 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-zinc-400 hover:text-white hover:border-emerald-500 transition-colors cursor-pointer ${(loading || uploading) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Choose CSV File
              </>
            )}
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">

        {/* Input parameters - Col 1 */}
        <div className="lg:col-span-1 glass rounded-3xl p-8 border border-white/10 h-full">
          <h2 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
            Input Parameters
          </h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="inputValue" className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                {xLabel}
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="inputValue"
                  className="block w-full rounded-xl border border-white/10 bg-white/5 py-4 px-4 text-white sm:text-lg focus:ring-0 focus:border-orange-500 transition-all placeholder:text-zinc-700"
                  placeholder="e.g. 5.5"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                * Range 0.0 - 24.0 hours
              </p>
            </div>

            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <p className="text-sm font-bold text-red-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" /> {error}
                </p>
              </div>
            )}

            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full mt-4 rounded-xl bg-zinc-100 px-4 py-4 text-base font-bold text-black border border-white hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Predicting...' : 'Run Prediction'} <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Results - Col 2 */}
        <div className="lg:col-span-2 space-y-6 flex flex-col h-full">

          {/* Main Result Card */}
          <div className="glass rounded-3xl p-8 border border-white/10 flex-grow relative overflow-hidden">
            {/* Subtle decorative grid inside card */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <h2 className="text-lg font-bold text-zinc-100 mb-8 flex items-center gap-2">
                <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                Model Output
              </h2>

              {result !== null ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Input Value (X)</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-mono text-zinc-300">{inputVal}</span>
                      <span className="text-zinc-600">hrs</span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">Predicted Score (Y)</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-8xl font-bold tracking-tighter text-white">{result.toFixed(2)}</span>
                      <span className="text-zinc-600 font-mono">%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-zinc-600">
                  {loading ? 'Fetching prediction from ML model...' : 'Waiting for input data...'}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-fit">
            <div className="glass rounded-3xl p-6 border border-white/10">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Regression Equation</h3>
              <div className="font-mono text-xl text-white">
                {modelInfo ? (
                  <>y = <span className="text-orange-500">{modelInfo.slope.toFixed(2)}</span>x + <span className="text-zinc-400">{modelInfo.intercept.toFixed(2)}</span></>
                ) : (
                  <span className="text-zinc-600">Loading...</span>
                )}
              </div>
              {modelInfo && (
                <div className="mt-4 text-xs text-zinc-500 space-y-1">
                  <div>R² Score: <span className="text-zinc-300">{modelInfo.r2_score.toFixed(4)}</span></div>
                  <div>MSE: <span className="text-zinc-300">{modelInfo.mse.toFixed(4)}</span></div>
                </div>
              )}
            </div>

            {/* Backend Status Indicator */}
            <div className="glass rounded-3xl p-6 border border-emerald-500/20 bg-emerald-950/10">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles className="h-3 w-3" /> Backend Status
              </h3>
              <div className="text-sm text-zinc-300 leading-relaxed">
                {modelInfo ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Flask API Connected</span>
                    </div>
                    <div className="text-xs text-zinc-500">Python Scikit-learn Model Active</div>
                  </div>
                ) : (
                  <span className="text-zinc-600 text-xs">Connecting to backend...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;