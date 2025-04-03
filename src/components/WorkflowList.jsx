import React, { useContext, useEffect } from 'react'
import {Context} from "../context/Context"
import { fetchWorkFlows } from "../workFlow/useWorkFlow"
import styles from "./styles/WorkflowList.module.css"
import menu from "../assets/menu.png"
import pinned from "../assets/pinned.png";
import unpinned from "../assets/unpinned.png";
import { CiSearch } from "react-icons/ci";

export default function WorkflowList() {
    const {workFlowList, setWorkFlowList} = useContext(Context)

    useEffect(() => {
        (async() => {
            const workFlows = await fetchWorkFlows();
            console.log("WORKFLOWS data : ", workFlows);
            setWorkFlowList(workFlows);
        })();
    }, [])

    return (
        <>
        <div className={styles.mainContainer}>
            <div className={styles.menu}>
                <img className={styles.menuIcon} src={menu} alt="Menu" />
            </div>
            <div className={styles.container}>
                <div className={styles.titleSearchAndCreate}>
                    <h2 className={styles.title}>Workflow Builder</h2>
                    <div className={styles.searchAndCreate}>
                        <div className={styles.searchBarContainer}>
                            <input type="text" placeholder="Search By Workflow Name/ID" className={styles.searchInput}/>
                            <button className={styles.searchButton}>
                                <CiSearch className={styles.searchIcon}/>
                            </button>
                        </div>
                        <button className={styles.createBtn}>
                            <span className={styles.plus}>+</span>Create New Process
                        </button>
                    </div>
                </div>
                <div className={styles.listContainer}>
                    <div className={styles.workFlowsTable}>
                        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
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
                                {
                                
                                    workFlowList.map((workflow) => (
                                        <React.Fragment key={workflow.id}>
                                            <tr>
                                                <td className={styles.cellPadding}>{workflow.title}</td>
                                                <td className={styles.cellPadding}>#{workflow.id}</td>
                                                <td className={styles.cellPadding}>03/04/25</td>
                                                <td className={`${styles.descriptionCol} ${styles.cellPadding}`}>{workflow.body}</td>
                                                <td className={styles.btnsCellPadding}>
                                                    <img src={pinned} alt="pinned icon" />
                                                </td>
                                                <td className={styles.btnsCellPadding}><button className={styles.buttons}>Execute</button></td>
                                                <td className={styles.btnsCellPadding}><button className={styles.buttons}>Edit</button></td>
                                                <td className={styles.btnsCellPadding}>Menu</td>
                                                <td className={styles.btnsCellPadding}>Expand</td>
                                            </tr>
                                        </React.Fragment>
                                    ))
                                
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
            

        </>
    )
}
