import { TutorialLayout } from "@/components/graph-layout"
import { CodeBlock } from "@/components/code-block"

export default function GraphBestPracticesPage() {
  return (
    <TutorialLayout
      title="Graph Best Practices"
      description="Best practices and optimization tips for working with graphs"
      currentStep={6}
      totalSteps={6}
      prevHref="/tutorials/graphs/applications"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Graph Programming Best Practices</h2>
          <p className="mb-4">
            Following these best practices will help you write efficient, maintainable,
            and correct graph algorithms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Choose the Right Representation</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              The choice between adjacency list, adjacency matrix, and edge list
              significantly impacts algorithm performance.
            </p>

            <CodeBlock
              title="Choosing Graph Representation"
              language="java"
              code={`public class GraphRepresentationSelection {
    
    // ✅ For sparse graphs - use adjacency list
    public static class SparseGraph {
        private List<Integer>[] adj;
        private int V, E;
        // Best for: Social networks (billions of vertices, edge/vertex ~= 5)
        // Space: O(V + E)
        // Operations: Get neighbors O(degree), Check edge O(degree)
    }
    
    // ✅ For dense graphs - use adjacency matrix
    public static class DenseGraph {
        private boolean[][] adjMatrix;
        private int V;
        // Best for: Complete graphs, fully connected components
        // Space: O(V²)
        // Operations: Get neighbors O(V), Check edge O(1)
    }
    
    // ✅ For edge-heavy algorithms - use edge list
    public static class EdgeListGraph {
        private List<Edge> edges;
        // Best for: Kruskal's MST, Bellman-Ford
        // Operations: Iterate all edges O(E)
    }
    
    // Calculate edge density to decide
    public static String recommendRepresentation(int V, int E) {
        double density = (2.0 * E) / (V * (V - 1));
        
        if (density < 0.1) {
            return "Use Adjacency List (sparse graph)";
        } else if (density > 0.5) {
            return "Use Adjacency Matrix (dense graph)";
        } else {
            return "Either works - choose based on operations";
        }
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Rule of thumb:</span> Adjacency list for most cases (sparse graphs more common in real world)</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Validate Input & Handle Edge Cases</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Always validate graph inputs and handle edge cases to prevent crashes.
            </p>

            <CodeBlock
              title="Input Validation for Graphs"
              language="java"
              code={`public class GraphValidation {
    private List<Integer>[] adj;
    private int V;
    
    public GraphValidation(int V) {
        // ✅ Validate vertex count
        if (V <= 0) {
            throw new IllegalArgumentException("V must be positive");
        }
        this.V = V;
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    public void addEdge(int u, int v, int weight) {
        // ✅ Validate vertex indices
        if (u < 0 || u >= V || v < 0 || v >= V) {
            throw new IllegalArgumentException("Invalid vertex index");
        }
        
        // ✅ Validate weights
        if (weight < 0) {
            throw new IllegalArgumentException("Weight cannot be negative");
        }
        
        // ✅ Prevent self-loops if not allowed
        if (u == v) {
            throw new IllegalArgumentException("Self-loops not allowed");
        }
        
        adj[u].add(v);
    }
    
    public List<Integer> bfs(int start) {
        // ✅ Validate start vertex
        if (start < 0 || start >= V) {
            throw new IllegalArgumentException("Invalid start vertex");
        }
        
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Queue<Integer> q = new LinkedList<>();
        
        q.add(start);
        visited[start] = true;
        
        while (!q.isEmpty()) {
            int u = q.poll();
            result.add(u);
            
            // ✅ Handle empty neighbor lists
            if (adj[u] != null) {
                for (int v : adj[u]) {
                    if (!visited[v]) {
                        visited[v] = true;
                        q.add(v);
                    }
                }
            }
        }
        
        return result;
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Always check:</span> Vertex bounds, negative weights, disconnected graphs</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Memoize & Avoid Recomputation</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Cache results of expensive computations to avoid redundant work.
            </p>

            <CodeBlock
              title="Memoization in Graph Algorithms"
              language="java"
              code={`public class GraphMemoization {
    private List<Integer>[] adj;
    private int V;
    
    // ❌ DON'T: Recompute same path multiple times
    public int pathCountBad(int u, int v) {
        if (u == v) return 1;
        
        int count = 0;
        for (int neighbor : adj[u]) {
            count += pathCountBad(neighbor, v);  // Recomputation!
        }
        return count;
    }
    
    // ✅ DO: Memoize results
    private Map<String, Integer> memo = new HashMap<>();
    
    public int pathCountGood(int u, int v) {
        String key = u + "," + v;
        if (memo.containsKey(key)) {
            return memo.get(key);
        }
        
        if (u == v) return 1;
        
        int count = 0;
        for (int neighbor : adj[u]) {
            count += pathCountGood(neighbor, v);
        }
        
        memo.put(key, count);
        return count;
    }
    
    // ✅ OR: Use bottom-up dynamic programming
    public int[] shortestDistances(int source) {
        // Compute once
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[source] = 0;
        
        // Now queries are O(1)
        // int distance = dist[target];
        
        return dist;
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Tip:</span> Use HashMap for memoization, precompute if querying multiple times</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Use Visited Set for Cycle Detection</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Always track visited nodes to prevent infinite loops and ensure correctness.
            </p>

            <CodeBlock
              title="Proper Visited Tracking"
              language="java"
              code={`public class ProperVisitedTracking {
    private List<Integer>[] adj;
    private int V;
    
    // ❌ DON'T: Forget visited set (infinite loop on cycles!)
    public void traverseBad(int u) {
        System.out.println(u);
        for (int v : adj[u]) {
            traverseBad(v);  // Will infinite loop if graph has cycles
        }
    }
    
    // ✅ DO: Use visited set
    public void traverseGood(int u, boolean[] visited) {
        visited[u] = true;
        System.out.println(u);
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                traverseGood(v, visited);
            }
        }
    }
    
    // ✅ OR: Handle visited in caller
    public List<Integer> dfs(int start) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        dfsHelper(start, visited, result);
        return result;
    }
    
    private void dfsHelper(int u, boolean[] visited, List<Integer> result) {
        visited[u] = true;
        result.add(u);
        
        for (int v : adj[u]) {
            if (!visited[v]) {
                dfsHelper(v, visited, result);
            }
        }
    }
    
    // ✅ BEST: Use enum for 3-state tracking (detecting cycles during traversal)
    enum State { WHITE, GRAY, BLACK }
    
    public boolean hasCycle() {
        State[] states = new State[V];
        Arrays.fill(states, State.WHITE);
        
        for (int i = 0; i < V; i++) {
            if (states[i] == State.WHITE) {
                if (hasCycleDFS(i, states)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    private boolean hasCycleDFS(int u, State[] states) {
        states[u] = State.GRAY;
        
        for (int v : adj[u]) {
            if (states[v] == State.GRAY) {
                return true;  // Back edge = cycle
            }
            if (states[v] == State.WHITE) {
                if (hasCycleDFS(v, states)) {
                    return true;
                }
            }
        }
        
        states[u] = State.BLACK;
        return false;
    }
}`}
            />
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Critical:</span> 3-state tracking (white/gray/black) for detecting cycles during traversal</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Optimize Space with Efficient Data Structures</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Choose data structures that minimize memory while maintaining performance.
            </p>

            <CodeBlock
              title="Space-Efficient Graph Structures"
              language="java"
              code={`public class EfficientGraphStructures {
    // ❌ DON'T: Store duplicate edges
    private List<Integer>[] adj;  // wastes space if not careful
    
    // ✅ DO: Use appropriate structures
    
    // For very sparse graph, use only adjacency list
    private List<Integer>[] sparseAdj;
    
    // For weighted edges, avoid separate matrix
    private List<Edge>[] weightedAdj;
    
    // Use primitives arrays when possible
    private int[][] intMatrix;  // Better than Integer[][]
    
    // For large boolean matrices, use BitSet
    private BitSet[] bitSetAdj;
    
    // Example with weighted edges
    static class Edge {
        int to, weight;
        Edge(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }
    
    // Memory comparison:
    // List<Integer>[]: ~40 bytes per list + 24 per entry
    // BitSet: ~56 + V/8 bytes total
    
    public static void main(String[] args) {
        int V = 1_000_000;
        
        // For sparse graph with ~5M edges
        List<Integer>[] adj = new ArrayList[V];  // ~5MB for array + lists
        
        // For dense graph checking
        BitSet[] bitset = new BitSet[V];  // ~125MB for V=1000000
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Memory tips:</span> Use primitives, BitSet for boolean matrices, avoid unnecessary copies</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Handle Disconnected Components</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Many graphs have multiple disconnected components. Handle them properly.
            </p>

            <CodeBlock
              title="Handling Disconnected Graphs"
              language="java"
              code={`public class DisconnectedGraphs {
    private List<Integer>[] adj;
    private int V;
    
    // ❌ DON'T: Assume single connected component
    public List<Integer> bfsSingle(int start) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Queue<Integer> q = new LinkedList<>();
        
        q.add(start);
        visited[start] = true;
        
        while (!q.isEmpty()) {
            int u = q.poll();
            result.add(u);
            
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    q.add(v);
                }
            }
        }
        
        return result;  // Only finds component containing start!
    }
    
    // ✅ DO: Handle all components
    public List<List<Integer>> getAllComponents() {
        List<List<Integer>> components = new ArrayList<>();
        boolean[] visited = new boolean[V];
        
        // Visit each component
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                List<Integer> component = new ArrayList<>();
                bfsComponent(i, visited, component);
                components.add(component);
            }
        }
        
        return components;
    }
    
    private void bfsComponent(int start, boolean[] visited, List<Integer> component) {
        Queue<Integer> q = new LinkedList<>();
        q.add(start);
        visited[start] = true;
        
        while (!q.isEmpty()) {
            int u = q.poll();
            component.add(u);
            
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    q.add(v);
                }
            }
        }
    }
    
    public int getComponentCount() {
        int count = 0;
        boolean[] visited = new boolean[V];
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                dfs(i, visited);
                count++;
            }
        }
        
        return count;
    }
    
    private void dfs(int u, boolean[] visited) {
        visited[u] = true;
        for (int v : adj[u]) {
            if (!visited[v]) {
                dfs(v, visited);
            }
        }
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Remember:</span> Use outer loop to visit all components, not just one</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Algorithm Selection Guide</h2>
          
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Traversal Needed?</h4>
              <p className="text-sm">Use BFS for level-order, DFS for depth-first (or space-restricted)</p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Shortest Path?</h4>
              <p className="text-sm">BFS (unweighted), Dijkstra (non-negative), Bellman-Ford (negative)</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <h4 className="font-medium text-yellow-400 mb-1">Minimum Spanning Tree?</h4>
              <p className="text-sm">Prim's or Kruskal's - both O(E log V)</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-md p-3">
              <h4 className="font-medium text-purple-400 mb-1">Connectivity Analysis?</h4>
              <p className="text-sm">Union-Find (Disjoint Set) for efficient component tracking</p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
              <h4 className="font-medium text-red-400 mb-1">Dependency Resolution?</h4>
              <p className="text-sm">Topological sort (DFS-based) for DAGs</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Performance Debugging Checklist</h2>
          
          <div className="space-y-2">
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm">☐ Did you initialize all visited arrays/sets?</p>
            </div>
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm">☐ Are vertex indices within bounds?</p>
            </div>
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm">☐ Are you handling disconnected components?</p>
            </div>
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm">☐ Is there a possibility of infinite loops?</p>
            </div>
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm">☐ Are you memoizing expensive calculations?</p>
            </div>
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm">☐ Is your space complexity reasonable for the problem?</p>
            </div>
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm">☐ Have you tested with empty graphs and single vertices?</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Choose adjacency list for most cases (sparse graphs)</li>
            <li>Always validate input and handle edge cases</li>
            <li>Use visited sets to prevent infinite loops</li>
            <li>Memoize expensive computations</li>
            <li>Handle disconnected components explicitly</li>
            <li>Use appropriate algorithm for each problem type</li>
            <li>Optimize space with efficient data structures</li>
            <li>Test thoroughly with edge cases and large graphs</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
