import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import Login from './pages/Login'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { store } from './store';
import { Provider } from 'react-redux';
import { AxiosInterceptor } from './api/api';
import Registration from './pages/Registration';
import CreateCommunity from './pages/CreateCommunity'
import Navbar from './components/Navbar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
          <Router>
            <AxiosInterceptor>
              <div className="pt-20 bg-slate-900 min-h-screen pb-16">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/post/:id" element={<PostPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/createcommunity" element={<CreateCommunity />} />
                </Routes>
              </div>
            </AxiosInterceptor>
          </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App