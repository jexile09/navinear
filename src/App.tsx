// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Maps from "./pages/Maps";
// import OfficeHours from "./pages/OfficeHours";
// import Navibar from "./components/Navibar";

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Navibar />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/maps" element={<Maps />} />
//             <Route path="/office-hours" element={<OfficeHours />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Maps from "./pages/Maps";
import OfficeHours from "./pages/OfficeHours";
import Navibar from "./components/Navibar";
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F5F5F5] text-[#00274C]">
        {/* Top Navbar */}
        <Navibar />

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/office-hours" element={<OfficeHours />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
