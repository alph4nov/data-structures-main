"use client"

import QuizModule, { QuizQuestion } from "@/components/quiz-module"

const chapter1Questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Array access by index is O(1) because arrays provide random access. You can directly access any element using its index without iterating through other elements."
  },
  {
    id: 2,
    question: "What is the main disadvantage of an ArrayList compared to a linked list?",
    options: [
      "Slower insertion at the beginning",
      "More memory overhead",
      "Cannot store objects",
      "Cannot access elements by index"
    ],
    correctAnswer: 0,
    explanation: "ArrayList has O(n) insertion time at the beginning because all elements need to be shifted. Linked lists have O(1) insertion at the beginning."
  },
  {
    id: 3,
    question: "In a dynamic array (ArrayList), what happens when you exceed the capacity?",
    options: [
      "An exception is thrown",
      "The array is automatically resized to a larger capacity",
      "New elements are ignored",
      "The array becomes read-only"
    ],
    correctAnswer: 1,
    explanation: "Most dynamic arrays automatically resize when capacity is exceeded. Usually, the new capacity is 1.5x or 2x the old capacity. This ensures amortized O(1) insertion."
  },
  {
    id: 4,
    question: "What is the space complexity of an array with n elements?",
    options: ["O(log n)", "O(1)", "O(n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "The space complexity is O(n) because the array stores n elements in memory. Each element requires constant space, so total space is proportional to n."
  },
  {
    id: 5,
    question: "Which operation is MOST efficient in an ArrayList?",
    options: [
      "Inserting at the beginning",
      "Deleting from the middle",
      "Accessing an element at index 5",
      "Inserting at the end (with spare capacity)"
    ],
    correctAnswer: 3,
    explanation: "Appending to the end of an ArrayList is O(1) amortized when there's spare capacity. Other operations require shifting elements, making them O(n)."
  }
]

export default function Chapter1Quiz() {
  return (
    <QuizModule
      chapter="Chapter 1"
      title="Array & ArrayList"
      description="Test your understanding of arrays and array lists"
      questions={chapter1Questions}
    />
  )
}
