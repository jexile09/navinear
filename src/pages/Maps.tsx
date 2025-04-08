// import MapComponent from "../components/MapComponent";

// const Maps = () => {
//   return (
//     <div className="min-h-screen bg-[#F5F5F5] text-gray-800 px-8 py-12">
//       {/* Page Title Section */}
//       <section className="mb-10">
//         <h2 className="text-4xl font-bold text-[#00274C] mb-4">
//           Campus Maps
//         </h2>
//         <p className="text-base max-w-2xl mb-6">
//           Use the dropdowns below to select a start and destination location on campus and view the navigation path.
//         </p>
//       </section>

//       {/* Main Map Feature */}
//       <main className="space-y-8">
//         <MapComponent />
//       </main>
//     </div>
//   );
// };

// export default Maps;

import MapComponent from "../components/MapComponent";
import "./Maps.css";

const Maps = () => {
  return (
    <div className="min-h-screen bg-[#00274C] text-white px-6 py-10">
      <section className="max-w-3xl mx-auto mb-6 text-left">
      <h2 className="map-title">Campus Maps</h2>
        <p className="map-subtitle">
          Use the dropdowns below to select a start and destination location on campus and view the navigation path.
        </p>
      </section>

      <MapComponent />
    </div>
  );
};

export default Maps;
