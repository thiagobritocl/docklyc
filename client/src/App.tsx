import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AreasPage from "./pages/AreasPage";
import BoardingPage from "./pages/BoardingPage";
import RequisitosPage from "./pages/RequisitosPage";
import SalariosPage from "./pages/SalariosPage";
import EstafasPage from "./pages/EstafasPage";
import MitosPage from "./pages/MitosPage";
import SobrePage from "./pages/SobrePage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/areas" component={AreasPage} />
            <Route path="/proceso" component={BoardingPage} />
            <Route path="/requisitos" component={RequisitosPage} />
            <Route path="/salarios" component={SalariosPage} />
            <Route path="/estafas" component={EstafasPage} />
            <Route path="/mitos" component={MitosPage} />
            <Route path="/sobre-dockly" component={SobrePage} />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
