"use client"
import Link from "next/link"
import { ArrowLeft, Download, FileText, BookOpen, File, ChevronRight, Linkedin, Github, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function NotesPage() {
  // State for tracking download progress
  const [downloading, setDownloading] = useState<string | null>(null)

  // For real PDF files:
const handleRealDownload = async (pdfUrl: string | undefined, fileName: string) => {
  if (!pdfUrl) {
    console.error('PDF URL not found for:', fileName);
    alert('PDF file not available for download');
    return;
  }

  setDownloading(fileName);
  try {
    const response = await fetch(pdfUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download PDF. Please try again.');
  } finally {
    setDownloading(null);
  }
}

  const pdfNotes = [
    {
      chapter: "Chapter 1",
      title: "Array & ArrayList",
      description: "Complete lecture notes on Array and ArrayList data structures",
      icon: <FileText className="h-8 w-8 text-purple-400" />,
      slides: [
        { 
          name: "Lecture 1: Arrays",
          size: "400 KB",
          fileUrl: "/pdfs/chapter-1/Topic 2 - Array.pdf"
        }
      ]
    },
    {
      chapter: "Chapter 2",
      title: "Linked List",
      description: "Comprehensive notes on Singly, Doubly, and Circular Linked Lists",
      icon: <FileText className="h-8 w-8 text-purple-400" />,
      slides: [
        { name: "Lecture 1: Linked Lists 1", size: "393 KB", fileUrl: "/pdfs/chapter-2/Topic 3 - Linked List 1.pdf" },
        { name: "Lecture 2: Linked Lists 2", size: "403 KB", fileUrl: "/pdfs/chapter-2/Topic 4 - Linked List 2" }
    ]
    },
    {
      chapter: "Chapter 3",
      title: "Stack",
      description: "Detailed notes on LIFO principle and Stack implementations",
      icon: <FileText className="h-8 w-8 text-purple-400" />,
      slides: [
        { name: "Lecture 1: Stack", size: "450 KB", fileUrl: "/pdfs/chapter-3/Topic 5 - Stack (1)" }
      ]
    },
    {
      chapter: "Chapter 4",
      title: "Queue",
      description: "Complete guide to Queue data structure and its variants",
      icon: <FileText className="h-8 w-8 text-purple-400" />,
      slides: [
        { name: "Lecture 1: Queue", size: "482 KB", fileUrl: "/pdfs/chapter-4/Topic 6 - Queue (2).pdf" }
      ]
    },
    {
      chapter: "Chapter 5",
      title: "Binary Tree",
      description: "Extensive notes on Tree data structures and traversals",
      icon: <FileText className="h-8 w-8 text-purple-400" />,
      slides: [
        { name: "Lecture 1: Tree 1", size: "522 KB", fileUrl: "/pdfs/chapter-5/Topic 8 - Tree 1.pdf" },
        { name: "Lecture 2: Tree 2", size: "690 KB", fileUrl: "/pdfs/chapter-5/Topic 9 - Tree 2.pdf" }
      ]
    },
    {
      chapter: "Chapter 6",
      title: "Sorting Algorithms",
      description: "Complete analysis of all major sorting algorithms",
      icon: <FileText className="h-8 w-8 text-purple-400" />,
      slides: [
        { name: "Lecture 1: Sorting", size: "500 KB", fileUrl: "/pdfs/chapter-6/Topic 10 - Sorting.pdf" }
      ]
    },
    {
      chapter: "Chapter 7",
      title: "Hashing",
      description: "Detailed notes on Hashing, Collision Resolution techniques",
      icon: <FileText className="h-8 w-8 text-purple-400" />,
      slides: [
        { name: "Lecture 1: Hashing", size: "470 KB", fileUrl: "/pdfs/chapter-7/Topic 12 - Hashing.pdf" }
      ]
    },
    {
      chapter: "Chapter 8",
      title: "Graph",
      description: "Comprehensive graph theory and algorithm notes",
      icon: <FileText className="h-8 w-8 text-purple-400" />,
      slides: [
        { name: "Lecture 1: Graph 1", size: "490 KB", fileUrl: "/pdfs/chapter-8/Topic 13 - Graph 1.pdf" },
        { name: "Lecture 2: Graph 2", size: "641 KB", fileUrl: "/pdfs/chapter-8/Topic 14 - Graph 2.pdf" }
      ]
    },
    {
      chapter: "Extra",
      title: "Extra Materials",
      description: "Comprehensive graph theory and algorithm notes",
      icon: <FileText className="h-8 w-8 text-purple-400" />,
      slides: [
        { name: "Lecture 1: Recursion", size: "764 KB", fileUrl: "/pdfs/extra/Topic 7 - Recursion (2).pdf" },
        { name: "Lecture 2: Searching", size: "297 KB", fileUrl: "/pdfs/extra/Topic 11 - Searching.pdf" }
      ]
    }
  ]

//   const quickNotes = [
//     {
//       title: "Complete Course Bundle",
//       description: "All lecture notes in one comprehensive PDF",
//       size: "45.2 KB",
//       icon: <BookOpen className="h-6 w-6 text-green-400" />
//     },
//     {
//       title: "Cheat Sheets",
//       description: "Quick reference for time complexities",
//       size: "8.7 KB",
//       icon: <File className="h-6 w-6 text-blue-400" />
//     },
//     {
//       title: "Exam Preparation Guide",
//       description: "Important concepts and practice problems",
//       size: "12.3 KB",
//       icon: <FileDown className="h-6 w-6 text-yellow-400" />
//     }
//   ]

  return (
    <main className="min-h-screen bg-gradient-purple">
    {/* Header */}
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Home</span>
            </Link>
            </div>
    </header>

      <div className="container px-4 py-8 sm:px-6 lg:px-8">
        {/* Main text */}
        <div className="mb-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Lecture Notes (PDF Downloads)
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Download comprehensive lecture notes for each data structure topic.<br/>
              All materials are curated from CSC508 course content.
            </p>
            <p className="text-[0.9rem] text-white/80 max-w-2xl mx-auto bg-black/20 p-3 rounded-lg">
              All materials are for CSC508 UiTM students only. Please do not distribute.
              <br/>Materials are provided by Ts. Dr. Syed Mohd Zahid, Senior Lecturer , UiTM Shah Alam
            </p>
          </div>
        </div>

        {/* Quick Downloads */}
        {/* <Card className="card-gradient-2 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Quick Downloads</CardTitle>
            <CardDescription className="text-white/70">
              Download bundled resources for faster access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {quickNotes.map((note, index) => (
                <div key={index} className="group">
                  <Card className="h-full border-white/10 bg-white/5 hover:bg-white/20 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2 bg-white/10 rounded-lg">
                          {note.icon}
                        </div>
                        <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                          {note.size}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold mb-2">{note.title}</h3>
                      <p className="text-white/70 text-sm mb-4">{note.description}</p>
                      <Button 
                        variant="outline" 
                        className="w-full border-purple-400 text-purple-300 hover:bg-purple-400/20"
                        onClick={() => handleRealDownload(note.title, "Complete Course")}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}

        {/* Chapter-wise Notes */}
        <div className="space-y-8">
          {pdfNotes.map((chapter, index) => (
            <div key={index} id={`chapter-${index + 1}`}>
              <Card className="card-gradient">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-white text-2xl">{chapter.chapter}</CardTitle>
                      <CardDescription className="text-white/70 text-lg">
                        {chapter.title}
                      </CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-green-400 text-green-300 hover:bg-green-400/20"
                      onClick={() => handleRealDownload(`${chapter.chapter} - ${chapter.title} Bundle`, chapter.title)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download All ({chapter.slides.length} PDFs)
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-6">{chapter.description}</p>
                  
                  <div className="space-y-3">
                    {chapter.slides.map((slide, slideIndex) => (
                      <div 
                        key={slideIndex} 
                        className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                      >
                        <div className="flex items-center">
                          <div className="p-2 bg-white/10 rounded-lg mr-4">
                            {chapter.icon}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{slide.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-white/60">
                              <span>•</span>
                              <span>{slide.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white/70 hover:text-white hover:bg-white/10"
                            onClick={() => handleRealDownload(slide.fileUrl, slide.name)}
                            disabled={downloading === slide.name}
                          >
                            {downloading === slide.name ? (
                              <>
                                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                                Downloading...
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </>
                            )}
                          </Button>
                          <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-white/60" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center space-y-4">
            <p className="text-[0.9rem] text-white/80 max-w-2xl mx-auto bg-black/20 p-3 rounded-lg">
            All materials are for CSC508 UiTM students only. Please do not distribute.
            <br/>Materials are provided by Ts. Dr. Syed Mohd Zahid, Senior Lecturer , UiTM Shah Alam
            </p>
        </div>
      </div>
      {/* Footer */}
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