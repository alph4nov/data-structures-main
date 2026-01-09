import { TutorialLayout } from "@/components/graph-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function GraphRepresentationPage() {
  return (
    <TutorialLayout
      title="Graph Representation"
      description="Learn different ways to represent graphs in code"
      currentStep={2}
      totalSteps={6}
      prevHref="/tutorials/graphs/introduction"
      nextHref="/tutorials/graphs/depth-first-search"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Graph Representation Methods</h2>
          <p className="mb-4">
            Graphs can be represented in different ways, each with different trade-offs.
            The choice of representation affects the efficiency of operations and memory usage.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Adjacency List</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Store a list of neighbors for each vertex. Most common representation for sparse graphs.
            </p>

            <CodeBlock
              title="Adjacency List Implementation"
              language="java"
              code={`public class AdjacencyListGraph {
    private List<Integer>[] adj;
    private int V;
    private int E;
    
    // Constructor
    public AdjacencyListGraph(int V) {
        this.V = V;
        this.E = 0;
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    // Add edge (undirected)
    public void addEdge(int u, int v) {
        adj[u].add(v);
        adj[v].add(u);
        E++;
    }
    
    // Add edge (directed)
    public void addDirectedEdge(int u, int v) {
        adj[u].add(v);
        E++;
    }
    
    // Get neighbors of vertex
    public List<Integer> getNeighbors(int v) {
        return adj[v];
    }
    
    // Get all edges
    public List<String> getEdges() {
        List<String> edges = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            for (int neighbor : adj[i]) {
                edges.add(i + " - " + neighbor);
            }
        }
        return edges;
    }
    
    public static void main(String[] args) {
        AdjacencyListGraph g = new AdjacencyListGraph(4);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 2);
        g.addEdge(2, 3);
        
        System.out.println("Neighbors of 0: " + g.getNeighbors(0));
        System.out.println("Neighbors of 2: " + g.getNeighbors(2));
    }
}`}
            />
          </div>

          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Advantages</h4>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>Space efficient: O(V + E)</li>
                <li>Fast to get neighbors: O(degree)</li>
                <li>Good for sparse graphs</li>
                <li>Natural for iterating edges</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
              <h4 className="font-medium text-red-400 mb-1">Disadvantages</h4>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>Check edge existence: O(degree)</li>
                <li>Potentially unbalanced lists</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Adjacency Matrix</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Store a 2D array where matrix[u][v] indicates if edge exists between u and v.
              Good for dense graphs with fast edge lookups.
            </p>

            <CodeBlock
              title="Adjacency Matrix Implementation"
              language="java"
              code={`public class AdjacencyMatrixGraph {
    private int[][] matrix;
    private int V;
    private int E;
    
    // Constructor
    public AdjacencyMatrixGraph(int V) {
        this.V = V;
        this.E = 0;
        matrix = new int[V][V];
        // Initialize with 0 (no edges)
    }
    
    // Add edge (undirected)
    public void addEdge(int u, int v) {
        if (matrix[u][v] == 0) {
            matrix[u][v] = 1;
            matrix[v][u] = 1;
            E++;
        }
    }
    
    // Add edge (directed)
    public void addDirectedEdge(int u, int v) {
        if (matrix[u][v] == 0) {
            matrix[u][v] = 1;
            E++;
        }
    }
    
    // Check if edge exists
    public boolean hasEdge(int u, int v) {
        return matrix[u][v] == 1;
    }
    
    // Get neighbors of vertex
    public List<Integer> getNeighbors(int v) {
        List<Integer> neighbors = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            if (matrix[v][i] == 1) {
                neighbors.add(i);
            }
        }
        return neighbors;
    }
    
    public static void main(String[] args) {
        AdjacencyMatrixGraph g = new AdjacencyMatrixGraph(4);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 2);
        g.addEdge(2, 3);
        
        System.out.println("Edge 0-1 exists: " + g.hasEdge(0, 1));
        System.out.println("Edge 0-3 exists: " + g.hasEdge(0, 3));
        System.out.println("Neighbors of 0: " + g.getNeighbors(0));
    }
}`}
            />
          </div>

          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Advantages</h4>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>Fast edge lookup: O(1)</li>
                <li>Fast edge deletion: O(1)</li>
                <li>Good for dense graphs</li>
                <li>Simple to implement</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
              <h4 className="font-medium text-red-400 mb-1">Disadvantages</h4>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>Space inefficient: O(V²)</li>
                <li>Get neighbors: O(V) - must scan entire row</li>
                <li>Wasteful for sparse graphs</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Edge List</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Store all edges as pairs of vertices. Simple but less efficient for most operations.
            </p>

            <CodeBlock
              title="Edge List Implementation"
              language="java"
              code={`public class EdgeListGraph {
    static class Edge {
        int u, v, weight;
        
        Edge(int u, int v, int weight) {
            this.u = u;
            this.v = v;
            this.weight = weight;
        }
    }
    
    private List<Edge> edges;
    private int V;
    
    // Constructor
    public EdgeListGraph(int V) {
        this.V = V;
        this.edges = new ArrayList<>();
    }
    
    // Add weighted edge
    public void addEdge(int u, int v, int weight) {
        edges.add(new Edge(u, v, weight));
    }
    
    // Get all edges
    public List<Edge> getEdges() {
        return edges;
    }
    
    // Get neighbors of vertex (O(E) - inefficient)
    public List<Integer> getNeighbors(int v) {
        List<Integer> neighbors = new ArrayList<>();
        for (Edge e : edges) {
            if (e.u == v) {
                neighbors.add(e.v);
            } else if (e.v == v) {
                neighbors.add(e.u);
            }
        }
        return neighbors;
    }
    
    public static void main(String[] args) {
        EdgeListGraph g = new EdgeListGraph(4);
        g.addEdge(0, 1, 5);
        g.addEdge(0, 2, 3);
        g.addEdge(1, 2, 2);
        g.addEdge(2, 3, 4);
        
        System.out.println("All edges:");
        for (Edge e : g.getEdges()) {
            System.out.println(e.u + " - " + e.v + " (weight: " + e.weight + ")");
        }
    }
}`}
            />
          </div>

          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Advantages</h4>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>Simple to understand</li>
                <li>Good for algorithms that process all edges</li>
                <li>Supports weighted edges naturally</li>
              </ul>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
              <h4 className="font-medium text-red-400 mb-1">Disadvantages</h4>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>Get neighbors is O(E)</li>
                <li>Check edge existence: O(E)</li>
                <li>Inefficient for most operations</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Weighted Graph Example</h2>

          <CodeBlock
            title="Weighted Adjacency List"
            language="java"
            code={`public class WeightedGraph {
    static class Edge {
        int to, weight;
        
        Edge(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }
    
    private List<Edge>[] adj;
    private int V;
    
    public WeightedGraph(int V) {
        this.V = V;
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    // Add weighted edge
    public void addEdge(int u, int v, int weight) {
        adj[u].add(new Edge(v, weight));
        adj[v].add(new Edge(u, weight));  // Undirected
    }
    
    // Get weighted neighbors
    public List<Edge> getNeighbors(int v) {
        return adj[v];
    }
    
    public static void main(String[] args) {
        WeightedGraph g = new WeightedGraph(4);
        g.addEdge(0, 1, 4);
        g.addEdge(0, 2, 2);
        g.addEdge(1, 2, 1);
        g.addEdge(1, 3, 5);
        g.addEdge(2, 3, 8);
        
        // Print weighted neighbors of vertex 0
        System.out.println("Neighbors of 0:");
        for (Edge e : g.getNeighbors(0)) {
            System.out.println("  to: " + e.to + ", weight: " + e.weight);
        }
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Comparison Table</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs mt-4">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 px-2">Operation</th>
                  <th className="text-left py-2 px-2">Adjacency List</th>
                  <th className="text-left py-2 px-2">Adjacency Matrix</th>
                  <th className="text-left py-2 px-2">Edge List</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Space</td>
                  <td>O(V+E)</td>
                  <td>O(V²)</td>
                  <td>O(E)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Add Edge</td>
                  <td>O(1)</td>
                  <td>O(1)</td>
                  <td>O(1)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Remove Edge</td>
                  <td>O(degree)</td>
                  <td>O(1)</td>
                  <td>O(E)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Check Edge</td>
                  <td>O(degree)</td>
                  <td>O(1)</td>
                  <td>O(E)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Get Neighbors</td>
                  <td>O(degree)</td>
                  <td>O(V)</td>
                  <td>O(E)</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Best For</td>
                  <td>Sparse graphs</td>
                  <td>Dense graphs</td>
                  <td>Edge processing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <InteractiveExercise
          title="Implement Adjacency List"
          description="Create a graph and add edges using adjacency list"
          initialCode={`public class AdjacencyListGraph {
    private List<Integer>[] adj;
    private int V;
    
    public AdjacencyListGraph(int V) {
        this.V = V;
        adj = new ArrayList[V];
        // TODO: Initialize all adjacency lists
    }
    
    public void addEdge(int u, int v) {
        // TODO: Add edge in both directions (undirected)
    }
    
    public List<Integer> getNeighbors(int v) {
        // TODO: Return neighbors of vertex v
        return null;
    }
    
    public static void main(String[] args) {
        AdjacencyListGraph g = new AdjacencyListGraph(4);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        
        System.out.println(g.getNeighbors(0));
        System.out.println(g.getNeighbors(1));
    }
}`}
          solution={`public class AdjacencyListGraph {
    private List<Integer>[] adj;
    private int V;
    
    public AdjacencyListGraph(int V) {
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
    
    public List<Integer> getNeighbors(int v) {
        return adj[v];
    }
    
    public static void main(String[] args) {
        AdjacencyListGraph g = new AdjacencyListGraph(4);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        
        System.out.println(g.getNeighbors(0));
        System.out.println(g.getNeighbors(1));
    }
}`}
          expectedOutput={`[1, 2]
[0, 3]`}
        />

        <section>
          <h2 className="text-xl font-semibold mb-3">When to Use Each Representation</h2>
          
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Adjacency List</h4>
              <p className="text-sm">Most common choice for general-purpose graph algorithms like DFS, BFS, Dijkstra</p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Adjacency Matrix</h4>
              <p className="text-sm">Use when graph is dense or you need frequent edge lookups</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <h4 className="font-medium text-yellow-400 mb-1">Edge List</h4>
              <p className="text-sm">Use for algorithms that process all edges (Kruskal's, Bellman-Ford)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Adjacency list is most popular for sparse graphs (most real graphs)</li>
            <li>Adjacency matrix better for dense graphs with frequent lookups</li>
            <li>Each representation has different time/space trade-offs</li>
            <li>Weighted graphs extend representations with weight information</li>
            <li>Choose representation based on your specific use case</li>
            <li>Most graph algorithms work with adjacency lists</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
