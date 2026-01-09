"use client"
import Link from "next/link"
import { ArrowRight, List, Network, BarChart3, Hash, AlignEndHorizontal, House, FileDown, FileQuestion, Brackets, GitBranch, AlignJustify, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-purple">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <button onClick={() => {
        const element = document.querySelector('h1');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
          }} className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors cursor-pointer">
        <House className="h-5 w-5" />
        <span>DS EZLearn</span>
          </button>
          <div className="ml-auto bg-orange-600/10 p-1 rounded-md">
          <Link href="/quiz">
            <Button variant="outline" className="gap-1">
              <FileQuestion className="h-4 w-4" />
              Quiz Mode
            </Button>
          </Link>
          </div>
          <div className="ml-5">
          <Link href="/slides-508">
            <Button variant="outline" className="gap-2">
              <FileDown className="h-4 w-4" />
              Download Lecture Notes
            </Button>
          </Link>
          </div>
        </div>
      </header>
      <div className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center space-y-4">
            <h1 className="text-[5rem] font-bold tracking-tight text-white-500" style={{ WebkitTextStroke: '1px rgb(5, 46, 22)' }}>
              DS EZLearn
            </h1>
            <h2 className="text-4xl font-regular tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Data Structure Visualizer
            </h2>
            <p className="text-lg text-white/80">
              Enhance data structures learning with the help of interactive visualisations and step-by-step tutorials
            </p>
          </div>

          <div className="mt-12">
            <Card className="card-gradient-2">
              <CardHeader>
                <CardTitle className="text-[1.8rem] text-white text-center">Data Structure Visualizations</CardTitle>
                <CardDescription className="text-white/70 text-center">
                  Jump to your desired topic!
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    {
                      title: "Array & ArrayList",
                      description: "Visualize operations on Array and ArrayList",
                      // This item has onClick (for scrolling) but NO href
                      onClick: () => {
                        const element = document.getElementById('chapter-1');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      },
                      icon: <Brackets className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Linked List",
                      description: "Visualize operations on a singly linked list",
                      onClick: () => {
                        const element = document.getElementById('chapter-2');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      },
                      icon: <List className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Stack",
                      description: "Explore LIFO data structure operations",
                      onClick: () => {
                        const element = document.getElementById('chapter-3');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      },
                      icon: <BarChart3 className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Queue",
                      description: "Understand FIFO data structure operations",
                      onClick: () => {
                        const element = document.getElementById('chapter-4');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      },
                      icon: <AlignJustify className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Binary Tree",
                      description: "Explore hierarchical data structure operations",
                      onClick: () => {
                        const element = document.getElementById('chapter-5');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      },
                      icon: <GitBranch className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Sorting",
                      description: "Visualize mutliple type of sort operations",
                      onClick: () => {
                        const element = document.getElementById('chapter-6');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      },
                      icon: <AlignEndHorizontal className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Hash Table",
                      description: "Visualize key-value storage with hashing",
                      onClick: () => {
                        const element = document.getElementById('chapter-7');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      },
                      icon: <Hash className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Graph",
                      description: "Visualize nodes and edges with traversals",
                      onClick: () => {
                        const element = document.getElementById('chapter-8');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      },
                      icon: <Network className="h-10 w-10 text-purple-400" />,
                    },
                  ].map((item, index) => {
                    // 1. Define the Card Visuals (Reuse this for both Link and Div)
                    const cardContent = (
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/20 transition-colors cursor-pointer">
                        <CardHeader className="pb-2">
                          <div className="mb-2">{item.icon}</div>
                          <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 text-sm">{item.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Jump to topic
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    );

                    // 2. Scroll Button (onClick)?
                    if (item.onClick) {
                      return (
                        <div key={index} onClick={item.onClick} className="group">
                          {cardContent}
                        </div>
                      );
                    }
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12" id="chapter-1">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Chapter 1</CardTitle>
                <CardDescription className="text-white/70">
                  Array & ArrayList
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    {
                      title: "Array & ArrayList",
                      description: "Visualize operations on Array and ArrayList",
                      href: "/array",
                      icon: <Brackets className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Introduction to ArrayList",
                      description: "Learn what Array and ArrayList are",
                      href: "/tutorials/arrayList/introduction",
                    },
                    {
                      title: "Add Operations",
                      description: "Learn the logic to do add operation using ArrayList",
                      href: "/tutorials/arrayList/add-operation",
                    },
                    {
                      title: "Remove Operations",
                      description: "Learn the logic to do remove operation using ArrayList",
                      href: "/tutorials/arrayList/remove-operation",
                    },
                    {
                      title: "Search Operations",
                      description: "Learn how to do search operation using ArrayList",
                      href: "/tutorials/arrayList/search-operation",
                    },
                    {
                      title: "Applications of ArrayList",
                      description: "Explore the real-world uses of ArrayList",
                      href: "/tutorials/arrayList/applications",
                    },
                  ].map((item, index) => (
                    <Link key={index} href={item.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/20 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="mb-2">{item.icon}</div>
                          <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 text-sm">{item.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Explore
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12" id="chapter-2">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Chapter 2</CardTitle>
                <CardDescription className="text-white/70">
                  Linked List
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    {
                      title: "Linked List",
                      description: "Visualize operations on a singly linked list",
                      href: "/linked-list",
                      icon: <List className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Introduction to Linked Lists",
                      description: "Learn what linked lists are and why they're useful",
                      href: "/tutorials/introduction",
                    },
                    {
                      title: "Creating Nodes",
                      description: "Understand the building blocks of linked lists",
                      href: "/tutorials/creating-nodes",
                    },
                    {
                      title: "Insertion Operations",
                      description: "Add elements at the beginning, end, or specific positions",
                      href: "/tutorials/insertion",
                    },
                    {
                      title: "Deletion Operations",
                      description: "Remove elements from different positions in the list",
                      href: "/tutorials/deletion",
                    },
                    {
                      title: "Searching Operations",
                      description: "Find elements in a linked list efficiently",
                      href: "/tutorials/searching",
                    },
                    {
                      title: "Traversal Operations",
                      description: "Navigate through all elements in a linked list",
                      href: "/tutorials/traversal",
                    },
                    {
                      title: "Applications of Linked Lists",
                      description: "Explore real-world uses of linked list data structures",
                      href: "/tutorials/applications",
                    },
                  ].map((item, index) => (
                    <Link key={index} href={item.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/20 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="mb-2">{item.icon}</div>
                          <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 text-sm">{item.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Explore
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12" id="chapter-3">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Chapter 3</CardTitle>
                <CardDescription className="text-white/70">
                  Stack
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    {
                      title: "Stack",
                      description: "Explore LIFO data structure operations",
                      href: "/stack",
                      icon: <BarChart3 className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Introduction to Stacks",
                      description: "Learn what stacks are and the LIFO principle",
                      href: "/tutorials/stack/introduction",
                    },
                    {
                      title: "Push Operation",
                      description: "Master push, pop, and peek operations",
                      href: "/tutorials/stack/push-operation",
                    },
                    {
                      title: "Pop Operation",
                      description: "Implement stacks using arrays and linked lists",
                      href: "/tutorials/stack/pop-operation",
                    },
                    {
                      title: "Peek Operation",
                      description: "Explore real-world uses of stack data structures",
                      href: "/tutorials/stack/peek-operation",
                    },
                    {
                      title: "Aplication of Stacks",
                      description: "Solve problems using stacks and backtracking",
                      href: "/tutorials/stack/applications",
                    },
                  ].map((item, index) => (
                    <Link key={index} href={item.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/20 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="mb-2">{item.icon}</div>
                          <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 text-sm">{item.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Explore
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12" id="chapter-4">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Chapter 4</CardTitle>
                <CardDescription className="text-white/70">
                  Queue
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    {
                      title: "Queue",
                      description: "Understand FIFO data structure operations",
                      href: "/queue",
                      icon: <AlignJustify className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Introduction to Queues",
                      description: "Learn what queues are and the FIFO principle",
                      href: "/tutorials/queue/introduction",
                    },
                    {
                      title: "Enqueue Operation",
                      description: "Add elements to the end of the queue",
                      href: "/tutorials/queue/enqueue-operation",
                    },
                    {
                      title: "Dequeue Operation",
                      description: "Remove elements from the front of the queue",
                      href: "/tutorials/queue/dequeue-operation",
                    },
                    {
                      title: "Peek Operation",
                      description: "View the front element without removing it",
                      href: "/tutorials/queue/peek-operation",
                    },
                    {
                      title: "Applications of Queues",
                      description: "Explore real-world uses of queue data structures",
                      href: "/tutorials/queue/applications",
                    },
                  ].map((item, index) => (
                    <Link key={index} href={item.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/20 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="mb-2">{item.icon}</div>
                          <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 text-sm">{item.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Explore
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12" id="chapter-5">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Chapter 5</CardTitle>
                <CardDescription className="text-white/70">
                  Binary Tree
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    {
                      title: "Binary Tree",
                      description: "Explore hierarchical data structure operations",
                      href: "/binary-tree",
                      icon: <GitBranch className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Introduction to Binary Trees",
                      description: "Learn what binary trees are and how they work",
                      href: "/tutorials/binary-tree/introduction",
                    },
                    {
                      title: "Insert Operation",
                      description: "Add nodes to a binary search tree",
                      href: "/tutorials/binary-tree/insert-operation",
                    },
                    {
                      title: "Search Operation",
                      description: "Find values in a binary search tree efficiently",
                      href: "/tutorials/binary-tree/search-operation",
                    },
                    {
                      title: "Delete Operation",
                      description: "Remove nodes from a binary search tree",
                      href: "/tutorials/binary-tree/delete-operation",
                    },
                    {
                      title: "Traversal Operation",
                      description: "Explore different ways to visit all nodes in a tree",
                      href: "/tutorials/binary-tree/traversal-operation",
                    },
                    {
                      title: "Applications of Binary Trees",
                      description: "Explore real-world uses of binary tree data structures",
                      href: "/tutorials/binary-tree/applications",
                    },
                  ].map((item, index) => (
                    <Link key={index} href={item.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/20 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="mb-2">{item.icon}</div>
                          <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 text-sm">{item.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Explore
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12" id="chapter-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Chapter 6</CardTitle>
                <CardDescription className="text-white/70">
                  Sorting
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    {
                      title: "Sorting",
                      description: "Visualize mutliple type of sort operations",
                      href: "/sorting",
                      icon: <AlignEndHorizontal className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Introduction to Sorting",
                      description: "Learn what sorting algorithms are and why they're important",
                      href: "/tutorials/sorting/introduction",
                    },
                    {
                      title: "Selection Sort",
                      description: "Explore how selection sort algorithm works",
                      href: "/tutorials/sorting/selection-sort",
                    },
                    {
                      title: "Insertion Sort",
                      description: "Explore how insertion sort algorithm works",
                      href: "/tutorials/sorting/insertion-sort",
                    },
                    {
                      title: "Heap Sort",
                      description: "Explore how heap sort algorithm works",
                      href: "/tutorials/sorting/heap-sort",
                    },
                    {
                      title: "Merge Sort",
                      description: "Explore how merge sort algorithm works",
                      href: "/tutorials/sorting/merge-sort",
                    },
                    {
                      title: "Applications of Sorting",
                      description: "Discover real-world applications of sorting algorithms",
                      href: "/tutorials/sorting/applications",
                    },
                  ].map((item, index) => (
                    <Link key={index} href={item.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/20 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="mb-2">{item.icon}</div>
                          <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 text-sm">{item.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Explore
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12" id="chapter-7">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Chapter 7</CardTitle>
                <CardDescription className="text-white/70">
                  Hashing
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    {
                      title: "Hash Table",
                      description: "Visualize key-value storage with hashing",
                      href: "/hash-table",
                      icon: <Hash className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Introduction to Hash Tables",
                      description: "Learn what hash tables are and how they work",
                      href: "/tutorials/hash-table/introduction",
                    },
                    {
                      title: "Insert Operation",
                      description: "Add key-value pairs to a hash table",
                      href: "/tutorials/hash-table/insert-operation",
                    },
                    {
                      title: "Delete Operation",
                      description: "Remove entries from a hash table",
                      href: "/tutorials/hash-table/delete-operation",
                    },
                    {
                      title: "Search Operation",
                      description: "Look up values in a hash table efficiently",
                      href: "/tutorials/hash-table/search-operation",
                    },
                    {
                      title: "Applications of Hash Tables",
                      description: "Explore real-world uses of hash table data structures",
                      href: "/tutorials/hash-table/applications",
                    },
                  ].map((item, index) => (
                    <Link key={index} href={item.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/20 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="mb-2">{item.icon}</div>
                          <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 text-sm">{item.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Explore
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12" id="chapter-8">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-white">Chapter 8</CardTitle>
                <CardDescription className="text-white/70">
                  Graph
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    {
                      title: "Graph",
                      description: "Visualize nodes and edges with traversals",
                      href: "/graph",
                      icon: <Network className="h-10 w-10 text-purple-400" />,
                    },
                    {
                      title: "Introduction to Graph",
                      description: "Visualize nodes and edges with traversals",
                      href: "/tutorials/graphs/introduction",
                    },
                    {
                      title: "Graph Representations",
                      description: "Visualize nodes and edges with traversals",
                      href: "/tutorials/graphs/graph-representation",
                    },
                    {
                      title: "DFS",
                      description: "Visualize nodes and edges with traversals",
                      href: "/tutorials/graphs/depth-first-search",
                    },
                    {
                      title: "BFS",
                      description: "Visualize nodes and edges with traversals",
                      href: "/tutorials/graphs/breadth-first-search",
                    },
                    {
                      title: "Shortest Path Algorithms",
                      description: "Visualize nodes and edges with traversals",
                      href: "/turorials/graphs/shortest-path-algorithms",
                    },
                    {
                      title: "Graph Applications",
                      description: "Visualize nodes and edges with traversals",
                      href: "/turorials/graphs/applications",
                    },
                  ].map((item, index) => (
                    <Link key={index} href={item.href} className="group">
                      <Card className="h-full border-white/10 bg-white/5 hover:bg-white/20 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="mb-2">{item.icon}</div>
                          <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 text-sm">{item.description}</p>
                          <div className="mt-4 flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
                            Explore
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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
