"use client"

import QuizModule, { QuizQuestion } from "@/components/quiz-module"

const chapter2Questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main advantage of a linked list over an array?",
    options: [
      "Faster access to elements by index",
      "O(1) insertion and deletion at any known position",
      "Lower memory usage",
      "Better cache performance"
    ],
    correctAnswer: 1,
    explanation: "If you have a reference to a node, linked lists allow O(1) insertion/deletion. Arrays require O(n) because elements need to be shifted."
  },
  {
    id: 2,
    question: "What is the time complexity of searching for an element in a singly linked list?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "You must traverse from the head node through each node sequentially. In the worst case, the element is at the end or doesn't exist, requiring O(n) time."
  },
  {
    id: 3,
    question: "In a doubly linked list, what extra information does each node store compared to a singly linked list?",
    options: [
      "The data value",
      "A pointer to the previous node",
      "A pointer to the next node",
      "The position in the list"
    ],
    correctAnswer: 1,
    explanation: "Each node in a doubly linked list has two pointers: one to the next node and one to the previous node. This allows traversal in both directions."
  },
  {
    id: 4,
    question: "What is a circular linked list?",
    options: [
      "A linked list where all nodes have the same data",
      "A linked list where the last node points back to the first node",
      "A linked list arranged in a circular memory location",
      "A linked list that can only be traversed in circles"
    ],
    correctAnswer: 1,
    explanation: "In a circular linked list, the last node's next pointer points to the first node instead of being null. This creates a circular structure."
  },
  {
    id: 5,
    question: "What is the space complexity of a linked list with n nodes?",
    options: ["O(1)", "O(log n)", "O(n)", "O(2n)"],
    correctAnswer: 2,
    explanation: "Each of n nodes stores data plus pointer(s), so total space is O(n). While each node uses slightly more space than an array element, the asymptotic complexity is still O(n)."
  },
  {
    id: 6,
    question: "Which operation is inefficient in a linked list?",
    options: [
      "Inserting at the beginning with a reference",
      "Deleting a node with a reference",
      "Accessing the kth element",
      "Searching for a specific value"
    ],
    correctAnswer: 2,
    explanation: "Accessing the kth element requires traversing k nodes from the beginning, making it O(k). Arrays can access any element in O(1) with its index."
  }
]

export default function Chapter2Quiz() {
  return (
    <QuizModule
      chapter="Chapter 2"
      title="Linked List"
      description="Understand singly, doubly, and circular linked lists"
      questions={chapter2Questions}
    />
  )
}
