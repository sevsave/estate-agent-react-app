import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage"; 
import PropertyPage from "./pages/PropertyPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
  <>
  <Header />
   <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />

          <Route path="/property/:id" element={<PropertyPage />} />
        </Routes>
   </main>
  <Footer/>
  </>
  );
}

export default App;
