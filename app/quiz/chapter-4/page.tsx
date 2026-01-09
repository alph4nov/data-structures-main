"use client"

import QuizModule, { QuizQuestion } from "@/components/quiz-module"

const chapter4Questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does FIFO stand for?",
    options: [
      "First In, First Out",
      "First In, Fully Out",
      "Forward In, First Out",
      "Far Input, Forward Output"
    ],
    correctAnswer: 0,
    explanation: "FIFO means First In, First Out. The first element added to the queue is the first one to be removed."
  },
  {
    id: 2,
    question: "What are the two primary operations of a queue?",
    options: [
      "Push and Pop",
      "Enqueue and Dequeue",
      "Insert and Remove",
      "Add and Delete"
    ],
    correctAnswer: 1,
    explanation: "Enqueue adds an element to the rear of the queue, and Dequeue removes from the front. Push/Pop are for stacks."
  },
  {
    id: 3,
    question: "What is the time complexity of enqueue and dequeue in a standard queue?",
    options: ["O(log n)", "O(n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Both enqueue and dequeue are O(1) operations when implemented correctly (with proper front and rear pointers)."
  },
  {
    id: 4,
    question: "What is a circular queue?",
    options: [
      "A queue arranged in a circular memory pattern",
      "A queue where the rear pointer wraps around to the front when it reaches the end",
      "A queue that only contains circular data",
      "A queue implemented with doubly linked lists"
    ],
    correctAnswer: 1,
    explanation: "A circular queue reuses empty spaces created by dequeued elements. When the rear reaches the end, it wraps to the beginning."
  },
  {
    id: 5,
    question: "Which scenario best uses a queue data structure?",
    options: [
      "Undo/Redo functionality",
      "Print job scheduling",
      "Function call stack",
      "Balanced parentheses checking"
    ],
    correctAnswer: 1,
    explanation: "Print jobs are processed in order (first job submitted is printed first). Undo/Redo uses stacks, and balanced parentheses checking also uses stacks."
  }
]

export default function Chapter4Quiz() {
  return (
    <QuizModule
      chapter="Chapter 4"
      title="Queue"
      description="Learn FIFO principle and queue variants"
      questions={chapter4Questions}
    />
  )
}
