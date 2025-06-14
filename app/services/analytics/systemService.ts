export class SystemService {
    private static analyticsBaseUrl = process.env.ANALYTICS_SERVICE_BASE_URL || "http://localhost:3004";
    
    private static async fetchFromAnalytics<T>(endpoint: string): Promise<T> {
        const url = `${this.analyticsBaseUrl}${endpoint}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
        }
        return response.json();
    }

    public async getUptimeStats(): Promise<any> {
        return await SystemService.fetchFromAnalytics("/system/uptime-stats");
    }

    public async getAnomalies(): Promise<any> {
        const result = await SystemService.fetchFromAnalytics("/system/anomalies");
        return result;
    }

    public async getDiskUsage(): Promise<any> {
        return await SystemService.fetchFromAnalytics("/system/disk-usage");
    }
    }