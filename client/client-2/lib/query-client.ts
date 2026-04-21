import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 min
      refetchOnWindowFocus: false, // By default, React Query fetches data every time you click back into the browser tab. This line turns that behavior off (you can always enable it later if you want real-time updates).
    },
  },
});
