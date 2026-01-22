import { DataPoint, RegressionResult } from '../types';

export const calculateLinearRegression = (data: DataPoint[]): RegressionResult => {
  const n = data.length;
  if (n === 0) {
    return { slope: 0, intercept: 0, predict: () => 0 };
  }

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (const point of data) {
    sumX += point.x;
    sumY += point.y;
    sumXY += point.x * point.y;
    sumXX += point.x * point.x;
  }

  // Formula for slope (m)
  // m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  const slopeNumerator = (n * sumXY) - (sumX * sumY);
  const slopeDenominator = (n * sumXX) - (sumX * sumX);
  
  const slope = slopeDenominator === 0 ? 0 : slopeNumerator / slopeDenominator;

  // Formula for intercept (c)
  // c = (sumY - slope * sumX) / n
  const intercept = (sumY - (slope * sumX)) / n;

  const predict = (x: number) => {
    return (slope * x) + intercept;
  };

  return {
    slope,
    intercept,
    predict
  };
};