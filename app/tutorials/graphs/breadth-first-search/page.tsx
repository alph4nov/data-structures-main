import { TutorialLayout } from "@/components/graph-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function BFSPage() {
  return (
    <TutorialLayout
      title="Breadth-First Search (BFS)"
      description="Learn the BFS graph traversal algorithm"
      currentStep={4}
      totalSteps={6}
      prevHref="/tutorials/graphs/depth-first-search"
      nextHref="/tutorials/graphs/shortest-path"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">What is Breadth-First Search?</h2>
          <p className="mb-4">
            Breadth-First Search (BFS) is a graph traversal algorithm that explores vertices level by level.
            It visits all neighbors of a vertex before moving to their neighbors. BFS uses a queue (FIFO)
            to maintain the frontier of vertices to visit. It's ideal for finding shortest paths in unweighted graphs.
          </p>

          <p className="mb-4">
            BFS is always implemented iteratively using an explicit queue, unlike DFS which can be recursive.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How BFS Works</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <h3 className="font-medium text-blue-400 mb-3">BFS Algorithm Steps</h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Start at a source vertex and add to queue</li>
              <li>Mark it as visited</li>
              <li>Remove vertex from queue</li>
              <li>Add all unvisited neighbors to queue and mark as visited</li>
              <li>Repeat until queue is empty</li>
            </ol>
          </div>

          <CodeBlock
            title="BFS Traversal - Visual Example"
            language="java"
            code={`// Graph: 0 - 1 - 3
//         |   |
//         2   4

// BFS from vertex 0:
// Queue: [0], Visited: {0}
// Process 0: Add neighbors 1, 2
// Queue: [1, 2], Visited: {0, 1, 2}
// Process 1: Add neighbors 3, 4
// Queue: [2, 3, 4], Visited: {0, 1, 2, 3, 4}
// Process 2: No new neighbors
// Queue: [3, 4], Visited: {0, 1, 2, 3, 4}
// Process 3: No new neighbors
// Queue: [4], Visited: {0, 1, 2, 3, 4}
// Process 4: No new neighbors
// Queue: []

// BFS Order: 0 → 1 → 2 → 3 → 4
// Level order: Visit by distance from source`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">BFS Implementation</h2>

          <CodeBlock
            title="BFS - Using Queue"
            language="java"
            code={`import java.util.*;

public class BFS {
    private List<Integer>[] adj;
    private int V;
    
    public BFS(int V) {
        this.V = V;
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    public void addEdge(int u, int v) {
        adj[u].add(v);
        adj[v].add(u);
    }
    
    // BFS traversal
    public List<Integer> bfs(int start) {
        List<Integer> traversalOrder = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        // Start BFS
        queue.add(start);
        visited[start] = true;
        
        while (!queue.isEmpty()) {
            // Remove vertex from queue
            int v = queue.remove();
            traversalOrder.add(v);
            
            // Add unvisited neighbors
            for (int neighbor : adj[v]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
        
        return traversalOrder;
    }
    
    public static void main(String[] args) {
        BFS g = new BFS(5);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        g.addEdge(1, 4);
        
        List<Integer> result = g.bfs(0);
        System.out.println("BFS traversal: " + result);
        // Output: [0, 1, 2, 3, 4]
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Shortest Path with BFS</h2>

          <CodeBlock
            title="Finding Shortest Path in Unweighted Graph"
            language="java"
            code={`public class BFSShortestPath {
    private List<Integer>[] adj;
    private int V;
    
    public BFSShortestPath(int V) {
        this.V = V;
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    public void addEdge(int u, int v) {
        adj[u].add(v);
        adj[v].add(u);
    }
    
    // Find shortest path from source to target
    public List<Integer> shortestPath(int source, int target) {
        Queue<Integer> queue = new LinkedList<>();
        boolean[] visited = new boolean[V];
        int[] parent = new int[V];
        
        // Initialize
        queue.add(source);
        visited[source] = true;
        Arrays.fill(parent, -1);
        
        // BFS to find target
        while (!queue.isEmpty()) {
            int v = queue.remove();
            
            if (v == target) {
                break;  // Found target
            }
            
            for (int neighbor : adj[v]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    parent[neighbor] = v;
                    queue.add(neighbor);
                }
            }
        }
        
        // Reconstruct path
        List<Integer> path = new ArrayList<>();
        int current = target;
        while (current != -1) {
            path.add(0, current);  // Add to front
            current = parent[current];
        }
        
        if (path.get(0) == source) {
            return path;
        }
        return new ArrayList<>();  // No path exists
    }
    
    // Get distances from source to all vertices
    public int[] getDistances(int source) {
        Queue<Integer> queue = new LinkedList<>();
        int[] distance = new int[V];
        boolean[] visited = new boolean[V];
        
        Arrays.fill(distance, -1);
        
        queue.add(source);
        visited[source] = true;
        distance[source] = 0;
        
        while (!queue.isEmpty()) {
            int v = queue.remove();
            
            for (int neighbor : adj[v]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    distance[neighbor] = distance[v] + 1;
                    queue.add(neighbor);
                }
            }
        }
        
        return distance;
    }
    
    public static void main(String[] args) {
        BFSShortestPath g = new BFSShortestPath(6);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        g.addEdge(2, 3);
        g.addEdge(3, 4);
        g.addEdge(3, 5);
        
        List<Integer> path = g.shortestPath(0, 5);
        System.out.println("Shortest path 0→5: " + path);
        
        int[] distances = g.getDistances(0);
        System.out.println("Distances from 0: " + Arrays.toString(distances));
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">BFS Applications</h2>
          
          <div className="space-y-3 mb-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Shortest Path (Unweighted)</h4>
              <p className="text-sm">Find shortest path in graphs with equal edge weights</p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Level Order Traversal</h4>
              <p className="text-sm">Visit nodes by distance/level from source</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <h4 className="font-medium text-yellow-400 mb-1">Connected Components</h4>
              <p className="text-sm">Find all vertices reachable from a source</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-md p-3">
              <h4 className="font-medium text-purple-400 mb-1">Bipartite Check</h4>
              <p className="text-sm">Check if graph is bipartite (2-colorable)</p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
              <h4 className="font-medium text-red-400 mb-1">Social Network Analysis</h4>
              <p className="text-sm">Find friends, degrees of separation</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">BFS Complexity Analysis</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Time Complexity</h4>
              <p className="text-sm">O(V + E)</p>
              <p className="text-xs mt-2 text-gray-400">Visit each vertex once, each edge twice</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Space Complexity</h4>
              <p className="text-sm">O(V)</p>
              <p className="text-xs mt-2 text-gray-400">For visited array and queue</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Bipartite Graph Check with BFS</h2>

          <CodeBlock
            title="Check if Graph is Bipartite"
            language="java"
            code={`public class BipartiteCheck {
    private List<Integer>[] adj;
    private int V;
    
    public BipartiteCheck(int V) {
        this.V = V;
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    public void addEdge(int u, int v) {
        adj[u].add(v);
        adj[v].add(u);
    }
    
    // Check if graph is bipartite (can be 2-colored)
    public boolean isBipartite() {
        int[] color = new int[V];
        Arrays.fill(color, -1);  // -1 = uncolored, 0 = color0, 1 = color1
        
        // Check each connected component
        for (int i = 0; i < V; i++) {
            if (color[i] == -1) {
                if (!bfsColor(i, color)) {
                    return false;
                }
            }
        }
        return true;
    }
    
    private boolean bfsColor(int start, int[] color) {
        Queue<Integer> queue = new LinkedList<>();
        queue.add(start);
        color[start] = 0;
        
        while (!queue.isEmpty()) {
            int v = queue.remove();
            
            for (int neighbor : adj[v]) {
                if (color[neighbor] == -1) {
                    // Color with opposite color
                    color[neighbor] = 1 - color[v];
                    queue.add(neighbor);
                } else if (color[neighbor] == color[v]) {
                    // Adjacent vertices have same color - not bipartite
                    return false;
                }
            }
        }
        return true;
    }
    
    public static void main(String[] args) {
        BipartiteCheck g = new BipartiteCheck(4);
        g.addEdge(0, 1);
        g.addEdge(1, 2);
        g.addEdge(2, 3);
        g.addEdge(3, 0);  // Even cycle - bipartite
        
        System.out.println("Is bipartite: " + g.isBipartite());  // true
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">BFS vs DFS</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs mt-4">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 px-2">Aspect</th>
                  <th className="text-left py-2 px-2">BFS</th>
                  <th className="text-left py-2 px-2">DFS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Data Structure</td>
                  <td>Queue (FIFO)</td>
                  <td>Stack or Recursion (LIFO)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Traversal Order</td>
                  <td>Level by level</td>
                  <td>Deep then backtrack</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Time</td>
                  <td>O(V + E)</td>
                  <td>O(V + E)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Space</td>
                  <td>O(V) - queue size</td>
                  <td>O(V) - recursion depth</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Shortest Path</td>
                  <td>✓ Finds optimal</td>
                  <td>✗ May not be optimal</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Cycle Detection</td>
                  <td>✓ Can detect</td>
                  <td>✓ Better for this</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Implementation</td>
                  <td>Always iterative</td>
                  <td>Can be recursive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <InteractiveExercise
          title="Implement BFS"
          description="Implement BFS traversal using a queue"
          initialCode={`import java.util.*;

public class BFS {
    private List<Integer>[] adj;
    private int V;
    
    public BFS(int V) {
        this.V = V;
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    public void addEdge(int u, int v) {
        adj[u].add(v);
        adj[v].add(u);
    }
    
    public List<Integer> bfs(int start) {
        // TODO: Create visited array
        // TODO: Create queue and add start vertex
        // TODO: While queue not empty: remove, add to result, add neighbors
        // TODO: Return result
        return null;
    }
    
    public static void main(String[] args) {
        BFS g = new BFS(4);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        
        System.out.println(g.bfs(0));
    }
}`}
          solution={`import java.util.*;

public class BFS {
    private List<Integer>[] adj;
    private int V;
    
    public BFS(int V) {
        this.V = V;
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    public void addEdge(int u, int v) {
        adj[u].add(v);
        adj[v].add(u);
    }
    
    public List<Integer> bfs(int start) {
        List<Integer> order = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        queue.add(start);
        visited[start] = true;
        
        while (!queue.isEmpty()) {
            int v = queue.remove();
            order.add(v);
            
            for (int neighbor : adj[v]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
        
        return order;
    }
    
    public static void main(String[] args) {
        BFS g = new BFS(4);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        
        System.out.println(g.bfs(0));
    }
}`}
          expectedOutput={`[0, 1, 2, 3]`}
        />

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>BFS explores graph level by level using a queue</li>
            <li>Guarantees shortest path in unweighted graphs</li>
            <li>Time complexity O(V + E) like DFS</li>
            <li>Space complexity O(V) for queue and visited array</li>
            <li>Always iterative (uses explicit queue)</li>
            <li>Better than DFS for shortest path problems</li>
            <li>Foundation for more complex algorithms (Dijkstra, Prim's)</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
