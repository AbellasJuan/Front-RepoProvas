import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Teacher from './Pages/Teacher';
import Term from './Pages/Term';
import { AuthProvider } from './contexts/authContext.js';

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/teacher' element={<Teacher/>}/>
          <Route path='/term' element={<Term/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;