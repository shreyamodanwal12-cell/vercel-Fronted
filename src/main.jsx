import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './contexts/CartContext';

createRoot(document.getElementById('root')).render(
 <CartProvider>
  <App />
</CartProvider>
<<<<<<< HEAD
)
=======
)
>>>>>>> 207c6875c5f7fac0f61198e82cfba31ecfb76bea
