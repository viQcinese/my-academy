import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationProvider } from "./providers/AuthenticationProvider";
import { ApplicationRoutes } from "./routes/ApplicationRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthenticationProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ApplicationRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthenticationProvider>
  );
}

export default App;
