import { AuthContext } from './contexts/AuthContext';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

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
import { useContext } from 'react';
// import Mockman from 'mockman-js'

function App() {
  const {isLoggedIn} = useContext(AuthContext)

  const location = useLocation()

  return (
    <div className="App">
      <Navbar />
      <People />
      <Routes>
        <Route path='/' element={<RequiresAuth><HomePage /></RequiresAuth>} />
        <Route path="/login" element={isLoggedIn
          ? (location?.state !== null)
            ? <Navigate to={location?.state?.from?.pathname} />
            : <Navigate to="/" />
          : <LoginPage />} />
        {/* <Route path='/login' element={<LoginPage />} /> */}
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/explore' element={<AllPosts />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/post/:post_id' element={<SinglePostPage />} />
        <Route path='/bookmarks' element={<BookmarkPage />} />
      </Routes>
      {/* <div className="mockman-container"><Mockman /></div> */}
    </div>
  );
}

export default App;
