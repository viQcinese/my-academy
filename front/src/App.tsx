import { StudentsPage } from "./pages/students/StudentsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StudentsProvider } from "./providers/StudentsProvider";
import { ClassesProvider } from "./providers/ClassesProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ClassesPage } from "./pages/classes/ClassesPage";
import { InvoicesPage } from "./pages/invoices/InvoicesPage";

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
              <Route path="/invoices" element={<InvoicesPage />} />
            </Routes>
          </BrowserRouter>
        </StudentsProvider>
      </ClassesProvider>
    </QueryClientProvider>
  );
}

export default App;
