import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute.jsx';

function App() {
  
  return (
    <div>
        <Router>
          <Routes>
            <Route element={<PrivateRoute />}>
                <Route element={<Dashboard/>} path="/dashboard" exact/>
            </Route>
            <Route element={<Login/>} path="/"/>
            <Route element={<Registration/>} path="/signup" />
          </Routes>
      </Router>
    </div>
  )
}

export default App
