type BaseConfig = {
  params?: Record<string, any>;
  body?: object;
};

class HttpClient {
  private token: string = "";
  private baseUrl = import.meta.env.VITE_API_BASE_URL!;

  async use(token: string) {
    this.token = token;
  }

  async get<TReturn>(route: string, config?: BaseConfig): Promise<TReturn> {
    return this.fetch("GET", route, config);
  }

  async post<TReturn>(route: string, config?: BaseConfig): Promise<TReturn> {
    return this.fetch("POST", route, config);
  }

  async put<TReturn>(route: string, config?: BaseConfig): Promise<TReturn> {
    return this.fetch("PUT", route, config);
  }
  async patch<TReturn>(route: string, config?: BaseConfig): Promise<TReturn> {
    return this.fetch("PATCH", route, config);
  }

  async delete<TReturn>(route: string, config?: BaseConfig): Promise<TReturn> {
    return this.fetch("DELETE", route, config);
  }

  private async fetch<TReturn>(
    method: string,
    route: string,
    config?: BaseConfig
  ): Promise<TReturn> {
    const url = this.fullRoute(route, config);
    const response = await fetch(url, {
      method,
      headers: this.headers(),
      body: this.body(config),
    });

    const data = await response
      .text()
      .then((text) => (text ? JSON.parse(text) : {}));

    if (!response.ok) {
      throw new HttpClientError(response, url, method, data);
    }

    return data as TReturn;
  }

  private body(config?: BaseConfig) {
    return config?.body ? JSON.stringify(config?.body) : undefined;
  }

  private headers() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  private fullRoute(route: string, config?: BaseConfig) {
    const queryString = config?.params
      ? "?" + new URLSearchParams(config.params).toString()
      : "";
    return `${this.baseUrl}/${route}${queryString}`;
  }
}

export class HttpClientError extends Error {
  readonly status: number;
  readonly method: string;
  readonly url: string;
  readonly data: any;

  constructor(response: Response, url: string, method: string, data: any) {
    super(`Request failed with status code ${response.status}`);
    this.name = "HttpClientError";
    this.status = response.status;
    this.method = method;
    this.url = url;
    this.data = data;
  }
}

export const httpClient = new HttpClient();
