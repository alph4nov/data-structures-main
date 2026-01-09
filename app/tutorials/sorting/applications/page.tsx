import { TutorialLayout } from "@/components/sorting-layout"
import { CodeBlock } from "@/components/code-block"

export default function SortingApplicationsPage() {
  return (
    <TutorialLayout
      title="Sorting Applications"
      description="Real-world applications and use cases of sorting algorithms"
      currentStep={6}
      totalSteps={7}
      prevHref="/tutorials/sorting/merge-sort"
      nextHref="/tutorials/sorting/best-practices"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Real-World Applications of Sorting</h2>
          <p className="mb-4">
            Sorting is one of the most fundamental operations in computer science. Here are practical
            applications where sorting algorithms are essential.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Database Indexing</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Databases use sorting to create indexes that enable fast data retrieval. B-Tree and B+ Tree
              indexes maintain sorted order for efficient searching.
            </p>

            <CodeBlock
              title="Database Index Example"
              language="java"
              code={`// Simulating database index creation
import java.util.*;

public class DatabaseIndex {
    static class Record {
        int id;
        String name;
        
        Record(int id, String name) {
            this.id = id;
            this.name = name;
        }
    }
    
    public static void main(String[] args) {
        List<Record> records = new ArrayList<>();
        records.add(new Record(3, "Alice"));
        records.add(new Record(1, "Bob"));
        records.add(new Record(2, "Charlie"));
        
        // Create index sorted by ID
        Collections.sort(records, (a, b) -> Integer.compare(a.id, b.id));
        
        // Now binary search is possible: O(log n)
        // Without sorting: O(n)
        
        for (Record r : records) {
            System.out.println(r.id + " - " + r.name);
        }
        // Output:
        // 1 - Bob
        // 2 - Charlie
        // 3 - Alice
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Benefits:</span> Enables O(log n) searches, efficient range queries</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Search Engine Ranking</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Search engines like Google sort results by relevance score. Complex multi-key sorting
              (score, date, quality metrics) determines ranking.
            </p>

            <CodeBlock
              title="Search Result Ranking"
              language="java"
              code={`public class SearchResult {
    String url;
    double relevanceScore;
    long date;
    int pageRank;
    
    SearchResult(String url, double score, long date, int rank) {
        this.url = url;
        this.relevanceScore = score;
        this.date = date;
        this.pageRank = rank;
    }
    
    public static void main(String[] args) {
        List<SearchResult> results = new ArrayList<>();
        results.add(new SearchResult("example.com", 0.95, 1234567890, 5));
        results.add(new SearchResult("other.com", 0.87, 1234567891, 3));
        results.add(new SearchResult("test.com", 0.95, 1234567892, 7));
        
        // Sort by relevance (descending), then pageRank (descending)
        Collections.sort(results, (a, b) -> {
            if (a.relevanceScore != b.relevanceScore) {
                return Double.compare(b.relevanceScore, a.relevanceScore);
            }
            return Integer.compare(b.pageRank, a.pageRank);
        });
        
        for (SearchResult r : results) {
            System.out.println(r.url + " (score: " + r.relevanceScore + ")");
        }
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Benefits:</span> Multi-criteria ranking, relevance optimization</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. E-Commerce Sorting Features</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Online stores sort products by price, rating, popularity, and date. Multiple sorting
              options enhance user experience.
            </p>

            <CodeBlock
              title="Product Sorting in E-Commerce"
              language="java"
              code={`public class Product {
    String name;
    double price;
    double rating;
    int reviewCount;
    
    Product(String name, double price, double rating, int reviews) {
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.reviewCount = reviews;
    }
    
    public static void main(String[] args) {
        List<Product> products = new ArrayList<>();
        products.add(new Product("Laptop", 999.99, 4.5, 250));
        products.add(new Product("Mouse", 29.99, 4.8, 1200));
        products.add(new Product("Keyboard", 79.99, 4.2, 500));
        
        // Sort by price (low to high)
        products.sort((a, b) -> Double.compare(a.price, b.price));
        System.out.println("By Price:");
        for (Product p : products) {
            System.out.println(p.name + ": " + p.price);
        }
        
        // Sort by rating (high to low)
        products.sort((a, b) -> Double.compare(b.rating, a.rating));
        System.out.println("\\nBy Rating:");
        for (Product p : products) {
            System.out.println(p.name + ": " + p.rating);
        }
        
        // Sort by popularity (review count)
        products.sort((a, b) -> Integer.compare(b.reviewCount, a.reviewCount));
        System.out.println("\\nBy Popularity:");
        for (Product p : products) {
            System.out.println(p.name + ": " + p.reviewCount + " reviews");
        }
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Benefits:</span> User-friendly filtering, better user experience</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Recommendation Systems</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Netflix, Spotify, and Amazon sort recommendations by relevance score. Sorting millions
              of items efficiently is critical.
            </p>

            <CodeBlock
              title="Recommendation Ranking"
              language="java"
              code={`public class Recommendation {
    String itemId;
    double relevanceScore;
    int popularity;
    
    Recommendation(String id, double score, int pop) {
        this.itemId = id;
        this.relevanceScore = score;
        this.popularity = pop;
    }
    
    public static void main(String[] args) {
        List<Recommendation> recs = new ArrayList<>();
        // Simulate 1M recommendations
        for (int i = 0; i < 1000000; i++) {
            recs.add(new Recommendation(
                "item" + i,
                Math.random(),  // relevance score
                (int)(Math.random() * 10000)  // popularity
            ));
        }
        
        // Sort by relevance + popularity (hybrid scoring)
        long start = System.currentTimeMillis();
        recs.sort((a, b) -> {
            double scoreA = a.relevanceScore * 0.7 + (a.popularity / 10000.0) * 0.3;
            double scoreB = b.relevanceScore * 0.7 + (b.popularity / 10000.0) * 0.3;
            return Double.compare(scoreB, scoreA);
        });
        long end = System.currentTimeMillis();
        
        System.out.println("Sorted 1M items in " + (end - start) + "ms");
        
        // Return top 10 recommendations
        for (int i = 0; i < 10; i++) {
            System.out.println((i+1) + ". " + recs.get(i).itemId);
        }
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Benefits:</span> Efficient personalization, better engagement</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. File System Organization</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Operating systems use sorting to organize files by name, date, size, and type.
              Directory listings are always sorted for user convenience.
            </p>

            <CodeBlock
              title="File System Sorting"
              language="java"
              code={`import java.nio.file.*;
import java.util.*;

public class FileOrganizer {
    static class FileInfo {
        String name;
        long size;
        long modified;
        
        FileInfo(String name, long size, long modified) {
            this.name = name;
            this.size = size;
            this.modified = modified;
        }
    }
    
    public static void main(String[] args) {
        List<FileInfo> files = new ArrayList<>();
        files.add(new FileInfo("document.pdf", 2048000, 1609459200));
        files.add(new FileInfo("image.png", 512000, 1609545600));
        files.add(new FileInfo("archive.zip", 10485760, 1609372800));
        
        // Sort by name (alphabetical)
        files.sort((a, b) -> a.name.compareTo(b.name));
        System.out.println("By Name:");
        for (FileInfo f : files) {
            System.out.println(f.name);
        }
        
        // Sort by size (largest first)
        files.sort((a, b) -> Long.compare(b.size, a.size));
        System.out.println("\\nBy Size:");
        for (FileInfo f : files) {
            System.out.println(f.name + " (" + (f.size / 1024) + " KB)");
        }
        
        // Sort by date (newest first)
        files.sort((a, b) -> Long.compare(b.modified, a.modified));
        System.out.println("\\nBy Date:");
        for (FileInfo f : files) {
            System.out.println(f.name);
        }
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Benefits:</span> Intuitive navigation, faster file discovery</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Event Timeline & Scheduling</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Social media feeds, calendars, and event management systems sort events by timestamp.
              Chronological order is essential for user understanding.
            </p>

            <CodeBlock
              title="Event Scheduling Example"
              language="java"
              code={`public class Event {
    String title;
    long timestamp;
    int priority;
    
    Event(String title, long timestamp, int priority) {
        this.title = title;
        this.timestamp = timestamp;
        this.priority = priority;
    }
    
    public static void main(String[] args) {
        List<Event> events = new ArrayList<>();
        events.add(new Event("Meeting", 1609459200, 1));
        events.add(new Event("Lunch", 1609545600, 3));
        events.add(new Event("Presentation", 1609372800, 2));
        
        // Sort by time (ascending - oldest first)
        events.sort((a, b) -> Long.compare(a.timestamp, b.timestamp));
        System.out.println("Timeline:");
        for (Event e : events) {
            System.out.println(e.timestamp + " - " + e.title);
        }
        
        // Sort by priority (high to low)
        events.sort((a, b) -> Integer.compare(b.priority, a.priority));
        System.out.println("\\nBy Priority:");
        for (Event e : events) {
            System.out.println(e.priority + ": " + e.title);
        }
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Benefits:</span> Chronological consistency, priority-based handling</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Performance Comparison</h2>
          
          <div className="bg-white/5 p-4 rounded-md">
            <CodeBlock
              title="Benchmarking Sorting Algorithms"
              language="java"
              code={`public class SortingBenchmark {
    public static void main(String[] args) {
        int[] sizes = {1000, 10000, 100000, 1000000};
        
        for (int size : sizes) {
            int[] data = new int[size];
            for (int i = 0; i < size; i++) {
                data[i] = (int)(Math.random() * size);
            }
            
            // Built-in sort (usually O(n log n))
            int[] copy = data.clone();
            long start = System.nanoTime();
            Arrays.sort(copy);
            long duration = System.nanoTime() - start;
            
            System.out.println("Size: " + size + 
                ", Time: " + (duration / 1000000.0) + "ms");
        }
    }
}`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Sorting is fundamental to most real-world applications</li>
            <li>Database indexes rely on sorting for efficient queries</li>
            <li>Search engines and recommender systems use sophisticated sorting techniques</li>
            <li>E-commerce platforms depend on sorting for user experience</li>
            <li>Efficient sorting directly impacts application performance</li>
            <li>Understanding sorting enables optimization of critical systems</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
