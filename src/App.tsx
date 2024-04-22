import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import DefaultLayout from "./layouts/DefaultLayout.tsx";
import Task1 from "./pages/Task1.tsx";
import Task2 from "./pages/Task2.tsx";

function App() {
  return (
    <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task1" element={<Task1 />} />
          <Route path="/task2" element={<Task2 />} />
        </Routes>
    </DefaultLayout>
  );
}

export default App;
