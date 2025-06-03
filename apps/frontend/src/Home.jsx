import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { highlight } from "prismjs";
import "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";
import { toast } from "react-toastify";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

const Home = () => {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);


  const URL = "https://backend-k8ra.onrender.com/ai/get-review";

  async function get_review() {
    try {
          setLoading(true);

      const response = await axios.post(
        URL,
        { code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        setResponse(response.data);
        toast.success("Review Generated Successfully");
      } else {
        toast.error("Error in generating response");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("An error occurred while generating the review");
    } finally {
    setLoading(false);
  }
  }

  return (
    <div className="h-screen w-screen flex">
      {/* Left Panel */}
      <div className="w-1/2 h-full bg-white border-r-4 border-slate-600 relative overflow-auto p-4">
        <motion.button
          onClick={get_review}
          className="absolute top-6 right-6 bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Review
        </motion.button>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) =>
            highlight(code, Prism.languages.javascript, "javascript")
          }
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 15,
            backgroundColor: "#2c2c2c",
            borderRadius: "0.5rem",
            marginTop: "4rem",
          }}
        />
      </div>

      {/* Right Panel */}
     <div className="w-1/2 h-full p-5 bg-slate-300 text-slate-900 overflow-auto ">
  {loading ? (
    <div className="loader"></div>
  ) : (
    <Markdown rehypePlugins={[rehypeHighlight]}>{response}</Markdown>
  )}
</div>

    </div>
  );
};

export default Home;
