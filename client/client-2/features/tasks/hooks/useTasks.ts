import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/task.api";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
};


/*
useQuery: This is a TanStack Query hook that manages the lifecycle of your request (loading, success, error, caching).
queryKey: ["tasks"]: Think of this as the Unique ID for your data. When you call this in a component, React Query stores the data under the label ["tasks"]. 

If you update a task later, you can tell React Query: "Invalidate the ['tasks'] key," and it will automatically re-fetch the fresh data for you.

queryFn: getTasks: This tells React Query which Service function to call when it needs the data. Notice we are calling the function name getTasks, not the axios instance directly.

*/