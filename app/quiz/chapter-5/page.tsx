"use client"

import QuizModule, { QuizQuestion } from "@/components/quiz-module"

const chapter5Questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a binary tree?",
    options: [
      "A tree where each node has at most two children",
      "A tree where nodes contain binary (0 and 1) values",
      "A tree with exactly two levels",
      "A tree that can only store even numbers"
    ],
    correctAnswer: 0,
    explanation: "A binary tree is a tree where each node has at most two children, called the left child and right child."
  },
  {
    id: 2,
    question: "What is the height of a binary tree?",
    options: [
      "The number of nodes in the tree",
      "The maximum distance from the root to any leaf",
      "The number of leaf nodes",
      "The total number of edges"
    ],
    correctAnswer: 1,
    explanation: "Height is the longest path from the root to a leaf node. A tree with just a root has height 0."
  },
  {
    id: 3,
    question: "Which traversal method visits nodes in left-root-right order?",
    options: [
      "Preorder",
      "Inorder",
      "Postorder",
      "Level-order"
    ],
    correctAnswer: 1,
    explanation: "Inorder traversal visits nodes in Left-Root-Right order. For a binary search tree, this gives nodes in sorted order."
  },
  {
    id: 4,
    question: "In a binary search tree, where are values greater than the root stored?",
    options: [
      "In the left subtree",
      "In the right subtree",
      "In the root node",
      "They are not stored"
    ],
    correctAnswer: 1,
    explanation: "In a binary search tree, all values greater than a node are in its right subtree. Values less are in the left subtree."
  },
  {
    id: 5,
    question: "What is the time complexity of searching in a balanced binary search tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 1,
    explanation: "In a balanced BST, each level eliminates half the remaining elements, giving O(log n) search time. An unbalanced tree can degrade to O(n)."
  },
  {
    id: 6,
    question: "What does an AVL tree maintain?",
    options: [
      "All nodes contain the same value",
      "A balance factor between left and right subtrees",
      "Perfect binary structure",
      "No duplicate values"
    ],
    correctAnswer: 1,
    explanation: "An AVL tree maintains a balance factor (difference in heights) of at most 1 between left and right subtrees, ensuring O(log n) operations."
  },
  {
    id: 7,
    question: "In postorder traversal, when is the root visited?",
    options: [
      "Before visiting any children",
      "After visiting all children",
      "Between left and right children",
      "During the last iteration"
    ],
    correctAnswer: 1,
    explanation: "Postorder is Left-Right-Root: children are visited before the root. This is useful for deleting trees or computing expression values."
  }
]

export default function Chapter5Quiz() {
  return (
    <QuizModule
      chapter="Chapter 5"
      title="Binary Tree"
      description="Test knowledge of tree structures and traversals"
      questions={chapter5Questions}
    />
  )
}
