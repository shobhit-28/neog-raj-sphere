import { AuthContext } from './contexts/AuthContext';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HomePage } from './pages/homepage/homepage';
import { LoginPage } from './pages/login/login';
import { SignupPage } from './pages/signup/signup';
import { AllPosts } from './pages/allPosts/allPosts';
import { ProfilePage } from './pages/profile/profilePage';
import { SinglePostPage } from './pages/singlePostPage/singlePostPage';
import { Navbar } from './components/navbar/navbar';
import { BookmarkPage } from './pages/bookmarks/bookmarks';
import { People } from './components/people/people';
import { RequiresAuth } from './requiresAuth/requiresAuth';
import { IndividualUser } from './pages/individualUser/individualUser';
// import Mockman from 'mockman-js'

function App() {
  const { isLoggedIn } = useContext(AuthContext)

  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar />
      {/* <RequiresAuth><People /></RequiresAuth> */}
      <People />
      <Routes>
        <Route path='/' element={<RequiresAuth><HomePage /></RequiresAuth>} />
        <Route path="/login" element={isLoggedIn
          ? (location?.state !== null)
            ? <Navigate to={location?.state?.from?.pathname} />
            : <Navigate to="/" />
          : <LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/explore' element={<RequiresAuth><AllPosts /></RequiresAuth>} />
        <Route path='/profile' element={<RequiresAuth><ProfilePage /></RequiresAuth>} />
        <Route path='/post/:postId' element={<RequiresAuth><SinglePostPage /></RequiresAuth>} />
        <Route path='/bookmarks' element={<RequiresAuth><BookmarkPage /></RequiresAuth>} />
        <Route path='/user/:userID' element={<RequiresAuth><IndividualUser /></RequiresAuth>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <div className="mockman-container"><Mockman /></div> */}
    </div>
  );
}

export default App;
