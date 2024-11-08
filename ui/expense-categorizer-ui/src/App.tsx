import ProfessionalFintechCategorizer from "./pages/ProfessionalFintechCategorizer";
import CSVTransactionCategorizer from "./pages/CSVTransactionCategorizer";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <div >
    

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/single-categorization" element={<ProfessionalFintechCategorizer />} />
          <Route path="/bulk-categorization" element={<CSVTransactionCategorizer/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
