import { TutorialLayout } from "@/components/array-layout"
import { CodeBlock } from "@/components/code-block"

export default function ArrayListBestPracticesPage() {
  return (
    <TutorialLayout
      title="Best Practices"
      description="Learn best practices for using ArrayLists effectively"
      currentStep={6}
      totalSteps={6}
      prevHref="/tutorials/arrayList/applications"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">ArrayList Best Practices</h2>
          <p className="mb-4">
            Using ArrayLists efficiently requires understanding when and how to use them optimally. 
            This section covers proven practices used in industry.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Choose the Right Data Structure</h2>
          <p className="mb-4">
            While ArrayLists are versatile, other structures may be more efficient for specific use cases.
          </p>

          <div className="bg-white/5 p-4 rounded-md space-y-3">
            <div>
              <h4 className="font-medium text-blue-400 mb-2">Use ArrayList when:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>You need frequent random access by index</li>
                <li>You mostly add elements at the end</li>
                <li>You need a dynamic size array</li>
                <li>Memory efficiency is important</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-3">
              <h4 className="font-medium text-red-400 mb-2">Use LinkedList instead when:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>You frequently insert/remove at the beginning or middle</li>
                <li>You don't need random access</li>
                <li>You're implementing a queue or deque</li>
              </ul>
            </div>

            <div className="border-t border-white/10 pt-3">
              <h4 className="font-medium text-green-400 mb-2">Use other structures when:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm ml-2">
                <li>HashMap/HashSet for fast lookups by key</li>
                <li>TreeSet for sorted elements</li>
                <li>Queue/PriorityQueue for special ordering</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            title="Choosing the Right Collection"
            language="java"
            code={`// ArrayList - random access, mostly append
ArrayList<Student> students = new ArrayList<>();
students.add(new Student("Alice"));
students.add(new Student("Bob"));
Student first = students.get(0);  // O(1)

// LinkedList - frequent inserts/removes
LinkedList<Task> taskQueue = new LinkedList<>();
taskQueue.addFirst(highPriorityTask);  // O(1)
taskQueue.removeLast();                // O(1)

// HashMap - lookup by key
HashMap<Integer, Student> studentMap = new HashMap<>();
studentMap.put(12345, new Student("Alice"));
Student s = studentMap.get(12345);  // O(1) average

// HashSet - check membership
HashSet<Integer> seenIds = new HashSet<>();
if (!seenIds.contains(id)) {
    seenIds.add(id);  // O(1) average
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Pre-allocate Capacity When Possible</h2>
          <p className="mb-4">
            If you know the final size or have a good estimate, pre-allocate capacity to avoid repeated resizing.
          </p>

          <CodeBlock
            title="Pre-allocation Example"
            language="java"
            code={`// BAD: Repeated resizing overhead
ArrayList<Integer> list = new ArrayList<>();  // Default capacity 10
for (int i = 0; i < 10000; i++) {
    list.add(i);  // Causes resizing at 10, 20, 40, 80... elements
}

// GOOD: Pre-allocate if size is known
ArrayList<Integer> list = new ArrayList<>(10000);
for (int i = 0; i < 10000; i++) {
    list.add(i);  // No resizing needed
}

// GOOD: Estimate capacity if approximate size is known
ArrayList<String> lines = new ArrayList<>(1000);
try (Scanner scanner = new Scanner(file)) {
    while (scanner.hasNextLine()) {
        lines.add(scanner.nextLine());
    }
}`}
          />

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4 mt-4">
            <p className="text-sm">
              <strong>Performance Impact:</strong> Pre-allocating can improve performance by 10-20% 
              for large collections by avoiding multiple resizing operations.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Be Careful with Iterator Usage</h2>
          <p className="mb-4">
            Use iterators correctly to avoid ConcurrentModificationException and inefficient code.
          </p>

          <CodeBlock
            title="Safe Iteration Patterns"
            language="java"
            code={`ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "A", "B", "C", "D");

// WRONG: Modifying while iterating with for-each
for (String item : list) {
    if (item.equals("B")) {
        list.remove(item);  // ConcurrentModificationException!
    }
}

// CORRECT: Use iterator with remove()
Iterator<String> iter = list.iterator();
while (iter.hasNext()) {
    String item = iter.next();
    if (item.equals("B")) {
        iter.remove();  // Safe removal
    }
}

// CORRECT: Use removeIf() (Java 8+)
list.removeIf(item -> item.equals("B"));

// CORRECT: Iterate backwards for index-based removal
for (int i = list.size() - 1; i >= 0; i--) {
    if (list.get(i).equals("B")) {
        list.remove(i);
    }
}

// GOOD: Create new list instead
ArrayList<String> filtered = list.stream()
    .filter(item -> !item.equals("B"))
    .collect(Collectors.toCollection(ArrayList::new));`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Use Generics Properly</h2>
          <p className="mb-4">
            Always use generic types to ensure type safety and avoid casting.
          </p>

          <CodeBlock
            title="Generic Type Safety"
            language="java"
            code={`// BAD: Raw type - no type checking
ArrayList list = new ArrayList();
list.add("hello");
list.add(123);  // Allowed but error-prone
String s = (String) list.get(0);  // Manual casting needed
Integer i = (Integer) list.get(1);

// GOOD: Use generics
ArrayList<String> strings = new ArrayList<>();
strings.add("hello");
// strings.add(123);  // Compile error - caught early!

String s = strings.get(0);  // No casting needed
Integer i = strings.get(1);  // Type error caught at compile time

// GOOD: Use wildcard for read-only access
public void printItems(ArrayList<?> items) {
    for (Object item : items) {
        System.out.println(item);
    }
}

// GOOD: Use bounded wildcards
public void addNumbers(ArrayList<? extends Number> numbers) {
    for (Number n : numbers) {
        System.out.println(n.doubleValue());
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Handle Empty Lists and Null Values</h2>
          <p className="mb-4">
            Always check for empty lists and be careful with null values.
          </p>

          <CodeBlock
            title="Null Safety and Empty Check"
            language="java"
            code={`ArrayList<String> list = new ArrayList<>();

// WRONG: No check for empty list
String first = list.get(0);  // IndexOutOfBoundsException!

// CORRECT: Check size first
if (!list.isEmpty()) {
    String first = list.get(0);
}

// CORRECT: Use Optional (Java 8+)
list.stream()
    .findFirst()
    .ifPresent(System.out::println);

// WRONG: Allowing null values without checking
ArrayList<String> items = new ArrayList<>();
items.add(null);
String s = items.get(0).toUpperCase();  // NullPointerException!

// CORRECT: Check for null
for (String item : items) {
    if (item != null) {
        System.out.println(item.toUpperCase());
    }
}

// CORRECT: Use filter to exclude nulls
items.stream()
    .filter(item -> item != null)
    .forEach(System.out::println);`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Be Aware of Thread Safety</h2>
          <p className="mb-4">
            ArrayList is not thread-safe. Use synchronization or other structures for concurrent access.
          </p>

          <CodeBlock
            title="Thread Safety"
            language="java"
            code={`// WRONG: Not thread-safe for concurrent access
ArrayList<Item> items = new ArrayList<>();
// Multiple threads adding/removing causes corruption

// CORRECT: Synchronize access
ArrayList<Item> items = new ArrayList<>();
synchronized (items) {
    items.add(new Item());
}

// BETTER: Use thread-safe collection
List<Item> synchronizedList = Collections.synchronizedList(
    new ArrayList<Item>()
);
synchronizedList.add(new Item());  // Thread-safe

// BEST: Use CopyOnWriteArrayList for read-heavy workloads
CopyOnWriteArrayList<Item> items = new CopyOnWriteArrayList<>();
items.add(new Item());  // Thread-safe`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Use Appropriate Methods for Bulk Operations</h2>
          <p className="mb-4">
            Use bulk operations for better performance and cleaner code.
          </p>

          <CodeBlock
            title="Bulk Operations"
            language="java"
            code={`ArrayList<Integer> list = new ArrayList<>();
Collections.addAll(list, 1, 2, 3, 4, 5);

// WRONG: Individual removes are inefficient
for (Integer i : Arrays.asList(2, 4)) {
    list.remove(i);  // Multiple shifts!
}

// BETTER: Use removeAll
list.removeAll(Arrays.asList(2, 4));

// BEST: Use removeIf (Java 8+)
list.removeIf(n -> n % 2 == 0);  // Remove all even numbers

// GOOD: Use addAll for bulk addition
ArrayList<Integer> more = new ArrayList<>();
more.add(10);
more.add(20);
list.addAll(more);  // Add all at once

// GOOD: Use retainAll to keep only common elements
list.retainAll(Arrays.asList(1, 3, 5));`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Performance Checklist</h2>
          <div className="bg-white/5 p-4 rounded-md space-y-2">
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <p className="text-sm">Pre-allocate capacity when size is known</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <p className="text-sm">Use removeIf() for bulk removals instead of loops</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <p className="text-sm">Prefer append operations over middle insertions</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <p className="text-sm">Consider LinkedList for frequent removals at start</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400">✓</span>
              <p className="text-sm">Use streams for complex filtering/mapping</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400">✗</span>
              <p className="text-sm">Avoid repeatedly removing at index 0</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400">✗</span>
              <p className="text-sm">Don't use raw types - always use generics</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400">✗</span>
              <p className="text-sm">Don't modify ArrayList while iterating with for-each</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Summary</h2>
          <p className="mb-4">
            ArrayLists are powerful and versatile, but using them correctly is key to writing 
            efficient and reliable code. Keep these best practices in mind:
          </p>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-md p-4">
            <ul className="space-y-2 text-sm">
              <li>1. Choose ArrayList when you need indexed random access</li>
              <li>2. Pre-allocate capacity for known sizes</li>
              <li>3. Use iterators correctly to avoid concurrent modification</li>
              <li>4. Always use generics for type safety</li>
              <li>5. Check for empty/null before access</li>
              <li>6. Use synchronized versions or thread-safe alternatives for concurrent access</li>
              <li>7. Use bulk operations for better performance</li>
              <li>8. Profile and test your code to verify performance</li>
            </ul>
          </div>
        </section>
      </div>
    </TutorialLayout>
  )
}
