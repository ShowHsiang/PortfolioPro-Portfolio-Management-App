import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import NewsPage from './pages/NewsPage'; // Import NewsPage
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import store from './redux/store';
import PortfolioPage from './pages/PortfolioPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Button color="inherit" component={Link} to="/news">
              News
            </Button>
            <Button color="inherit" component={Link} to="/portfolio">
              Portfolio
            </Button>
          </Toolbar>
        </AppBar>

        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/news" element={<NewsPage />} /> 
            <Route path="/portfolio" element={<PortfolioPage />} />
            {/* Add NewsPage Route */}
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;