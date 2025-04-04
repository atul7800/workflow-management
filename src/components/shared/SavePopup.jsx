import React, { useContext, useState } from "react";
import "./SavePopup.css";
import { Context } from "../../context/Context";
import { IoMdClose } from "react-icons/io";

export default function SavePopup({ isPopupOpen, handlePopup }) {
  if (!isPopupOpen) return null;

  const { workFlowList, updateWorkFlowList } = useContext(Context);

  const [workflowDetail, setWorkflowDetail] = useState({
    title: "",
    body: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setWorkflowDetail({ ...workflowDetail, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSave = () => {
    if (!validate()) return;

    const raw = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });

    const [date, time] = raw.split(", ");
    const timestamp = `${time} IST - ${date}`;

    const newId = `#${(workFlowList.length + 1).toString().padStart(3, "0")}`;

    const newWorkflow = {
      id: newId,
      title: workflowDetail.title,
      body: workflowDetail.body,
      lastEdited: timestamp,
    };

    updateWorkFlowList([...workFlowList, newWorkflow]);
    setErrors({ title: "" });
    handlePopup(false);
  };

  const validate = () => {
    let newErrors = {};
    if (!workflowDetail.title.trim()) {
      newErrors.title = "Name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup">
          <div className="form">
            <div className="popup-title">
              <h3>Save your workflow</h3>
              <button className="close-btn" onClick={() => handlePopup(false)}>
                <IoMdClose />
              </button>
            </div>

            <div className="popup-content">
              <div className="labelAndInput">
                <label>Name</label>
                <input
                  type="text"
                  name="title"
                  value={workflowDetail.title}
                  onChange={handleInputChange}
                  className="input-field name-input"
                  placeholder="Name here"
                />
                {errors.title && <span className="error">{errors.title}</span>}
              </div>

              <div className="labelAndInput">
                <label>Description</label>
                <textarea
                  name="body"
                  value={workflowDetail.body}
                  onChange={handleInputChange}
                  className="input-field desc-input"
                  placeholder="Write here.."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="popup-actions">
            <button className="submit-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
