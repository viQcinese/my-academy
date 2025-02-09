class HttpClient {
  private token: string = "";
  private baseUrl: string = "";

  async use(token: string, baseUrl: string) {
    this.token = token;
    this.baseUrl = baseUrl;
  }

  async fetch<TResponse>(
    ...params: Parameters<typeof fetch>
  ): Promise<TResponse> {
    const [url, config] = params;
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...config,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        ...config?.headers,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  }
}

export const httpClient = new HttpClient();
