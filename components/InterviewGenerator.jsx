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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const InterviewGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    campus: "",
    major: "",
    role: "",
    company: "",
    jobType: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

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

    // Simulate fetching interview questions
    setTimeout(() => {
      // Mock data for interview questions
      const mockQuestions = [
        {
          question: "Can you tell us about your experience with React?",
          bestAnswer:
            'Based on your CV, you have extensive experience with React. You could answer: "In my previous role, I worked extensively with React to build dynamic and responsive user interfaces. I utilized React hooks, context API, and optimized performance using memoization techniques."',
        },
        {
          question: "How do you handle tight deadlines?",
          bestAnswer:
            'According to your CV, you have experience managing tight deadlines. A good response could be: "I prioritize tasks and break them into manageable chunks. I also communicate proactively with my team to ensure alignment and timely delivery."',
        },
      ];
      setQuestions(mockQuestions);
      setLoading(false);
    }, 3000); // Simulate 3-second delay for fetching questions
  };

  return (
    <>
      <div className="mb-4 space-y-4">
        <Input
          name="name"
          placeholder="Nama"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          name="campus"
          placeholder="Kampus"
          value={formData.campus}
          onChange={handleInputChange}
        />
        <Input
          name="major"
          placeholder="Jurusan"
          value={formData.major}
          onChange={handleInputChange}
        />
        <Input
          name="role"
          placeholder="Role yang sedang diapply"
          value={formData.role}
          onChange={handleInputChange}
        />
        <Input
          name="company"
          placeholder="Perusahaan yang sedang diapply"
          value={formData.company}
          onChange={handleInputChange}
        />
        <Select
          name="jobType"
          value={formData.jobType}
          onValueChange={(value) => handleSelect("jobType", value)}
          placeholder="Jenis Pekerjaan"
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Jenis Pekerjaan" />
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
          {loading ? "Fetching Questions..." : "Get Interview Questions"}
        </Button>
      </div>

      {questions.length > 0 && !loading && (
        <Accordion type="single" collapsible>
          {questions.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="">{item.question}</AccordionTrigger>
              <AccordionContent className="p-4 w-full">
                <p>{item.bestAnswer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
};

export default InterviewGenerator;
