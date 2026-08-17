interface FetcherConfig {
  baseUrl: string
  headers?: Record<string, string>
}

export function createFetcher({ baseUrl, headers: defaultHeaders = {} }: FetcherConfig) {
  async function request<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
        ...options.headers,
      },
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`[${res.status}] ${res.statusText}: ${body}`)
    }

    return res.json() as Promise<T>
  }

  return {
    get:    <T = unknown>(path: string)                  => request<T>(path, { method: "GET" }),
    post:   <T = unknown>(path: string, body?: unknown)  => request<T>(path, { method: "POST",   body: JSON.stringify(body) }),
    patch:  <T = unknown>(path: string, body?: unknown)  => request<T>(path, { method: "PATCH",  body: JSON.stringify(body) }),
    delete: <T = unknown>(path: string)                  => request<T>(path, { method: "DELETE" }),
  }
}
