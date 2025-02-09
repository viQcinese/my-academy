import { Routes, Navigate, Route } from "react-router-dom";
import { StudentsPage } from "../pages/students/StudentsPage";
import { ClassesPage } from "../pages/classes/ClassesPage";
import { InvoicesPage } from "../pages/invoices/InvoicesPage";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

export function ApplicationRoutes() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  console.log({ user });
  return isAuthenticated ? (
    <Routes>
      <Route path="/" element={<Navigate to="/classes" replace />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/classes" element={<ClassesPage />} />
      <Route path="/invoices" element={<InvoicesPage />} />
    </Routes>
  ) : (
    <main className="h-screen flex items-center justify-center screen">
      <Button onClick={() => loginWithRedirect()}>Login</Button>
    </main>
  );
}
