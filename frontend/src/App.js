import "./App.css";

import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import CategoryDetails from "./pages/CategoryDetails";
import LatestPosts from "./pages/LatestPosts";

import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouteController from "./utils/RouteController";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <RouteController>
                  <HomePage />
                </RouteController>
              }
            ></Route>
            <Route
              path="/profile/settings"
              element={
                <RouteController
                  isPrivateRoute={true}
                  privateRouteRedirect={"/"}
                >
                  <ProfileSettings />
                </RouteController>
              }
            ></Route>
            <Route
              path="/profile/:profileId"
              element={
                <RouteController>
                  <Profile />
                </RouteController>
              }
            ></Route>
            <Route
              path="/category/:categoryId"
              element={
                <RouteController>
                  <CategoryDetails />
                </RouteController>
              }
            ></Route>
            <Route
              path="/category/:categoryId/:postId"
              element={
                <RouteController>
                  <PostDetails />
                </RouteController>
              }
            ></Route>
            <Route
              path="/latest-posts" element={
                <RouteController>
                  <LatestPosts />
                </RouteController>}>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
