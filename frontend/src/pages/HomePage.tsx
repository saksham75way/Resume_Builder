import { Link, useNavigate } from "react-router-dom";
import { FileText, Plus } from "lucide-react";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-300 flex items-center justify-center">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Build Your Professional Resume
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Create a stunning resume in minutes with our easy-to-use builder.
            Choose from modern templates and stand out!
          </p>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <Link
            to="/builder"
            className="flex items-center justify-center gap-3 bg-pink-600 text-white text-lg px-6 py-3 rounded-xl hover:bg-pink-700 transition-all shadow-lg transform hover:scale-105"
          >
            <Plus className="w-6 h-6" />
            <span>Create New Resume</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <FileText className="w-14 h-14 text-pink-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Professional Templates
            </h2>
            <p className="text-gray-700">
              Choose from our collection of beautifully designed templates
              tailored for various industries.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <FileText className="w-14 h-14 text-pink-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Live Preview</h2>
            <p className="text-gray-700">
              Make edits and instantly see them reflected in real time before
              downloading your resume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
