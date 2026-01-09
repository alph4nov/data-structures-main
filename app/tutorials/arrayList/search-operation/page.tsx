import { TutorialLayout } from "@/components/array-layout"
import { ArrayVisualizer } from "@/components/array-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function ArrayListSearchPage() {
  return (
    <TutorialLayout
      title="Search Operation"
      description="Learn how to find elements in an ArrayList"
      currentStep={4}
      totalSteps={6}
      prevHref="/tutorials/arrayList/remove-operation"
      nextHref="/tutorials/arrayList/applications"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">The Search Operation</h2>
          <p className="mb-4">
            Search operations help you find elements in an ArrayList. There are several ways to search:
            by index, by value, by condition, or check for existence.
          </p>

          <p className="mb-4">Common search operations include:</p>

          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Finding an element by value (indexOf, lastIndexOf)</li>
            <li>Getting an element by index (get)</li>
            <li>Checking if an element exists (contains)</li>
            <li>Finding elements that match a condition (stream, filter)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Access by Index (Get)</h2>
          <p className="mb-4">
            Access an element at a specific index. This is the fastest operation.
            Time complexity: O(1) - constant time random access.
          </p>

          <div className="my-6">
            <ArrayVisualizer 
              initialValues={[10, 20, 30, 40, 50]}
              showCapacity={true}
              capacity={10}
            />
          </div>

          <CodeBlock
            title="Access by Index (Java)"
            language="java"
            code={`ArrayList<String> list = new ArrayList<>();
list.add("Apple");   // index 0
list.add("Banana");  // index 1
list.add("Cherry");  // index 2
list.add("Date");    // index 3

// Get element at index 1
String fruit = list.get(1);
System.out.println(fruit);  // Output: Banana

// Check bounds before accessing
if (index >= 0 && index < list.size()) {
    String element = list.get(index);
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Find Index by Value (indexOf)</h2>
          <p className="mb-4">
            Find the index of the first occurrence of a specific value.
            Time complexity: O(n) - must search through elements.
          </p>

          <CodeBlock
            title="Find Index (Java)"
            language="java"
            code={`ArrayList<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Cherry");
list.add("Banana");
list.add("Date");

// Find index of first "Banana"
int index = list.indexOf("Banana");
System.out.println(index);  // Output: 1

// Element not found returns -1
int index2 = list.indexOf("Grape");
System.out.println(index2);  // Output: -1

// Find last occurrence
int lastIndex = list.lastIndexOf("Banana");
System.out.println(lastIndex);  // Output: 3`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Check if Element Exists (Contains)</h2>
          <p className="mb-4">
            Check if a specific value exists in the ArrayList without getting the index.
            Time complexity: O(n) - searches through all elements.
          </p>

          <CodeBlock
            title="Check Existence (Java)"
            language="java"
            code={`ArrayList<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Cherry");

// Check if element exists
if (list.contains("Banana")) {
    System.out.println("Banana found!");
} else {
    System.out.println("Banana not found!");
}

// Works with any object
ArrayList<Integer> numbers = new ArrayList<>();
numbers.add(10);
numbers.add(20);
numbers.add(30);

if (numbers.contains(20)) {
    System.out.println("20 is in the list");
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Search with Conditions (Java Streams)</h2>
          <p className="mb-4">
            Find elements that match specific conditions using streams and filters.
            Time complexity: O(n) - must check each element against condition.
          </p>

          <CodeBlock
            title="Conditional Search (Java)"
            language="java"
            code={`ArrayList<Integer> numbers = new ArrayList<>();
numbers.add(10);
numbers.add(20);
numbers.add(30);
numbers.add(40);
numbers.add(50);

// Find first even number
Integer firstEven = numbers.stream()
    .filter(n -> n % 2 == 0)
    .findFirst()
    .orElse(null);
System.out.println(firstEven);  // 10

// Find all numbers greater than 25
ArrayList<Integer> filtered = numbers.stream()
    .filter(n -> n > 25)
    .collect(ArrayList::new, List::add, List::addAll);
System.out.println(filtered);  // [30, 40, 50]

// Count elements matching condition
long count = numbers.stream()
    .filter(n -> n > 25)
    .count();
System.out.println(count);  // 3`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Binary Search (Sorted List Only)</h2>
          <p className="mb-4">
            For sorted lists, binary search is much faster than linear search.
            Time complexity: O(log n) - much better than O(n).
          </p>

          <CodeBlock
            title="Binary Search (Java)"
            language="java"
            code={`ArrayList<Integer> sorted = new ArrayList<>();
sorted.add(10);
sorted.add(20);
sorted.add(30);
sorted.add(40);
sorted.add(50);
// List MUST be sorted for binary search to work

// Binary search for 30
int index = Collections.binarySearch(sorted, 30);
System.out.println(index);  // 2 (index of 30)

// Search for non-existent element
int index2 = Collections.binarySearch(sorted, 35);
System.out.println(index2);  // Negative value indicating not found

// IMPORTANT: Use only on sorted lists!
// For unsorted lists, use indexOf() or stream().filter()`}
          />

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4 mt-4">
            <p className="text-sm">
              <strong>Important:</strong> Binary search only works on sorted lists. 
              For unsorted lists, use indexOf() or stream operations.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Practice Exercise</h2>
          <InteractiveExercise
            title="ArrayList Search Operations"
            description="Practice finding elements in an ArrayList"
            initialCode={`ArrayList<Integer> list = new ArrayList<>();
list.add(15);
list.add(25);
list.add(35);
list.add(45);
list.add(55);

// TODO: Get element at index 2
// TODO: Find the index of 45
// TODO: Check if 35 exists in the list

System.out.println("Element at index 2: " + list.get(2));
System.out.println("Index of 45: " + list.indexOf(45));
System.out.println("Contains 35: " + list.contains(35));`}
            solution={`ArrayList<Integer> list = new ArrayList<>();
list.add(15);
list.add(25);
list.add(35);
list.add(45);
list.add(55);

System.out.println("Element at index 2: " + list.get(2));
System.out.println("Index of 45: " + list.indexOf(45));
System.out.println("Contains 35: " + list.contains(35));`}
            expectedOutput="Element at index 2: 35
Index of 45: 3
Contains 35: true"
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Time Complexity Summary</h2>
          <div className="bg-white/5 p-4 rounded-md">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2">Operation</th>
                  <th className="text-left py-2">Time Complexity</th>
                  <th className="text-left py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/20">
                  <td className="py-2">Get by index</td>
                  <td>O(1)</td>
                  <td>Direct array access</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-2">indexOf()</td>
                  <td>O(n)</td>
                  <td>Linear search</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-2">contains()</td>
                  <td>O(n)</td>
                  <td>Linear search</td>
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-2">Binary search (sorted)</td>
                  <td>O(log n)</td>
                  <td>Must be sorted first</td>
                </tr>
                <tr>
                  <td className="py-2">Stream filter</td>
                  <td>O(n)</td>
                  <td>Flexible but slower</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Get by index:</strong> O(1) - fastest way to access elements</li>
            <li><strong>Find by value:</strong> O(n) - must search linearly unless sorted</li>
            <li><strong>Binary search:</strong> O(log n) - but only works on sorted lists</li>
            <li><strong>Check existence:</strong> O(n) - no faster way without sorting</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
