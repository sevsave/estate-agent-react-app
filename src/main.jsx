import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "react-widgets/styles.css"
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FavouritesProvider } from "./context/FavouritesContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavouritesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter> 
    </FavouritesProvider>   
  </StrictMode>,
)
