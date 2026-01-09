"use client"

import QuizModule, { QuizQuestion } from "@/components/quiz-module"

const chapter8Questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a graph?",
    options: [
      "A tree with no parent nodes",
      "A data structure with vertices and edges connecting them",
      "A sorted list of numbers",
      "A circular data structure"
    ],
    correctAnswer: 1,
    explanation: "A graph consists of vertices (nodes) and edges connecting pairs of vertices. It can be directed or undirected, cyclic or acyclic."
  },
  {
    id: 2,
    question: "What is the difference between a directed and undirected graph?",
    options: [
      "Directed graphs are always acyclic",
      "Undirected graphs use less memory",
      "Directed edges point in a specific direction; undirected edges go both ways",
      "Directed graphs always have cycles"
    ],
    correctAnswer: 2,
    explanation: "In a directed graph, edges have a direction (A→B is different from B→A). In undirected graphs, edges are bidirectional."
  },
  {
    id: 3,
    question: "What is the time complexity of DFS (Depth-First Search)?",
    options: ["O(1)", "O(log n)", "O(V + E)", "O(V²)"],
    correctAnswer: 2,
    explanation: "DFS visits each vertex once and each edge once, so time complexity is O(V + E) where V is vertices and E is edges."
  },
  {
    id: 4,
    question: "When should BFS (Breadth-First Search) be used?",
    options: [
      "To find all cycles in a graph",
      "To find the shortest path in an unweighted graph",
      "To count total vertices",
      "To detect disconnected components"
    ],
    correctAnswer: 1,
    explanation: "BFS explores level by level, making it ideal for finding shortest paths in unweighted graphs. DFS is better for cycle detection."
  },
  {
    id: 5,
    question: "What data structure is typically used to implement BFS?",
    options: ["Stack", "Priority Queue", "Queue", "Linked List"],
    correctAnswer: 2,
    explanation: "BFS uses a queue to explore vertices in FIFO order. DFS uses a stack, which is why it's sometimes called DFS."
  },
  {
    id: 6,
    question: "What is a minimum spanning tree?",
    options: [
      "The shortest path between two vertices",
      "A tree connecting all vertices with minimum total edge weight",
      "A tree with the fewest vertices",
      "The densest subgraph"
    ],
    correctAnswer: 1,
    explanation: "A minimum spanning tree connects all vertices with minimum total edge weight. Kruskal's and Prim's algorithms compute it."
  },
  {
    id: 7,
    question: "Which algorithm finds the shortest path in a weighted graph?",
    options: [
      "BFS",
      "DFS",
      "Dijkstra's Algorithm",
      "Prim's Algorithm"
    ],
    correctAnswer: 2,
    explanation: "Dijkstra's algorithm finds the shortest path from a source vertex to all others in a weighted graph with non-negative weights."
  }
]

export default function Chapter8Quiz() {
  return (
    <QuizModule
      chapter="Chapter 8"
      title="Graph"
      description="Master graph theory and algorithms"
      questions={chapter8Questions}
    />
  )
}
