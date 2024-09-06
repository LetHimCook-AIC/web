import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const InterviewDialog = ({ question, isOpen, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(null);

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);
      setRecorder(newRecorder);

      newRecorder.ondataavailable = (event) => {
        setAudioUrl(URL.createObjectURL(event.data));
      };

      newRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      const simulatedAnswer = "This is a sample recorded answer.";
      setUserAnswer(simulatedAnswer);
      simulateScoring(simulatedAnswer);
      setIsRecording(false);
    }
  };

  const simulateScoring = (answer) => {
    // Mock scoring logic (Replace with actual scoring algorithm)
    const score = Math.floor(Math.random() * 100);
    setScore(score);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">Train</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <button
            onClick={() => {
              const speech = new SpeechSynthesisUtterance(question);
              window.speechSynthesis.speak(speech);
            }}
            className="text-left"
          >
            {question} 🔊
          </button>
        </DialogHeader>

        <Button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Recording..." : "Click to Speak"}
        </Button>
        <div className="flex justify-center">
          {audioUrl && <audio controls src={audioUrl}></audio>}
        </div>
        {userAnswer && (
          <div className="">
            <p>Your Answer: {userAnswer}</p>
            {score !== null && <p>Score: {score}/100</p>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InterviewDialog;
