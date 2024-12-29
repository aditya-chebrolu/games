import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gifts from "./pages/gifts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gifts" element={<Gifts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
