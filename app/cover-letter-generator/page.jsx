import CoverLetterGenerator from "@/components/CoverLetterGenerator";
import React from "react";

const CoverLetter = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cover Letter Generator</h1>
      <CoverLetterGenerator />
    </div>
  );
};

export default CoverLetter;
