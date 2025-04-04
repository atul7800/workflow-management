import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { fetchWorkFlows, executeWorkflow } from "../workFlow/useWorkFlow";
import styles from "./styles/WorkflowList.module.css";
import menu from "../assets/menu.png";
import pinned from "../assets/pinned.png";
import unpinned from "../assets/unpinned.png";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function WorkflowList() {
  const {
    workFlowList,
    updateWorkFlowList,
    setUser,
    setFileName,
    setWorkFlowList,
    setWorkFlowNames,
  } = useContext(Context);
  const navigate = useNavigate();
  const [isExPopupOpen, setIsExPopupOpen] = useState(false);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState();
  const [expandedRowId, setExpandedRowId] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      const workFlows = await fetchWorkFlows();
      //setWorkFlowList(workFlows);
    })();
  }, []);

  const toggleExpand = (workflowID) => {
    setExpandedRowId((prevState) =>
      prevState === workflowID ? null : workflowID
    );
  };

  const handleYes = async () => {
    setIsExPopupOpen(false);
    const executionResult = await executeWorkflow();
    const timestamp = new Date()
      .toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      })
      .replace(",", " IST");
    if (selectedWorkflowId) {
      updateWorkFlowList((prevList) => {
        return prevList.map((workflow) =>
          workflow.id === selectedWorkflowId
            ? {
                ...workflow,
                executionHistory: [
                  ...(workflow.executionHistory || []),
                  { status: executionResult, timestamp },
                ],
              }
            : workflow
        );
      });
    }

    setSelectedWorkflowId(null);
  };

  const handleNo = () => {
    setIsExPopupOpen(false);
  };

  const hanleExecuteClick = (workflowId) => {
    setSelectedWorkflowId(workflowId);
    setIsExPopupOpen(true);
  };

  const filteredWorkflows = workFlowList.filter((workflow) => {
    const query = searchQuery.toLowerCase();
    const name = workflow.title?.toLowerCase() || "";
    const id = String(workflow.id);

    return name.includes(query) || id.includes(query);
  });

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setWorkFlowList([]);
        setFileName("");
        setWorkFlowNames([]);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.menu}>
          <img className={styles.menuIcon} src={menu} alt="Menu" />
        </div>
        <div className={styles.container}>
          <div className={styles.titleSearchAndCreate}>
            <div className={styles.titleAndLogout}>
              <h2 className={styles.title}>Workflow Builder</h2>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className={styles.searchAndCreate}>
              <div className={styles.searchBarContainer}>
                <input
                  type="text"
                  placeholder="Search By Workflow Name/ID"
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className={styles.searchButton}>
                  <CiSearch className={styles.searchIcon} />
                </button>
              </div>
              <button
                onClick={() => navigate("/createWorkflow")}
                className={styles.createBtn}
              >
                <span className={styles.plus}>+</span>Create New Process
              </button>
            </div>
          </div>
          <div className={styles.listContainer}>
            <div className={styles.workFlowsTable}>
              <table
                border="1"
                style={{ borderCollapse: "collapse", width: "100%" }}
              >
                <thead>
                  <th>Workflow Name</th>
                  <th>ID</th>
                  <th>Last Edited On</th>
                  <th>Description</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </thead>
                <tbody>
                  {filteredWorkflows.map((workflow) => (
                    <React.Fragment key={workflow.id}>
                      <tr>
                        <td
                          className={`${styles.cellPadding} ${
                            workflow.id === expandedRowId &&
                            Array.isArray(workflow.executionHistory) &&
                            styles.removeBottomBorder
                          }`}
                        >
                          {workflow.title}
                        </td>
                        <td
                          className={`${styles.cellPadding} ${
                            workflow.id === expandedRowId &&
                            Array.isArray(workflow.executionHistory) &&
                            styles.removeBottomBorder
                          }`}
                        >
                          {workflow.id}
                        </td>
                        <td
                          className={`${styles.cellPadding} ${
                            workflow.id === expandedRowId &&
                            Array.isArray(workflow.executionHistory) &&
                            styles.removeBottomBorder
                          }`}
                        >
                          {workflow.lastEdited}
                        </td>
                        <td
                          className={`${styles.descriptionCol} ${
                            styles.cellPadding
                          } ${
                            workflow.id === expandedRowId &&
                            Array.isArray(workflow.executionHistory) &&
                            styles.removeBottomBorder
                          }`}
                        >
                          {workflow.body}
                        </td>
                        <td
                          className={`${styles.btnsCellPadding} ${
                            workflow.id === expandedRowId &&
                            Array.isArray(workflow.executionHistory) &&
                            styles.removeBottomBorder
                          }`}
                        >
                          <img src={unpinned} alt="unpinned icon" />
                        </td>
                        <td
                          className={`${styles.btnsCellPadding} ${
                            workflow.id === expandedRowId &&
                            Array.isArray(workflow.executionHistory) &&
                            styles.removeBottomBorder
                          }`}
                        >
                          <button
                            className={styles.buttons}
                            onClick={() => hanleExecuteClick(workflow.id)}
                          >
                            Execute
                          </button>
                        </td>
                        <td
                          className={`${styles.btnsCellPadding} ${
                            workflow.id === expandedRowId &&
                            Array.isArray(workflow.executionHistory) &&
                            styles.removeBottomBorder
                          }`}
                        >
                          <button className={styles.buttons}>Edit</button>
                        </td>
                        <td
                          className={`${styles.btnsCellPadding} ${
                            workflow.id === expandedRowId &&
                            Array.isArray(workflow.executionHistory) &&
                            styles.removeBottomBorder
                          }`}
                        >
                          <HiDotsVertical />
                        </td>
                        <td
                          className={`${styles.btnsCellPadding} ${
                            workflow.id === expandedRowId &&
                            Array.isArray(workflow.executionHistory) &&
                            styles.removeBottomBorder
                          }`}
                          onClick={() => toggleExpand(workflow.id)}
                        >
                          {expandedRowId === workflow.id &&
                          Array.isArray(workflow.executionHistory) ? (
                            <FaArrowUp />
                          ) : (
                            <FaArrowDown />
                          )}
                        </td>
                      </tr>
                      {expandedRowId === workflow.id &&
                        Array.isArray(workflow.executionHistory) && (
                          <tr className={styles.expandedRow}>
                            <td colSpan={9}>
                              <div className={StyleSheet.timelineContainer}>
                                <div className={styles.timelineLine}>
                                  {Array.isArray(workflow.executionHistory) &&
                                    workflow.executionHistory.map(
                                      (execution, index) => (
                                        <div
                                          key={index}
                                          className={styles.timelineItem}
                                        >
                                          {/* Dot */}
                                          <div
                                            className={styles.timelineDot}
                                          ></div>

                                          {/* Content */}
                                          <div
                                            className={styles.timelineContent}
                                          >
                                            <span className={styles.dateText}>
                                              {execution.timestamp}
                                            </span>
                                            <span
                                              className={`${styles.status} ${
                                                styles[
                                                  execution.status.toLowerCase()
                                                ]
                                              }`}
                                            >
                                              {execution.status}
                                            </span>
                                            <FiExternalLink
                                              className={styles.externalLink}
                                            />
                                          </div>
                                        </div>
                                      )
                                    )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isExPopupOpen && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <div className={styles.firstContainer}>
                <div className={styles.closeBtnContainer}>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setIsExPopupOpen(false)}
                  >
                    <IoMdClose />
                  </button>
                </div>

                <div className={styles.msgs}>
                  <h3 className={styles.confMsg1}>
                    Are you sure you want to Execute the process ?
                  </h3>
                  <p className={styles.confMsg2}>You cannot Undo this step</p>
                </div>
              </div>

              <div className={styles.popupActions}>
                <button className={styles.yesBtn} onClick={handleYes}>
                  Yes
                </button>
                <button className={styles.noBtn} onClick={handleNo}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
