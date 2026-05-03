import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, login, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-10 bg-amber-50/95 border-b border-amber-100">
      <div className="max-w-6xl mx-auto p-3 flex justify-between items-center">
        <Link to="/" className="font-bold">InnerLight</Link>
        <div className="flex gap-3 items-center">
          <Link to="/products">Products</Link>
          <Link to="/admin">Admin</Link>
          {user ? <button onClick={logout}>Logout</button> : <button onClick={login}>Google Login</button>}
        </div>
      </div>
    </nav>
  );
}
