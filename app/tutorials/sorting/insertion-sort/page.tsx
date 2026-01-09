import { TutorialLayout } from "@/components/sorting-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function InsertionSortPage() {
  return (
    <TutorialLayout
      title="Insertion Sort"
      description="Learn the efficient adaptive sorting algorithm: Insertion Sort"
      currentStep={3}
      totalSteps={7}
      prevHref="/tutorials/sorting/selection-sort"
      nextHref="/tutorials/sorting/heap-sort"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">What is Insertion Sort?</h2>
          <p className="mb-4">
            Insertion Sort builds the sorted array one item at a time. It iterates through an input array,
            and for each element, finds the place it belongs in the sorted portion and inserts it there.
            It's efficient for small datasets and nearly sorted data.
          </p>

          <p className="mb-4">
            Like sorting playing cards: you pick up one card and insert it into its correct position
            in the cards already in your hand.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How Insertion Sort Works</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <h3 className="font-medium text-blue-400 mb-3">Algorithm Steps</h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Start with the second element (first is already sorted)</li>
              <li>Compare it with elements in the sorted portion</li>
              <li>Shift larger elements one position to the right</li>
              <li>Insert the element in its correct position</li>
              <li>Repeat for each remaining element</li>
            </ol>
          </div>

          <CodeBlock
            title="Insertion Sort - Visual Example"
            language="java"
            code={`// Initial array: [5, 2, 8, 1, 9]
// Sorted: [5]  |  Unsorted: [2, 8, 1, 9]

// Step 1: Insert 2
// Shift 5 right, insert 2: [2, 5, 8, 1, 9]

// Step 2: Insert 8
// 8 > 5, no shift needed: [2, 5, 8, 1, 9]

// Step 3: Insert 1
// Shift 8, 5, 2 right, insert 1: [1, 2, 5, 8, 9]

// Step 4: Insert 9
// 9 > 8, no shift needed: [1, 2, 5, 8, 9]

// Final sorted array: [1, 2, 5, 8, 9]`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Implementation</h2>

          <CodeBlock
            title="Insertion Sort Implementation"
            language="java"
            code={`public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        
        // Start from second element
        for (int i = 1; i < n; i++) {
            int key = arr[i];  // Element to be inserted
            int j = i - 1;
            
            // Shift elements greater than key one position right
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            // Insert key at correct position
            arr[j + 1] = key;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        insertionSort(numbers);
        System.out.println(Arrays.toString(numbers));
        // Output: [11, 12, 22, 25, 34, 64, 90]
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Optimized Insertion Sort with Binary Search</h2>

          <CodeBlock
            title="Binary Insertion Sort"
            language="java"
            code={`public class BinaryInsertionSort {
    public static void binaryInsertionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            
            // Find position using binary search
            int pos = binarySearch(arr, key, i);
            
            // Shift elements
            for (int j = i - 1; j >= pos; j--) {
                arr[j + 1] = arr[j];
            }
            
            // Insert key
            arr[pos] = key;
        }
    }
    
    // Find position to insert key in sorted arr[0...n-1]
    private static int binarySearch(int[] arr, int key, int n) {
        int left = 0, right = n;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] > key) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Time & Space Complexity</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <h4 className="font-medium text-yellow-400 mb-1">Time Complexity</h4>
              <p className="text-sm">Best: <span className="text-green-400">O(n)</span></p>
              <p className="text-sm">Average: <span className="text-yellow-400">O(n²)</span></p>
              <p className="text-sm">Worst: <span className="text-red-400">O(n²)</span></p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Space Complexity</h4>
              <p className="text-sm">O(1) - In-place sorting</p>
              <p className="text-xs mt-2 text-gray-400">Only needs one temporary variable</p>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-md">
            <h3 className="font-medium mb-2">Why Adaptive?</h3>
            <p className="text-sm mb-2">
              Insertion Sort performs best on nearly sorted data. If data is already mostly sorted,
              very few shifts are needed, resulting in O(n) performance.
            </p>
            <p className="text-sm">
              Worst case (reverse sorted) requires O(n²) because each element must be shifted past all previous elements.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Characteristics</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-green-400">✓ Stable:</span> Preserves order of equal elements</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-green-400">✓ In-place:</span> Requires O(1) extra space</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-green-400">✓ Adaptive:</span> Fast on nearly sorted data</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-green-400">✓ Online:</span> Can sort while receiving data</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">When to Use Insertion Sort</h2>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-4 mb-3">
            <h4 className="font-medium text-green-400 mb-2">Good for:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Small datasets (n &lt; 50)</li>
              <li>Nearly sorted data</li>
              <li>Online sorting (data arriving in stream)</li>
              <li>When stability is required</li>
              <li>Hybrid sorting (base case in Timsort/Introsort)</li>
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-md p-4">
            <h4 className="font-medium text-red-400 mb-2">Avoid for:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Large random datasets</li>
              <li>Reverse-sorted data</li>
              <li>When O(n log n) guaranteed performance needed</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Real-World Usage</h2>
          
          <div className="bg-white/5 p-4 rounded-md">
            <p className="text-sm mb-3">
              <span className="font-medium">Timsort</span> (Python's default sort) uses Insertion Sort for small arrays
              before merging. Insertion Sort is the base case for many hybrid algorithms.
            </p>
            <p className="text-sm">
              <span className="font-medium">Why?</span> Small arrays don't benefit from complex algorithms,
              and Insertion Sort's low overhead makes it faster for n &lt; 50.
            </p>
          </div>
        </section>

        <InteractiveExercise
          title="Implement Insertion Sort"
          description="Write an insertion sort function for an array of integers"
          initialCode={`public class InsertionSortExercise {
    public static void insertionSort(int[] arr) {
        // TODO: Implement insertion sort
        // Hint: Start from index 1
        // Hint: Find position to insert current element
        // Hint: Shift elements and insert
    }
    
    public static void main(String[] args) {
        int[] test = {64, 34, 25, 12, 22};
        insertionSort(test);
        System.out.println(Arrays.toString(test));
    }
}`}
          solution={`public class InsertionSortExercise {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            arr[j + 1] = key;
        }
    }
    
    public static void main(String[] args) {
        int[] test = {64, 34, 25, 12, 22};
        insertionSort(test);
        System.out.println(Arrays.toString(test));
    }
}`}
          expectedOutput={`[12, 22, 25, 34, 64]`}
        />

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Insertion Sort builds sorted array incrementally</li>
            <li>O(n) on nearly sorted data makes it adaptive and practical</li>
            <li>Stable sort preserves order of equal elements</li>
            <li>O(1) space complexity makes it memory efficient</li>
            <li>Excellent for small datasets and online sorting</li>
            <li>Used as base case in production sorting algorithms</li>
            <li>Binary Insertion Sort reduces comparisons but not shifts</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
