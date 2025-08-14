import { Handle, Position } from "reactflow";
import { useState, useEffect } from "react";
import FieldRenderer from "./FieldRenderer";

export const BaseNode = ({
  id,
  label,
  data = {},
  customFields = [],
  inputHandles = [],
  outputHandles = [],
  nodeStyle = {},
  handleStyle = {},
  children,
  className = null,
}) => {
  const [nodeData, setNodeData] = useState(data);

  const defaultHandleStyle = {
    background: "#fff",
    width: "15px",
    height: "15px",
    border: "1px solid #000",
  };
  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Remove clicked for node:", id, "data:", data);

    if (data && typeof data.onRemove === "function") {
      data.onRemove(id);
    } else {
      console.error("onRemove is not available", {id, data});
    }
  };
  // Ensure default values are set when the component mounts
  useEffect(() => {
    const defaultData = {};
    customFields.forEach((field) => {
      if (!nodeData[field.name]) {
        if (field.name.includes("Name")) {
          // Default naming logic for fields like 'inputName' or 'outputName'
          defaultData[field.name] = id.replace(
            `custom${label}-`,
            `${label.toLowerCase()}_`
          );
        } else {
          defaultData[field.name] = field.default || "";
        }
      }
    });
    setNodeData((prevData) => ({ ...prevData, ...defaultData }));
  }, []);

  const handleInputChange = (fieldName, value) => {
    setNodeData({
      ...nodeData,
      [fieldName]: value,
    });
  };

  return (
    <div
      style={{
        ...nodeStyle,
      }}
      className={`px-5 py-4 w-80 border-2 bg-white flex flex-col gap-2  border-blue-900 shadow-lg rounded-lg  ${className}`}
    >
      <style>{`
        .custom-handle:hover {
          background-color: #fff !important;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='black' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 4h2v12H9zM4 9h12v2H4z'/%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important;
          background-position: center !important;
        }
      `}</style>
      <div className="flex justify-between items-center">
          <div>
          <span className="text-blue-500 text-lg">{label}</span>
        </div>
        <div>
          <button
            className="node-remove-btn"
            onClick={handleRemove}
            type="button"
            aria-label="Remove node"
          >
            ×
          </button>
        </div>
      </div>
      {children && <div>{children}</div>}
      <div className="flex flex-col gap-4">
        {customFields?.map((field, index) => (
          <FieldRenderer
            key={index}
            field={field}
            value={nodeData[field.name]}
            onChange={handleInputChange}
            label={field.label}
          />
        ))}
      </div>
      {inputHandles?.map((handle, index) => (
        <Handle
          key={`${id}-input-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{ ...handleStyle, ...handle.style, ...defaultHandleStyle }}
          className="custom-handle bg-white w-3 h-3 rounded-full border-1 border-purple-500"
        />
      ))}
      {outputHandles?.map((handle, index) => (
        <Handle
          key={`${id}-output-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id}
          className="bg-white w-3 h-3 rounded-full border-1 border-purple-500"
          style={{ ...handleStyle, ...handle.style, ...defaultHandleStyle }}
        />
      ))}
    </div>
  );
};
