import { TutorialLayout } from "@/components/graph-layout"
import { CodeBlock } from "@/components/code-block"
import { InteractiveExercise } from "@/components/interactive-exercise"

export default function ShortestPathPage() {
  return (
    <TutorialLayout
      title="Shortest Path Algorithms"
      description="Learn algorithms for finding shortest paths in weighted graphs"
      currentStep={5}
      totalSteps={6}
      prevHref="/tutorials/graphs/breadth-first-search"
      nextHref="/tutorials/graphs/applications"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Shortest Path Algorithms</h2>
          <p className="mb-4">
            Finding the shortest path between vertices is a fundamental problem in graph theory with
            applications in navigation, networking, and optimization. Different algorithms excel
            in different scenarios based on edge weights and graph properties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Dijkstra's Algorithm</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Dijkstra's algorithm finds the shortest path from a source to all other vertices
              in a <strong>weighted graph with non-negative edge weights</strong>. It uses a greedy approach
              by always selecting the unvisited vertex with minimum distance.
            </p>

            <CodeBlock
              title="Dijkstra's Algorithm"
              language="java"
              code={`import java.util.*;

public class Dijkstra {
    static class Edge {
        int to, weight;
        Edge(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }
    
    private List<Edge>[] adj;
    private int V;
    
    public Dijkstra(int V) {
        this.V = V;
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    public void addEdge(int u, int v, int weight) {
        adj[u].add(new Edge(v, weight));
        adj[v].add(new Edge(u, weight));
    }
    
    // Dijkstra's algorithm
    public int[] dijkstra(int source) {
        int[] distance = new int[V];
        boolean[] visited = new boolean[V];
        
        // Initialize distances
        Arrays.fill(distance, Integer.MAX_VALUE);
        distance[source] = 0;
        
        // Use priority queue for efficiency
        PriorityQueue<Integer> pq = new PriorityQueue<>(
            (u, v) -> Integer.compare(distance[u], distance[v])
        );
        pq.add(source);
        
        while (!pq.isEmpty()) {
            int u = pq.poll();
            
            if (visited[u]) continue;
            visited[u] = true;
            
            // Relax edges
            for (Edge edge : adj[u]) {
                int v = edge.to;
                int weight = edge.weight;
                
                if (distance[u] + weight < distance[v]) {
                    distance[v] = distance[u] + weight;
                    pq.add(v);
                }
            }
        }
        
        return distance;
    }
    
    public static void main(String[] args) {
        Dijkstra g = new Dijkstra(5);
        g.addEdge(0, 1, 4);
        g.addEdge(0, 2, 2);
        g.addEdge(1, 2, 1);
        g.addEdge(1, 3, 5);
        g.addEdge(2, 3, 8);
        g.addEdge(2, 4, 10);
        g.addEdge(3, 4, 2);
        
        int[] distances = g.dijkstra(0);
        System.out.println("Shortest distances from 0:");
        for (int i = 0; i < distances.length; i++) {
            System.out.println("  to " + i + ": " + distances[i]);
        }
    }
}`}
            />
          </div>

          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Time Complexity</h4>
              <p className="text-sm">O((V + E) log V) with binary heap</p>
              <p className="text-xs mt-1">O(V²) with simple array implementation</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Requirements</h4>
              <p className="text-sm">Non-negative edge weights only</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Bellman-Ford Algorithm</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Bellman-Ford finds shortest paths even with <strong>negative edge weights</strong>.
              It's slower than Dijkstra but more versatile. It can also detect negative cycles.
            </p>

            <CodeBlock
              title="Bellman-Ford Algorithm"
              language="java"
              code={`public class BellmanFord {
    static class Edge {
        int u, v, weight;
        Edge(int u, int v, int weight) {
            this.u = u;
            this.v = v;
            this.weight = weight;
        }
    }
    
    private List<Edge> edges;
    private int V, E;
    
    public BellmanFord(int V) {
        this.V = V;
        edges = new ArrayList<>();
    }
    
    public void addEdge(int u, int v, int weight) {
        edges.add(new Edge(u, v, weight));
    }
    
    // Bellman-Ford algorithm
    public int[] bellmanFord(int source) {
        int[] distance = new int[V];
        Arrays.fill(distance, Integer.MAX_VALUE);
        distance[source] = 0;
        
        // Relax edges V-1 times
        for (int i = 0; i < V - 1; i++) {
            for (Edge edge : edges) {
                if (distance[edge.u] != Integer.MAX_VALUE &&
                    distance[edge.u] + edge.weight < distance[edge.v]) {
                    distance[edge.v] = distance[edge.u] + edge.weight;
                }
            }
        }
        
        // Check for negative cycles
        for (Edge edge : edges) {
            if (distance[edge.u] != Integer.MAX_VALUE &&
                distance[edge.u] + edge.weight < distance[edge.v]) {
                System.out.println("Negative cycle detected!");
                return null;
            }
        }
        
        return distance;
    }
    
    public static void main(String[] args) {
        BellmanFord g = new BellmanFord(5);
        g.addEdge(0, 1, 4);
        g.addEdge(0, 2, 2);
        g.addEdge(1, 2, -3);  // Negative edge
        g.addEdge(1, 3, 5);
        g.addEdge(2, 3, 8);
        
        int[] distances = g.bellmanFord(0);
        if (distances != null) {
            System.out.println("Shortest distances: " + Arrays.toString(distances));
        }
    }
}`}
            />
          </div>

          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Time Complexity</h4>
              <p className="text-sm">O(VE) - slower but more flexible</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Advantages</h4>
              <p className="text-sm">Handles negative weights, detects negative cycles</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Floyd-Warshall Algorithm</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Floyd-Warshall finds shortest paths between <strong>all pairs of vertices</strong>.
              It's useful when you need distances from every vertex to every other vertex.
            </p>

            <CodeBlock
              title="Floyd-Warshall Algorithm"
              language="java"
              code={`public class FloydWarshall {
    private static final int INF = Integer.MAX_VALUE / 2;
    
    private int[][] dist;
    private int V;
    
    public FloydWarshall(int V) {
        this.V = V;
        dist = new int[V][V];
        
        // Initialize
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (i == j) {
                    dist[i][j] = 0;
                } else {
                    dist[i][j] = INF;
                }
            }
        }
    }
    
    public void addEdge(int u, int v, int weight) {
        dist[u][v] = weight;
    }
    
    // Floyd-Warshall: All pairs shortest path
    public void floydWarshall() {
        // For each intermediate vertex
        for (int k = 0; k < V; k++) {
            // For each pair of vertices
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    // If path through k is shorter
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
    }
    
    public int getDistance(int u, int v) {
        return dist[u][v] == INF ? -1 : dist[u][v];
    }
    
    public static void main(String[] args) {
        FloydWarshall g = new FloydWarshall(4);
        g.addEdge(0, 1, 5);
        g.addEdge(0, 3, 10);
        g.addEdge(1, 2, 3);
        g.addEdge(2, 3, 1);
        
        g.floydWarshall();
        
        System.out.println("All pairs shortest paths:");
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                int d = g.getDistance(i, j);
                System.out.print(d >= 0 ? d + " " : "- ");
            }
            System.out.println();
        }
    }
}`}
            />
          </div>

          <div className="space-y-3">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <h4 className="font-medium text-yellow-400 mb-1">Time Complexity</h4>
              <p className="text-sm">O(V³) - slower but solves all-pairs problem</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Use When</h4>
              <p className="text-sm">Need distances between all pairs of vertices</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Algorithm Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs mt-4">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 px-2">Algorithm</th>
                  <th className="text-left py-2 px-2">Time</th>
                  <th className="text-left py-2 px-2">Negative Weights</th>
                  <th className="text-left py-2 px-2">All Pairs</th>
                  <th className="text-left py-2 px-2">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Dijkstra</td>
                  <td>O((V+E)log V)</td>
                  <td>No</td>
                  <td>Single source</td>
                  <td>Most cases</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Bellman-Ford</td>
                  <td>O(VE)</td>
                  <td>Yes</td>
                  <td>Single source</td>
                  <td>Negative weights</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Floyd-Warshall</td>
                  <td>O(V³)</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Small graphs, all pairs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Algorithm Selection Guide</h2>
          
          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Use Dijkstra if</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>No negative weights</li>
                <li>Need shortest path from one source</li>
                <li>Graph is large and sparse</li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Use Bellman-Ford if</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Graph has negative edge weights</li>
                <li>Need to detect negative cycles</li>
                <li>Willing to accept O(VE) complexity</li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <h4 className="font-medium text-yellow-400 mb-1">Use Floyd-Warshall if</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Need all pairs shortest paths</li>
                <li>Graph is small (V &lt; 500)</li>
                <li>Simplicity more important than speed</li>
              </ul>
            </div>
          </div>
        </section>

        <InteractiveExercise
          title="Implement Dijkstra's Algorithm"
          description="Implement shortest path using Dijkstra's algorithm"
          initialCode={`import java.util.*;

public class DijkstraExercise {
    public static int[] dijkstra(List<Integer>[] adj, int[][] weights, int source) {
        int V = adj.length;
        int[] distance = new int[V];
        boolean[] visited = new boolean[V];
        
        // TODO: Initialize distances
        // TODO: Create priority queue
        // TODO: While queue not empty: update distances
        // TODO: Return distances
        
        return distance;
    }
}`}
          solution={`import java.util.*;

public class DijkstraExercise {
    public static int[] dijkstra(List<Integer>[] adj, int[][] weights, int source) {
        int V = adj.length;
        int[] distance = new int[V];
        boolean[] visited = new boolean[V];
        
        Arrays.fill(distance, Integer.MAX_VALUE);
        distance[source] = 0;
        
        PriorityQueue<Integer> pq = new PriorityQueue<>(
            (u, v) -> Integer.compare(distance[u], distance[v])
        );
        pq.add(source);
        
        while (!pq.isEmpty()) {
            int u = pq.poll();
            if (visited[u]) continue;
            visited[u] = true;
            
            for (int v : adj[u]) {
                if (distance[u] + weights[u][v] < distance[v]) {
                    distance[v] = distance[u] + weights[u][v];
                    pq.add(v);
                }
            }
        }
        
        return distance;
    }
}`}
          expectedOutput={`Algorithm implemented`}
        />

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Dijkstra's is the standard choice for non-negative weighted graphs</li>
            <li>Use priority queue for efficient Dijkstra implementation</li>
            <li>Bellman-Ford handles negative weights but slower</li>
            <li>Floyd-Warshall solves all-pairs problem but O(V³)</li>
            <li>Choose algorithm based on problem constraints</li>
            <li>Understanding shortest path algorithms is crucial for many applications</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
