import React, { useState, useEffect } from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter
} from 'recharts';
// Dynamic labels from backend config
import api from '../utils/api';

interface ChartDataPoint {
  x: number;
  y?: number;
  regressionY?: number;
}

const Visualization: React.FC = () => {
  const [chartData, setChartData] = useState<{ points: ChartDataPoint[]; line: ChartDataPoint[] }>({
    points: [],
    line: []
  });
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<string>('');
  const [xLabel, setXLabel] = useState<string>('X Variable');
  const [yLabel, setYLabel] = useState<string>('Y Variable');

  useEffect(() => {
    const fetchVisualizationData = async () => {
      try {
        const data = await api.getVisualizationData();

        // Transform API data to chart format
        const points = data.plot_data.scatter_data.x.map((x, i) => ({
          x,
          y: data.plot_data.scatter_data.y[i]
        }));

        const line = data.plot_data.regression_line.x.map((x, i) => ({
          x,
          regressionY: data.plot_data.regression_line.y[i]
        }));

        setChartData({ points, line });
        setAnalysis(data.analysis || '');

        // Set labels from config
        if (data.config) {
          setXLabel(data.config.x_label);
          setYLabel(data.config.y_label);
        }

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch visualization data:', error);
        setLoading(false);
      }
    };

    fetchVisualizationData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0"></div>
      <div className="bg-noise"></div>

      <div className="mb-8 relative z-10">
        <span className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2 block">Analytics</span>
        <h1 className="text-4xl font-bold text-white tracking-tighter">Data Visualization</h1>
        <p className="text-zinc-500 mt-2 text-lg">
          {loading ? 'Loading chart data from ML model...' : 'Scatter Plot and Regression Line analysis.'}
        </p>
      </div>

      <div className="glass p-8 rounded-3xl border border-white/10 relative z-10">
        {loading ? (
          <div className="h-[500px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-zinc-400">Fetching data from Python backend...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis
                    dataKey="x"
                    type="number"
                    name={xLabel}
                    unit=""
                    label={{ value: xLabel, position: 'insideBottom', offset: -10, fill: '#52525b' }}
                    domain={['dataMin - 1', 'dataMax + 1']}
                    stroke="#52525b"
                    tick={{ fill: '#71717a' }}
                    axisLine={{ stroke: '#27272a' }}
                  />
                  <YAxis
                    dataKey="y"
                    type="number"
                    name={yLabel}
                    unit=""
                    label={{ value: yLabel, angle: -90, position: 'insideLeft', fill: '#52525b' }}
                    stroke="#52525b"
                    tick={{ fill: '#71717a' }}
                    axisLine={{ stroke: '#27272a' }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3', stroke: '#52525b' }}
                    contentStyle={{
                      backgroundColor: 'rgba(5, 5, 5, 0.9)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.8)'
                    }}
                    itemStyle={{ color: '#e4e4e7' }}
                    labelStyle={{ color: '#71717a', marginBottom: '8px', borderBottom: '1px solid #27272a', paddingBottom: '4px' }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ paddingTop: '10px' }}
                  />

                  {/* Historical Data Scatter */}
                  <Scatter
                    name="Historical Data"
                    data={chartData.points}
                    fill="#f97316"
                    shape="circle"
                  />

                  {/* Regression Line */}
                  <Line
                    name="Regression Line"
                    data={chartData.line}
                    dataKey="regressionY"
                    stroke="#ffffff"
                    strokeWidth={2}
                    dot={false}
                    activeDot={false}
                    type="monotone"
                    strokeDasharray="5 5"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {analysis && (
              <div className="mt-8 p-6 glass rounded-xl border border-white/10">
                <h3 className="text-sm font-bold text-zinc-300 mb-3">Model Analysis</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{analysis}</p>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span> Historical Data
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span className="w-6 h-0.5 bg-white border-t border-dashed"></span> Regression Line
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Visualization;