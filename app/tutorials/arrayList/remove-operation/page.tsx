import { TutorialLayout } from "@/components/array-layout"
import { ArrayVisualizer } from "@/components/array-visualizer"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function ArrayListRemovePage() {
  return (
    <TutorialLayout
      title="Remove Operation"
      description="Learn how to remove elements from an ArrayList"
      currentStep={3}
      totalSteps={6}
      prevHref="/tutorials/arrayList/add-operation"
      nextHref="/tutorials/arrayList/search-operation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">The Remove Operation</h2>
          <p className="mb-4">
            The remove operation deletes an element from an ArrayList. This requires shifting remaining elements 
            to fill the gap left by the removed element.
          </p>

          <p className="mb-4">When removing an element, the ArrayList performs:</p>

          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Finding the element to be removed</li>
            <li>Shifting all elements after it one position to the left</li>
            <li>Decreasing the size counter</li>
            <li>Optionally shrinking capacity if size becomes too small</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Removing by Index</h2>
          <p className="mb-4">
            Remove an element at a specific index. Time complexity depends on position:
            - Remove at end: O(1)
            - Remove at middle: O(n)
            - Remove at beginning: O(n)
          </p>

          <div className="my-6">
            <ArrayVisualizer 
              initialValues={[10, 20, 30, 40, 50]}
              showCapacity={true}
              capacity={10}
            />
          </div>

          <CodeBlock
            title="Remove by Index (Java)"
            language="java"
            code={`ArrayList<Integer> list = new ArrayList<>();
list.add(10);   // [10]
list.add(20);   // [10, 20]
list.add(30);   // [10, 20, 30]
list.add(40);   // [10, 20, 30, 40]

// Remove element at index 1 (value 20)
list.remove(1); // [10, 30, 40]
// Elements after index 1 shift left: 30 moves to index 1, 40 moves to index 2`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Removing by Value</h2>
          <p className="mb-4">
            Remove the first occurrence of a specific value. The ArrayList searches for the value 
            and removes it if found. Time complexity: O(n) for searching and shifting.
          </p>

          <CodeBlock
            title="Remove by Value (Java)"
            language="java"
            code={`ArrayList<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Cherry");
list.add("Banana");

// Remove first occurrence of "Banana"
list.remove("Banana"); // [Apple, Cherry, Banana]

// Only the FIRST occurrence is removed
// The second "Banana" remains in the list`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Removing Multiple Elements</h2>
          <p className="mb-4">
            When removing multiple elements, be careful with indices as they change after each removal.
          </p>

          <CodeBlock
            title="Removing Multiple Elements (Java)"
            language="java"
            code={`ArrayList<Integer> list = new ArrayList<>();
for (int i = 1; i <= 5; i++) {
    list.add(i * 10);
}
// [10, 20, 30, 40, 50]

// WRONG: Don't use forward iteration
for (int i = 0; i < list.size(); i++) {
    if (list.get(i) > 20) {
        list.remove(i);  // BUG: Skips elements!
    }
}

// CORRECT: Use backward iteration
for (int i = list.size() - 1; i >= 0; i--) {
    if (list.get(i) > 20) {
        list.remove(i);  // Removes 30, 40, 50
    }
}
// Result: [10, 20]`}
          />

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4 mt-4">
            <p className="text-sm">
              <strong>Tip:</strong> When removing multiple elements, iterate backwards to avoid skipping elements 
              or use an iterator with the remove() method.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Clear All Elements</h2>
          <p className="mb-4">
            Remove all elements from the ArrayList. Time complexity: O(n) to clear all references.
          </p>

          <CodeBlock
            title="Clear ArrayList (Java)"
            language="java"
            code={`ArrayList<Integer> list = new ArrayList<>();
list.add(10);
list.add(20);
list.add(30);
// [10, 20, 30], size: 3, capacity: varies

// Clear all elements
list.clear();
// [], size: 0, capacity: unchanged

// The internal array capacity may remain the same to avoid reallocation`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Practice Exercise</h2>
          <InteractiveExercise
            title="ArrayList Remove Operation"
            description="Try removing elements from an ArrayList"
            initialCode={`ArrayList<Integer> list = new ArrayList<>();
list.add(10);
list.add(20);
list.add(30);
list.add(40);
list.add(50);

// TODO: Remove element at index 2 (value 30)
// TODO: Remove the value 20

System.out.println(list);`}
            solution={`ArrayList<Integer> list = new ArrayList<>();
list.add(10);
list.add(20);
list.add(30);
list.add(40);
list.add(50);

list.remove(2);
list.remove(Integer.valueOf(20));

System.out.println(list);`}
            expectedOutput="[10, 40, 50]"
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Remove by index:</strong> O(1) at end, O(n) at beginning/middle</li>
            <li><strong>Remove by value:</strong> O(n) to find and shift elements</li>
            <li><strong>Multiple removals:</strong> Iterate backwards to avoid index issues</li>
            <li><strong>Clear:</strong> O(n) time to remove all elements</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
