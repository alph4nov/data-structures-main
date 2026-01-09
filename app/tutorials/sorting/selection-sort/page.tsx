import { TutorialLayout } from "@/components/sorting-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function SelectionSortPage() {
  return (
    <TutorialLayout
      title="Selection Sort"
      description="Learn the simple and intuitive Selection Sort algorithm"
      currentStep={2}
      totalSteps={7}
      prevHref="/tutorials/sorting/introduction"
      nextHref="/tutorials/sorting/insertion-sort"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">What is Selection Sort?</h2>
          <p className="mb-4">
            Selection Sort is a simple sorting algorithm that divides the array into two parts: sorted and unsorted.
            It repeatedly finds the minimum element from the unsorted part and moves it to the sorted part.
            Though easy to understand, it has O(n²) time complexity.
          </p>

          <p className="mb-4">
            Selection Sort is less efficient than advanced algorithms but useful for small datasets
            and when memory writes need to be minimized.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How Selection Sort Works</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <h3 className="font-medium text-blue-400 mb-3">Algorithm Steps</h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Find the minimum element in the unsorted portion</li>
              <li>Swap it with the first element of the unsorted portion</li>
              <li>Move the boundary between sorted and unsorted portions one element to the right</li>
              <li>Repeat until entire array is sorted</li>
            </ol>
          </div>

          <CodeBlock
            title="Selection Sort - Visual Example"
            language="java"
            code={`// Initial array: [64, 34, 25, 12, 22, 11, 90]
// Sorted part: []  |  Unsorted part: [64, 34, 25, 12, 22, 11, 90]

// Pass 1: Find min (11), swap with 64
// Sorted: [11]  |  Unsorted: [64, 34, 25, 12, 22, 90]

// Pass 2: Find min (12), swap with 64
// Sorted: [11, 12]  |  Unsorted: [64, 34, 25, 22, 90]

// Pass 3: Find min (22), swap with 64
// Sorted: [11, 12, 22]  |  Unsorted: [64, 34, 25, 90]

// Continue until sorted: [11, 12, 22, 25, 34, 64, 90]`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Implementation</h2>

          <CodeBlock
            title="Selection Sort Implementation"
            language="java"
            code={`public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        // One by one move boundary of unsorted subarray
        for (int i = 0; i < n - 1; i++) {
            // Find minimum element in remaining unsorted array
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            
            // Swap the found minimum element with first element
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        selectionSort(numbers);
        System.out.println(Arrays.toString(numbers));
        // Output: [11, 12, 22, 25, 34, 64, 90]
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Time & Space Complexity</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
              <h4 className="font-medium text-red-400 mb-1">Time Complexity</h4>
              <p className="text-sm">Best: <span className="text-yellow-400">O(n²)</span></p>
              <p className="text-sm">Average: <span className="text-yellow-400">O(n²)</span></p>
              <p className="text-sm">Worst: <span className="text-red-400">O(n²)</span></p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Space Complexity</h4>
              <p className="text-sm">O(1) - In-place sorting</p>
              <p className="text-xs mt-2 text-gray-400">No extra data structures needed</p>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-md">
            <h3 className="font-medium mb-2">Why O(n²)?</h3>
            <p className="text-sm mb-3">
              For each of n elements, we scan the remaining unsorted portion to find the minimum.
              This results in n + (n-1) + (n-2) + ... + 1 = n(n-1)/2 = O(n²) comparisons.
              Unlike Bubble Sort, the number of swaps is minimized to O(n).
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
            <div className="bg-red-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-red-400">✗ Not adaptive:</span> Always O(n²)</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium text-green-400">✓ Minimal writes:</span> Only n-1 swaps max</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">When to Use Selection Sort</h2>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-4 mb-3">
            <h4 className="font-medium text-green-400 mb-2">Good for:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Small datasets (n &lt; 100)</li>
              <li>When memory writes need to be minimized</li>
              <li>Educational purposes</li>
              <li>Situations requiring minimal data movement</li>
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-md p-4">
            <h4 className="font-medium text-red-400 mb-2">Avoid for:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Large datasets</li>
              <li>When stability is required</li>
              <li>Performance-critical applications</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Comparison with Other O(n²) Sorts</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs mt-4">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 px-2">Aspect</th>
                  <th className="text-left py-2 px-2">Selection Sort</th>
                  <th className="text-left py-2 px-2">Bubble Sort</th>
                  <th className="text-left py-2 px-2">Insertion Sort</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Time</td>
                  <td>O(n²)</td>
                  <td>O(n²)</td>
                  <td>O(n) to O(n²)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Swaps</td>
                  <td>O(n)</td>
                  <td>O(n²)</td>
                  <td>O(n²)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Stable</td>
                  <td>No</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Adaptive</td>
                  <td>No</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <InteractiveExercise
          title="Implement Selection Sort"
          description="Write a selection sort function for an array of integers"
          initialCode={`public class SelectionSortExercise {
    public static void selectionSort(int[] arr) {
        // TODO: Implement selection sort
        // Hint: For each position, find minimum in remaining array
        // Hint: Swap minimum with current position
    }
    
    public static void main(String[] args) {
        int[] test = {64, 34, 25, 12, 22};
        selectionSort(test);
        System.out.println(Arrays.toString(test));
    }
}`}
          solution={`public class SelectionSortExercise {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
    }
    
    public static void main(String[] args) {
        int[] test = {64, 34, 25, 12, 22};
        selectionSort(test);
        System.out.println(Arrays.toString(test));
    }
}`}
          expectedOutput={`[12, 22, 25, 34, 64]`}
        />

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Selection Sort finds and places the minimum element each iteration</li>
            <li>O(n²) time complexity with minimal memory writes (O(n) swaps)</li>
            <li>In-place sorting, good for memory-constrained systems</li>
            <li>Not stable, so equal elements may be reordered</li>
            <li>Better than Bubble Sort due to fewer swaps</li>
            <li>Useful for educational purposes and small datasets</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
