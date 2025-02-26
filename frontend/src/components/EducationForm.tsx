import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addEducation,
  updateEducation,
  removeEducation,
} from "../store/reducers/resumeReducer";

const EducationForm = () => {
  const dispatch = useDispatch();
  const educationList = useSelector(
    (state: RootState) => state.resume.education
  );

  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    year: "",
    gpa: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null) {
      dispatch(updateEducation({ index: editIndex, data: formData }));
      setEditIndex(null);
    } else {
      dispatch(addEducation(formData));
    }
    setFormData({ institution: "", degree: "", year: "", gpa: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (index: number) => {
    setFormData(educationList[index]);
    setEditIndex(index);
  };

  const handleRemove = (index: number) => {
    dispatch(removeEducation(index));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Institution
          </label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Degree
          </label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GPA</label>
          <input
            type="text"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          {editIndex !== null ? "Update Education" : "Add Education"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Education List</h2>
        {educationList.map((edu, index) => (
          <div
            key={index}
            className="flex justify-between bg-gray-100 p-2 rounded mt-2"
          >
            <span>
              {edu.institution} - {edu.degree} ({edu.year})
            </span>
            <div>
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemove(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;
