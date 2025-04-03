import React, { useEffect, useState } from "react";

interface Professor {
  id: number;
  name: string;
  office: string;
  office_hours: string | null;
  email: string;
  phone: string | null;
  course_id: string | null;
}

const OfficeHours: React.FC = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/professors")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch professors");
        return res.json();
      })
      .then((data: Professor[]) => {
        setProfessors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Unable to load professor data.");
        setLoading(false);
      });
  }, []);

  const selectedProfessor = professors.find((p) => p.id === selectedId);

  const filteredOfficeHours = professors.filter((entry) => {
    const dayMatch =
      filter === "All" ||
      entry.office_hours
        ?.toLowerCase()
        .includes(filter.toLowerCase().slice(0, 3));
    const nameMatch = entry.name.toLowerCase().includes(search.toLowerCase());
    return dayMatch && nameMatch;
  });

  return (
    <div className="p-6 bg-[#00274C] min-h-screen text-white font-sans">
      <h2 className="text-3xl font-bold text-yellow-200 mb-4">
        Professor Office Hours
      </h2>

      {/* Dropdown Selector */}
      <div className="mb-6 max-w-md">
        <label className="block mb-1 text-white">
          Quick Jump to Professor:
        </label>
        <select
          value={selectedId ?? ""}
          onChange={(e) => setSelectedId(Number(e.target.value) || null)}
          className="p-2 rounded-lg text-black w-full"
        >
          <option value="">-- Select a Professor --</option>
          {professors.map((prof) => (
            <option key={prof.id} value={prof.id}>
              {prof.name}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Professor Info */}
      {selectedProfessor && (
        <div className="bg-white text-black rounded-lg shadow-md p-6 max-w-md mb-8">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            {selectedProfessor.name}
          </h3>
          <p>
            <strong>Office:</strong> {selectedProfessor.office || "TBD"}
          </p>
          <p>
            <strong>Office Hours:</strong>{" "}
            {selectedProfessor.office_hours || "Not available"}
          </p>
          <p>
            <strong>Email:</strong> {selectedProfessor.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedProfessor.phone || "N/A"}
          </p>
          <p>
            <strong>Course:</strong> {selectedProfessor.course_id || "N/A"}
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-xl">
        <input
          type="text"
          placeholder="Search professor name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg text-black w-full sm:w-1/2"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-lg text-black w-full sm:w-1/2"
        >
          <option value="All">All Days</option>
          <option value="Mon">Monday</option>
          <option value="Tue">Tuesday</option>
          <option value="Wed">Wednesday</option>
          <option value="Thu">Thursday</option>
          <option value="Fri">Friday</option>
        </select>
      </div>

      {/* Office Hours List */}
      {loading ? (
        <p className="text-gray-300">Loading professors...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <ul className="bg-yellow-100 text-blue-900 p-4 rounded-lg shadow-md max-w-3xl">
          {filteredOfficeHours.length > 0 ? (
            filteredOfficeHours.map((prof) => (
              <li key={prof.id} className="text-lg mb-3">
                <strong>{prof.name}</strong> –{" "}
                {prof.office_hours || "Office hours not available"}
              </li>
            ))
          ) : (
            <li className="text-red-500 text-lg">No matches found</li>
          )}
        </ul>
      )}

      {/* <footer className="mt-12 text-sm text-gray-300">
        © 2025 UToledo Indoor Navigation
      </footer> */}
    </div>
  );
};

export default OfficeHours;
