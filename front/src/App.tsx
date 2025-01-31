import { StudentsPage } from "./pages/students";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StudentsProvider } from "./providers/StudentsProvider";
import { ClassesProvider } from "./providers/ClassesProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ClassesPage } from "./pages/classes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClassesProvider>
        <StudentsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/classes" replace />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/classes" element={<ClassesPage />} />
            </Routes>
          </BrowserRouter>
        </StudentsProvider>
      </ClassesProvider>
    </QueryClientProvider>
  );
}

export default App;
