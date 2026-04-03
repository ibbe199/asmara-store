import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// قمنا بحذف سطر import './index.css' لحل مشكلة الخطأ في Vercel

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
