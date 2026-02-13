import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import Pages
import LovePage from './pages/LovePage';
import PreviewPage from './components/PreviewPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import FinalLovePage from './pages/FinalLovePage';

// Import Compliance Pages
import { Terms, Privacy, Refund } from './pages/policies';

/**
 * AnimatedRoutes handles the transitions between different pages
 * using Framer Motion's AnimatePresence.
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* 1. HOME: The Creation Flow */}
        <Route path="/" element={<LovePage />} />

        {/* 2. PREVIEW: The Payment Gate */}
        <Route path="/preview" element={<PreviewPage />} />

        {/* 3. SUCCESS: The Link Generation/Copy Page */}
        <Route path="/success" element={<PaymentSuccessPage />} />

        {/* 4. FINAL PAGE: The Result (Dynamic Slug) */}
        <Route path="/love/:slug" element={<FinalLovePage />} />

        {/* 5. COMPLIANCE ROUTES: Required for Razorpay Live Mode */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />

        {/* 6. TEST ROUTE: For local development */}
        <Route path="/love/test" element={<FinalLovePage />} />

      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}