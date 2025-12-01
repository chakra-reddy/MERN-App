import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginComponent from "./components/pages/loginPage";
import HomeComponent from "./components/pages/homePage";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/home" element={<HomeComponent />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
