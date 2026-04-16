import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/contacts">Contacts</Link> | 
      <Link to="/create">Create</Link>
    </nav>
  );
}