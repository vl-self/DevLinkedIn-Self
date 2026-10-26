import "./App.css";
import { Outlet } from "react-router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./features/auth/AuthContext";

function App() {
  return (
    <div id="vg-devTinder-app">
      <header>
        <Header />
      </header>
      <AuthProvider>
        <main>
          <div className="min-h-[500px] flex justify-center items-center">
            <Outlet />
          </div>
        </main>
      </AuthProvider>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
