import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Sales } from "./pages";
import { Commissions } from "./pages";
import { NotFound } from "./pages";
import { SaleConfiguration } from "./pages";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Sales />} />
      <Route exact path="/commissions" element={<Commissions />} />
      <Route exact path="/sale/configuration" element={<SaleConfiguration />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
