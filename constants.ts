import { DataPoint } from './types';

// Historical Dataset: Study Hours (X) vs Exam Score (Y)
// This is a classic academic dataset example.
export const HISTORICAL_DATA: DataPoint[] = [
  { x: 1.5, y: 20 },
  { x: 2.0, y: 25 },
  { x: 2.5, y: 30 },
  { x: 3.0, y: 40 },
  { x: 3.5, y: 35 },
  { x: 4.0, y: 50 },
  { x: 4.5, y: 45 },
  { x: 5.0, y: 60 },
  { x: 5.5, y: 55 },
  { x: 6.0, y: 70 },
  { x: 6.5, y: 65 },
  { x: 7.0, y: 80 },
  { x: 7.5, y: 85 },
  { x: 8.0, y: 90 },
  { x: 8.5, y: 95 },
  { x: 9.0, y: 92 },
];

export const APP_TITLE = "Predictive Analytics";
export const APP_SUBTITLE = "Simple Linear Regression Model";
export const X_LABEL = "Study Hours (X)";
export const Y_LABEL = "Exam Score (Y)";
