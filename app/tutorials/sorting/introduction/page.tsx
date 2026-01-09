import { TutorialLayout } from "@/components/sorting-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function SortingIntroductionPage() {
  return (
    <TutorialLayout
      title="Introduction to Sorting Algorithms"
      description="Learn the fundamentals of sorting and compare different algorithms"
      currentStep={1}
      totalSteps={7}
      nextHref="/tutorials/sorting/selection-sort"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">What is Sorting?</h2>
          <p className="mb-4">
            Sorting is the process of arranging elements in a specific order, typically ascending or descending.
            Sorting algorithms are fundamental to computer science and are used in countless applications.
          </p>

          <p className="mb-4">Why is sorting important?</p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li><strong>Search efficiency:</strong> Binary search requires sorted data</li>
            <li><strong>Data analysis:</strong> Finding patterns is easier in sorted data</li>
            <li><strong>User experience:</strong> Users expect data to be organized</li>
            <li><strong>Database optimization:</strong> Indexes improve query performance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Sorting Concepts</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <h3 className="font-medium text-blue-400 mb-3">Stability</h3>
            <p className="text-sm mb-2">
              A sorting algorithm is <strong>stable</strong> if it preserves the relative order of 
              equal elements. This matters when sorting objects with multiple attributes.
            </p>
            <CodeBlock
              language="java"
              code={`// Example: Sorting students by grade
// Original: [(Alice, A), (Bob, B), (Charlie, A)]
// After sorting by grade (stable): [(Alice, A), (Charlie, A), (Bob, B)]
// After sorting by grade (unstable): [(Charlie, A), (Alice, A), (Bob, B)]`}
            />
          </div>

          <div className="bg-white/5 p-4 rounded-md mb-4">
            <h3 className="font-medium text-green-400 mb-3">In-place vs Not-in-place</h3>
            <p className="text-sm">
              <strong>In-place:</strong> Uses O(1) extra space (e.g., Bubble Sort, Insertion Sort)
              <br/>
              <strong>Not-in-place:</strong> Uses O(n) extra space (e.g., Merge Sort)
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-md">
            <h3 className="font-medium text-yellow-400 mb-3">Adaptive Sorting</h3>
            <p className="text-sm">
              <strong>Adaptive:</strong> Takes advantage of existing order in data (e.g., Insertion Sort)
              <br/>
              <strong>Non-adaptive:</strong> Ignores existing order (e.g., Merge Sort)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Comparison of Sorting Algorithms</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs mt-4">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 px-2">Algorithm</th>
                  <th className="text-left py-2 px-2">Best</th>
                  <th className="text-left py-2 px-2">Average</th>
                  <th className="text-left py-2 px-2">Worst</th>
                  <th className="text-left py-2 px-2">Space</th>
                  <th className="text-left py-2 px-2">Stable</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Selection Sort</td>
                  <td>O(n²)</td>
                  <td>O(n²)</td>
                  <td>O(n²)</td>
                  <td>O(1)</td>
                  <td>No</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Insertion Sort</td>
                  <td>O(n)</td>
                  <td>O(n²)</td>
                  <td>O(n²)</td>
                  <td>O(1)</td>
                  <td>Yes</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Heap Sort</td>
                  <td>O(n log n)</td>
                  <td>O(n log n)</td>
                  <td>O(n log n)</td>
                  <td>O(1)</td>
                  <td>No</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Merge Sort</td>
                  <td>O(n log n)</td>
                  <td>O(n log n)</td>
                  <td>O(n log n)</td>
                  <td>O(n)</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Quick Sort (Reference)</td>
                  <td>O(n log n)</td>
                  <td>O(n log n)</td>
                  <td>O(n²)</td>
                  <td>O(log n)</td>
                  <td>No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">When to Use Each Algorithm</h2>
          
          <div className="space-y-3">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <h4 className="font-medium text-yellow-400 mb-1">Selection Sort</h4>
              <p className="text-xs">Educational purposes, minimal memory writes</p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Insertion Sort</h4>
              <p className="text-xs">Small datasets, nearly sorted data, online sorting</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-md p-3">
              <h4 className="font-medium text-purple-400 mb-1">Heap Sort</h4>
              <p className="text-xs">Guaranteed O(n log n), in-place, when stability not needed</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Merge Sort</h4>
              <p className="text-xs">Stable sort needed, guaranteed O(n log n), linked lists</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Basic Sorting Example</h2>
          <p className="mb-4">Let's look at a simple sorting operation:</p>

          <CodeBlock
            title="Basic Sorting in Java"
            language="java"
            code={`import java.util.Arrays;
import java.util.Collections;

public class SortingExample {
    public static void main(String[] args) {
        // Using built-in sort (usually Quick Sort or Merge Sort)
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        Arrays.sort(numbers);  // Sorts in ascending order
        System.out.println(Arrays.toString(numbers));
        
        // Sorting objects
        ArrayList<String> fruits = new ArrayList<>();
        Collections.addAll(fruits, "Banana", "Apple", "Cherry");
        Collections.sort(fruits);  // Alphabetical order
        System.out.println(fruits);  // [Apple, Banana, Cherry]
        
        // Reverse order
        Collections.sort(fruits, Collections.reverseOrder());
        System.out.println(fruits);  // [Cherry, Banana, Apple]
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Sorting arranges data in a specific order for efficiency and usability</li>
            <li>Different algorithms have different trade-offs in time, space, and stability</li>
            <li>Choose the right algorithm based on your data and requirements</li>
            <li>For most cases, use built-in sort functions that are highly optimized</li>
            <li>Understanding sorting algorithms is crucial for interviews and optimization</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
