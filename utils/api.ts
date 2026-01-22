/**
 * Enhanced API Service with Multi-Dataset Support
 */

const API_BASE_URL = 'http://localhost:5000/api';

export interface PredictionRequest {
    x_value: number;
}

export interface PredictionResponse {
    x_value: number;
    predicted_y: number;
    x_label: string;
    y_label: string;
    equation: string;
}

export interface DatasetConfig {
    x_label: string;
    y_label: string;
    x_unit: string;
    y_unit: string;
    description: string;
}

export interface ModelInfo {
    slope: number;
    intercept: number;
    r2_score: number;
    mse: number;
    mae: number;
    equation: string;
    config?: DatasetConfig;
}

export interface VisualizationData {
    plot_data: {
        scatter_data: {
            x: number[];
            y: number[];
        };
        regression_line: {
            x: number[];
            y: number[];
        };
    };
    analysis: string;
    model_info: ModelInfo;
    config: DatasetConfig;
}

export interface DatasetInfo {
    description: string;
    x_label: string;
    y_label: string;
}

class APIService {
    private baseURL: string;

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    /**
     * Health check
     */
    async healthCheck(): Promise<{ status: string; model_trained: boolean; current_dataset: string }> {
        const response = await fetch(`${this.baseURL}/health`);
        if (!response.ok) throw new Error('Health check failed');
        return response.json();
    }

    /**
     * Get available datasets
     */
    async getAvailableDatasets(): Promise<{ datasets: Record<string, DatasetInfo>; current: string }> {
        const response = await fetch(`${this.baseURL}/datasets`);
        if (!response.ok) throw new Error('Failed to fetch datasets');
        return response.json();
    }

    /**
     * Switch to a different dataset
     */
    async switchDataset(datasetName: string): Promise<{ message: string; model_info: ModelInfo; config: DatasetConfig }> {
        const response = await fetch(`${this.baseURL}/switch-dataset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dataset_name: datasetName }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to switch dataset');
        }

        return response.json();
    }

    /**
     * Upload custom CSV file
     */
    async uploadCSV(file: File): Promise<{ message: string; model_info: ModelInfo; config: DatasetConfig }> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${this.baseURL}/upload-csv`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to upload CSV');
        }

        return response.json();
    }

    /**
     * Get model information
     */
    async getModelInfo(): Promise<ModelInfo> {
        const response = await fetch(`${this.baseURL}/model-info`);
        if (!response.ok) throw new Error('Failed to fetch model info');
        return response.json();
    }

    /**
     * Make prediction
     */
    async predict(xValue: number): Promise<PredictionResponse> {
        const response = await fetch(`${this.baseURL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ x_value: xValue }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Prediction failed');
        }

        return response.json();
    }

    /**
     * Get visualization data
     */
    async getVisualizationData(): Promise<VisualizationData> {
        const response = await fetch(`${this.baseURL}/visualize`);
        if (!response.ok) throw new Error('Failed to fetch visualization data');
        return response.json();
    }

    /**
     * Get full dataset
     */
    async getDataset(): Promise<any> {
        const response = await fetch(`${this.baseURL}/dataset`);
        if (!response.ok) throw new Error('Failed to fetch dataset');
        return response.json();
    }
}

// Export singleton instance
export const api = new APIService();
export default api;
