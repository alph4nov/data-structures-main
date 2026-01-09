import { TutorialLayout } from "@/components/sorting-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function MergeSortPage() {
  return (
    <TutorialLayout
      title="Merge Sort"
      description="Learn the stable, guaranteed O(n log n) sorting algorithm: Merge Sort"
      currentStep={5}
      totalSteps={7}
      prevHref="/tutorials/sorting/heap-sort"
      nextHref="/tutorials/sorting/applications"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">What is Merge Sort?</h2>
          <p className="mb-4">
            Merge Sort is a stable, divide-and-conquer sorting algorithm that divides the array into smaller
            sub-arrays, recursively sorts them, and then merges them back together. It guarantees O(n log n)
            performance even in the worst case.
          </p>

          <p className="mb-4">
            While it requires O(n) extra space, its guaranteed performance and stability make it ideal for
            scenarios where worst-case performance is critical.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How Merge Sort Works</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <h3 className="font-medium text-blue-400 mb-3">The Divide-and-Conquer Process</h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li><strong>Divide:</strong> Split the array in half repeatedly until subarrays of size 1</li>
              <li><strong>Conquer:</strong> Arrays of size 1 are already sorted</li>
              <li><strong>Merge:</strong> Merge two sorted subarrays into one sorted array</li>
              <li><strong>Repeat:</strong> Continue merging until single sorted array remains</li>
            </ol>
          </div>

          <CodeBlock
            title="Merge Sort - Visual Example"
            language="java"
            code={`// Initial array: [38, 27, 43, 3, 9, 82, 10]

// Divide:
// [38, 27, 43, 3] [9, 82, 10]
// [38, 27] [43, 3] [9, 82] [10]
// [38] [27] [43] [3] [9] [82] [10]

// Merge (combining sorted subarrays):
// [27, 38] [3, 43] [9, 82] [10]
// [3, 27, 38, 43] [9, 10, 82]
// [3, 9, 10, 27, 38, 43, 82]`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">The Merge Operation</h2>
          <p className="mb-4">
            The merge operation is the key to Merge Sort. It takes two sorted arrays and combines them
            into one sorted array efficiently.
          </p>

          <CodeBlock
            title="Merging Two Sorted Arrays"
            language="java"
            code={`// Two sorted arrays:
// Left: [3, 27, 38, 43]
// Right: [9, 10, 82]

// Merge process:
// Compare 3 and 9 → Add 3 to result
// Compare 27 and 9 → Add 9 to result
// Compare 27 and 10 → Add 10 to result
// Compare 27 and 82 → Add 27 to result
// Compare 38 and 82 → Add 38 to result
// Compare 43 and 82 → Add 43 to result
// Add remaining 82

// Result: [3, 9, 10, 27, 38, 43, 82]`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Implementation</h2>

          <CodeBlock
            title="Merge Sort Implementation"
            language="java"
            code={`public class MergeSort {
    public static void mergeSort(int[] arr) {
        if (arr.length == 0) return;
        mergeSort(arr, 0, arr.length - 1);
    }
    
    private static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            
            // Recursively sort left half
            mergeSort(arr, left, mid);
            
            // Recursively sort right half
            mergeSort(arr, mid + 1, right);
            
            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }
    
    private static void merge(int[] arr, int left, int mid, int right) {
        // Create temporary arrays
        int[] leftArr = new int[mid - left + 1];
        int[] rightArr = new int[right - mid];
        
        // Copy data to temp arrays
        System.arraycopy(arr, left, leftArr, 0, leftArr.length);
        System.arraycopy(arr, mid + 1, rightArr, 0, rightArr.length);
        
        // Merge the temp arrays
        int i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
            }
        }
        
        // Copy remaining elements from left array
        while (i < leftArr.length) {
            arr[k++] = leftArr[i++];
        }
        
        // Copy remaining elements from right array
        while (j < rightArr.length) {
            arr[k++] = rightArr[j++];
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        mergeSort(numbers);
        System.out.println(Arrays.toString(numbers));
        // Output: [11, 12, 22, 25, 34, 64, 90]
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Space-Optimized Merge Sort</h2>
          <p className="mb-4">
            We can reduce unnecessary array allocations by creating the auxiliary arrays once at the start.
          </p>

          <CodeBlock
            title="Optimized Merge Sort"
            language="java"
            code={`public class MergeSortOptimized {
    private int[] temp;
    
    public void mergeSort(int[] arr) {
        temp = new int[arr.length];
        mergeSort(arr, 0, arr.length - 1);
    }
    
    private void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    private void merge(int[] arr, int left, int mid, int right) {
        // Copy all elements to temp array
        for (int i = left; i <= right; i++) {
            temp[i] = arr[i];
        }
        
        int i = left, j = mid + 1, k = left;
        
        // Merge back to original array
        while (i <= mid && j <= right) {
            if (temp[i] <= temp[j]) {
                arr[k++] = temp[i++];
            } else {
                arr[k++] = temp[j++];
            }
        }
        
        // Copy remaining elements
        while (i <= mid) {
            arr[k++] = temp[i++];
        }
        while (j <= right) {
            arr[k++] = temp[j++];
        }
    }
}`}
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

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <h4 className="font-medium text-yellow-400 mb-1">Space Complexity</h4>
              <p className="text-sm">O(n) - Auxiliary arrays for merging</p>
              <p className="text-xs mt-2 text-gray-400">Not in-place, but guaranteed performance</p>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-md">
            <h3 className="font-medium mb-2">Why Always O(n log n)?</h3>
            <p className="text-sm">
              The array is divided into halves log n times. Each level requires n comparisons to merge.
              Total: n × log n = O(n log n). Unlike Quick Sort, this holds even in worst case.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Characteristics</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-green-400">✓ Stable:</span> Maintains order of equal elements</p>
            </div>
            <div className="bg-red-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-red-400">✗ Not in-place:</span> Requires O(n) extra space</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-green-400">✓ Guaranteed:</span> Always O(n log n)</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-green-400">✓ Parallelizable:</span> Good for multi-threading</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">When to Use Merge Sort</h2>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-4 mb-3">
            <h4 className="font-medium text-green-400 mb-2">Good for:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>When guaranteed O(n log n) performance is required</li>
              <li>Stable sorting is needed (e.g., sorting database records)</li>
              <li>Sorting linked lists (external sorting preferred)</li>
              <li>Large datasets where worst-case matters</li>
              <li>Multi-threaded sorting (easily parallelizable)</li>
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-md p-4">
            <h4 className="font-medium text-red-400 mb-2">Avoid for:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Memory-constrained systems (uses O(n) extra space)</li>
              <li>Small arrays where overhead matters (use Insertion Sort)</li>
              <li>When in-place sorting is required</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Merge Sort vs Quick Sort</h2>
          
          <div className="bg-blue-500/10 p-4 rounded-md">
            <h3 className="font-medium text-blue-400 mb-3">Why use Merge Sort over Quick Sort?</h3>
            <ul className="list-disc list-inside space-y-2 text-sm ml-2">
              <li><strong>Guaranteed performance:</strong> Always O(n log n), no worst case O(n²)</li>
              <li><strong>Stability:</strong> Preserves order of equal elements</li>
              <li><strong>Parallelization:</strong> Easily divides into independent sub-problems</li>
              <li><strong>External sorting:</strong> Works well with disk-based data</li>
            </ul>
          </div>
        </section>

        <InteractiveExercise
          title="Implement Merge Function"
          description="Write the merge function for Merge Sort"
          initialCode={`public class MergeSortMerge {
    public static void merge(int[] arr, int left, int mid, int right) {
        // TODO: Implement merge
        // Hint: Create temp arrays for left and right halves
        // Hint: Compare and merge elements back to arr
        // Hint: Handle remaining elements
    }
    
    public static void main(String[] args) {
        int[] test = {1, 5, 9, 10, 3, 27, 38, 43};
        merge(test, 0, 3, 7);
        System.out.println(Arrays.toString(test));
    }
}`}
          solution={`public class MergeSortMerge {
    public static void merge(int[] arr, int left, int mid, int right) {
        int[] leftArr = new int[mid - left + 1];
        int[] rightArr = new int[right - mid];
        
        System.arraycopy(arr, left, leftArr, 0, leftArr.length);
        System.arraycopy(arr, mid + 1, rightArr, 0, rightArr.length);
        
        int i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
            }
        }
        
        while (i < leftArr.length) arr[k++] = leftArr[i++];
        while (j < rightArr.length) arr[k++] = rightArr[j++];
    }
    
    public static void main(String[] args) {
        int[] test = {1, 5, 9, 10, 3, 27, 38, 43};
        merge(test, 0, 3, 7);
        System.out.println(Arrays.toString(test));
    }
}`}
          expectedOutput={`[1, 3, 5, 9, 10, 27, 38, 43]`}
        />

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Merge Sort guarantees O(n log n) performance in all cases</li>
            <li>Stable sorting preserves order of equal elements</li>
            <li>Trade-off: Uses O(n) extra space for guaranteed performance</li>
            <li>Excellent choice when worst-case performance matters</li>
            <li>Works efficiently with external data and multi-threading</li>
            <li>Used in databases, file systems, and distributed systems</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
