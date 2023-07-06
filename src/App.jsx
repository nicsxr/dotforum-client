import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { store } from './store';
import { Provider } from 'react-redux';
import { AxiosInterceptor } from './api/api';

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
                  <Route path="/post/:id" element={<Post />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </AxiosInterceptor>
          </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App