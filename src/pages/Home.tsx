import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white">
      <div className="w-full max-w-3xl p-6 text-center bg-blue-800 shadow-lg rounded-2xl">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          Welcome to NaviNear
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Your go-to solution for seamless navigation inside UToledo's North
          Engineering building.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/maps">
            <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg hover:bg-yellow-500">
              Explore Maps
            </button>
          </Link>
          <Link to="/office-hours">
            <button className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-gray-300">
              Office Hours
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
