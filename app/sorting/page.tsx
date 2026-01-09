"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Undo, Play, Pause, SkipForward, BookOpen, Info, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/ui/code-block"

// Optimized Sorting Algorithm implementations
class SortingAlgorithms {
  // Generate random array
  static generateRandomArray(size: number, min: number = 10, max: number = 100): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min)
  }

  // Selection Sort
  static *selectionSort(array: number[]): Generator<{
    array: number[]
    comparisons: number
    swaps: number
    currentIndex?: number
    minIndex?: number
    comparingIndex?: number
  }> {
    const arr = [...array]
    let comparisons = 0
    let swaps = 0

    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i
      
      for (let j = i + 1; j < arr.length; j++) {
        comparisons++
        yield {
          array: [...arr],
          comparisons,
          swaps,
          currentIndex: i,
          minIndex,
          comparingIndex: j
        }

        if (arr[j] < arr[minIndex]) {
          minIndex = j
        }
      }

      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        swaps++
        yield {
          array: [...arr],
          comparisons,
          swaps,
          currentIndex: i,
          minIndex,
          comparingIndex: minIndex
        }
      }
    }

    yield {
      array: [...arr],
      comparisons,
      swaps,
      currentIndex: -1,
      minIndex: -1,
      comparingIndex: -1
    }
  }

  // Insertion Sort
  static *insertionSort(array: number[]): Generator<{
    array: number[]
    comparisons: number
    swaps: number
    currentIndex?: number
    keyIndex?: number
    comparingIndex?: number
  }> {
    const arr = [...array]
    let comparisons = 0
    let swaps = 0

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i]
      let j = i - 1

      while (j >= 0) {
        comparisons++
        yield {
          array: [...arr],
          comparisons,
          swaps,
          currentIndex: i,
          keyIndex: i,
          comparingIndex: j
        }

        if (arr[j] > key) {
          arr[j + 1] = arr[j]
          swaps++
          j--
        } else {
          break
        }
      }
      arr[j + 1] = key
      swaps++
      
      yield {
        array: [...arr],
        comparisons,
        swaps,
        currentIndex: i,
        keyIndex: j + 1,
        comparingIndex: -1
      }
    }

    yield {
      array: [...arr],
      comparisons,
      swaps,
      currentIndex: -1,
      keyIndex: -1,
      comparingIndex: -1
    }
  }

  // Merge Sort - Optimized to yield less frequently
  static *mergeSort(array: number[]): Generator<{
    array: number[]
    comparisons: number
    mergeOperations: number
    left?: number
    right?: number
    mid?: number
    isMerging?: boolean
    sortedIndices?: Set<number>
  }> {
    const arr = [...array]
    let comparisons = 0
    let mergeOperations = 0
    const sortedIndices = new Set<number>()

    function* merge(left: number, mid: number, right: number): Generator<any> {
      const leftArr = arr.slice(left, mid + 1)
      const rightArr = arr.slice(mid + 1, right + 1)
      let i = 0, j = 0, k = left
      let yieldCount = 0

      while (i < leftArr.length && j < rightArr.length) {
        comparisons++
        
        // Yield only every 2 comparisons for performance
        if (yieldCount % 2 === 0) {
          yield {
            array: [...arr],
            comparisons,
            mergeOperations,
            left,
            right,
            mid,
            isMerging: true,
            sortedIndices: new Set(sortedIndices)
          }
        }
        yieldCount++

        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i]
          i++
        } else {
          arr[k] = rightArr[j]
          j++
        }
        k++
        mergeOperations++
      }

      while (i < leftArr.length) {
        arr[k] = leftArr[i]
        i++
        k++
        mergeOperations++
      }

      while (j < rightArr.length) {
        arr[k] = rightArr[j]
        j++
        k++
        mergeOperations++
      }

      // Final yield after completing the merge
      yield {
        array: [...arr],
        comparisons,
        mergeOperations,
        left,
        right,
        mid,
        isMerging: true,
        sortedIndices: new Set(sortedIndices)
      }
    }

    function* mergeSortHelper(l: number, r: number): Generator<any> {
      if (l >= r) return

      const m = Math.floor(l + (r - l) / 2)

      yield {
        array: [...arr],
        comparisons,
        mergeOperations,
        left: l,
        right: r,
        mid: m,
        isMerging: false,
        sortedIndices: new Set(sortedIndices)
      }

      yield* mergeSortHelper(l, m)
      yield* mergeSortHelper(m + 1, r)
      yield* merge(l, m, r)

      // Mark this segment as sorted
      for (let i = l; i <= r; i++) {
        sortedIndices.add(i)
      }
    }

    yield* mergeSortHelper(0, arr.length - 1)

    yield {
      array: [...arr],
      comparisons,
      mergeOperations,
      left: -1,
      right: -1,
      mid: -1,
      isMerging: false,
      sortedIndices: new Set(Array.from({ length: arr.length }, (_, i) => i))
    }
  }

  // Heap Sort
  static *heapSort(array: number[]): Generator<{
    array: number[]
    comparisons: number
    swaps: number
    heapSize?: number
    currentIndex?: number
    heapifying?: boolean
  }> {
    const arr = [...array]
    let comparisons = 0
    let swaps = 0
    let yieldCount = 0

    function* heapify(n: number, i: number): Generator<any> {
      let largest = i
      const left = 2 * i + 1
      const right = 2 * i + 2

      if (left < n) {
        comparisons++
        if (yieldCount % 2 === 0) {
          yield {
            array: [...arr],
            comparisons,
            swaps,
            heapSize: n,
            currentIndex: i,
            heapifying: true
          }
        }
        yieldCount++
        
        if (arr[left] > arr[largest]) {
          largest = left
        }
      }

      if (right < n) {
        comparisons++
        if (yieldCount % 2 === 0) {
          yield {
            array: [...arr],
            comparisons,
            swaps,
            heapSize: n,
            currentIndex: i,
            heapifying: true
          }
        }
        yieldCount++
        
        if (arr[right] > arr[largest]) {
          largest = right
        }
      }

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]
        swaps++
        yield {
          array: [...arr],
          comparisons,
          swaps,
          heapSize: n,
          currentIndex: i,
          heapifying: true
        }
        
        yield* heapify(n, largest)
      }
    }

    // Build max heap
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      yield* heapify(arr.length, i)
    }

    // Extract elements from heap
    for (let i = arr.length - 1; i > 0; i--) {
      // Move current root to end
      [arr[0], arr[i]] = [arr[i], arr[0]]
      swaps++
      yield {
        array: [...arr],
        comparisons,
        swaps,
        heapSize: i,
        currentIndex: 0,
        heapifying: false
      }

      // Heapify the reduced heap
      yield* heapify(i, 0)
    }

    yield {
      array: [...arr],
      comparisons,
      swaps,
      heapSize: -1,
      currentIndex: -1,
      heapifying: false
    }
  }

  // Get algorithm name
  static getAlgorithmName(type: string): string {
    const names: Record<string, string> = {
      selection: "Selection Sort",
      insertion: "Insertion Sort",
      merge: "Merge Sort",
      heap: "Heap Sort"
    }
    return names[type] || "Unknown Algorithm"
  }

  // Get time complexity
  static getTimeComplexity(type: string): string {
    const complexities: Record<string, string> = {
      selection: "O(n²)",
      insertion: "O(n²)",
      merge: "O(n log n)",
      heap: "O(n log n)"
    }
    return complexities[type] || "Unknown"
  }

  // Get space complexity
  static getSpaceComplexity(type: string): string {
    const complexities: Record<string, string> = {
      selection: "O(1)",
      insertion: "O(1)",
      merge: "O(n)",
      heap: "O(1)"
    }
    return complexities[type] || "Unknown"
  }
}

export default function SortingPage() {
  // State for array and algorithm
  const [array, setArray] = useState<number[]>([])
  const [algorithm, setAlgorithm] = useState<string>("selection")
  const [arraySize, setArraySize] = useState<number>(10)
  const [speed, setSpeed] = useState<number>(500)
  const [isSorting, setIsSorting] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  
  // Animation state
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [totalSteps, setTotalSteps] = useState<number>(0)
  const [generator, setGenerator] = useState<Generator<any> | null>(null)
  const [currentStats, setCurrentStats] = useState({
    comparisons: 0,
    swaps: 0,
    mergeOperations: 0
  })
  
  // Visualization state
  const [highlightedIndices, setHighlightedIndices] = useState<Set<number>>(new Set())
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set())
  const [currentOperation, setCurrentOperation] = useState<string>("")
  
  // Code snippet state
  const [currentCodeSnippet, setCurrentCodeSnippet] = useState<{
    title: string
    code: string
    highlightLines: number[]
  }>({
    title: "Sorting Algorithms",
    code: `// Select an algorithm to see its implementation
// Each algorithm has different characteristics and trade-offs`,
    highlightLines: []
  })

  // Refs for animation control
  const animationRef = useRef<number | null>(null)
  const lastUpdateTime = useRef<number>(0)
  const stepsBuffer = useRef<any[]>([])

  // Initialize array
  const initializeArray = useCallback(() => {
    const newArray = SortingAlgorithms.generateRandomArray(arraySize)
    setArray(newArray)
    setCurrentStep(0)
    setTotalSteps(0)
    setCurrentStats({ comparisons: 0, swaps: 0, mergeOperations: 0 })
    setHighlightedIndices(new Set())
    setSortedIndices(new Set())
    setIsSorting(false)
    setIsPaused(false)
    
    // Reset code snippet
    setCurrentCodeSnippet({
      title: `Initial Array (${arraySize} elements)`,
      code: `// Generated random array with ${arraySize} elements
const array = [${newArray.join(", ")}];

// Select an algorithm and click "Start Sorting" to begin`,
      highlightLines: [1, 4]
    })
  }, [arraySize])

  // Generate algorithm steps
  const generateAlgorithmSteps = useCallback(() => {
    let gen: Generator<any> | null = null
    
    switch (algorithm) {
      case "selection":
        gen = SortingAlgorithms.selectionSort(array)
        break
      case "insertion":
        gen = SortingAlgorithms.insertionSort(array)
        break
      case "merge":
        gen = SortingAlgorithms.mergeSort(array)
        break
      case "heap":
        gen = SortingAlgorithms.heapSort(array)
        break
    }
    
    return gen
  }, [algorithm, array])

  // Update operation description
  const updateOperationDescription = useCallback((value: any) => {
    switch (algorithm) {
      case "selection":
        if (value.comparingIndex !== undefined) {
          setCurrentOperation(`Comparing ${array[value.currentIndex]} with ${array[value.comparingIndex]}`)
        } else if (value.minIndex !== value.currentIndex) {
          setCurrentOperation(`Swapping ${array[value.currentIndex]} with ${array[value.minIndex]}`)
        } else {
          setCurrentOperation("Finding minimum element in unsorted portion")
        }
        break
      case "insertion":
        if (value.comparingIndex !== undefined) {
          setCurrentOperation(`Shifting element ${array[value.comparingIndex]} to the right`)
        } else {
          setCurrentOperation(`Inserting element ${array[value.keyIndex]} at position ${value.keyIndex}`)
        }
        break
      case "merge":
        if (value.isMerging) {
          setCurrentOperation(`Merging sorted subarrays [${value.left}, ${value.mid}] and [${value.mid + 1}, ${value.right}]`)
        } else {
          setCurrentOperation(`Dividing array at position ${value.mid}`)
        }
        break
      case "heap":
        if (value.heapifying) {
          setCurrentOperation(`Heapifying subtree at index ${value.currentIndex}`)
        } else {
          setCurrentOperation(`Extracting maximum element and heapifying`)
        }
        break
    }
  }, [algorithm, array])

  // Process a single step
  const processStep = useCallback((value: any) => {
    setArray([...value.array])
    setCurrentStats({
      comparisons: value.comparisons || 0,
      swaps: value.swaps || 0,
      mergeOperations: value.mergeOperations || 0
    })

    // Update highlighted indices based on algorithm
    const newHighlighted = new Set<number>()
    if (value.currentIndex !== undefined && value.currentIndex >= 0) newHighlighted.add(value.currentIndex)
    if (value.minIndex !== undefined && value.minIndex >= 0) newHighlighted.add(value.minIndex)
    if (value.comparingIndex !== undefined && value.comparingIndex >= 0) newHighlighted.add(value.comparingIndex)
    if (value.keyIndex !== undefined && value.keyIndex >= 0) newHighlighted.add(value.keyIndex)
    if (value.left !== undefined && value.left >= 0) newHighlighted.add(value.left)
    if (value.right !== undefined && value.right >= 0) newHighlighted.add(value.right)
    if (value.mid !== undefined && value.mid >= 0) newHighlighted.add(value.mid)
    
    setHighlightedIndices(newHighlighted)
    
    // Update sorted indices
    if (value.sortedIndices) {
      setSortedIndices(new Set(value.sortedIndices))
    }

    // Update current operation description
    updateOperationDescription(value)
  }, [updateOperationDescription])

  // Animation loop using requestAnimationFrame for smoother animation
  const animateStep = useCallback((timestamp: number) => {
    if (!generator || isPaused) return

    // Control frame rate based on speed
    const frameInterval = Math.max(16, 1000 - speed) // Min 16ms (60fps), Max based on speed
    const timeSinceLastUpdate = timestamp - lastUpdateTime.current
    
    if (timeSinceLastUpdate < frameInterval) {
      animationRef.current = requestAnimationFrame(animateStep)
      return
    }

    lastUpdateTime.current = timestamp

    const result = generator.next()
    
    if (result.done) {
      setIsSorting(false)
      setIsPaused(false)
      setCurrentOperation("Sorting Completed!")
      return
    }

    setCurrentStep(prev => prev + 1)
    processStep(result.value)

    // Continue animation
    animationRef.current = requestAnimationFrame(animateStep)
  }, [generator, isPaused, speed, processStep])

  // Start sorting
  const startSorting = useCallback(() => {
    if (isSorting && !isPaused) {
      setIsPaused(true)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    if (isPaused) {
      setIsPaused(false)
      lastUpdateTime.current = performance.now()
      animationRef.current = requestAnimationFrame(animateStep)
      return
    }

    const gen = generateAlgorithmSteps()
    if (!gen) return

    setGenerator(gen)
    setIsSorting(true)
    setCurrentStep(0)
    setCurrentStats({ comparisons: 0, swaps: 0, mergeOperations: 0 })
    setHighlightedIndices(new Set())
    setSortedIndices(new Set())
    
    // Set initial code snippet based on algorithm
    setAlgorithmCodeSnippet()
    
    lastUpdateTime.current = performance.now()
    animationRef.current = requestAnimationFrame(animateStep)
  }, [isSorting, isPaused, generateAlgorithmSteps, animateStep])

  // Set algorithm code snippet
  const setAlgorithmCodeSnippet = useCallback(() => {
    const snippets: Record<string, { title: string; code: string; highlightLines: number[] }> = {
      selection: {
        title: "Selection Sort Algorithm",
        code: `// Selection Sort - Brute force approach O(n²)
void selectionSort(int arr[]) {
  int n = arr.length;
  
  for (int i = 0; i < n-1; i++) {
    int min_idx = i;
    
    // Find the minimum element in unsorted array
    for (int j = i+1; j < n; j++) {
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }
    
    // Swap the found minimum with first element
    int temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
  }
}`,
        highlightLines: [4, 7, 8, 9, 10, 13, 14, 15]
      },
      insertion: {
        title: "Insertion Sort Algorithm",
        code: `// Insertion Sort - O(n²), good for nearly sorted arrays
void insertionSort(int arr[]) {
  int n = arr.length;
  
  for (int i = 1; i < n; ++i) {
    int key = arr[i];
    int j = i - 1;
    
    // Move elements greater than key ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    
    // Insert key at correct position
    arr[j + 1] = key;
  }
}`,
        highlightLines: [4, 6, 7, 10, 11, 12, 16]
      },
      merge: {
        title: "Merge Sort Algorithm",
        code: `// Merge Sort - Divide and conquer O(n log n)
void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    
    // Recursively sort first and second halves
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    
    // Merge the sorted halves
    merge(arr, l, m, r);
  }
}

void merge(int arr[], int l, int m, int r) {
  // Create temporary arrays
  int n1 = m - l + 1;
  int n2 = r - m;
  int L[] = new int[n1];
  int R[] = new int[n2];
  
  // Copy data to temp arrays
  for (int i = 0; i < n1; ++i)
    L[i] = arr[l + i];
  for (int j = 0; j < n2; ++j)
    R[j] = arr[m + 1 + j];
  
  // Merge temp arrays
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  
  // Copy remaining elements
  while (i < n1) {
    arr[k] = L[i];
    i++; k++;
  }
  while (j < n2) {
    arr[k] = R[j];
    j++; k++;
  }
}`,
        highlightLines: [2, 3, 4, 6, 7, 10]
      },
      heap: {
        title: "Heap Sort Algorithm",
        code: `// Heap Sort - Based on binary heap O(n log n)
void heapSort(int arr[]) {
  int n = arr.length;
  
  // Build max heap
  for (int i = n / 2 - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap
  for (int i = n - 1; i > 0; i--) {
    // Move root to end
    int temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    
    // Heapify reduced heap
    heapify(arr, i, 0);
  }
}

void heapify(int arr[], int n, int i) {
  int largest = i;
  int left = 2 * i + 1;
  int right = 2 * i + 2;
  
  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // If right child is larger than largest
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not root
  if (largest != i) {
    int swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    
    // Recursively heapify affected subtree
    heapify(arr, n, largest);
  }
}`,
        highlightLines: [2, 6, 7, 12, 13, 14, 15, 19]
      }
    }

    setCurrentCodeSnippet(snippets[algorithm] || snippets.selection)
  }, [algorithm])

  // Reset sorting
  const resetSorting = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    initializeArray()
    setGenerator(null)
    setIsSorting(false)
    setIsPaused(false)
  }, [initializeArray])

  // Skip to end with animation
  const skipToEnd = useCallback(async () => {
    if (!generator) return
    
    setIsSorting(true)
    setIsPaused(false)
    
    // Use a fast animation loop for skip to end
    const fastAnimate = () => {
      const result = generator.next()
      
      if (result.done) {
        setIsSorting(false)
        setCurrentOperation("Sorting Completed!")
        setSortedIndices(new Set(Array.from({ length: array.length }, (_, i) => i)))
        return
      }

      processStep(result.value)
      setCurrentStep(prev => prev + 1)
      
      // Use setTimeout with 0 delay to allow UI updates between steps
      setTimeout(fastAnimate, 0)
    }
    
    fastAnimate()
  }, [generator, array.length, processStep])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Initialize on component mount
  useEffect(() => {
    initializeArray()
  }, [initializeArray])

  // Update generator when algorithm changes
  useEffect(() => {
    if (generator && !isSorting) {
      setAlgorithmCodeSnippet()
    }
  }, [algorithm, generator, isSorting, setAlgorithmCodeSnippet])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold hover:text-purple-400 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="ml-auto">
            <Link href="/tutorials/sorting/introduction">
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Tutorial Mode
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Sorting Algorithms Visualizer
                </h1>
                <p className="mt-2 text-lg text-white/80">
                  Visualize and compare different sorting algorithms in action
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <Card className="card-gradient">
                    <CardHeader>
                      <CardTitle className="text-white">Visualization</CardTitle>
                      <CardDescription className="text-white/70">
                        {SortingAlgorithms.getAlgorithmName(algorithm)} - Array size: {array.length}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Array Visualization */}
                      <div className="mb-6">
                        <div className="flex items-end justify-center h-64 gap-1 p-4 border rounded-md bg-muted/30">
                          {array.map((value, index) => {
                            const isHighlighted = highlightedIndices.has(index)
                            const isSorted = sortedIndices.has(index)
                            const height = (value / 100) * 200 // Scale to 200px max height
                            
                            return (
                              <div
                                key={index}
                                className={`
                                  flex flex-col items-center justify-end transition-all duration-300
                                  ${isHighlighted ? 'ring-2 ring-yellow-400' : ''}
                                  ${isSorted ? 'bg-green-500' : 'bg-purple-500'}
                                `}
                                style={{
                                  width: `${80 / array.length}%`,
                                  height: `${height}px`
                                }}
                              >
                                <div className="text-xs font-mono text-white mb-1">
                                  {value}
                                </div>
                                <div className="text-xs text-white/70 font-mono">
                                  [{index}]
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Operation description */}
                      {currentOperation && (
                        <div className="mt-4 p-3 bg-muted rounded-md">
                          <p className="font-medium">{currentOperation}</p>
                          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                            <span>Comparisons: {currentStats.comparisons}</span>
                            <span>Swaps: {currentStats.swaps}</span>
                            {algorithm === "merge" && (
                              <span>Merge Operations: {currentStats.mergeOperations}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Code snippet with highlighted lines */}
                      <div className="mt-6">
                        <CodeBlock
                          code={currentCodeSnippet.code}
                          title={currentCodeSnippet.title}
                          language="javascript"
                          highlightLines={currentCodeSnippet.highlightLines}
                          className="bg-black/30"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="card-gradient">
                    <CardHeader>
                      <CardTitle className="text-white">Controls</CardTitle>
                      <CardDescription className="text-white/70">
                        Configure and control the sorting visualization
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Array Configuration */}
                        <div>
                          <label className="text-sm font-medium text-white/90 mb-2 block">
                            Array Size: {arraySize}
                          </label>
                          <Input
                            type="range"
                            min="5"
                            max="50"
                            value={arraySize}
                            onChange={(e) => setArraySize(parseInt(e.target.value))}
                            disabled={isSorting}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-white/50 mt-1">
                            <span>5</span>
                            <span>50</span>
                          </div>
                        </div>

                        {/* Algorithm Selection */}
                        <div>
                          <label className="text-sm font-medium text-white/90 mb-2 block">
                            Sorting Algorithm
                          </label>
                          <Select value={algorithm} onValueChange={setAlgorithm} disabled={isSorting}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select algorithm" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="selection">Selection Sort</SelectItem>
                              <SelectItem value="insertion">Insertion Sort</SelectItem>
                              <SelectItem value="merge">Merge Sort</SelectItem>
                              <SelectItem value="heap">Heap Sort</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Speed Control */}
                        <div>
                          <label className="text-sm font-medium text-white/90 mb-2 block">
                            Speed: {1000 - speed}ms per step
                          </label>
                          <Input
                            type="range"
                            min="100"
                            max="1000"
                            step="100"
                            value={speed}
                            onChange={(e) => setSpeed(parseInt(e.target.value))}
                            disabled={isSorting}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-white/50 mt-1">
                            <span>Fast</span>
                            <span>Slow</span>
                          </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={initializeArray}
                            disabled={isSorting}
                            variant="outline"
                            className="w-full"
                          >
                            <Undo className="mr-2 h-4 w-4" />
                            New Array
                          </Button>
                          
                          <Button
                            onClick={startSorting}
                            disabled={array.length === 0}
                            className="w-full"
                          >
                            {isSorting && !isPaused ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                {isPaused ? "Resume" : "Start Sorting"}
                              </>
                            )}
                          </Button>

                          <Button
                            onClick={skipToEnd}
                            disabled={!isSorting || algorithm === "merge"}
                            variant="outline"
                            className="w-full"
                          >
                            <SkipForward className="mr-2 h-4 w-4" />
                            Skip to End
                          </Button>

                          <Button
                            onClick={resetSorting}
                            variant="destructive"
                            className="w-full"
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6 card-gradient">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Info className="h-5 w-5 text-purple-400" />
                        Algorithm Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-sm">
                        <div>
                          <h4 className="font-medium text-white">
                            {SortingAlgorithms.getAlgorithmName(algorithm)}
                          </h4>
                          <p className="text-white/70 mt-1">
                            {algorithm === "selection" && 
                              "Finds the minimum element in unsorted portion and swaps it with the first unsorted element."}
                            {algorithm === "insertion" && 
                              "Builds the final sorted array one element at a time by comparisons."}
                            {algorithm === "merge" && 
                              "Divides array into halves, recursively sorts them, then merges the sorted halves."}
                            {algorithm === "heap" && 
                              "Builds a max heap from the input data, then repeatedly extracts the maximum element."}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-white">Complexity Analysis</h4>
                          <div className="flex justify-between">
                            <span className="text-white/70">Time Complexity:</span>
                            <span className="font-mono text-purple-300">
                              {SortingAlgorithms.getTimeComplexity(algorithm)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Space Complexity:</span>
                            <span className="font-mono text-purple-300">
                              {SortingAlgorithms.getSpaceComplexity(algorithm)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Stability:</span>
                            <span className="font-mono text-purple-300">
                              {algorithm === "selection" ? "Not Stable" : 
                               algorithm === "insertion" ? "Stable" : 
                               algorithm === "merge" ? "Stable" : "Not Stable"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-white">Applications</h4>
                          <ul className="list-disc list-inside text-white/70 mt-1 space-y-1">
                            {algorithm === "selection" && (
                              <>
                                <li>When memory write is costly</li>
                                <li>Small datasets</li>
                                <li>Educational purposes</li>
                              </>
                            )}
                            {algorithm === "insertion" && (
                              <>
                                <li>Nearly sorted arrays</li>
                                <li>Small datasets</li>
                                <li>Adaptive sorting</li>
                                <li>Online sorting</li>
                              </>
                            )}
                            {algorithm === "merge" && (
                              <>
                                <li>External sorting</li>
                                <li>Linked lists</li>
                                <li>Stable sorting requirement</li>
                                <li>Large datasets</li>
                              </>
                            )}
                            {algorithm === "heap" && (
                              <>
                                <li>Priority queue implementation</li>
                                <li>Memory constrained environments</li>
                                <li>Guaranteed O(n log n) performance</li>
                              </>
                            )}
                          </ul>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                          <h4 className="font-medium text-white mb-2">From CSC508 Course Notes</h4>
                          <p className="text-white/70 text-sm">
                            <strong>Brute-force algorithms:</strong> Selection Sort (O(n²)), Insertion Sort (O(n²))<br/>
                            <strong>Divide & conquer:</strong> Merge Sort (O(n log n)), Heap Sort (O(n log n))<br/>
                            Sorting rearranges elements in ascending or descending order to improve operations like searching.
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-white/20">
                          <Link href="/tutorials/sorting/introduction">
                            <Button variant="outline" size="sm" className="w-full">
                              <BookOpen className="mr-2 h-4 w-4" />
                              Learn More in Tutorial Mode
                            </Button>
                          </Link>
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
    </div>
  )
}