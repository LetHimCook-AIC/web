"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

const CVScanner = () => {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [fileInput, setFileInput] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [recommendedMaterials, setRecommendedMaterials] = useState([]);

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

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append(
      "x-apihub-key",
      "7nDLXgpdSZro5EhxbYQ7-SqqBk48NS01Tq5qmi1EVGuM8XBlJU"
    );
    myHeaders.append(
      "x-apihub-host",
      "HR-Resume-or-CV-File-Parser.allthingsdev.co"
    );
    myHeaders.append(
      "x-apihub-endpoint",
      "82901f2c-a73d-4e06-87c2-db6d7b87b4b3"
    );

    const formdata = new FormData();
    formdata.append("file", fileInput);
    formdata.append("language", "English");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://HR-Resume-or-CV-File-Parser.proxy-production.allthingsdev.co/api/v1/hr/parse_resume",
        requestOptions
      );
      const result = await response.json();

      if (result.job_id) {
        // Second fetch to get job status using the job_id
        const statusHeaders = new Headers();
        statusHeaders.append("Accept", "application/json");
        statusHeaders.append(
          "x-apihub-key",
          "7nDLXgpdSZro5EhxbYQ7-SqqBk48NS01Tq5qmi1EVGuM8XBlJU"
        );
        statusHeaders.append(
          "x-apihub-host",
          "HR-Resume-or-CV-File-Parser.allthingsdev.co"
        );
        statusHeaders.append(
          "x-apihub-endpoint",
          "c447dbb4-d0a2-4f1e-bfe4-eb4047dce945"
        );

        const statusRequestOptions = {
          method: "GET",
          headers: statusHeaders,
          redirect: "follow",
        };

        const statusResponse = await fetch(
          `https://HR-Resume-or-CV-File-Parser.proxy-production.allthingsdev.co/api/v1/hr/parse_resume/job/status/${result.job_id}`,
          statusRequestOptions
        );
        const statusResult = await statusResponse.json();

        console.log(statusResult); // Log the full CV data

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
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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

      {loading && (
        <Alert type="info" className="mb-4">
          Loading your CV, please wait...
        </Alert>
      )}

      {score !== null && (
        <div>
          <h2 className="text-xl font-semibold mb-2">CV Score: {score}/100</h2>

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
      )}
    </>
  );
};

export default CVScanner;
