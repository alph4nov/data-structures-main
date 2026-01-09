"use client"

import QuizModule, { QuizQuestion } from "@/components/quiz-module"

const chapter6Questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which sorting algorithm has the best average time complexity?",
    options: [
      "Bubble Sort - O(n²)",
      "Quick Sort - O(n log n)",
      "Selection Sort - O(n²)",
      "Insertion Sort - O(n²)"
    ],
    correctAnswer: 1,
    explanation: "Quick Sort has O(n log n) average time complexity. However, its worst case is O(n²) when pivot selection is poor."
  },
  {
    id: 2,
    question: "What is the advantage of Merge Sort over Quick Sort?",
    options: [
      "Merge Sort is faster",
      "Merge Sort has guaranteed O(n log n) worst case",
      "Merge Sort uses less space",
      "Merge Sort doesn't need recursion"
    ],
    correctAnswer: 1,
    explanation: "Merge Sort guarantees O(n log n) in all cases. Quick Sort is usually faster in practice but has O(n²) worst case."
  },
  {
    id: 3,
    question: "Which sorting algorithm works well for nearly sorted data?",
    options: [
      "Bubble Sort",
      "Insertion Sort",
      "Merge Sort",
      "Quick Sort"
    ],
    correctAnswer: 1,
    explanation: "Insertion Sort is O(n) for nearly sorted data because it only needs a few shifts. Other algorithms don't take advantage of existing order."
  },
  {
    id: 4,
    question: "What does 'stable' mean in sorting?",
    options: [
      "The algorithm doesn't modify the original array",
      "Equal elements maintain their relative order",
      "The algorithm uses constant space",
      "The time complexity doesn't vary"
    ],
    correctAnswer: 1,
    explanation: "A stable sort preserves the relative order of equal elements. Merge Sort is stable; Quick Sort is not."
  },
  {
    id: 5,
    question: "What is the space complexity of Bubble Sort?",
    options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
    correctAnswer: 3,
    explanation: "Bubble Sort only needs a constant amount of extra space for variables. It sorts in-place without needing additional data structures."
  },
  {
    id: 6,
    question: "Which algorithm uses the 'divide and conquer' approach?",
    options: [
      "Bubble Sort and Insertion Sort",
      "Merge Sort and Quick Sort",
      "Selection Sort and Bubble Sort",
      "Insertion Sort and Merge Sort"
    ],
    correctAnswer: 1,
    explanation: "Merge Sort and Quick Sort divide the problem into smaller subproblems, solve them recursively, then combine results."
  }
]

export default function Chapter6Quiz() {
  return (
    <QuizModule
      chapter="Chapter 6"
      title="Sorting Algorithms"
      description="Understand different sorting techniques"
      questions={chapter6Questions}
    />
  )
}
