import { BaseNode } from "../components/BaseNode";

export const InputNode = (props) => {
  const { id, data } = props;

  const customFields = [
    { label: "Name", name: "inputName", type: "text" },
    {
      label: "Type",
      name: "inputType",
      type: "select",
      options: ["Text", "File"],
      default: "Text",
    },
  ];

  const inputHandles = [];
  const outputHandles = [{ id: `${id}-output` }];

  return (
    <BaseNode
      id={id}
      label="Input"
      data={data}
      customFields={customFields}
      inputHandles={inputHandles}
      outputHandles={outputHandles}
    />
  );
};
