"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { parseCV } from "@/lib/parseCV";
import { getParsedCV } from "@/app/actions";
import { mockParseResult } from "@/mocks/parse_result";

const CVScanner = () => {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [fileInput, setFileInput] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [recommendedMaterials, setRecommendedMaterials] = useState([]);
  const [cvInfo, setCvInfo] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setScore(null);
      setJobs([]);
      setFileInput(file);
      setMissingSkills([]);
      setRecommendedMaterials([]);
    }
  };

  const handleSubmit = async () => {
    if (!fileInput) return;

    setLoading(true);
    setTimeout(() => {
      try {
        // const jobId = await parseCV(cvFile);
        // if (jobId) {
        //   const parsedCV = await getParsedCV(jobId);
        //   if (parsedCV.data.attributes.status === "success") {
        //     setCvInfo(parsedCV.data);
        //   } else {
        //     setCvInfo(mockParseResult);
        //   }
        // }
        setCvInfo(mockParseResult);

        // Process the response to extract the score and other information
        const generatedScore = Math.floor(Math.random() * 11) + 70;
        setScore(generatedScore);

        // Mock job suggestions
        const suggestedJobs = [
          "Software Engineer",
          "Data Scientist",
          "Product Manager",
        ];
        setJobs(suggestedJobs);

        // Mock missing skills
        const mockMissingSkills = {
          "Software Engineer": ["React", "Node.js"],
          "Data Scientist": ["Python", "Machine Learning"],
          "Product Manager": ["Project Management", "Agile Methodologies"],
        };
        setMissingSkills(mockMissingSkills);

        // Mock recommended materials based on missing skills
        const mockRecommendedMaterials = {
          React: "React for Beginners - Udemy",
          "Node.js": "Node.js: The Complete Guide - Udemy",
          Python: "Learn Python the Hard Way",
          "Machine Learning": "Machine Learning Crash Course by Google",
          "Project Management": "Project Management Fundamentals",
          "Agile Methodologies": "Agile for Beginners - Coursera",
        };
        setRecommendedMaterials(mockRecommendedMaterials);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }, 5000); // Simulate 5-second delay for processing
  };
  return (
    <>
      <div className="mb-4">
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          disabled={loading}
          className="mb-2"
        />
        <Button asChild disabled={loading} className="w-full">
          <button onClick={handleSubmit}>
            {loading ? "Processing..." : "Upload Your CV"}
          </button>
        </Button>
      </div>

      {loading ? (
        <Alert type="info" className="mb-4">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>Loading your CV, please wait...</AlertDescription>
        </Alert>
      ) : (
        score !== null && (
          <div>
            <h2 className="text-xl font-semibold mb-2">
              CV Score: {score}/100
            </h2>

            <h3 className="text-lg font-medium mb-2">Job Suggestions:</h3>
            <ul className="list-disc pl-5 mb-4">
              {jobs.map((job) => (
                <li key={job} className="mb-1">
                  {job}
                </li>
              ))}
            </ul>

            {jobs.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Missing Skills:</h3>
                <ul className="list-disc pl-5 mb-4">
                  {jobs.map((job) => (
                    <li key={job} className="mb-1">
                      <strong>{job}:</strong> {missingSkills[job].join(", ")}
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-medium mb-2">
                  Recommended Learning Materials:
                </h3>
                <ul className="list-disc pl-5">
                  {jobs.flatMap((job) =>
                    missingSkills[job].map((skill) => (
                      <li key={skill} className="mb-1">
                        <strong>{skill}:</strong> {recommendedMaterials[skill]}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        )
      )}
    </>
  );
};

export default CVScanner;
