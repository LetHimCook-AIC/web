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
import { getInterviewQuestions, parseCV } from "@/lib/api";
import { getParsedCV } from "@/app/actions";
import InterviewDialog from "./InterviewDialog";
import { mockParseResult } from "@/mocks/data";

const InterviewGenerator = () => {
  const [formData, setFormData] = useState({
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

    // setTimeout(() => {
    try {
      let questions = [];
      const jobId = await parseCV(cvFile);
      if (jobId) {
        const parsedCV = await getParsedCV(jobId);
        if (parsedCV && parsedCV.success) {
          questions = await getInterviewQuestions({
            cv_data: JSON.stringify(mockParseResult.attributes.result),
          });
        } else {
          if (parsedCV.data?.attributes.status === "success") {
            questions = await getInterviewQuestions({
              cv_data: JSON.stringify(parsedCV.data.attributes.result),
            });
          } else {
            questions = await getInterviewQuestions({
              cv_data: JSON.stringify(mockParseResult.attributes.result),
            });
          }
        }
      }

      setQuestions(questions);
      setLoading(false);
    } catch (error) {
      console.error("Error parsing CV:", error);
      setLoading(false);
    }
    // }, 5000); // Simulate 5-second delay for processing
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
                <div className="flex gap-2 items-center mt-4">
                  <Button
                    onClick={() => {
                      const speech = new SpeechSynthesisUtterance(
                        item.bestAnswer
                      );
                      window.speechSynthesis.speak(speech);
                    }}
                    className="text-left"
                  >
                    Listen 🔊
                  </Button>
                  <InterviewDialog
                    question={item.question}
                    bestAnswer={item.bestAnswer}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
};

export default InterviewGenerator;
