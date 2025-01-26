import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Desktop1 from "./pages/MarketPage";
// import Desktop3 from "./pages/Desktop3";
// import Desktop11 from "./pages/Desktop11";
import NewsPage from './pages/NewsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { Provider } from 'react-redux';
import store from './redux/store';
import PortfolioPage from './pages/PortfolioPage';
import MarketPage_test from './pages/MarketPage_test';

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/desktop-3":
        title = "";
        metaDescription = "";
        break;
      case "/news":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Provider store={store}>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/news" element={<NewsPage />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/markets" element={<Desktop1 />} />
      <Route path="/market_test" element={<MarketPage_test />} />

    </Routes>
    </Provider>
  );
}
export default App;
