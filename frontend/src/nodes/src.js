import { Select, SelectItem } from "@nextui-org/react";
import { Handle, Position } from "reactflow";

export const Src = ({ data, id }) => {
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
      console.error("onRemove is not available", { id, data });
    }
  };
  return (
    <div
      className={`px-5 py-4 w-80 border-2 bg-white flex flex-col gap-2 border-blue-600 shadow-lg rounded-lg `}
    >
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="bg-white w-3 h-3 rounded-full border-1 border-purple-500"
        style={defaultHandleStyle}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}--input`}
        style={defaultHandleStyle}
        className="bg-white w-3 h-3 rounded-full border-1 border-purple-500"
      />
      <div className="flex justify-between items-center">
          <div>
          <span className="text-blue-500 text-lg">Agent</span>
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
      <Select
        isRequired
        label="Source"
        labelPlacement="outside"
        name="country"
        placeholder="Select country"
      >
        <SelectItem key="ar">Google</SelectItem>
        <SelectItem key="us">ChatGpt</SelectItem>
        <SelectItem key="ca">Geminai</SelectItem>
        <SelectItem key="uk">Copilot</SelectItem>
        <SelectItem key="au">Bing</SelectItem>
      </Select>
    </div>
  );
};
