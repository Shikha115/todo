import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Layout from "./pages/Layout";
import useThemeStore from "./store/themeStore";

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className="body" data-theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/index" element={<Index />} />
            <Route index element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
