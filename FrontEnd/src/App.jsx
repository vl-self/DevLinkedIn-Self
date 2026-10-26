import "./App.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LayoutWrapper from "./features/layout/Layout";

import { AuthProvider } from "./features/auth/AuthContext";
import { Outlet } from "react-router";

function App() {
  return (
    <div id="vg-devTinder-app">
      <div className="layoutWrapper">
        <header>
          <Header />
        </header>

        <AuthProvider>
          <LayoutWrapper />
        </AuthProvider>

        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
