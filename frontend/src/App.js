import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import CategoryDetails from "./pages/CategoryDetails";

import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route
              path="/profile/settings"
              element={
                <PrivateRoute>
                  <ProfileSettings />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/profile/:profileId" element={<Profile />}></Route>
            <Route
              path="/category/:categoryId"
              element={<CategoryDetails />}
            ></Route>
            <Route
              path="/category/:categoryId/:postId"
              element={<PostDetails />}
            ></Route>
          </Routes>

          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
