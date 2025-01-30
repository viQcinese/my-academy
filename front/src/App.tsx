import { StudentsPage } from "./pages/students";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StudentsPage />
    </QueryClientProvider>
  );
}

export default App;
