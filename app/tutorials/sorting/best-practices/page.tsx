import { TutorialLayout } from "@/components/sorting-layout"
import { CodeBlock } from "@/components/code-block"

export default function SortingBestPracticesPage() {
  return (
    <TutorialLayout
      title="Sorting Best Practices"
      description="Best practices and optimization tips for sorting algorithms"
      currentStep={7}
      totalSteps={7}
      prevHref="/tutorials/sorting/applications"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Sorting Best Practices</h2>
          <p className="mb-4">
            Learn best practices for implementing and using sorting algorithms in production code.
            These principles will help you write efficient, maintainable sorting solutions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Use Built-in Sort Functions</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              <span className="font-medium text-red-400">Don't reinvent the wheel.</span> Built-in sorting
              functions are highly optimized, well-tested, and use adaptive algorithms.
            </p>

            <CodeBlock
              title="Use Built-in Sorting"
              language="java"
              code={`// ❌ DON'T: Implement bubble sort yourself
public class BadSorting {
    public static void bubbleSort(int[] arr) {
        // Inefficient O(n²) implementation
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}

// ✅ DO: Use Java's built-in sort
public class GoodSorting {
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        
        // Uses Timsort (adaptive O(n log n))
        Arrays.sort(numbers);
        
        // For objects, use Collections.sort
        List<Integer> list = new ArrayList<>(Arrays.asList(64, 34, 25, 12));
        Collections.sort(list);
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Benefit:</span> Better performance, fewer bugs, maintainability</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Choose the Right Comparator</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Use custom comparators to sort objects by multiple criteria efficiently.
            </p>

            <CodeBlock
              title="Custom Comparators"
              language="java"
              code={`public class Student {
    String name;
    double gpa;
    int year;
    
    Student(String name, double gpa, int year) {
        this.name = name;
        this.gpa = gpa;
        this.year = year;
    }
}

public class SortingWithComparators {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Alice", 3.9, 4));
        students.add(new Student("Bob", 3.8, 3));
        students.add(new Student("Charlie", 3.9, 3));
        
        // ❌ DON'T: Complex inline comparisons
        students.sort((a, b) -> {
            if (a.gpa != b.gpa) return Double.compare(b.gpa, a.gpa);
            if (a.year != b.year) return Integer.compare(b.year, a.year);
            return a.name.compareTo(b.name);
        });
        
        // ✅ DO: Use Comparator.comparing with thenComparing
        students.sort(
            Comparator.comparingDouble(Student::getGpa).reversed()
                      .thenComparingInt(Student::getYear).reversed()
                      .thenComparing(Student::getName)
        );
        
        for (Student s : students) {
            System.out.println(s.name + " - GPA: " + s.gpa + ", Year: " + s.year);
        }
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Benefit:</span> More readable, maintainable, and less error-prone</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Consider Stability When Needed</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              When maintaining relative order of equal elements matters, ensure your sort is stable.
            </p>

            <CodeBlock
              title="Stability Example"
              language="java"
              code={`public class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return name + "(" + age + ")";
    }
}

public class StabilityExample {
    public static void main(String[] args) {
        // Original order: (Alice, 25), (Bob, 25), (Charlie, 25)
        List<Person> people = new ArrayList<>(Arrays.asList(
            new Person("Alice", 25),
            new Person("Bob", 25),
            new Person("Charlie", 25)
        ));
        
        // Sort by age (all same age)
        // ✅ With stable sort (Collections.sort):
        // Result: Alice(25), Bob(25), Charlie(25) - order preserved
        Collections.sort(people, Comparator.comparingInt(Person::getAge));
        System.out.println("After stable sort: " + people);
        
        // ❌ With unstable sort (QuickSort):
        // Result: Could be any permutation of the same age
        // This matters when you're sorting by multiple criteria
    }
}`}
            />
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Note:</span> Java's Collections.sort() is stable, but note the algorithm used</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Optimize for Partially Sorted Data</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Real-world data is often partially sorted. Modern algorithms like Timsort detect and exploit this.
            </p>

            <CodeBlock
              title="Adaptive Sorting"
              language="java"
              code={`public class AdaptiveSorting {
    public static void main(String[] args) {
        // Case 1: Nearly sorted data (worst case for QuickSort!)
        int[] nearlySorted = new int[10000];
        for (int i = 0; i < 10000; i++) {
            nearlySorted[i] = i;
        }
        // Shuffle only a few elements
        for (int i = 0; i < 10; i++) {
            int idx1 = (int)(Math.random() * 10000);
            int idx2 = (int)(Math.random() * 10000);
            int temp = nearlySorted[idx1];
            nearlySorted[idx1] = nearlySorted[idx2];
            nearlySorted[idx2] = temp;
        }
        
        // ✅ Timsort detects sorted runs and is O(n) for this case
        long start = System.nanoTime();
        Arrays.sort(nearlySorted);
        long duration = System.nanoTime() - start;
        System.out.println("Nearly sorted array: " + (duration / 1000000.0) + "ms");
        
        // Case 2: Reverse sorted data
        Integer[] reverseSorted = new Integer[10000];
        for (int i = 0; i < 10000; i++) {
            reverseSorted[i] = 10000 - i;
        }
        
        // ✅ Timsort handles this efficiently too
        start = System.nanoTime();
        Arrays.sort(reverseSorted, (a, b) -> b.compareTo(a));
        duration = System.nanoTime() - start;
        System.out.println("Reverse sorted: " + (duration / 1000000.0) + "ms");
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Benefit:</span> Optimal performance on real-world data</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Pre-allocate Memory for Merge Sort</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              If implementing Merge Sort, pre-allocate auxiliary arrays to avoid repeated allocations.
            </p>

            <CodeBlock
              title="Memory-Efficient Merge Sort"
              language="java"
              code={`public class EfficientMergeSort {
    private int[] temp;
    
    // Pre-allocate once
    public void mergeSort(int[] arr) {
        this.temp = new int[arr.length];
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
        // Reuse temp array - no new allocations!
        System.arraycopy(arr, left, temp, left, right - left + 1);
        
        int i = left, j = mid + 1, k = left;
        while (i <= mid && j <= right) {
            if (temp[i] <= temp[j]) {
                arr[k++] = temp[i++];
            } else {
                arr[k++] = temp[j++];
            }
        }
        while (i <= mid) arr[k++] = temp[i++];
        while (j <= right) arr[k++] = temp[j++];
    }
    
    // ❌ DON'T: Create new arrays in each merge call
    // temp[i] = new int[mid - left + 1];  // Bad!
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Benefit:</span> Reduces garbage collection overhead</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Avoid Unnecessary Comparisons</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Complex comparison logic slows down sorting. Precompute sort keys when possible.
            </p>

            <CodeBlock
              title="Optimize Comparisons"
              language="java"
              code={`public class Product {
    String name;
    String category;
    double price;
    int popularity;
}

// ❌ DON'T: Compute score every comparison
List<Product> products = new ArrayList<>();
products.sort((a, b) -> {
    double scoreA = calculateComplexScore(a);  // Called n log n times!
    double scoreB = calculateComplexScore(b);
    return Double.compare(scoreB, scoreA);
});

// ✅ DO: Pre-compute sort keys
List<ProductWithScore> productsWithScores = new ArrayList<>();
for (Product p : products) {
    double score = calculateComplexScore(p);
    productsWithScores.add(new ProductWithScore(p, score));
}

// Now simple comparison
productsWithScores.sort((a, b) -> Double.compare(b.score, a.score));

// Extract sorted products
List<Product> sorted = productsWithScores.stream()
    .map(p -> p.product)
    .collect(Collectors.toList());`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Benefit:</span> Significant performance improvement for complex comparisons</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Consider Parallel Sorting for Large Datasets</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              For very large datasets (millions of elements), parallel sorting can utilize multiple CPU cores.
            </p>

            <CodeBlock
              title="Parallel Sorting"
              language="java"
              code={`public class ParallelSortingExample {
    public static void main(String[] args) {
        int[] largeArray = new int[100_000_000];
        for (int i = 0; i < largeArray.length; i++) {
            largeArray[i] = (int)(Math.random() * Integer.MAX_VALUE);
        }
        
        // ✅ Sequential sort
        int[] array1 = largeArray.clone();
        long start = System.nanoTime();
        Arrays.sort(array1);
        long seqTime = System.nanoTime() - start;
        
        // ✅ Parallel sort for large datasets
        int[] array2 = largeArray.clone();
        start = System.nanoTime();
        Arrays.parallelSort(array2);
        long parTime = System.nanoTime() - start;
        
        System.out.println("Sequential: " + (seqTime / 1000000.0) + "ms");
        System.out.println("Parallel: " + (parTime / 1000000.0) + "ms");
        System.out.println("Speedup: " + (seqTime / (double)parTime) + "x");
    }
}`}
            />
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Note:</span> Parallelization has overhead; typically beneficial for 100K+ elements</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Handle Edge Cases</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Always consider and test edge cases in your sorting logic.
            </p>

            <CodeBlock
              title="Edge Case Handling"
              language="java"
              code={`public class SortingEdgeCases {
    public static void main(String[] args) {
        // Edge case 1: Empty array
        int[] empty = {};
        Arrays.sort(empty);  // No error - handled correctly
        
        // Edge case 2: Single element
        int[] single = {42};
        Arrays.sort(single);  // Already sorted
        
        // Edge case 3: Already sorted
        int[] sorted = {1, 2, 3, 4, 5};
        Arrays.sort(sorted);  // Efficient with adaptive algorithms
        
        // Edge case 4: All equal elements
        int[] allEqual = {5, 5, 5, 5, 5};
        Arrays.sort(allEqual);  // Still works correctly
        
        // Edge case 5: null values in list
        List<Integer> withNulls = new ArrayList<>(Arrays.asList(3, null, 1, 2));
        try {
            Collections.sort(withNulls);  // Will throw NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Cannot sort null values!");
        }
        
        // Edge case 6: Custom objects need comparator
        List<String> strings = new ArrayList<>(Arrays.asList("c", "a", "b"));
        Collections.sort(strings);  // Works - Comparable interface
        
        List<Object> objects = new ArrayList<>();
        try {
            Collections.sort(objects);  // Error if not Comparable!
        } catch (ClassCastException e) {
            System.out.println("Provide comparator for custom objects");
        }
    }
}`}
            />
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Tip:</span> Always test with empty, single, and duplicate elements</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Algorithm Selection Guide</h2>
          
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">General Purpose</h4>
              <p className="text-xs">Use Java's Arrays.sort() - it uses Timsort (adaptive, O(n log n))</p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Stability Required</h4>
              <p className="text-xs">Use Collections.sort() or Merge Sort</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <h4 className="font-medium text-yellow-400 mb-1">Large Dataset</h4>
              <p className="text-xs">Use Arrays.parallelSort() for multi-threaded performance</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-md p-3">
              <h4 className="font-medium text-purple-400 mb-1">Memory Constrained</h4>
              <p className="text-xs">Use Quick Sort or Heap Sort (in-place, O(log n) or O(1) space)</p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
              <h4 className="font-medium text-red-400 mb-1">Educational/Learning</h4>
              <p className="text-xs">Implement Bubble, Insertion, or Selection Sort to understand concepts</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Use built-in sort functions - they're optimized and well-tested</li>
            <li>Choose appropriate comparators for multi-key sorting</li>
            <li>Ensure stability when relative order matters</li>
            <li>Pre-compute sort keys for expensive comparisons</li>
            <li>Pre-allocate memory in custom sorting implementations</li>
            <li>Consider parallel sorting for very large datasets</li>
            <li>Always handle edge cases (null, empty, single element)</li>
            <li>Match algorithm choice to your specific requirements</li>
            <li>Profile and benchmark sorting performance in your context</li>
            <li>Remember: Context matters more than theoretical complexity</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
