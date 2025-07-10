import { Routes, Route } from 'react-router-dom';
import ListingPage from './pages/ListingPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListingPage />} />
      <Route path="/photographer/:id" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
