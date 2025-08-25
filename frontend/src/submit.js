import { Bounce, Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import Alert from "./Alert.js"
export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );
  const [ci, setCi]=useState(0);
  const [co, setCo]=useState(0);
  const handleCount=()=>{
    let countInput=0, countOutput=0;
    nodes.map((node, index)=>{
      if(node.type==="customInput")
      {
        countInput++;
      }
      if(node.type==="customOutput")
      {
        countOutput++;
      }
    })
    setCi(countInput);
    setCo(countOutput);
  }
  const [isOpen, setisOpen]=useState(false);
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/pipelines/parse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nodes, edges }),
        }
      );

      const result = await response.json();

      toast.success(
        <div className="flex flex-col p-1 text-base gap-1">
          <span>
            <b>Nodes:</b> {result.num_nodes}
          </span>
          <span>
            <b>Edges: </b>
            {result.num_edges}
          </span>
          <span>
            <b>Is DAG: </b>
            {result.is_dag ? "Yes" : "No"}
          </span>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );
    } catch (error) {
      console.error("Error submitting the pipeline:", error);
      toast.error("Submission failed! Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex items-center justify-center fixed bottom-10 left-0 right-0">
      <Button onClick={handleSubmit} color="primary" size="lg" type="submit">
        Submit
      </Button>
      <Button className="mx-2" onClick={()=>{
        handleCount();
        setisOpen(!isOpen);
      }} color="primary" size="lg" type="submit">
        Count
      </Button>
      {isOpen && <Alert co={co} ci={ci}/>}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};
