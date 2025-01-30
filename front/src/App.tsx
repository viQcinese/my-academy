import { StudentsPage } from "./pages/students";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StudentsProvider } from "./providers/StudentsProvider";
import { ClassesProvider } from "./providers/ClassesProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClassesProvider>
        <StudentsProvider>
          <StudentsPage />
        </StudentsProvider>
      </ClassesProvider>
    </QueryClientProvider>
  );
}

export default App;
