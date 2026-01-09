import { TutorialLayout } from "@/components/array-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function ArrayListApplicationsPage() {
  return (
    <TutorialLayout
      title="Real-world Applications"
      description="Discover practical uses of ArrayLists in real applications"
      currentStep={5}
      totalSteps={6}
      prevHref="/tutorials/arrayList/search-operation"
      nextHref="/tutorials/arrayList/best-practices"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Why ArrayLists Matter</h2>
          <p className="mb-4">
            ArrayLists are one of the most commonly used data structures in real-world applications. 
            Their dynamic sizing, random access, and ease of use make them ideal for many scenarios.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-4">
            <p className="text-sm">
              ArrayLists power everything from web applications to database systems. 
              Understanding how to use them efficiently is crucial for every programmer.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Game Development - Storing Entities</h2>
          <p className="mb-4">
            In game development, ArrayLists store game objects like players, enemies, and items.
            The dynamic size allows games to add/remove objects during gameplay.
          </p>

          <CodeBlock
            title="Game Entity Management"
            language="java"
            code={`public class GameEngine {
    private ArrayList<Enemy> enemies = new ArrayList<>();
    private ArrayList<Projectile> projectiles = new ArrayList<>();
    
    public void spawnEnemy(Enemy enemy) {
        enemies.add(enemy);  // Add new enemy
    }
    
    public void updateGame() {
        // Update all enemies
        for (Enemy enemy : enemies) {
            enemy.update();
        }
        
        // Remove defeated enemies
        enemies.removeIf(e -> e.getHealth() <= 0);
        
        // Update all projectiles
        for (Projectile p : projectiles) {
            p.move();
        }
    }
    
    public void handleCollisions() {
        for (int i = 0; i < projectiles.size(); i++) {
            for (int j = 0; j < enemies.size(); j++) {
                if (projectiles.get(i).collidesWith(enemies.get(j))) {
                    projectiles.remove(i);
                    enemies.remove(j);
                }
            }
        }
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. E-commerce - Shopping Cart</h2>
          <p className="mb-4">
            Shopping carts in online stores use ArrayLists to manage items as customers add and remove products.
          </p>

          <CodeBlock
            title="Shopping Cart Implementation"
            language="java"
            code={`public class ShoppingCart {
    private ArrayList<CartItem> items = new ArrayList<>();
    
    public void addItem(Product product, int quantity) {
        // Check if item already exists
        for (CartItem item : items) {
            if (item.getProduct().getId() == product.getId()) {
                item.increaseQuantity(quantity);
                return;
            }
        }
        // New item, add to cart
        items.add(new CartItem(product, quantity));
    }
    
    public void removeItem(int productId) {
        items.removeIf(item -> item.getProduct().getId() == productId);
    }
    
    public double calculateTotal() {
        return items.stream()
            .mapToDouble(item -> item.getPrice() * item.getQuantity())
            .sum();
    }
    
    public ArrayList<CartItem> getItems() {
        return new ArrayList<>(items);  // Return copy for safety
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Social Media - User Feed</h2>
          <p className="mb-4">
            Social media platforms use ArrayLists to store feeds, comments, and notifications.
          </p>

          <CodeBlock
            title="Social Media Feed"
            language="java"
            code={`public class UserFeed {
    private ArrayList<Post> posts = new ArrayList<>();
    private ArrayList<Comment> comments = new ArrayList<>();
    
    public void addPost(Post post) {
        posts.add(post);  // Most recent posts added first
    }
    
    public void addComment(int postId, Comment comment) {
        posts.stream()
            .filter(p -> p.getId() == postId)
            .findFirst()
            .ifPresent(p -> p.addComment(comment));
    }
    
    public ArrayList<Post> getRecentPosts(int count) {
        return new ArrayList<>(
            posts.stream()
                .limit(count)
                .collect(Collectors.toList())
        );
    }
    
    public void deletePost(int postId) {
        posts.removeIf(p -> p.getId() == postId);
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. File Systems - Directory Listing</h2>
          <p className="mb-4">
            File systems use ArrayLists to store lists of files and folders in a directory.
          </p>

          <CodeBlock
            title="Directory File Listing"
            language="java"
            code={`public class Directory {
    private ArrayList<File> files = new ArrayList<>();
    private ArrayList<Directory> subdirectories = new ArrayList<>();
    
    public void listFiles() {
        System.out.println("Files in directory:");
        for (File file : files) {
            System.out.println("  " + file.getName() + 
                              " (" + file.getSize() + " bytes)");
        }
    }
    
    public void listAllRecursive(String prefix) {
        for (File file : files) {
            System.out.println(prefix + file.getName());
        }
        
        for (Directory dir : subdirectories) {
            System.out.println(prefix + dir.getName() + "/");
            dir.listAllRecursive(prefix + "  ");
        }
    }
    
    public long getTotalSize() {
        long size = files.stream()
            .mapToLong(File::getSize)
            .sum();
        
        size += subdirectories.stream()
            .mapToLong(Directory::getTotalSize)
            .sum();
        
        return size;
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Data Processing - Batch Operations</h2>
          <p className="mb-4">
            ArrayLists are used for collecting and processing data in batches, like database records.
          </p>

          <CodeBlock
            title="Batch Data Processing"
            language="java"
            code={`public class DataProcessor {
    private ArrayList<Record> records = new ArrayList<>();
    private static final int BATCH_SIZE = 1000;
    
    public void processData(String[] rawData) {
        // Parse data into records
        for (String line : rawData) {
            records.add(parseRecord(line));
        }
    }
    
    public void processBatches() {
        for (int i = 0; i < records.size(); i += BATCH_SIZE) {
            int end = Math.min(i + BATCH_SIZE, records.size());
            ArrayList<Record> batch = new ArrayList<>(
                records.subList(i, end)
            );
            
            // Process this batch
            saveBatchToDatabase(batch);
        }
    }
    
    public ArrayList<Record> filterRecords(Predicate<Record> condition) {
        return records.stream()
            .filter(condition)
            .collect(Collectors.toCollection(ArrayList::new));
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Autocomplete Systems</h2>
          <p className="mb-4">
            Search engines and text editors use ArrayLists to store and quickly access suggestions.
          </p>

          <CodeBlock
            title="Autocomplete Suggestions"
            language="java"
            code={`public class AutocompleteEngine {
    private ArrayList<String> suggestions = new ArrayList<>();
    
    public ArrayList<String> getSuggestions(String prefix) {
        return suggestions.stream()
            .filter(s -> s.startsWith(prefix))
            .limit(10)  // Return top 10 suggestions
            .collect(Collectors.toCollection(ArrayList::new));
    }
    
    public void addSuggestion(String word) {
        if (!suggestions.contains(word)) {
            suggestions.add(word);
        }
    }
    
    public void learnFromUser(String query) {
        if (!suggestions.contains(query)) {
            suggestions.add(query);
            // Could sort by frequency for better suggestions
        }
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Performance Tips for Real Applications</h2>
          <div className="bg-white/5 p-4 rounded-md space-y-3">
            <div>
              <h4 className="font-medium text-green-400 mb-1">✓ Pre-allocate if size is known</h4>
              <CodeBlock
                language="java"
                code={`// Good: Pre-allocate capacity
ArrayList<Item> items = new ArrayList<>(5000);
for (int i = 0; i < 5000; i++) {
    items.add(new Item(i));
}`}
              />
            </div>

            <div>
              <h4 className="font-medium text-green-400 mb-1">✓ Use removeIf for bulk operations</h4>
              <CodeBlock
                language="java"
                code={`// Efficient: Remove multiple items
items.removeIf(item -> item.isExpired());`}
              />
            </div>

            <div>
              <h4 className="font-medium text-yellow-400 mb-1">✗ Avoid frequent removes at beginning</h4>
              <CodeBlock
                language="java"
                code={`// Bad: O(n) for each removal
while (!queue.isEmpty()) {
    process(queue.remove(0));  // Slow!
}

// Better: Use Queue or LinkedList for this`}
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Practice Exercise</h2>
          <InteractiveExercise
            title="ArrayList Real-world Application"
            description="Create a simple to-do list using ArrayList"
            initialCode={`ArrayList<String> todoList = new ArrayList<>();

// TODO: Add three tasks
// TODO: Print all tasks
// TODO: Remove the second task
// TODO: Print remaining tasks

// Expected output:
// All tasks: [Buy groceries, Call mom, Study Java]
// After removal: [Buy groceries, Study Java]`}
            solution={`ArrayList<String> todoList = new ArrayList<>();

todoList.add("Buy groceries");
todoList.add("Call mom");
todoList.add("Study Java");

System.out.println("All tasks: " + todoList);

todoList.remove(1);

System.out.println("After removal: " + todoList);`}
            expectedOutput="All tasks: [Buy groceries, Call mom, Study Java]
After removal: [Buy groceries, Study Java]"
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Dynamic sizing:</strong> Perfect for unknown or changing collection sizes</li>
            <li><strong>Random access:</strong> O(1) access is ideal for indexed lookups</li>
            <li><strong>Easy to use:</strong> Simple API makes development faster</li>
            <li><strong>Industry standard:</strong> Used in virtually every application</li>
            <li><strong>Performance aware:</strong> Know when to use ArrayList vs other structures</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
