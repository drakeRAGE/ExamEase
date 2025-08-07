import { createContext, useState } from 'react';

export const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [examStartTime, setExamStartTime] = useState(null);
  const [examEndTime, setExamEndTime] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startExam = (questionsList) => {
    setQuestions(questionsList);
    setCurrentQuestionIndex(0);
    setAnswers(new Array(questionsList.length).fill(null));
    
    const startTime = Date.now();
    const endTime = startTime + 30 * 60 * 1000; // 30 minutes in milliseconds
    
    setExamStartTime(startTime);
    setExamEndTime(endTime);
    setTimeRemaining(1800); // 30 minutes in seconds
  };

  const answerQuestion = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetExam = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimeRemaining(1800);
    setExamStartTime(null);
    setExamEndTime(null);
    setSubmissionId(null);
  };

  const value = {
    questions,
    currentQuestionIndex,
    answers,
    timeRemaining,
    examStartTime,
    examEndTime,
    submissionId,
    loading,
    error,
    startExam,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    setTimeRemaining,
    setSubmissionId,
    setLoading,
    setError,
    resetExam,
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};