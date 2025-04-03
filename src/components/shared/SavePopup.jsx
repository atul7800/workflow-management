import React, { useState } from "react";
import "./SavePopup.css";
import { Context } from "../../context/Context";

export default function SavePopup({ isPopupOpen, handlePopup }) {
  if (!isPopupOpen) return null;

  const { workFlowNames, setWorkFlowNames } = useState(Context);

  const [workflowDetail, setWorkflowDetail] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setWorkflowDetail({ ...workflowDetail, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSave = () => {
    if (!validate()) return;

    setWorkFlowNames([...workFlowNames, workflowDetail]);
    setErrors({ name: "" });
    handlePopup(false);
  };

  const validate = () => {
    let newErrors = {};
    if (!workflowDetail.name.trim()) {
      newErrors.name = "Name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup">
          <h3>Save your workflow</h3>
          <div className="popup-content">
            <div className="labelAndInput">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={workflowDetail.name}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Name here"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="labelAndInput">
              <label>Description</label>
              <textarea
                name="description"
                value={workflowDetail.description}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Write here.."
              ></textarea>
            </div>
          </div>

          <div className="popup-actions">
            <button className="submit-btn" onClick={handleSave}>
              Save
            </button>
            <button className="close-btn" onClick={() => handlePopup(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
