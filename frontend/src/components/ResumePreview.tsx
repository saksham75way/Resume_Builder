import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ResumePreview = () => {
  const resume = useSelector((state: RootState) => state.resume);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg border border-gray-200 rounded-lg">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          {resume.personalInfo.fullName}
        </h1>
        <div className="text-gray-600 mt-2">
          <p>
            {resume.personalInfo.email} | {resume.personalInfo.phone}
          </p>
          <p>{resume.personalInfo.address}</p>
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
          Education
        </h2>
        {resume.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {edu.institution}
            </h3>
            <p className="text-gray-700">{edu.degree}</p>
            <p className="text-gray-600">
              {edu.year} • GPA: {edu.gpa}
            </p>
          </div>
        ))}
      </div>

      {/* Experience Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
          Experience
        </h2>
        {resume.experience.map((exp, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {exp.company}
            </h3>
            <p className="text-gray-700">{exp.position}</p>
            <p className="text-gray-600">{exp.duration}</p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              {exp.description.split(". ").map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
          Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {resume.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
