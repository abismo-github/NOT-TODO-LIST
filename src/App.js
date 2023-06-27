import Header from "./components/Header";

import Main from "./pages/Main";
import MonthlyCalendar from "./pages/MonthlyCalendar";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";
import Enterance from "./pages/Enterance";

import "./App.css";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="w-screen h-screen bg-blue-300 overflow-x-hidden float-left">
      <div className="container mx-auto h-full">
        <Routes>
          <Route path="/" element={<Enterance />} />
          <Route element={<Header />}>
            <Route index path="/main" element={<Main />}></Route>
            <Route
              path="/monthlycalendar"
              element={<MonthlyCalendar />}
            ></Route>
            <Route path="/summary" element={<Summary />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
