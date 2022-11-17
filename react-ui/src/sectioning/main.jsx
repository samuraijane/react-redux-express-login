import { Routes, Route } from 'react-router-dom';
import { Landing, Login, Logout, Profile } from '../views';

const Main = () => (
  <main>
    <div className="y-wrap">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  </main>
);

export default Main;