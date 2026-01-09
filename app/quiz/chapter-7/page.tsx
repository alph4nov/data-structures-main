"use client"

import QuizModule, { QuizQuestion } from "@/components/quiz-module"

const chapter7Questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary purpose of a hash function?",
    options: [
      "To encrypt sensitive data",
      "To convert a key into an array index",
      "To sort data efficiently",
      "To balance binary trees"
    ],
    correctAnswer: 1,
    explanation: "A hash function takes an input (key) and produces an array index. This enables O(1) average lookup in hash tables."
  },
  {
    id: 2,
    question: "What is a hash collision?",
    options: [
      "When two keys hash to different indices",
      "When two different keys hash to the same index",
      "When the hash table is full",
      "When the hash function crashes"
    ],
    correctAnswer: 1,
    explanation: "A collision occurs when different keys produce the same hash value. Handling collisions is crucial for hash table performance."
  },
  {
    id: 3,
    question: "Which collision resolution technique uses pointers to handle collisions?",
    options: [
      "Linear Probing",
      "Quadratic Probing",
      "Chaining",
      "Double Hashing"
    ],
    correctAnswer: 2,
    explanation: "Chaining maintains a linked list at each array index for all keys hashing to that position. Other techniques search for alternative positions."
  },
  {
    id: 4,
    question: "What is the average time complexity of a hash table lookup?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 0,
    explanation: "With a good hash function and low load factor, hash table operations average O(1). Worst case (all collisions) is O(n)."
  },
  {
    id: 5,
    question: "What is the load factor in a hash table?",
    options: [
      "The number of empty slots",
      "The ratio of number of entries to hash table size",
      "The maximum chain length",
      "The number of collisions"
    ],
    correctAnswer: 1,
    explanation: "Load factor = (number of entries) / (table size). A low load factor (typically < 0.75) reduces collisions and maintains O(1) performance."
  },
  {
    id: 6,
    question: "When should a hash table be resized?",
    options: [
      "When it reaches 50% capacity",
      "When load factor exceeds a threshold (typically 0.75)",
      "When the first collision occurs",
      "It should never be resized"
    ],
    correctAnswer: 1,
    explanation: "When load factor exceeds a threshold, the table should be rehashed with a larger size to maintain O(1) performance and reduce collisions."
  }
]

export default function Chapter7Quiz() {
  return (
    <QuizModule
      chapter="Chapter 7"
      title="Hashing"
      description="Learn hash functions and collision resolution"
      questions={chapter7Questions}
    />
  )
}
