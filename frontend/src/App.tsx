import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import CreateContact from "./pages/CreateContact";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
		<Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/create" element={<CreateContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;