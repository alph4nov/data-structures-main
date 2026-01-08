"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link" // Added import for navigation
import { ArrowLeft, ChevronRight, Info, Plus, Trash, BookOpen, Code, Linkedin, Github, Edit, Search } from "lucide-react"

// Simplified components (inline definitions)
interface ButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "destructive"
  size?: "default" | "sm"
  disabled?: boolean
  onClick?: () => void
}

const Button = ({ children, className = "", variant = "default", size = "default", disabled = false, onClick }: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none"
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-white/20 bg-white/5 hover:bg-white/10 text-white",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  }
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 text-sm"
  }
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "" }: any) => (
  <div className={`rounded-lg border border-white/10 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children }: any) => <div className="flex flex-col space-y-1.5 p-6">{children}</div>
const CardTitle = ({ children, className = "" }: any) => <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
const CardDescription = ({ children, className = "" }: any) => <p className={`text-sm ${className}`}>{children}</p>
const CardContent = ({ children, className = "" }: any) => <div className={`p-6 pt-0 ${className}`}>{children}</div>

const Input = ({ className = "", ...props }: any) => (
  <input
    className={`flex h-10 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Tabs = ({ children, defaultValue, className = "" }: any) => {
  const [activeTab, setActiveTab] = useState(defaultValue)
  return (
    <div className={className} data-active-tab={activeTab}>
      {children}
    </div>
  )
}

const TabsList = ({ children, className = "" }: any) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-white/5 p-1 text-white/70 ${className}`}>
    {children}
  </div>
)

const TabsTrigger = ({ children, value, className = "" }: any) => {
  const parent = document.querySelector(`[data-active-tab]`)
  const activeTab = parent?.getAttribute('data-active-tab')
  const isActive = activeTab === value
  
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
        isActive ? 'bg-purple-600 text-white shadow-sm' : 'hover:bg-white/10'
      } ${className}`}
      onClick={() => {
        const parent = document.querySelector(`[data-active-tab]`)
        if (parent) parent.setAttribute('data-active-tab', value)
        // Force re-render
        window.dispatchEvent(new Event('tabchange'))
      }}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ children, value, className = "" }: any) => {
  const [activeTab, setActiveTab] = useState('')
  
  useEffect(() => {
    const parent = document.querySelector(`[data-active-tab]`)
    const currentTab = parent?.getAttribute('data-active-tab')
    setActiveTab(currentTab || '')
    
    const handleTabChange = () => {
      const newTab = parent?.getAttribute('data-active-tab')
      setActiveTab(newTab || '')
    }
    
    window.addEventListener('tabchange', handleTabChange)
    return () => window.removeEventListener('tabchange', handleTabChange)
  }, [])
  
  if (activeTab !== value) return null
  
  return <div className={`mt-2 ${className}`}>{children}</div>
}

const Select = ({ children, value, onValueChange, disabled = false }: any) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      disabled={disabled}
      className="flex h-10 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
    >
      {children}
    </select>
  )
}

const SelectTrigger = ({ children }: any) => <>{children}</>
const SelectValue = ({ placeholder }: any) => <option value="">{placeholder}</option>
const SelectContent = ({ children }: any) => <>{children}</>
const SelectItem = ({ children, value }: any) => <option value={value}>{children}</option>

// Code Block Component with syntax highlighting
const CodeBlock = ({ code, language = "typescript", highlightLines = [], className = "" }: any) => {
  const lines = code.split('\n')
  
  return (
    <pre className={`text-sm p-4 overflow-auto ${className}`}>
      <code>
        {lines.map((line: string, index: number) => (
          <div
            key={index}
            className={`${highlightLines.includes(index + 1) ? 'bg-purple-500/30 border-l-2 border-purple-400 pl-2 -ml-2' : ''}`}
          >
            <span className="text-white/40 select-none mr-4">{index + 1}</span>
            <span className="text-green-300">{line}</span>
          </div>
        ))}
      </code>
    </pre>
  )
}

// Array class implementation
class DynamicArray {
  private items: (number | null)[]
  private capacity: number
  private size: number

  constructor(initialCapacity = 4) {
    this.capacity = initialCapacity
    this.size = 0
    this.items = new Array(this.capacity).fill(null)
  }

  // Insert at end
  push(value: number) {
    if (this.size === this.capacity) {
      this.resize()
    }
    this.items[this.size] = value
    this.size++
    return this
  }

  // Insert at specific index
  insertAt(index: number, value: number) {
    if (index < 0 || index > this.size) return this
    
    if (this.size === this.capacity) {
      this.resize()
    }

    // Shift elements to the right
    for (let i = this.size; i > index; i--) {
      this.items[i] = this.items[i - 1]
    }

    this.items[index] = value
    this.size++
    return this
  }

  // Delete at specific index
  deleteAt(index: number) {
    if (index < 0 || index >= this.size) return this

    // Shift elements to the left
    for (let i = index; i < this.size - 1; i++) {
      this.items[i] = this.items[i + 1]
    }

    this.items[this.size - 1] = null
    this.size--
    return this
  }

  // Pop from end
  pop() {
    if (this.size > 0) {
      this.items[this.size - 1] = null
      this.size--
    }
    return this
  }

  // Update value at index
  update(index: number, value: number) {
    if (index >= 0 && index < this.size) {
      this.items[index] = value
    }
    return this
  }

  // Search for value
  search(value: number) {
    for (let i = 0; i < this.size; i++) {
      if (this.items[i] === value) {
        return i
      }
    }
    return -1
  }

  // Resize array (double capacity)
  private resize() {
    this.capacity *= 2
    const newItems = new Array(this.capacity).fill(null)
    for (let i = 0; i < this.size; i++) {
      newItems[i] = this.items[i]
    }
    this.items = newItems
  }

  // Get array representation
  toArray() {
    return this.items.slice(0, this.size)
  }

  // Get full array with empty slots
  getFullArray() {
    return this.items
  }

  // Get size and capacity
  getSize() {
    return this.size
  }

  getCapacity() {
    return this.capacity
  }
}

export default function ArrayVisualizerPage() {
  const [array] = useState(new DynamicArray(6))
  const [arrayData, setArrayData] = useState<(number | null)[]>([])
  const [fullArray, setFullArray] = useState<(number | null)[]>([])
  const [value, setValue] = useState("")
  const [index, setIndex] = useState("0")
  const [searchValue, setSearchValue] = useState("")
  const [searchResult, setSearchResult] = useState<number | null>(null)
  const [animationStep, setAnimationStep] = useState(0)
  const [animationIndex, setAnimationIndex] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [operationDescription, setOperationDescription] = useState("")
  const [activeOperation, setActiveOperation] = useState<string | null>(null)
  const [highlightedLines, setHighlightedLines] = useState<number[]>([])
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Code highlighting ranges
  const codeHighlightRanges = {
    push: [2, 3, 4, 5, 6, 7],
    insertAt: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    deleteAt: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    pop: [37, 38, 39, 40, 41],
    update: [44, 45, 46, 47],
    search: [50, 51, 52, 53, 54, 55, 56],
    resize: [59, 60, 61, 62, 63, 64, 65]
  }

  const baseCode = `class DynamicArray {
  private items: number[]
  private capacity: number
  private size: number

  constructor(initialCapacity = 4) {
    this.capacity = initialCapacity
    this.size = 0
    this.items = new Array(this.capacity).fill(null)
  }

  // Methods will be shown when an operation is selected
}`

  const operationCodeSnippets = {
    push: `  // Insert at end
  push(value: number) {
    if (this.size === this.capacity) {
      this.resize()
    }
    this.items[this.size] = value
    this.size++
    return this
  }`,
    insertAt: `  // Insert at specific index
  insertAt(index: number, value: number) {
    if (index < 0 || index > this.size) return this
    
    if (this.size === this.capacity) {
      this.resize()
    }

    // Shift elements to the right
    for (let i = this.size; i > index; i--) {
      this.items[i] = this.items[i - 1]
    }

    this.items[index] = value
    this.size++
    return this
  }`,
    deleteAt: `  // Delete at specific index
  deleteAt(index: number) {
    if (index < 0 || index >= this.size) return this

    // Shift elements to the left
    for (let i = index; i < this.size - 1; i++) {
      this.items[i] = this.items[i + 1]
    }

    this.items[this.size - 1] = null
    this.size--
    return this
  }`,
    pop: `  // Pop from end
  pop() {
    if (this.size > 0) {
      this.items[this.size - 1] = null
      this.size--
    }
    return this
  }`,
    update: `  // Update value at index
  update(index: number, value: number) {
    if (index >= 0 && index < this.size) {
      this.items[index] = value
    }
    return this
  }`,
    search: `  // Search for value
  search(value: number) {
    for (let i = 0; i < this.size; i++) {
      if (this.items[i] === value) {
        return i
      }
    }
    return -1
  }`,
    resize: `  // Resize array (double capacity)
  private resize() {
    this.capacity *= 2
    const newItems = new Array(this.capacity).fill(null)
    for (let i = 0; i < this.size; i++) {
      newItems[i] = this.items[i]
    }
    this.items = newItems
  }`
  }

  const [displayedCode, setDisplayedCode] = useState(baseCode)

  const updateArrayData = () => {
    setArrayData(array.toArray())
    setFullArray(array.getFullArray())
  }

  const clearAnimation = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }
    setAnimationStep(0)
    setAnimationIndex(null)
    setIsAnimating(false)
  }

  const handlePush = () => {
    if (!value || isNaN(Number(value))) return

    const numValue = Number(value)
    clearAnimation()
    setIsAnimating(true)
    setOperationDescription(`Pushing ${numValue} to the end of array`)
    setActiveOperation("push")
    setHighlightedLines(codeHighlightRanges.push)
    setDisplayedCode(baseCode.replace("  // Methods will be shown when an operation is selected", operationCodeSnippets.push))

    setAnimationIndex(array.getSize())
    setAnimationStep(1)

    animationTimeoutRef.current = setTimeout(() => {
      array.push(numValue)
      updateArrayData()
      setAnimationStep(2)

      animationTimeoutRef.current = setTimeout(() => {
        clearAnimation()
        setValue("")
      }, 1000)
    }, 1000)
  }

  const handleInsertAt = () => {
    if (!value || isNaN(Number(value)) || !index || isNaN(Number(index))) return

    const numValue = Number(value)
    const numIndex = Number(index)

    if (numIndex < 0 || numIndex > array.getSize()) {
      alert("Invalid index")
      return
    }

    clearAnimation()
    setIsAnimating(true)
    setOperationDescription(`Inserting ${numValue} at index ${numIndex}`)
    setActiveOperation("insertAt")
    setHighlightedLines(codeHighlightRanges.insertAt)
    setDisplayedCode(baseCode.replace("  // Methods will be shown when an operation is selected", operationCodeSnippets.insertAt))

    setAnimationIndex(numIndex)
    setAnimationStep(1)

    animationTimeoutRef.current = setTimeout(() => {
      array.insertAt(numIndex, numValue)
      updateArrayData()
      setAnimationStep(2)

      animationTimeoutRef.current = setTimeout(() => {
        clearAnimation()
        setValue("")
      }, 1000)
    }, 1000)
  }

  const handleDeleteAt = () => {
    if (!index || isNaN(Number(index))) return

    const numIndex = Number(index)

    if (numIndex < 0 || numIndex >= array.getSize()) {
      alert("Invalid index")
      return
    }

    clearAnimation()
    setIsAnimating(true)
    setOperationDescription(`Deleting element at index ${numIndex}`)
    setActiveOperation("deleteAt")
    setHighlightedLines(codeHighlightRanges.deleteAt)
    setDisplayedCode(baseCode.replace("  // Methods will be shown when an operation is selected", operationCodeSnippets.deleteAt))

    setAnimationIndex(numIndex)
    setAnimationStep(1)

    animationTimeoutRef.current = setTimeout(() => {
      array.deleteAt(numIndex)
      updateArrayData()
      setAnimationStep(2)

      animationTimeoutRef.current = setTimeout(() => {
        clearAnimation()
        setIndex("0")
      }, 1000)
    }, 1000)
  }

  const handlePop = () => {
    if (array.getSize() === 0) return

    clearAnimation()
    setIsAnimating(true)
    setOperationDescription("Popping element from the end")
    setActiveOperation("pop")
    setHighlightedLines(codeHighlightRanges.pop)
    setDisplayedCode(baseCode.replace("  // Methods will be shown when an operation is selected", operationCodeSnippets.pop))

    setAnimationIndex(array.getSize() - 1)
    setAnimationStep(1)

    animationTimeoutRef.current = setTimeout(() => {
      array.pop()
      updateArrayData()
      setAnimationStep(2)

      animationTimeoutRef.current = setTimeout(() => {
        clearAnimation()
      }, 1000)
    }, 1000)
  }

  const handleUpdate = () => {
    if (!value || isNaN(Number(value)) || !index || isNaN(Number(index))) return

    const numValue = Number(value)
    const numIndex = Number(index)

    if (numIndex < 0 || numIndex >= array.getSize()) {
      alert("Invalid index")
      return
    }

    clearAnimation()
    setIsAnimating(true)
    setOperationDescription(`Updating index ${numIndex} to ${numValue}`)
    setActiveOperation("update")
    setHighlightedLines(codeHighlightRanges.update)
    setDisplayedCode(baseCode.replace("  // Methods will be shown when an operation is selected", operationCodeSnippets.update))

    setAnimationIndex(numIndex)
    setAnimationStep(1)

    animationTimeoutRef.current = setTimeout(() => {
      array.update(numIndex, numValue)
      updateArrayData()
      setAnimationStep(2)

      animationTimeoutRef.current = setTimeout(() => {
        clearAnimation()
        setValue("")
      }, 1000)
    }, 1000)
  }

  const handleSearch = () => {
    if (!searchValue || isNaN(Number(searchValue))) return

    const numValue = Number(searchValue)
    const position = array.search(numValue)

    clearAnimation()
    setIsAnimating(true)
    setOperationDescription(`Searching for value ${numValue}`)
    setActiveOperation("search")
    setHighlightedLines(codeHighlightRanges.search)
    setDisplayedCode(baseCode.replace("  // Methods will be shown when an operation is selected", operationCodeSnippets.search))

    setAnimationStep(1)

    let currentPos = 0
    const animateSearch = () => {
      if (currentPos > position && position !== -1) {
        setAnimationIndex(position)
        setSearchResult(position)
        setAnimationStep(2)

        animationTimeoutRef.current = setTimeout(() => {
          clearAnimation()
        }, 1000)
        return
      }

      if (currentPos >= array.getSize()) {
        setSearchResult(-1)
        setAnimationStep(3)

        animationTimeoutRef.current = setTimeout(() => {
          clearAnimation()
        }, 1000)
        return
      }

      setAnimationIndex(currentPos)
      currentPos++
      animationTimeoutRef.current = setTimeout(animateSearch, 500)
    }

    animateSearch()
  }

  useEffect(() => {
    if (!isAnimating) {
      setHighlightedLines([])
      if (!activeOperation) {
        setDisplayedCode(baseCode)
      }
    }
  }, [isAnimating, activeOperation])

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (arrayData.length === 0) {
      array.push(10)
      array.push(20)
      array.push(30)
      updateArrayData()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <header className="border-b border-white/10 bg-black/20">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white hover:text-purple-400 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="ml-auto">
            <Link href="/tutorials/introduction">
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Tutorial Mode
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Array & ArrayList Visualization
                </h1>
                <p className="mt-2 text-lg text-white/80">
                  Visualize dynamic array operations and understand capacity management
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-white">Array Visualization</CardTitle>
                      <CardDescription className="text-white/70">
                        Size: {array.getSize()} | Capacity: {array.getCapacity()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative min-h-[200px] flex items-center justify-center p-4">
                        {arrayData.length === 0 ? (
                          <div className="text-center text-white/60">
                            <p>The array is empty</p>
                            <p className="text-sm">Use the controls to add elements</p>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2 justify-center">
                            {fullArray.map((val, idx) => (
                              <div key={idx} className="flex flex-col items-center gap-1">
                                <div className="text-xs text-white/50 font-mono">{idx}</div>
                                <div
                                  className={`
                                    w-16 h-16 flex items-center justify-center border-2 rounded-lg font-mono text-lg
                                    transition-all duration-300
                                    ${val === null ? 'border-white/20 bg-white/5 text-white/30' : 'border-purple-400 bg-purple-500/20 text-white'}
                                    ${animationIndex === idx && animationStep === 1 ? 'ring-4 ring-yellow-400 scale-110' : ''}
                                    ${animationIndex === idx && animationStep === 2 ? 'ring-4 ring-green-400 scale-110' : ''}
                                  `}
                                >
                                  {val ?? '—'}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {isAnimating && (
                        <div className="mt-4 p-3 bg-purple-900/30 border border-purple-500/50 rounded-md">
                          <p className="font-medium text-white">{operationDescription}</p>
                          <p className="text-sm text-white/70 mt-1">
                            {animationStep === 1 && "Processing operation..."}
                            {animationStep === 2 && "Operation completed successfully"}
                            {animationStep === 3 && "Value not found in the array"}
                          </p>
                        </div>
                      )}

                      {searchResult !== null && !isAnimating && (
                        <div className={`mt-4 p-3 rounded-md ${searchResult >= 0 ? 'bg-green-900/50 border border-green-500 text-white' : 'bg-red-900/50 border border-red-500 text-white'}`}>
                          <p className="font-medium">
                            {searchResult >= 0 ? `Value found at index ${searchResult}` : "Value not found in the array"}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-white flex items-center">
                          <Code className="mr-2 h-5 w-5" />
                          Implementation Code
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          {activeOperation ? `Highlighting: ${activeOperation}` : "Select an operation to view implementation"}
                        </CardDescription>
                      </div>
                      {activeOperation && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setActiveOperation(null)
                            setHighlightedLines([])
                            setDisplayedCode(baseCode)
                          }}
                        >
                          Reset View
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black/50 rounded-md overflow-hidden border border-white/10">
                        <CodeBlock
                          code={displayedCode}
                          language="typescript"
                          highlightLines={highlightedLines}
                          className="max-h-[400px] overflow-auto"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-white">Operations</CardTitle>
                      <CardDescription className="text-white/70">Perform array operations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="insert" className="w-full">
                        <TabsList className="w-full grid grid-cols-4">
                          <TabsTrigger value="insert">Insert</TabsTrigger>
                          <TabsTrigger value="delete">Delete</TabsTrigger>
                          <TabsTrigger value="update">Update</TabsTrigger>
                          <TabsTrigger value="search">Search</TabsTrigger>
                        </TabsList>

                        <TabsContent value="insert" className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Value</label>
                            <Input
                              type="number"
                              placeholder="Enter a number"
                              value={value}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                              disabled={isAnimating}
                            />
                          </div>

                          <Button className="w-full" onClick={handlePush} disabled={!value || isAnimating}>
                            <Plus className="mr-2 h-4 w-4" />
                            Push (Add to End)
                          </Button>

                          <div className="border-t border-white/10 pt-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-white">Insert at Index</label>
                              <Input
                                type="number"
                                placeholder="Index"
                                value={index}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIndex(e.target.value)}
                                disabled={isAnimating}
                                min="0"
                              />
                            </div>

                            <Button className="w-full mt-2" variant="outline" onClick={handleInsertAt} disabled={!value || !index || isAnimating}>
                              Insert at Position
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="delete" className="space-y-4">
                          <Button className="w-full" variant="destructive" onClick={handlePop} disabled={isAnimating || array.getSize() === 0}>
                            <Trash className="mr-2 h-4 w-4" />
                            Pop (Remove from End)
                          </Button>

                          <div className="border-t border-white/10 pt-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-white">Delete at Index</label>
                              <Input
                                type="number"
                                placeholder="Index"
                                value={index}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIndex(e.target.value)}
                                disabled={isAnimating}
                                min="0"
                              />
                            </div>

                            <Button className="w-full mt-2" variant="destructive" onClick={handleDeleteAt} disabled={!index || isAnimating}>
                              Delete at Position
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="update" className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Index</label>
                            <Input
                              type="number"
                              placeholder="Index"
                              value={index}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIndex(e.target.value)}
                              disabled={isAnimating}
                              min="0"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white">New Value</label>
                            <Input
                              type="number"
                              placeholder="Enter new value"
                              value={value}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                              disabled={isAnimating}
                            />
                          </div>

                          <Button className="w-full" variant="outline" onClick={handleUpdate} disabled={!value || !index || isAnimating}>
                            <Edit className="mr-2 h-4 w-4" />
                            Update Value
                          </Button>
                        </TabsContent>

                        <TabsContent value="search" className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Value to Search</label>
                            <Input
                              type="number"
                              placeholder="Enter a number"
                              value={searchValue}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                              disabled={isAnimating}
                            />
                          </div>

                          <Button className="w-full" variant="outline" onClick={handleSearch} disabled={!searchValue || isAnimating}>
                            <Search className="mr-2 h-4 w-4" />
                            Search
                          </Button>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Info className="h-5 w-5 text-purple-400" />
                        Array Properties
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-sm">
                        <div>
                          <h4 className="font-medium text-white">Structure</h4>
                          <p className="text-white/70 mt-1">
                            A dynamic array automatically resizes when capacity is reached, doubling its size to accommodate new elements.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-white">Time Complexity</h4>
                          <div className="flex justify-between">
                            <span className="text-white/70">Access by Index:</span>
                            <span className="font-mono text-purple-300">O(1)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Push (Amortized):</span>
                            <span className="font-mono text-purple-300">O(1)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Insert at Index:</span>
                            <span className="font-mono text-purple-300">O(n)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Delete at Index:</span>
                            <span className="font-mono text-purple-300">O(n)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Search:</span>
                            <span className="font-mono text-purple-300">O(n)</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-white">Applications</h4>
                          <ul className="list-disc list-inside text-white/70 mt-1 space-y-1">
                            <li>Implementing dynamic lists</li>
                            <li>Stack and queue implementations</li>
                            <li>Storing and processing collections</li>
                            <li>Buffer management in I/O operations</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-white">Advantages</h4>
                          <ul className="list-disc list-inside text-white/70 mt-1 space-y-1">
                            <li>Fast random access O(1)</li>
                            <li>Cache-friendly (contiguous memory)</li>
                            <li>Automatic memory management</li>
                            <li>Dynamic sizing</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-6 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-center text-sm text-white/60">
              Data Structures Visualizer - An interactive learning tool
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/pauaranegabellido"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://github.com/paudefclasspy/data-structures"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/60 hover:text-purple-400 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}