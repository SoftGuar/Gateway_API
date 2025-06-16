import { NavigationObstacleRequest, NavigationRequest } from "./types";

export class NavigationService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

    // POST /navigate
    async navigate(navigationRequest : NavigationRequest): Promise<any> {
        const response = await fetch(`${this.baseUrl}/navigation/navigate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(navigationRequest),
        });

        if (!response.ok) {
            throw new Error(`Navigation failed: ${response.statusText}`);
        }

        return response.json();
    }

    // POST /navigate/obstacle
    async navigateWithObstacle(navigationRequest: NavigationObstacleRequest): Promise<any> {
        const response = await fetch(`${this.baseUrl}/navigation/navigate/obstacle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(navigationRequest),
        });

        if (!response.ok) {
            throw new Error(`Navigation with obstacle failed: ${response.statusText}`);
        }

        return response.json();
    }
}