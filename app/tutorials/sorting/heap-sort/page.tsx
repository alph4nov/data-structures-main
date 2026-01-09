import { TutorialLayout } from "@/components/sorting-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function HeapSortPage() {
  return (
    <TutorialLayout
      title="Heap Sort"
      description="Learn the guaranteed O(n log n) in-place sorting algorithm: Heap Sort"
      currentStep={4}
      totalSteps={7}
      prevHref="/tutorials/sorting/insertion-sort"
      nextHref="/tutorials/sorting/merge-sort"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">What is Heap Sort?</h2>
          <p className="mb-4">
            Heap Sort is an efficient sorting algorithm that uses a heap data structure to sort elements.
            It guarantees O(n log n) time complexity while using O(1) extra space, making it both time and space efficient.
            Unlike Quick Sort, Heap Sort provides consistent performance in all cases.
          </p>

          <p className="mb-4">
            Heap Sort is particularly useful when you need guaranteed O(n log n) performance
            and want to avoid the worst-case O(n²) of Quick Sort.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How Heap Sort Works</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <h3 className="font-medium text-blue-400 mb-3">Algorithm Steps</h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li><strong>Build Phase:</strong> Build a max heap from the array</li>
              <li><strong>Extraction Phase:</strong> Repeatedly extract the maximum element</li>
              <li>Place extracted element at end of sorted portion</li>
              <li>Restore heap property with remaining elements</li>
              <li>Repeat until heap is empty</li>
            </ol>
          </div>

          <CodeBlock
            title="Heap Sort - Visual Example"
            language="java"
            code={`// Initial array: [64, 34, 25, 12, 22, 11, 90]

// Step 1: Build max heap
// After heapify:
//         90
//        /  \\
//       34   64
//      / \\  / \\
//     12 22 11 25

// Step 2: Extract max (90), place at end, reheapify
// Heap: [64, 34, 25, 12, 22, 11]  Sorted: [90]

// Step 3: Extract max (64), place at end, reheapify
// Heap: [34, 25, 22, 12, 11]  Sorted: [64, 90]

// Continue until sorted: [11, 12, 22, 25, 34, 64, 90]`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Understanding Heaps</h2>

          <div className="bg-white/5 p-4 rounded-md mb-4">
            <h3 className="font-medium text-green-400 mb-3">Max Heap Property</h3>
            <p className="text-sm mb-3">
              In a max heap, every parent node is greater than or equal to its children.
              The root contains the maximum element.
            </p>

            <p className="text-sm mb-3">
              <span className="font-medium">Array representation:</span>
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Node at index i has left child at 2i + 1</li>
              <li>Node at index i has right child at 2i + 2</li>
              <li>Node at index i has parent at (i - 1) / 2</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Implementation</h2>

          <CodeBlock
            title="Heap Sort Implementation"
            language="java"
            code={`public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root (max) to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            // Restore heap property for reduced heap
            heapify(arr, i, 0);
        }
    }
    
    // Heapify subtree rooted at index i
    // n is heap size
    private static void heapify(int[] arr, int n, int i) {
        int largest = i;  // Assume current is largest
        int left = 2 * i + 1;    // Left child
        int right = 2 * i + 2;   // Right child
        
        // If left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        // If right child is larger than current largest
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        // If largest is not root, swap and continue heapifying
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            
            heapify(arr, n, largest);
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        heapSort(numbers);
        System.out.println(Arrays.toString(numbers));
        // Output: [11, 12, 22, 25, 34, 64, 90]
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Detailed Heapify Example</h2>

          <CodeBlock
            title="How Heapify Restores Heap Property"
            language="java"
            code={`// Heapify process on array [64, 34, 25, 12, 22, 11, 90]
//
// Step 1: Start from index n/2 - 1 = 2 (element 25)
//         No children to compare, no change
//
// Step 2: Index 1 (element 34)
//         34 < 22 (right child)? No change
//
// Step 3: Index 0 (element 64)
//         64 < 90 (right child)? Yes, swap
//         Result: [90, 34, 25, 12, 22, 11, 64]
//         Recursively heapify at index 2 (now 64)
//         64 > 11, no change
//
// Max heap built: [90, 34, 25, 12, 22, 11, 64]`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Time & Space Complexity</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Time Complexity</h4>
              <p className="text-sm">Best: <span className="text-green-400">O(n log n)</span></p>
              <p className="text-sm">Average: <span className="text-green-400">O(n log n)</span></p>
              <p className="text-sm">Worst: <span className="text-green-400">O(n log n)</span></p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Space Complexity</h4>
              <p className="text-sm">O(1) - In-place sorting</p>
              <p className="text-xs mt-2 text-gray-400">No extra data structures needed</p>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-md">
            <h3 className="font-medium mb-2">Why O(n log n)?</h3>
            <p className="text-sm mb-2">
              Building the heap takes O(n) time. Extracting n elements and heapifying takes O(n log n)
              because each extraction is O(log n) and we do it n times.
            </p>
            <p className="text-sm">
              Unlike Quick Sort, this complexity is <strong>guaranteed</strong> in all cases.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Characteristics</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-red-400">✗ Not stable:</span> May change order of equal elements</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-green-400">✓ In-place:</span> Requires O(1) extra space</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-green-400">✓ Guaranteed:</span> Always O(n log n)</p>
            </div>
            <div className="bg-red-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-red-400">✗ Not adaptive:</span> No advantage on sorted data</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">When to Use Heap Sort</h2>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-4 mb-3">
            <h4 className="font-medium text-green-400 mb-2">Good for:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>When guaranteed O(n log n) performance is needed</li>
              <li>Memory-constrained systems (O(1) space)</li>
              <li>When avoiding worst-case O(n²) of Quick Sort</li>
              <li>Finding k largest/smallest elements</li>
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-md p-4">
            <h4 className="font-medium text-red-400 mb-2">Avoid for:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>When stability is required</li>
              <li>When cache locality matters (poor locality)</li>
              <li>When average-case performance matters most (slower than Quick Sort)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Heap Sort vs Other O(n log n) Sorts</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs mt-4">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 px-2">Aspect</th>
                  <th className="text-left py-2 px-2">Heap Sort</th>
                  <th className="text-left py-2 px-2">Quick Sort</th>
                  <th className="text-left py-2 px-2">Merge Sort</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Time (worst)</td>
                  <td>O(n log n)</td>
                  <td>O(n²)</td>
                  <td>O(n log n)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Space</td>
                  <td>O(1)</td>
                  <td>O(log n)</td>
                  <td>O(n)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Stable</td>
                  <td>No</td>
                  <td>No</td>
                  <td>Yes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Cache friendly</td>
                  <td>No</td>
                  <td>Yes</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Practical speed</td>
                  <td>Slower</td>
                  <td>Fastest</td>
                  <td>Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <InteractiveExercise
          title="Implement Heap Sort"
          description="Write a heap sort function for an array of integers"
          initialCode={`public class HeapSortExercise {
    public static void heapSort(int[] arr) {
        // TODO: Build max heap
        // TODO: Extract elements and restore heap
    }
    
    private static void heapify(int[] arr, int n, int i) {
        // TODO: Restore max heap property
    }
    
    public static void main(String[] args) {
        int[] test = {64, 34, 25, 12, 22};
        heapSort(test);
        System.out.println(Arrays.toString(test));
    }
}`}
          solution={`public class HeapSortExercise {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            heapify(arr, i, 0);
        }
    }
    
    private static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            
            heapify(arr, n, largest);
        }
    }
    
    public static void main(String[] args) {
        int[] test = {64, 34, 25, 12, 22};
        heapSort(test);
        System.out.println(Arrays.toString(test));
    }
}`}
          expectedOutput={`[12, 22, 25, 34, 64]`}
        />

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Heap Sort uses max heap to efficiently sort elements</li>
            <li>Guarantees O(n log n) time - better worst case than Quick Sort</li>
            <li>O(1) space makes it ideal for memory-constrained systems</li>
            <li>Not stable, so equal elements may be reordered</li>
            <li>Slower in practice than Quick Sort due to poor cache locality</li>
            <li>Useful when guaranteed performance is more important than average speed</li>
            <li>Foundation for priority queue implementations</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
