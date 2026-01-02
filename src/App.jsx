import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage"; 
function App() {
  return (
  <>
  <Header />
   <main>
        <SearchPage />
   </main>
  <Footer/>
  </>
  );
}

export default App;
