import React from "react";
import CVScanner from "@/components/CVScanner";

const CVScan = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CV Scan</h1>
      <CVScanner />
    </div>
  );
};

export default CVScan;
