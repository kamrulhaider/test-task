import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CategorySelect from "./component/CategorySelect";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditUserData from "./component/EditUserData";

function App() {
  return (
    <div className="container mt-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CategorySelect />} />
          <Route path="/edit" element={<EditUserData />} />
          <Route path="*" element={<CategorySelect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
