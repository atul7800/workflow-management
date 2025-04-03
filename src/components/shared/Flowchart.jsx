import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import "./Flowchart.css"; // Import the CSS file

export default function Flowchart() {
  const [nodes, setNodes] = useState([]);

  // Function to add a new node
  const addNode = (index) => {
    const newNodes = [...nodes];
    newNodes.splice(index + 1, 0, { id: Date.now(), type: "API Call" });
    setNodes(newNodes);
  };

  // Function to remove a node
  const removeNode = (index) => {
    const newNodes = nodes.filter((_, i) => i !== index);
    setNodes(newNodes);
  };

  return (
    <div className="flowchart-container">
      {/* Start Node */}
      <div className="node-wrapper">
        <div className="startNodeContainer">
          <div className="node start">Start</div>
        </div>
        <div className="arrow"></div> {/* Arrow */}
        <button className="plus-button" onClick={() => addNode(0)}>
          <FaPlus />
        </button>
      </div>

      {/* Dynamic Nodes */}
      {nodes.map((node, index) => (
        <div key={node.id} className="node-wrapper">
          <div className="arrow"></div> {/* Arrow */}
          <div className="node input-box">
            <textarea
              value={node.text}
              onChange={(e) => updateText(index, e.target.value)}
              placeholder="Enter text..."
              rows="1" // Initial height
              onInput={(e) => {
                e.target.style.height = "auto"; // Reset height
                e.target.style.height = e.target.scrollHeight + "px"; // Set height dynamically
              }}
            ></textarea>
            <button className="delete-button" onClick={() => removeNode(index)}>
              <FaTrash />
            </button>
          </div>
          <div className="arrow"></div> {/* Arrow */}
          <button className="plus-button" onClick={() => addNode(index)}>
            <FaPlus />
          </button>
        </div>
      ))}

      {/* End Node */}
      <div className="node-wrapper">
        <div className="arrow"></div> {/* Arrow */}
        <div className="endNodeContainer">
          <div className="node end">End</div>
        </div>
      </div>
    </div>
  );
}
