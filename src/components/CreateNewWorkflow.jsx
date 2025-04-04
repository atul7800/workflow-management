import React, { useContext, useState } from "react";
import save from "../assets/save.png";
import { IoMdArrowBack } from "react-icons/io";
import styles from "./styles/CreateNewWorkflow.module.css";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import Flowchart from "./shared/FlowChart";
import SavePopup from "./shared/SavePopup";

export default function CreateNewWorkflow() {
  const { fileName, updateFileName } = useContext(Context);
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const saveWorkflow = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.controlsContainer}>
          <div className={styles.controls}>
            <span className={styles.goBack}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                <IoMdArrowBack />
                <span>Go Back</span>
              </a>
            </span>
            <span className={styles.fileName}>
              {fileName ? fileName : "Untitled"}
            </span>
            <span
              onClick={() => setIsPopupOpen(true)}
              className={styles.saveBtn}
            >
              <img src={save} alt="Save Button" />
            </span>
          </div>
        </div>
        <div>
          <Flowchart />
        </div>

        {isPopupOpen && (
          <SavePopup
            isPopupOpen={isPopupOpen}
            handlePopup={(value) => setIsPopupOpen(value)}
          />
        )}
      </div>
    </>
  );
}
