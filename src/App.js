import Layout from "./components/layout/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import Main from "./components/main/main";
import SearchScreen from "./components/searchScreen/searchScreen";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AlbumData from "./components/albumData/albumData";
import PlaylistTableData from "./components/playlistTableData/playlistTableData";
function App() {
  const token = useSelector(state => state.userDetail.loggedInUser);

  function PrivateRoute({ isAuthenticated }) {
    if (!isAuthenticated) return <Navigate to="/" />;
    return <Outlet />;
  }

  function PublicRoute({ isAuthenticated }) {
    if (isAuthenticated) {
      return <Navigate to="/layout" replace />;
    }
    return <Outlet />;
  }

  return (
    <BrowserRouter>
      <div>

        <Routes>
          <Route element={<PublicRoute isAuthenticated={token} />}>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route element={<PrivateRoute isAuthenticated={token} />} >
            <Route path="/layout" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="profile" element={<Profile />} />
              <Route path="search" element={<SearchScreen />} />
              <Route path="album/songs" element={<AlbumData />}/>
              <Route path="playlistData" element={<PlaylistTableData />}/>
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
