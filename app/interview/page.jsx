import React from "react";
import InterviewGenerator from "@/components/InterviewGenerator";

const Interview = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Interview Preparation</h1>
      <InterviewGenerator />
    </div>
  );
};

export default Interview;
