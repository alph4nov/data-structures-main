"use client"

import QuizModule, { QuizQuestion } from "@/components/quiz-module"

const chapter3Questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does LIFO stand for in the context of a stack?",
    options: [
      "List In, First Out",
      "Last In, First Out",
      "Low Input, Fast Output",
      "Linear In, Forward Out"
    ],
    correctAnswer: 1,
    explanation: "LIFO means Last In, First Out. The last element added to the stack is the first one to be removed."
  },
  {
    id: 2,
    question: "What are the two primary operations of a stack?",
    options: [
      "Add and Remove",
      "Insert and Delete",
      "Push and Pop",
      "Enqueue and Dequeue"
    ],
    correctAnswer: 2,
    explanation: "Push adds an element to the top of the stack, and Pop removes and returns the top element. Enqueue/Dequeue are for queues."
  },
  {
    id: 3,
    question: "What is the time complexity of push and pop operations in a stack?",
    options: ["O(log n)", "O(n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Both push and pop are O(1) operations. They only involve adding or removing from the top of the stack, which takes constant time."
  },
  {
    id: 4,
    question: "Which of the following is a real-world application of stacks?",
    options: [
      "Browser history (back button)",
      "Print queue management",
      "Traffic flow in roundabouts",
      "Customer service queue"
    ],
    correctAnswer: 0,
    explanation: "Browser back button uses a stack: the last visited page is the first one you go back to. Other options use queues or different data structures."
  },
  {
    id: 5,
    question: "What happens when you try to pop from an empty stack?",
    options: [
      "Returns 0",
      "Returns null",
      "Stack overflow exception",
      "Stack underflow exception"
    ],
    correctAnswer: 3,
    explanation: "Popping from an empty stack causes a stack underflow exception. Stack overflow occurs when you push too many elements beyond capacity."
  }
]

export default function Chapter3Quiz() {
  return (
    <QuizModule
      chapter="Chapter 3"
      title="Stack"
      description="Master LIFO principle and stack operations"
      questions={chapter3Questions}
    />
  )
}
