import { TutorialLayout } from "@/components/graph-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function DFSPage() {
  return (
    <TutorialLayout
      title="Depth-First Search (DFS)"
      description="Learn the DFS graph traversal algorithm"
      currentStep={3}
      totalSteps={6}
      prevHref="/tutorials/graphs/graph-representation"
      nextHref="/tutorials/graphs/breadth-first-search"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">What is Depth-First Search?</h2>
          <p className="mb-4">
            Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible
            along each branch before backtracking. It uses a stack (LIFO) to keep track of vertices
            to visit next. DFS is fundamental for many graph algorithms.
          </p>

          <p className="mb-4">
            DFS can be implemented iteratively using a stack or recursively using the call stack.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How DFS Works</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <h3 className="font-medium text-blue-400 mb-3">DFS Algorithm Steps</h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Start at a source vertex</li>
              <li>Mark it as visited</li>
              <li>Visit each unvisited neighbor recursively</li>
              <li>Continue until all reachable vertices are visited</li>
              <li>Backtrack if a vertex has no unvisited neighbors</li>
            </ol>
          </div>

          <CodeBlock
            title="DFS Traversal - Visual Example"
            language="java"
            code={`// Graph: 0 - 1 - 3
//         |   |
//         2   4

// DFS from vertex 0:
// Step 1: Visit 0 (visited: {0})
// Step 2: Visit neighbor 1 (visited: {0, 1})
// Step 3: Visit neighbor 3 (visited: {0, 1, 3})
// Step 4: No unvisited neighbors of 3, backtrack to 1
// Step 5: Visit neighbor 4 (visited: {0, 1, 3, 4})
// Step 6: No unvisited neighbors, backtrack to 1
// Step 7: No unvisited neighbors, backtrack to 0
// Step 8: Visit neighbor 2 (visited: {0, 1, 3, 4, 2})

// DFS Order: 0 → 1 → 3 → 4 → 2
// Pre-order: 0, 1, 3, 4, 2 (visit when entering)`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Recursive DFS Implementation</h2>

          <CodeBlock
            title="DFS - Recursive Approach"
            language="java"
            code={`public class DFSRecursive {
    private List<Integer>[] adj;
    private boolean[] visited;
    private List<Integer> traversalOrder;
    
    public DFSRecursive(int V) {
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    public void addEdge(int u, int v) {
        adj[u].add(v);
        adj[v].add(u);
    }
    
    // Main DFS method
    public List<Integer> dfs(int start) {
        visited = new boolean[adj.length];
        traversalOrder = new ArrayList<>();
        dfsHelper(start);
        return traversalOrder;
    }
    
    // Helper method (recursive)
    private void dfsHelper(int v) {
        // Mark as visited
        visited[v] = true;
        traversalOrder.add(v);
        
        // Visit all unvisited neighbors
        for (int neighbor : adj[v]) {
            if (!visited[neighbor]) {
                dfsHelper(neighbor);
            }
        }
        // Backtracking happens automatically via recursion
    }
    
    public static void main(String[] args) {
        DFSRecursive g = new DFSRecursive(5);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        g.addEdge(1, 4);
        
        List<Integer> result = g.dfs(0);
        System.out.println("DFS traversal: " + result);
        // Output: [0, 1, 3, 4, 2] or [0, 1, 4, 3, 2] (order may vary)
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Iterative DFS Implementation</h2>

          <CodeBlock
            title="DFS - Iterative Approach (Using Stack)"
            language="java"
            code={`public class DFSIterative {
    private List<Integer>[] adj;
    private int V;
    
    public DFSIterative(int V) {
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
    
    // Iterative DFS using stack
    public List<Integer> dfs(int start) {
        List<Integer> traversalOrder = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Stack<Integer> stack = new Stack<>();
        
        // Push start vertex
        stack.push(start);
        
        while (!stack.isEmpty()) {
            // Pop vertex
            int v = stack.pop();
            
            if (!visited[v]) {
                visited[v] = true;
                traversalOrder.add(v);
                
                // Push unvisited neighbors
                // Add in reverse order for left-to-right traversal
                for (int i = adj[v].size() - 1; i >= 0; i--) {
                    int neighbor = adj[v].get(i);
                    if (!visited[neighbor]) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        
        return traversalOrder;
    }
    
    public static void main(String[] args) {
        DFSIterative g = new DFSIterative(5);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        g.addEdge(1, 4);
        
        List<Integer> result = g.dfs(0);
        System.out.println("DFS traversal: " + result);
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">DFS Applications</h2>
          
          <div className="space-y-3 mb-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Detecting Cycles</h4>
              <p className="text-sm">Use DFS to detect if a graph contains cycles</p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Topological Sorting</h4>
              <p className="text-sm">Sort DAG vertices using DFS finish times</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <h4 className="font-medium text-yellow-400 mb-1">Connected Components</h4>
              <p className="text-sm">Find all connected components in a graph</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-md p-3">
              <h4 className="font-medium text-purple-400 mb-1">Path Finding</h4>
              <p className="text-sm">Find path between two vertices</p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
              <h4 className="font-medium text-red-400 mb-1">Strongly Connected Components</h4>
              <p className="text-sm">Find SCCs in directed graphs</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">DFS Complexity Analysis</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Time Complexity</h4>
              <p className="text-sm">O(V + E)</p>
              <p className="text-xs mt-2 text-gray-400">Visit each vertex once, each edge twice</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Space Complexity</h4>
              <p className="text-sm">O(V)</p>
              <p className="text-xs mt-2 text-gray-400">For visited array and recursion/stack</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Cycle Detection with DFS</h2>

          <CodeBlock
            title="Detecting Cycles in Undirected Graph"
            language="java"
            code={`public class CycleDetection {
    private List<Integer>[] adj;
    private boolean[] visited;
    
    public CycleDetection(int V) {
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    public void addEdge(int u, int v) {
        adj[u].add(v);
        adj[v].add(u);
    }
    
    // Check if cycle exists in graph
    public boolean hasCycle() {
        visited = new boolean[adj.length];
        
        // Check each connected component
        for (int i = 0; i < adj.length; i++) {
            if (!visited[i]) {
                if (dfsHasCycle(i, -1)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    // DFS to detect cycle
    // parent is the vertex we came from
    private boolean dfsHasCycle(int v, int parent) {
        visited[v] = true;
        
        for (int neighbor : adj[v]) {
            if (!visited[neighbor]) {
                if (dfsHasCycle(neighbor, v)) {
                    return true;
                }
            } else if (neighbor != parent) {
                // Found back edge (cycle)
                return true;
            }
        }
        return false;
    }
    
    public static void main(String[] args) {
        CycleDetection g = new CycleDetection(4);
        g.addEdge(0, 1);
        g.addEdge(1, 2);
        g.addEdge(2, 3);
        g.addEdge(3, 0);  // Creates cycle
        
        System.out.println("Has cycle: " + g.hasCycle());  // true
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">DFS Characteristics</h2>
          
          <div className="space-y-3">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium text-blue-400 mb-2">Recursive vs Iterative</h3>
              <p className="text-sm mb-2"><span className="font-medium">Recursive:</span> Natural, concise, uses call stack</p>
              <p className="text-sm"><span className="font-medium">Iterative:</span> More control, explicit stack, avoids stack overflow</p>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium text-green-400 mb-2">Order Variants</h3>
              <p className="text-sm mb-2"><span className="font-medium">Pre-order:</span> Process vertex before recursing (visit)</p>
              <p className="text-sm mb-2"><span className="font-medium">Post-order:</span> Process vertex after recursing (finish)</p>
              <p className="text-sm"><span className="font-medium">In-order:</span> Process between recursive calls</p>
            </div>
          </div>
        </section>

        <InteractiveExercise
          title="Implement DFS"
          description="Implement a recursive DFS traversal"
          initialCode={`public class DFS {
    private List<Integer>[] adj;
    private boolean[] visited;
    private List<Integer> order;
    
    public DFS(int V) {
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    public void addEdge(int u, int v) {
        adj[u].add(v);
        adj[v].add(u);
    }
    
    public List<Integer> dfs(int start) {
        // TODO: Initialize visited array and order list
        // TODO: Call dfsHelper
        // TODO: Return order
        return null;
    }
    
    private void dfsHelper(int v) {
        // TODO: Mark as visited
        // TODO: Add to order
        // TODO: Recursively visit unvisited neighbors
    }
    
    public static void main(String[] args) {
        DFS g = new DFS(4);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        
        System.out.println(g.dfs(0));
    }
}`}
          solution={`public class DFS {
    private List<Integer>[] adj;
    private boolean[] visited;
    private List<Integer> order;
    
    public DFS(int V) {
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    public void addEdge(int u, int v) {
        adj[u].add(v);
        adj[v].add(u);
    }
    
    public List<Integer> dfs(int start) {
        visited = new boolean[adj.length];
        order = new ArrayList<>();
        dfsHelper(start);
        return order;
    }
    
    private void dfsHelper(int v) {
        visited[v] = true;
        order.add(v);
        
        for (int neighbor : adj[v]) {
            if (!visited[neighbor]) {
                dfsHelper(neighbor);
            }
        }
    }
    
    public static void main(String[] args) {
        DFS g = new DFS(4);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        
        System.out.println(g.dfs(0));
    }
}`}
          expectedOutput={`[0, 1, 3, 2]`}
        />

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>DFS explores graph deeply before backtracking</li>
            <li>Time complexity O(V + E) makes it efficient</li>
            <li>Can be implemented recursively or iteratively</li>
            <li>Useful for cycle detection, topological sorting, connectivity</li>
            <li>Backtracking is inherent with recursive implementation</li>
            <li>Space complexity depends on graph structure</li>
            <li>Foundation for many advanced graph algorithms</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
