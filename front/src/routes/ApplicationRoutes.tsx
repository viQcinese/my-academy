import { Routes, Navigate, Route } from "react-router-dom";
import { StudentsPage } from "../pages/students/StudentsPage";
import { ClassesPage } from "../pages/classes/ClassesPage";
import { InvoicesPage } from "../pages/invoices/InvoicesPage";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { httpClient } from "@/api/httpClient";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function ApplicationRoutes() {
  const {
    loginWithRedirect,
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  useEffect(() => {
    async function initHttpClient() {
      const token = await getAccessTokenSilently();
      httpClient.use(token);
    }

    initHttpClient();
  }, [getAccessTokenSilently]);

  return isAuthenticated ? (
    <Routes>
      <Route path="/" element={<Navigate to="/classes" replace />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/classes" element={<ClassesPage />} />
      <Route path="/invoices" element={<InvoicesPage />} />
    </Routes>
  ) : (
    <main className="h-screen flex items-center justify-center screen">
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      )}
    </main>
  );
}
