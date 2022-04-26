import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Teacher from './Pages/Teacher';
import Term from './Pages/Term';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/teacher' element={<Teacher/>}/>
        <Route path='/term' element={<Term/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;