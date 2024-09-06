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
import { parseCV } from "@/lib/parseCV";
import { getParsedCV } from "@/app/actions";
import { mockParseResult } from "@/mocks/parse_result";
import InterviewDialog from "./InterviewDialog";

const InterviewGenerator = () => {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    jobType: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cvInfo, setCvInfo] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");

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

      const mockQuestions = [
        {
          question: "Tell me a little about yourself?",
          bestAnswer: `
              I am a passionate and dedicated individual with a strong background in software engineering. I have experience working on frontend and backend development, where I honed my skills in NextJS, Golang, etc. I enjoy problem-solving and thrive in dynamic environments where I can continuously learn and grow. Outside of work, I am deeply interested in reading a book, which help me maintain a balanced perspective and foster creativity in my professional life.
            `,
        },
        {
          question: "What are your greatest strengths and weaknesses?",
          bestAnswer: `
              My greatest strength is my ability to adapt to new challenges quickly and find innovative solutions to problems. I’m detail-oriented and organized, which helps me stay on top of multiple projects while maintaining high-quality results. 
          
              As for weaknesses, I sometimes tend to be overly critical of my own work, always pushing for perfection. However, I’ve been working on recognizing when good enough is sufficient and focusing on delivering results efficiently while maintaining a healthy balance between perfection and productivity.
            `,
        },
        {
          question: "Why should we hire you?",
          bestAnswer: `
              You should hire me because I bring a unique combination of skills, experience, and passion that align with the needs of your company. I am not only technically skilled in software development but also have a strong sense of collaboration and a growth mindset, which allows me to contribute positively to the team and continuously learn. I am confident that I can make meaningful contributions to your projects and help your company achieve its goals, while also growing personally and professionally.
            `,
        },
      ];
      setQuestions(mockQuestions);
      setLoading(false);
    } catch (error) {
      console.error("Error parsing CV:", error);
      setLoading(false);
    }
    // }, 5000); // Simulate 5-second delay for processing
  };

  const handleTrainClick = (question) => {
    setCurrentQuestion(question);
    setDialogOpen(true);
  };
  return (
    <>
      <div className="mb-4 space-y-4">
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
                    isOpen={dialogOpen}
                    onClose={() => setDialogOpen(false)}
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
