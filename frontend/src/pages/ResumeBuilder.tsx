import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePersonalInfo,
  addEducation,
  addExperience,
  updateSkills,
} from "../store/reducers/resumeReducer";
import PersonalInfoForm from "../components/PersonalInfoForm";
import EducationForm from "../components/EducationForm";
import ExperienceForm from "../components/ExperienceForm";
import SkillsForm from "../components/SkillsForm";
import ResumePreview from "../components/ResumePreview";
import { RootState } from "../store/store";
import { useCreateResumeMutation } from "../services/api";
import html2pdf from "html2pdf.js";

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const dispatch = useDispatch();
  const [createResume, { isLoading, isError, isSuccess }] =
    useCreateResumeMutation();

  const sections = [
    { id: "personal", label: "Personal Info" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
  ];

  const resumeData = useSelector((state: RootState) => state.resume);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSave = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }

    try {
      // Prepare the payload in the correct structure
      const payload = {
        fullName: resumeData.personalInfo.fullName,
        email: resumeData.personalInfo.email,
        phone: resumeData.personalInfo.phone,
        skills: resumeData.skills,
        education: resumeData.education,
        experience: resumeData.experience,
        address: resumeData.personalInfo.address,
      };

      // Send the request with the payload
      await createResume(payload).unwrap();
      alert("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Failed to save resume. Please try again.");
    }
  };

  // Function to handle the download of the resume as a PDF
  const downloadPDF = () => {
    const element = document.getElementById("resume-preview") as HTMLElement;
    const options = {
      filename: "resume.pdf", // File name for the download
      image: { type: "jpeg", quality: 0.98 }, // Quality of the image
      html2canvas: { scale: 2 }, // Resolution of the canvas
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // PDF size and format
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex gap-4 mb-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded ${
                    activeSection === section.id
                      ? "bg-pink-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {activeSection === "personal" && <PersonalInfoForm />}
              {activeSection === "education" && <EducationForm />}
              {activeSection === "experience" && <ExperienceForm />}
              {activeSection === "skills" && <SkillsForm />}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold mb-4">Preview</h2>
              {/* Download PDF Button */}
              <button
                onClick={downloadPDF}
                className="px-6 py-2 mb-6 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 mt-4"
              >
                Download Resume as PDF
              </button>
            </div>
            <div id="resume-preview">
              <ResumePreview />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded bg-pink-600 text-white mt-5"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>

        {isSuccess && (
          <p className="text-green-600 mt-2">Resume saved successfully!</p>
        )}
        {isError && <p className="text-red-600 mt-2">Failed to save resume.</p>}
      </div>
    </div>
  );
};

export default ResumeBuilder;
