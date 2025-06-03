import './App.css';
import Nav from './components/Nav/Nav';
import Homepage from './pages/Homepage/Homepage';
import AuthPage from './pages/Auth/AuthPage';
import { Routes, Route } from "react-router-dom";
import ShowOnePage from './pages/ShowOnePage/ShowOnePage';


function App() {

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<AuthPage />} />
          {/* <Route path="/requests" element={</>} */}
          {/* <Route path="/offers" element={</>} */}
          <Route path="/offers/:id" element={<ShowOnePage />} />
          <Route path="/requests/:id" element={<ShowOnePage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
