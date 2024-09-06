import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { stringSimilarity } from "string-similarity-js";

const InterviewDialog = ({ question, bestAnswer }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    setUserAnswer((prev) => prev + (prev.length ? ". " : "") + transcript);
  };

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setUserAnswer("");
      setScore(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);
      setRecorder(newRecorder);

      newRecorder.ondataavailable = (event) => {
        setAudioUrl(URL.createObjectURL(event.data));
      };

      newRecorder.start();
      setIsRecording(true);
      recognition.start(); // Start speech recognition
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      recognition.stop(); // Stop speech recognition
      setIsRecording(false);
      // Evaluate the user's answer against the best answer
      evaluateAnswer(userAnswer);
    }
  };

  const evaluateAnswer = (userAnswer) => {
    // Calculate similarity score
    const similarity = stringSimilarity(
      userAnswer.toLowerCase(),
      bestAnswer.toLowerCase()
    );
    // Convert similarity to a score out of 100
    const score = Math.floor(similarity * 100);
    setScore(score);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">Train</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Question</DialogTitle>
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
