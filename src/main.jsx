import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Bizim yaratdığımız Context-i bura import edirik
import { ImageProvider } from './context/ImageContext' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Bütün tətbiqi ImageProvider ilə bükürük ki, hər yerdən dataya çata bilək */}
    <ImageProvider>
      <App />
    </ImageProvider>
  </React.StrictMode>,
)