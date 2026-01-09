"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, ChevronRight, ArrowLeft } from "lucide-react"

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizModuleProps {
  chapter: string
  title: string
  description: string
  questions: QuizQuestion[]
}

interface AnswerState {
  [questionId: number]: {
    selected: number | null
    answered: boolean
  }
}

export default function QuizModule({ chapter, title, description, questions }: QuizModuleProps) {
  const [answers, setAnswers] = useState<AnswerState>(
    questions.reduce((acc, q) => ({
      ...acc,
      [q.id]: { selected: null, answered: false }
    }), {})
  )
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleAnswerClick = (optionIndex: number) => {
    if (!answers[questions[currentQuestion].id].answered) {
      setAnswers(prev => ({
        ...prev,
        [questions[currentQuestion].id]: {
          selected: optionIndex,
          answered: true
        }
      }))
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowScore(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach(q => {
      if (answers[q.id].selected === q.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setShowScore(false)
    setAnswers(
      questions.reduce((acc, q) => ({
        ...acc,
        [q.id]: { selected: null, answered: false }
      }), {})
    )
  }

  if (showScore) {
    const score = calculateScore()
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <main className="min-h-screen bg-gradient-purple">
        <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <Link href="/quiz" className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </header>
        <div className="container px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="card-gradient">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-4xl mb-4">Quiz Complete!</CardTitle>
                <CardDescription className="text-white/70 text-xl">
                  {chapter} - {title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-4 ${
                    percentage >= 70 ? 'text-green-400' : percentage >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {percentage}%
                  </div>
                  <p className="text-white/80 text-xl">
                    You answered <span className="font-bold text-white">{score} out of {questions.length}</span> questions correctly.
                  </p>
                </div>

                <div className="space-y-3">
                  {questions.map((q, idx) => {
                    const isCorrect = answers[q.id].selected === q.correctAnswer
                    return (
                      <div 
                        key={q.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          isCorrect 
                            ? 'bg-green-500/10 border-green-500' 
                            : 'bg-red-500/10 border-red-500'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-white font-medium mb-2">Question {idx + 1}</p>
                            {!isCorrect && (
                              <p className="text-white/70 text-sm">
                                Your answer: <span className="text-red-400">{q.options[answers[q.id].selected!]}</span>
                              </p>
                            )}
                            <p className="text-white/70 text-sm">
                              Correct answer: <span className="text-green-400">{q.options[q.correctAnswer]}</span>
                            </p>
                            <p className="text-white/60 text-sm mt-2">{q.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Button 
                  onClick={resetQuiz}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Retake Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    )
  }

  const q = questions[currentQuestion]
  const answerState = answers[q.id]
  const isAnswered = answerState.answered
  const selectedAnswer = answerState.selected
  const isCorrect = selectedAnswer === q.correctAnswer

  return (
    <main className="min-h-screen bg-gradient-purple">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/quiz" className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>
      <div className="container px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-white">{chapter} - {title}</CardTitle>
              <CardDescription className="text-white/70">
                Question {currentQuestion + 1} of {questions.length}
              </CardDescription>
              <div className="mt-4 bg-white/10 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="text-white text-lg font-semibold mb-6">{q.question}</h3>

                <div className="space-y-3">
                  {q.options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx
                    let bgColor = "bg-white/5 hover:bg-white/10"
                    let borderColor = "border-white/20"

                    if (isAnswered) {
                      if (idx === q.correctAnswer) {
                        bgColor = "bg-green-500/20 hover:bg-green-500/20"
                        borderColor = "border-green-500"
                      } else if (isSelected) {
                        bgColor = "bg-red-500/20 hover:bg-red-500/20"
                        borderColor = "border-red-500"
                      }
                    } else if (isSelected) {
                      bgColor = "bg-purple-500/20"
                      borderColor = "border-purple-500"
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerClick(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${bgColor} ${borderColor} disabled:cursor-not-allowed`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isAnswered && idx === q.correctAnswer ? 'border-green-500 bg-green-500/30' :
                            isAnswered && isSelected ? 'border-red-500 bg-red-500/30' :
                            isSelected && !isAnswered ? 'border-purple-500 bg-purple-500/30' :
                            'border-white/40'
                          }`}>
                            {isAnswered && idx === q.correctAnswer && (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            )}
                            {isAnswered && isSelected && idx !== q.correctAnswer && (
                              <XCircle className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                          <span className="text-white font-medium">{option}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {isAnswered && (
                <div className={`p-4 rounded-lg border-l-4 ${
                  isCorrect 
                    ? 'bg-green-500/10 border-green-500' 
                    : 'bg-red-500/10 border-red-500'
                }`}>
                  <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  <p className="text-white/80 text-sm">{q.explanation}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
