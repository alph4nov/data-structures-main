import { TutorialLayout } from "@/components/array-layout"
import { ArrayVisualizer } from "@/components/array-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function ArrayListAddPage() {
  return (
    <TutorialLayout
      title="Add Operation"
      description="Learn how to add elements to an ArrayList"
      currentStep={2}
      totalSteps={6}
      prevHref="/tutorials/arrayList/introduction"
      nextHref="/tutorials/arrayList/remove-operation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">The Add Operation</h2>
          <p className="mb-4">
            The add operation inserts an element into an ArrayList. Unlike static arrays, ArrayLists can grow 
            dynamically when new elements are added beyond the current capacity.
          </p>

          <p className="mb-4">When adding an element, the ArrayList performs:</p>

          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Checking if there's available capacity</li>
            <li>Resizing the internal array if needed (usually doubles capacity)</li>
            <li>Inserting the element at the specified position</li>
            <li>Updating the size counter</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Adding at the End (Append)</h2>
          <p className="mb-4">
            This is the most common operation - adding an element at the end of the ArrayList.
            Time complexity: O(1) amortized when there's spare capacity, O(n) when resizing is needed.
          </p>

          <div className="my-6">
            <ArrayVisualizer 
              initialValues={[10, 20, 30]}
              showCapacity={true}
              capacity={8}
            />
          </div>

          <CodeBlock
            title="Add Element at End (Java)"
            language="java"
            code={`ArrayList<Integer> list = new ArrayList<>();
list.add(10);  // [10]
list.add(20);  // [10, 20]
list.add(30);  // [10, 20, 30]

// When capacity is exceeded, ArrayList automatically resizes`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Adding at a Specific Index</h2>
          <p className="mb-4">
            You can also insert an element at any position in the ArrayList. This requires shifting 
            elements to the right, making it O(n) time complexity.
          </p>

          <CodeBlock
            title="Add Element at Index (Java)"
            language="java"
            code={`ArrayList<Integer> list = new ArrayList<>();
list.add(10);    // [10]
list.add(20);    // [10, 20]
list.add(30);    // [10, 20, 30]

// Insert 15 at index 1 (between 10 and 20)
list.add(1, 15); // [10, 15, 20, 30]

// The element at index 1 (20) and all following elements shift right`}
          />

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4 mt-4">
            <p className="text-sm">
              <strong>Important:</strong> Adding at the beginning or middle requires shifting elements, 
              which is inefficient for large lists. O(n) complexity for worst case (adding at index 0).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Dynamic Resizing</h2>
          <p className="mb-4">
            When the ArrayList reaches capacity, it automatically creates a larger array and copies all elements.
          </p>

          <CodeBlock
            title="ArrayList Resizing Behavior"
            language="java"
            code={`// Java ArrayList doubles its capacity when full
ArrayList<Integer> list = new ArrayList<>();
// Initial capacity: 10 (default)

// After adding 10 elements, list is full
for (int i = 0; i < 10; i++) {
    list.add(i);
}
// Current capacity: 10, size: 10

// Adding 11th element triggers resizing
list.add(10);
// New capacity: 20 (doubled), size: 11

// This ensures amortized O(1) insertion at the end`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Practice Exercise</h2>
          <InteractiveExercise
            title="ArrayList Add Operation"
            description="Try adding elements to an ArrayList"
            initialCode={`ArrayList<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
// TODO: Add "Cherry" at the end
// TODO: Add "Orange" at index 1

// Print the list
System.out.println(fruits);`}
            solution={`ArrayList<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Cherry");
fruits.add(1, "Orange");

System.out.println(fruits);`}
            expectedOutput="[Apple, Orange, Banana, Cherry]"
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Append (add at end):</strong> O(1) amortized time complexity</li>
            <li><strong>Insert at index:</strong> O(n) time complexity due to shifting elements</li>
            <li><strong>Automatic resizing:</strong> ArrayList doubles capacity when needed</li>
            <li><strong>Best practice:</strong> Add at the end when possible for better performance</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
