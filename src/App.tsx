import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Overview from "./pages/overview";
import AppearanceProvider from "./context/AppearanceProvider";
import Layout from "./components/layout/layout";
import CreateFund from "./pages/create-fund";
import Interactions from "./pages/interactions";
import Details from "./pages/details";
import InteractionsInfo from "./pages/interactions-info";
import Positions from "./pages/positions";

const App = () => {
  return (
    <TooltipProvider>
      <AppearanceProvider />
      <Toaster />
      <Sonner richColors />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/create-fund" element={<CreateFund />} />
            <Route path="/interactions" element={<Interactions />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/details/:id" element={<Details />} />
            <Route
              path="/interactions-info/:id"
              element={<InteractionsInfo />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
