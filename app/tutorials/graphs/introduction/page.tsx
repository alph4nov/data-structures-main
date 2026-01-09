import { TutorialLayout } from "@/components/graph-layout"
import { CodeBlock } from "@/components/code-block"

export default function GraphsIntroductionPage() {
  return (
    <TutorialLayout
      title="Introduction to Graphs"
      description="Learn the fundamentals of graph data structures"
      currentStep={1}
      totalSteps={6}
      nextHref="/tutorials/graphs/graph-representation"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">What is a Graph?</h2>
          <p className="mb-4">
            A graph is a data structure consisting of a set of vertices (nodes) connected by edges.
            Graphs are used to represent relationships, networks, and connections between objects.
            They are one of the most important data structures in computer science.
          </p>

          <p className="mb-4">
            Unlike trees or lists with linear relationships, graphs can model complex, non-linear
            relationships including cycles, multiple connections, and bidirectional relationships.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Terminology</h2>
          
          <div className="space-y-3 mb-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <h4 className="font-medium text-blue-400 mb-1">Vertex (Node)</h4>
              <p className="text-sm">A point in the graph representing an entity or object</p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <h4 className="font-medium text-green-400 mb-1">Edge</h4>
              <p className="text-sm">A connection between two vertices representing a relationship</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <h4 className="font-medium text-yellow-400 mb-1">Degree</h4>
              <p className="text-sm">The number of edges connected to a vertex</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-md p-3">
              <h4 className="font-medium text-purple-400 mb-1">Path</h4>
              <p className="text-sm">A sequence of vertices where each consecutive pair is connected by an edge</p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
              <h4 className="font-medium text-red-400 mb-1">Cycle</h4>
              <p className="text-sm">A path that starts and ends at the same vertex</p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 rounded-md p-3">
              <h4 className="font-medium text-orange-400 mb-1">Connected Component</h4>
              <p className="text-sm">A maximal set of vertices where every pair is connected by a path</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Types of Graphs</h2>
          
          <div className="space-y-4 mb-4">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium text-blue-400 mb-3">1. Directed vs Undirected</h3>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-2">
                  <p className="font-medium mb-1">Directed Graph</p>
                  <p className="text-xs">Edges have direction (A → B)</p>
                  <p className="text-xs mt-1">Example: Twitter follows, roads with one-way streets</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-md p-2">
                  <p className="font-medium mb-1">Undirected Graph</p>
                  <p className="text-xs">Edges have no direction (A ↔ B)</p>
                  <p className="text-xs mt-1">Example: Social networks, Road networks</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium text-yellow-400 mb-3">2. Weighted vs Unweighted</h3>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-2">
                  <p className="font-medium mb-1">Weighted Graph</p>
                  <p className="text-xs">Edges have weights/costs</p>
                  <p className="text-xs mt-1">Example: GPS distance, Flight costs</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-md p-2">
                  <p className="font-medium mb-1">Unweighted Graph</p>
                  <p className="text-xs">All edges have equal weight</p>
                  <p className="text-xs mt-1">Example: Social networks, Game maps</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium text-purple-400 mb-3">3. Cyclic vs Acyclic</h3>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-2">
                  <p className="font-medium mb-1">Cyclic Graph</p>
                  <p className="text-xs">Contains at least one cycle</p>
                  <p className="text-xs mt-1">Example: Most real-world networks</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-md p-2">
                  <p className="font-medium mb-1">Acyclic Graph (DAG)</p>
                  <p className="text-xs">No cycles present</p>
                  <p className="text-xs mt-1">Example: Task scheduling, Dependency graphs</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium text-red-400 mb-3">4. Dense vs Sparse</h3>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-2">
                  <p className="font-medium mb-1">Dense Graph</p>
                  <p className="text-xs">Many edges (≈ V²)</p>
                  <p className="text-xs mt-1">Use adjacency matrix</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-md p-2">
                  <p className="font-medium mb-1">Sparse Graph</p>
                  <p className="text-xs">Few edges (≈ V)</p>
                  <p className="text-xs mt-1">Use adjacency list</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Graph Representation Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs mt-4">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 px-2">Aspect</th>
                  <th className="text-left py-2 px-2">Adjacency Matrix</th>
                  <th className="text-left py-2 px-2">Adjacency List</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Space</td>
                  <td>O(V²)</td>
                  <td>O(V + E)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Edge Lookup</td>
                  <td>O(1)</td>
                  <td>O(degree)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Add Edge</td>
                  <td>O(1)</td>
                  <td>O(1)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 px-2">Get Neighbors</td>
                  <td>O(V)</td>
                  <td>O(degree)</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Best For</td>
                  <td>Dense graphs</td>
                  <td>Sparse graphs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Graph Basics Example</h2>

          <CodeBlock
            title="Graph Basic Structure"
            language="java"
            code={`public class Graph {
    private int V;  // Number of vertices
    private int E;  // Number of edges
    private List<Integer>[] adj;  // Adjacency list
    
    // Constructor
    public Graph(int V) {
        this.V = V;
        this.E = 0;
        adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }
    }
    
    // Add edge (undirected graph)
    public void addEdge(int u, int v) {
        adj[u].add(v);
        adj[v].add(u);  // For undirected, add both directions
        E++;
    }
    
    // Get neighbors of vertex
    public List<Integer> getNeighbors(int v) {
        return adj[v];
    }
    
    // Get vertex count
    public int getVertexCount() {
        return V;
    }
    
    // Get edge count
    public int getEdgeCount() {
        return E;
    }
    
    public static void main(String[] args) {
        Graph g = new Graph(5);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 2);
        g.addEdge(1, 3);
        g.addEdge(2, 4);
        
        System.out.println("Graph has " + g.getVertexCount() + " vertices");
        System.out.println("Graph has " + g.getEdgeCount() + " edges");
        System.out.println("Neighbors of vertex 1: " + g.getNeighbors(1));
    }
}`}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Graph Properties</h2>
          
          <div className="space-y-3">
            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium text-blue-400 mb-2">Number of Edges</h3>
              <p className="text-sm mb-2">In a simple undirected graph: E ≤ V(V-1)/2</p>
              <p className="text-sm mb-2">In a simple directed graph: E ≤ V(V-1)</p>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium text-green-400 mb-2">Complete Graph</h3>
              <p className="text-sm">A graph where every pair of vertices is connected</p>
              <p className="text-sm mt-2">Edges in complete graph: V(V-1)/2 (undirected)</p>
            </div>

            <div className="bg-white/5 p-4 rounded-md">
              <h3 className="font-medium text-yellow-400 mb-2">Handshake Lemma</h3>
              <p className="text-sm">Sum of all vertex degrees = 2E</p>
              <p className="text-sm mt-2">Useful for calculating graph properties</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Real-World Graph Applications</h2>
          
          <div className="space-y-3">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-3">
              <p className="text-sm"><span className="font-medium">Social Networks:</span> Facebook, Twitter (vertices=people, edges=connections)</p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
              <p className="text-sm"><span className="font-medium">GPS/Maps:</span> Google Maps (vertices=locations, edges=roads)</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
              <p className="text-sm"><span className="font-medium">Recommendations:</span> Netflix, Amazon (vertices=items, edges=similarity)</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-md p-3">
              <p className="text-sm"><span className="font-medium">Web Pages:</span> Google PageRank (vertices=pages, edges=links)</p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
              <p className="text-sm"><span className="font-medium">Flight Routes:</span> Airlines (vertices=airports, edges=routes)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Graphs model relationships and connections between objects</li>
            <li>Vertices are entities; edges are relationships</li>
            <li>Different graph types have different properties and use cases</li>
            <li>Choice of representation (matrix vs list) depends on graph density</li>
            <li>Graphs appear everywhere in real-world applications</li>
            <li>Understanding graph structure is key to solving graph problems</li>
            <li>Graph algorithms (DFS, BFS, Dijkstra) build on basic graph concepts</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
