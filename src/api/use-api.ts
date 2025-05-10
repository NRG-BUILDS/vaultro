import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./apiClient";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UseApiProps {
  key: string[];
  url: string;
  method?: RequestMethod;
  data?: any;
  enabled?: boolean; // For controlling automatic fetching
  onSuccess?: (data: any) => void;
}

/**
 * Reusable React Query Hook for GET and Mutations (POST, PUT, DELETE)
 */
export function useApi<T = any>({
  key,
  url,
  method = "GET",
  data,
  enabled = true,
  onSuccess,
}: UseApiProps) {
  const queryClient = useQueryClient();

  // Function to handle API requests
  const fetchData = async () => {
    const response =
      method === "GET" ? await api.get(url) : await api({ method, url, data });

    return response.data;
  };

  // For GET Requests
  if (method === "GET") {
    return useQuery<T>({
      queryKey: key,
      queryFn: fetchData,
      enabled,
    });
  }

  // For Mutations (POST, PUT, DELETE)
  return useMutation({
    mutationFn: fetchData,
    onSuccess: (response) => {
      if (onSuccess) onSuccess(response);
      queryClient.invalidateQueries({ queryKey: key });
      // Refresh data
    },
  });
}
