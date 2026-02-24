import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Variables from './pages/VariablesList';
import VariableDetail from './pages/VariableDetail';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/variables" element={<Variables />} />
          <Route path="/variables/:variableId" element={<VariableDetail />} />
          <Route path="*" element={<div>Сторінку не знайдено</div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
