"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockParseResult } from "@/mocks/parse_result";

const CoverLetterGenerator = () => {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    jobType: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cvInfo, setCvInfo] = useState(null);
  const [coverLetter, setCoverLetter] = useState(""); // State for the generated cover letter

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelect = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
  };

  const handleSubmit = async () => {
    if (!cvFile || !formData.role || !formData.company || !formData.jobType)
      return;

    setLoading(true);

    // setTimeout(() => {
    try {
      const jobId = await parseCV(cvFile);
      if (jobId) {
        const parsedCV = await getParsedCV(jobId);
        if (parsedCV.data.attributes.status === "success") {
          setCvInfo(parsedCV.data);
        } else {
          setCvInfo(mockParseResult);
        }
      }

      // Simulate the generation of a cover letter based on the inputs
      const generatedLetter = generateCoverLetter(formData, mockParseResult);
      setCoverLetter(generatedLetter);

      setLoading(false);
    } catch (error) {
      console.error("Error parsing CV:", error);
      setLoading(false);
    }
    // }, 5000); // Simulate 5-second delay for processing
  };

  const generateCoverLetter = (formData, cvInfo) => {
    const { role, company, jobType } = formData;
    const {
      candidate_name: name,
      education_qualifications: educations,
      skills,
    } = cvInfo.attributes.result;
    console.log(name);
    return `
Dear Hiring Manager at ${company},

I am writing to express my interest in the ${role} position at ${company}. With my background in ${
      educations && educations[0].specialization_subjects.length > 0
        ? educations[0].specialization_subjects
        : role
    } and strong skills in ${
      skills ? skills.join(", ") : "this field"
    }, I am confident that my qualifications align with the requirements for the ${jobType} role.

I have gained valuable experience through various projects and internships. I am particularly excited about this opportunity at ${company} because of its innovative approach in the ${role} field.

I would love the opportunity to contribute my expertise and join your team at ${company}. Thank you for considering my application. I look forward to discussing my qualifications in more detail.

Sincerely,
${name ? name : "[Your Name]"}
    `;
  };

  return (
    <>
      <div className="mb-4 space-y-4">
        <Input
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleInputChange}
        />
        <Input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleInputChange}
        />
        <Select
          name="jobType"
          value={formData.jobType}
          onValueChange={(value) => handleSelect("jobType", value)}
          placeholder="Job Type"
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Intern">Intern</SelectItem>
            <SelectItem value="Full Time">Full Time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
        />
        <Button onClick={handleSubmit} className="w-full">
          {loading ? "Generating Cover Letter..." : "Generate Cover Letter"}
        </Button>
      </div>

      {coverLetter && (
        <div className="mt-6">
          <h3 className="font-bold text-lg">Generated Cover Letter:</h3>
          <pre className="mt-2 p-4 border border-gray-300 bg-gray-100 whitespace-pre-wrap">
            {coverLetter}
          </pre>
        </div>
      )}
    </>
  );
};

export default CoverLetterGenerator;
