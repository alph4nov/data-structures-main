import { TutorialLayout } from "@/components/array-layout"
import { ArrayVisualizer } from "@/components/array-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function ArrayTutorialPage() {
  return (
    <TutorialLayout
      title="Introduction to Arrays & ArrayLists"
      description="Learn about static arrays, dynamic arrays (ArrayLists), and their practical applications"
      currentStep={1}
      totalSteps={6}
      nextHref="/tutorials/arrayList/add-operation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">What is an Array?</h2>
          <p className="mb-4">
            An array is a fundamental data structure that stores a collection of elements of the same data type in contiguous memory locations. 
            Each element can be accessed directly by its index or position in the array.
          </p>

          <div className="my-6">
            <ArrayVisualizer 
              initialValues={[10, 20, 30, 40, 50]}
              showCapacity={true}
              capacity={10}
            />
          </div>

          <p>
            In the visualization above, you can see a dynamic array with 5 elements stored in a capacity of 10 slots. 
            Each element has an index starting from 0, and empty slots are shown as dashed borders. This demonstrates 
            how arrays allocate memory and manage unused space.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Characteristics of Arrays</h2>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Homogeneous Elements:</strong> Arrays only store data of the same type (all integers, all strings, etc.)
            </li>
            <li>
              <strong>Fixed Size (Static Arrays):</strong> Traditional arrays have a fixed size determined at creation time
            </li>
            <li>
              <strong>Random Access:</strong> Elements can be accessed directly using their index in O(1) time
            </li>
            <li>
              <strong>Contiguous Memory:</strong> Elements are stored in adjacent memory locations, making them cache-friendly
            </li>
            <li>
              <strong>Dynamic Arrays (ArrayLists):</strong> Can resize automatically when capacity is exceeded
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Static Array vs Dynamic Array (ArrayList)</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2 text-blue-400">Static Array</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Fixed size determined at compile time</li>
                <li>Memory allocated on stack or at compile time</li>
                <li>Faster access (no bounds checking in some languages)</li>
                <li>Less memory overhead</li>
                <li>Cannot grow or shrink after creation</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2 text-green-400">Dynamic Array (ArrayList)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Size can grow and shrink dynamically</li>
                <li>Memory allocated on heap at runtime</li>
                <li>Automatic resizing when capacity is reached</li>
                <li>Built-in bounds checking</li>
                <li>Slightly more memory overhead for management</li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-white/70">
            In modern programming, dynamic arrays (like Java's ArrayList, Python's list, C++'s vector) are more commonly 
            used because of their flexibility, while static arrays are used for performance-critical sections or when 
            the size is known and fixed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Basic Array Structure in Code</h2>

          <CodeBlock
            title="Array Implementation in Java"
            language="java"
            code={`// Static Array
int[] staticArray = new int[5];  // Fixed size array of 5 integers
staticArray[0] = 10;
staticArray[1] = 20;
// staticArray[5] = 60;  // ERROR: ArrayIndexOutOfBoundsException

// Dynamic Array (ArrayList)
import java.util.ArrayList;

ArrayList<Integer> dynamicArray = new ArrayList<>();
dynamicArray.add(10);     // Adds 10 at the end
dynamicArray.add(20);     // Adds 20 at the end
dynamicArray.add(30);
dynamicArray.add(40);
dynamicArray.add(50);     // Can keep adding, ArrayList will resize automatically

// Access elements
int firstElement = dynamicArray.get(0);  // Gets element at index 0
dynamicArray.set(2, 35);                 // Updates element at index 2 to 35

// Remove elements
dynamicArray.remove(1);   // Removes element at index 1, shifts others`}
            highlightLines={[2, 9, 15, 16, 21]}
          />

          <p className="mt-4">
            The code above shows the difference between static arrays and dynamic arrays (ArrayLists) in Java. 
            Static arrays have fixed sizes, while ArrayLists can grow dynamically as elements are added.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How Dynamic Arrays Work (Resizing)</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <h4 className="font-medium mb-2">Resizing Strategy (Amortized Analysis)</h4>
            <p className="text-sm mb-2">
              When a dynamic array (ArrayList) runs out of capacity, it needs to resize. Most implementations use a 
              <strong> doubling strategy</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm ml-4">
              <li>When array is full, create a new array with double the capacity</li>
              <li>Copy all elements from old array to new array</li>
              <li>Continue adding elements to the new array</li>
              <li>This gives <strong>amortized O(1)</strong> time for append operations</li>
            </ul>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
            <div className="bg-blue-500/20 p-2 rounded">Initial: Size=0, Capacity=2</div>
            <div className="bg-blue-500/20 p-2 rounded">Add 1: Size=1, Capacity=2</div>
            <div className="bg-blue-500/20 p-2 rounded">Add 2: Size=2, Capacity=2</div>
            <div className="bg-purple-500/20 p-2 rounded">Add 3: Size=3, Capacity=4 (Resized!)</div>
            <div className="bg-blue-500/20 p-2 rounded">Add 4: Size=4, Capacity=4</div>
            <div className="bg-purple-500/20 p-2 rounded">Add 5: Size=5, Capacity=8 (Resized!)</div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Time Complexity Analysis</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-2 text-left">Operation</th>
                  <th className="p-2 text-left">Static Array</th>
                  <th className="p-2 text-left">Dynamic Array (ArrayList)</th>
                  <th className="p-2 text-left">Explanation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-2">Access by Index</td>
                  <td className="p-2 font-mono text-green-400">O(1)</td>
                  <td className="p-2 font-mono text-green-400">O(1)</td>
                  <td className="p-2 text-white/70">Direct memory address calculation</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-2">Insert at End</td>
                  <td className="p-2 font-mono text-red-400">N/A (Fixed size)</td>
                  <td className="p-2 font-mono text-green-400">O(1)*</td>
                  <td className="p-2 text-white/70">*Amortized, occasional O(n) for resizing</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-2">Insert at Middle</td>
                  <td className="p-2 font-mono text-yellow-400">O(n)</td>
                  <td className="p-2 font-mono text-yellow-400">O(n)</td>
                  <td className="p-2 text-white/70">Need to shift elements</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-2">Delete from End</td>
                  <td className="p-2 font-mono text-red-400">N/A (Fixed size)</td>
                  <td className="p-2 font-mono text-green-400">O(1)</td>
                  <td className="p-2 text-white/70">Simple size decrement</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-2">Delete from Middle</td>
                  <td className="p-2 font-mono text-yellow-400">O(n)</td>
                  <td className="p-2 font-mono text-yellow-400">O(n)</td>
                  <td className="p-2 text-white/70">Need to shift elements</td>
                </tr>
                <tr>
                  <td className="p-2">Search</td>
                  <td className="p-2 font-mono text-yellow-400">O(n)</td>
                  <td className="p-2 font-mono text-yellow-400">O(n)</td>
                  <td className="p-2 text-white/70">Linear search through elements</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Common Applications of Arrays</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h4 className="font-medium mb-2 text-blue-400">Data Storage</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Storing collections of data</li>
                <li>Database record storage</li>
                <li>Image pixel data</li>
                <li>Audio samples</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h4 className="font-medium mb-2 text-green-400">Implementing Other DS</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Stacks (LIFO)</li>
                <li>Queues (FIFO)</li>
                <li>Heaps (Priority Queues)</li>
                <li>Hash Tables (buckets)</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h4 className="font-medium mb-2 text-purple-400">Algorithms</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Sorting algorithms</li>
                <li>Searching algorithms</li>
                <li>Dynamic programming</li>
                <li>Matrix operations</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Advantages and Disadvantages</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2 text-green-400">Advantages</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Fast Random Access:</strong> O(1) time for accessing any element</li>
                <li><strong>Cache Friendly:</strong> Contiguous memory improves cache performance</li>
                <li><strong>Memory Efficient:</strong> Only stores data, minimal overhead</li>
                <li><strong>Simple Implementation:</strong> Easy to understand and use</li>
                <li><strong>Predictable Performance:</strong> Consistent access time</li>
              </ul>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium mb-2 text-red-400">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Fixed Size (Static):</strong> Cannot resize after creation</li>
                <li><strong>Costly Insertions/Deletions:</strong> O(n) for middle operations</li>
                <li><strong>Memory Waste:</strong> May allocate more than needed</li>
                <li><strong>Resizing Cost (Dynamic):</strong> O(n) when capacity exceeded</li>
                <li><strong>Homogeneous Elements:</strong> Can't store different data types</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check Your Understanding</h2>

          <div className="space-y-4">
            <InteractiveExercise
              questions={[
                {
                  question: "What is the time complexity for accessing an element by index in an array?",
                  options: [
                    "O(log n)",
                    "O(1)",
                    "O(n)",
                    "O(n²)"
                  ],
                  correctAnswer: 1,
                  explanation: "Arrays provide O(1) constant time access because the memory address of any element can be calculated directly using the formula: base_address + (index × element_size)."
                },
                {
                  question: "Why do dynamic arrays (ArrayLists) occasionally take O(n) time for append operations?",
                  options: [
                    "Because they need to search for empty space",
                    "Because they must sort elements after each insertion",
                    "Because they resize by copying all elements to a new larger array",
                    "Because they use binary search for placement"
                  ],
                  correctAnswer: 2,
                  explanation: "When a dynamic array's capacity is reached, it must create a new larger array (usually double the size) and copy all existing elements to the new array. This copying operation takes O(n) time, but it happens infrequently, giving amortized O(1) time for append operations."
                },
                {
                  question: "Which of these is NOT a characteristic of arrays?",
                  options: [
                    "Contiguous memory allocation",
                    "Homogeneous elements",
                    "Dynamic size by default",
                    "Random access capability"
                  ],
                  correctAnswer: 2,
                  explanation: "Static arrays have fixed sizes determined at creation time. Dynamic arrays (ArrayLists) can resize, but traditional arrays are fixed-size. The 'dynamic size by default' is not characteristic of basic arrays."
                }
              ]}
            />
          </div>
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">From the Course Notes</h2>
          <div className="bg-white/5 p-4 rounded-md">
            <h4 className="font-medium mb-2 text-blue-400">Key Points from CSC508 Topic 2: Array</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Array Definition:</strong> A collection of a fixed number of components where all components have the same data type</li>
              <li><strong>Indexing:</strong> Array elements are accessed using indices ranging from 0 to n-1</li>
              <li><strong>Java ArrayList:</strong> Implements List interface using array as underlying structure</li>
              <li><strong>ArrayList Methods:</strong> add(), remove(), get(), set(), size(), indexOf()</li>
              <li><strong>User-defined Arrays:</strong> Can create custom array classes with specific operations</li>
            </ul>
            <p className="text-xs text-white/50 mt-2">Source: CSC508 Data Structures - Topic 2: Array, Compiled by Zahid Zainal</p>
          </div>
        </section>

        <section className="mt-8 pt-6 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-3">Next Steps</h2>
          <p>
            Now that you understand the fundamentals of arrays and ArrayLists, let's move on to practicing array operations 
            including insertion, deletion, searching, and understanding how dynamic resizing works in the next tutorial.
          </p>
          <p className="text-sm text-white/70 mt-2">
            You'll learn about edge cases, common pitfalls, and optimization techniques for working with arrays in real-world applications.
          </p>
        </section>
      </div>
    </TutorialLayout>
  )
}