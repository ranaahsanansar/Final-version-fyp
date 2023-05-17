import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import DashboardLayout from "./pages/DashboardLayout";
import Profile from "./pages/Profile";
import ListProperty from "./pages/ListProperty";
import CitizenRequestSol from "./pages/CitizenRequestSol";
import BuyProperty from "./pages/BuyProperty";
import SellProperty from "./pages/SellProperty";
import ChangePassword from "./pages/auth/ChangePassword";
import Filter from "./pages/Filter";
import PropertiesDetails from "./pages/PropertiesDetails";
import UpdateProperty from "./pages/UpdateProperty";
import ApprovalRequestForm from "./components/ApprovalRequestForm";



function App() {
  const { token } = useSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="filter" element={<Filter/>} />
            <Route path="details" element={<PropertiesDetails />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={!token ? <LoginReg /> : <Navigate to="/dashboard" />} />
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
          </Route>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/profile" />} />
            <Route path="profile" element={token ? <Profile /> : <Navigate to="/login" />} />
            <Route path="listproperty" element={token ? <ListProperty /> : <Navigate to="/login" />} />
            <Route path="buyPropertyBlockchain" element={token ? <BuyProperty /> : <Navigate to="/login" />} />
            <Route path="sellPropertyBlockchain" element={token ? <SellProperty /> : <Navigate to="/login" />} />
            <Route path="changePassword" element={token ? <ChangePassword /> : <Navigate to="/login" />} />
            <Route path="updateProperty" element={token ? <UpdateProperty /> : <Navigate to="/login" />} />
            <Route path="approvalRequest" element={token ? <ApprovalRequestForm /> : <Navigate to="/login" />} />

          <Route path="test" element={ <UpdateProperty /> } />

          </Route>

          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}



export default App;