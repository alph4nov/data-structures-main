"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const quizzes = [
  {
    chapter: "Chapter 1",
    title: "Array & ArrayList",
    description: "Test your understanding of arrays and array lists",
    slug: "chapter-1",
    difficulty: "Beginner",
    questions: 5
  },
  {
    chapter: "Chapter 2",
    title: "Linked List",
    description: "Understand singly, doubly, and circular linked lists",
    slug: "chapter-2",
    difficulty: "Intermediate",
    questions: 6
  },
  {
    chapter: "Chapter 3",
    title: "Stack",
    description: "Master LIFO principle and stack operations",
    slug: "chapter-3",
    difficulty: "Beginner",
    questions: 5
  },
  {
    chapter: "Chapter 4",
    title: "Queue",
    description: "Learn FIFO principle and queue variants",
    slug: "chapter-4",
    difficulty: "Beginner",
    questions: 5
  },
  {
    chapter: "Chapter 5",
    title: "Binary Tree",
    description: "Test knowledge of tree structures and traversals",
    slug: "chapter-5",
    difficulty: "Intermediate",
    questions: 7
  },
  {
    chapter: "Chapter 6",
    title: "Sorting Algorithms",
    description: "Understand different sorting techniques",
    slug: "chapter-6",
    difficulty: "Intermediate",
    questions: 6
  },
  {
    chapter: "Chapter 7",
    title: "Hashing",
    description: "Learn hash functions and collision resolution",
    slug: "chapter-7",
    difficulty: "Intermediate",
    questions: 6
  },
  {
    chapter: "Chapter 8",
    title: "Graph",
    description: "Master graph theory and algorithms",
    slug: "chapter-8",
    difficulty: "Advanced",
    questions: 7
  }
]

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gradient-purple">
        <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Home</span>
                </Link>
            </div>
        </header>

      <div className="container px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Quiz Mode
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Test your understanding of data structures with interactive quizzes for each chapter.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {quizzes.map((quiz) => (
            <Link key={quiz.slug} href={`/quiz/${quiz.slug}`}>
              <Card className="card-gradient h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white">{quiz.chapter}</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        {quiz.title}
                      </CardDescription>
                    </div>
                    <BookOpen className="h-6 w-6 text-purple-400 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-sm mb-4">{quiz.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 text-xs">
                      <span className={`px-2 py-1 rounded-full ${
                        quiz.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                        quiz.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {quiz.difficulty}
                      </span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                        {quiz.questions} Questions
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
       <footer className="border-t border-white/10 py-6 bg-black/20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-sm text-white/60">
              DS EZLearn - Data Structure learning easy - alphanov | Based on the open-source project by Pau Aranega Bellido
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/paudefclasspy/data-structures"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-purple-400 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">GitHub (original)</span>
              </a>
              <a
                href="https://github.com/alph4nov/data-structures-main"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-purple-400 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">GitHub (this version)</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
