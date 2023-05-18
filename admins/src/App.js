import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import AddNewPropertyPage from "./pages/AddNewPropertyPage";
import CitizenApprovalPage from "./pages/CitizenApprovalPage";
import TransactionPage from "./pages/TransactionPage";
import ManageCitizen from "./pages/ManageCitizen";
import ManageSocietyPage from "./pages/ManageSocietyPage";
import ManagePropertiesPage from "./pages/ManagePropertiesPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add-property" element={<AddNewPropertyPage />} />
            <Route path="citizen-approval" element={<CitizenApprovalPage />} />
            <Route path="transaction" element={<TransactionPage />} />
            <Route path="manage-citizen" element={<ManageCitizen />} />
            <Route path="manage-society" element={<ManageSocietyPage />} />
            <Route path="manage-properties" element={<ManagePropertiesPage />} />
            
          </Route>
          <Route path="*" element={<h1>ASN 404 Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
