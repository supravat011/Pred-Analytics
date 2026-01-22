export interface DataPoint {
  x: number;
  y: number;
}

export interface RegressionResult {
  slope: number;
  intercept: number;
  predict: (x: number) => number;
}

export interface PredictionState {
  inputValue: string;
  predictedValue: number | null;
  error: string | null;
}

export enum PageRoute {
  HOME = '/',
  DASHBOARD = '/dashboard',
  VISUALIZATION = '/visualization',
  ABOUT = '/about'
}