import { useState } from "react";
import { convertToFormData } from "@/lib/utils";

// Define a general shape for request data
interface RequestData {
  [key: string]: any;
}

// Define a general type for the return type of the request
interface UseRequestReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  makeRequest: (
    requestData?: RequestData | null,
    method?: string,
    contentType?: string,
    url_with_slug?: string | null
  ) => Promise<T | undefined>;
}

const useRequest = <T = any>(route: string): UseRequestReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const makeFetch = async (
    url: string,
    method: string,
    contentType: string,
    requestData?: RequestData | null
  ): Promise<Response> => {
    const headers: Record<string, string> = {
      ...(contentType !== "multipart/form-data" && {
        "Content-Type": contentType,
      }),
    };

    // Append query parameters for GET requests
    let requestUrl = url;
    if (method === "GET" && requestData) {
      const queryParams = new URLSearchParams(
        requestData as Record<string, string>
      ).toString();
      requestUrl += `?${queryParams}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (method !== "GET" && requestData) {
      options.body =
        contentType === "application/json"
          ? JSON.stringify(requestData)
          : convertToFormData(requestData);
    }

    return fetch(`${requestUrl}`, options);
  };

  const makeRequest = async (
    requestData: RequestData | null = null,
    method: string = "GET",
    contentType: string = "application/json",
    url_with_slug: string | null = null
  ): Promise<T | undefined> => {
    const requestUrl = url_with_slug || route;

    setLoading(true);
    setError(null); // Reset error state before making the request

    try {
      const response = await makeFetch(
        requestUrl,
        method,
        contentType,
        requestData
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err; // Re-throw the error to handle it in the calling component
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, makeRequest };
};

export default useRequest;
