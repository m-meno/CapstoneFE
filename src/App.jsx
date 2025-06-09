import './App.css';
import Nav from './components/Nav/Nav';
import Homepage from './pages/Homepage/Homepage';
import AuthPage from './pages/Auth/AuthPage';
import { Routes, Route } from "react-router-dom";
import ShowOnePage from './pages/ShowOnePage/ShowOnePage';
import Dashboard from './pages/Dashboard/Dashboard';
import TypePage from './pages/TypePage/TypePage';


function App() {

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/type/:type" element={<TypePage/>}/>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/api/post/:id" element={<ShowOnePage />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
