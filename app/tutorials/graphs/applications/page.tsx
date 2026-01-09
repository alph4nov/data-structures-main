import { TutorialLayout } from "@/components/graph-layout"
import { CodeBlock } from "@/components/code-block"

export default function GraphApplicationsPage() {
  return (
    <TutorialLayout
      title="Graph Applications"
      description="Real-world applications and use cases of graph algorithms"
      currentStep={5}
      totalSteps={6}
      prevHref="/tutorials/graphs/shortest-path"
      nextHref="/tutorials/graphs/best-practices"
    >
      <div className="space-y-6 text-white">
        <section>
          <h2 className="text-xl font-semibold mb-3">Real-World Graph Applications</h2>
          <p className="mb-4">
            Graphs are everywhere in modern applications. Understanding graph algorithms
            enables solutions to complex real-world problems.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">1. Navigation & GPS</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              GPS systems like Google Maps use graphs to represent road networks and Dijkstra's
              algorithm to find optimal routes.
            </p>

            <CodeBlock
              title="GPS Navigation Example"
              language="java"
              code={`public class NavigationSystem {
    static class Location {
        int id;
        String name;
        double latitude, longitude;
        
        Location(int id, String name, double lat, double lng) {
            this.id = id;
            this.name = name;
            this.latitude = lat;
            this.longitude = lng;
        }
    }
    
    private List<Integer>[] routes;
    private int[][] distances;
    private int V;
    
    public NavigationSystem(int V) {
        this.V = V;
        routes = new ArrayList[V];
        distances = new int[V][V];
        for (int i = 0; i < V; i++) {
            routes[i] = new ArrayList<>();
            for (int j = 0; j < V; j++) {
                distances[i][j] = Integer.MAX_VALUE;
            }
            distances[i][i] = 0;
        }
    }
    
    public void addRoad(int from, int to, int distance) {
        routes[from].add(to);
        routes[to].add(from);
        distances[from][to] = distance;
        distances[to][from] = distance;
    }
    
    // Find shortest route using Dijkstra
    public List<Integer> findRoute(int start, int destination) {
        int[] dist = new int[V];
        int[] parent = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        Arrays.fill(parent, -1);
        
        dist[start] = 0;
        PriorityQueue<Integer> pq = new PriorityQueue<>(
            (a, b) -> Integer.compare(dist[a], dist[b])
        );
        pq.add(start);
        
        while (!pq.isEmpty()) {
            int u = pq.poll();
            
            for (int v : routes[u]) {
                if (dist[u] + distances[u][v] < dist[v]) {
                    dist[v] = dist[u] + distances[u][v];
                    parent[v] = u;
                    pq.add(v);
                }
            }
        }
        
        // Reconstruct path
        List<Integer> path = new ArrayList<>();
        int current = destination;
        while (current != -1) {
            path.add(0, current);
            current = parent[current];
        }
        
        return path;
    }
    
    public static void main(String[] args) {
        NavigationSystem gps = new NavigationSystem(5);
        gps.addRoad(0, 1, 5);
        gps.addRoad(0, 2, 3);
        gps.addRoad(1, 2, 2);
        gps.addRoad(1, 3, 7);
        gps.addRoad(2, 4, 6);
        gps.addRoad(3, 4, 1);
        
        List<Integer> route = gps.findRoute(0, 4);
        System.out.println("Route from 0 to 4: " + route);
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Algorithm:</span> Dijkstra's shortest path</p>
            <p className="text-sm"><span className="font-medium">Real use:</span> Google Maps, Waze, Apple Maps</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Social Network Analysis</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Social networks use graphs to represent relationships and find communities,
              influential users, and connection degrees.
            </p>

            <CodeBlock
              title="Social Network Analysis"
              language="java"
              code={`public class SocialNetwork {
    private List<Integer>[] friends;
    private int V;
    
    public SocialNetwork(int V) {
        this.V = V;
        friends = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            friends[i] = new ArrayList<>();
        }
    }
    
    public void addFriendship(int u, int v) {
        friends[u].add(v);
        friends[v].add(u);
    }
    
    // Find degrees of separation (BFS)
    public int degreeOfSeparation(int person1, int person2) {
        Queue<Integer> q = new LinkedList<>();
        int[] distance = new int[V];
        Arrays.fill(distance, -1);
        
        q.add(person1);
        distance[person1] = 0;
        
        while (!q.isEmpty()) {
            int current = q.remove();
            
            if (current == person2) {
                return distance[current];
            }
            
            for (int friend : friends[current]) {
                if (distance[friend] == -1) {
                    distance[friend] = distance[current] + 1;
                    q.add(friend);
                }
            }
        }
        
        return -1;  // Not connected
    }
    
    // Find all friends (1st degree connections)
    public List<Integer> getDirectFriends(int person) {
        return friends[person];
    }
    
    // Find all friends of friends (2nd degree connections)
    public Set<Integer> getSecondDegreeFriends(int person) {
        Set<Integer> secondDegree = new HashSet<>();
        
        for (int friend : friends[person]) {
            for (int foaf : friends[friend]) {
                if (foaf != person && !friends[person].contains(foaf)) {
                    secondDegree.add(foaf);
                }
            }
        }
        
        return secondDegree;
    }
    
    // Get user's network size (BFS)
    public int getNetworkSize(int person) {
        Queue<Integer> q = new LinkedList<>();
        boolean[] visited = new boolean[V];
        int size = 0;
        
        q.add(person);
        visited[person] = true;
        
        while (!q.isEmpty()) {
            int current = q.remove();
            size++;
            
            for (int friend : friends[current]) {
                if (!visited[friend]) {
                    visited[friend] = true;
                    q.add(friend);
                }
            }
        }
        
        return size;
    }
    
    public static void main(String[] args) {
        SocialNetwork network = new SocialNetwork(6);
        network.addFriendship(0, 1);
        network.addFriendship(0, 2);
        network.addFriendship(1, 3);
        network.addFriendship(3, 4);
        network.addFriendship(4, 5);
        
        System.out.println("Degrees of separation 0→5: " + 
                          network.degreeOfSeparation(0, 5));  // 3
        System.out.println("Direct friends of 0: " + 
                          network.getDirectFriends(0));
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Algorithms:</span> BFS (degrees of separation), DFS (network size)</p>
            <p className="text-sm"><span className="font-medium">Real use:</span> Facebook, LinkedIn, Twitter</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Recommendation Systems</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Recommendation engines build graphs of user preferences and item similarities
              to suggest products, movies, or content.
            </p>

            <CodeBlock
              title="Movie Recommendation System"
              language="java"
              code={`public class RecommendationEngine {
    static class Movie {
        int id;
        String title;
        List<Integer> viewers;
        
        Movie(int id, String title) {
            this.id = id;
            this.title = title;
            this.viewers = new ArrayList<>();
        }
    }
    
    private Movie[] movies;
    private int[][] similarity;
    
    public RecommendationEngine(int movieCount) {
        movies = new Movie[movieCount];
        similarity = new int[movieCount][movieCount];
    }
    
    public void addMovie(int id, String title) {
        movies[id] = new Movie(id, title);
    }
    
    public void userWatched(int userId, int movieId) {
        movies[movieId].viewers.add(userId);
    }
    
    // Calculate similarity between movies
    public void calculateSimilarity() {
        int n = movies.length;
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Count common viewers (co-occurrence)
                Set<Integer> movie1Viewers = new HashSet<>(movies[i].viewers);
                movie1Viewers.retainAll(movies[j].viewers);
                
                int commonViewers = movie1Viewers.size();
                similarity[i][j] = commonViewers;
                similarity[j][i] = commonViewers;
            }
        }
    }
    
    // Recommend movies based on watched movies
    public List<Integer> recommend(int userId, int count) {
        // Find all movies watched by user
        Set<Integer> watchedMovies = new HashSet<>();
        for (int i = 0; i < movies.length; i++) {
            if (movies[i].viewers.contains(userId)) {
                watchedMovies.add(i);
            }
        }
        
        // Find similar movies with scores
        Map<Integer, Integer> scores = new HashMap<>();
        for (int watched : watchedMovies) {
            for (int i = 0; i < movies.length; i++) {
                if (!watchedMovies.contains(i)) {
                    scores.put(i, scores.getOrDefault(i, 0) + similarity[watched][i]);
                }
            }
        }
        
        // Return top recommendations
        return scores.entrySet().stream()
            .sorted((a, b) -> Integer.compare(b.getValue(), a.getValue()))
            .limit(count)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Algorithm:</span> Graph similarity, collaborative filtering</p>
            <p className="text-sm"><span className="font-medium">Real use:</span> Netflix, Spotify, Amazon</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Network Flow & Optimization</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Network flow algorithms solve problems like maximum capacity routing,
              traffic optimization, and resource allocation.
            </p>

            <p className="text-sm mb-4">
              <span className="font-medium">Example:</span> Maximum flow determines the maximum amount of data
              that can flow from a source to a destination in a network.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Algorithms:</span> Ford-Fulkerson, Edmonds-Karp</p>
            <p className="text-sm"><span className="font-medium">Real use:</span> Network routing, airline scheduling, production planning</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Web Page Ranking</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Search engines use PageRank algorithm on the web graph to rank pages
              by importance based on links.
            </p>

            <CodeBlock
              title="Simplified PageRank Algorithm"
              language="java"
              code={`public class PageRank {
    private List<Integer>[] outlinks;
    private int V;
    
    public PageRank(int V) {
        this.V = V;
        outlinks = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            outlinks[i] = new ArrayList<>();
        }
    }
    
    public void addLink(int from, int to) {
        outlinks[from].add(to);
    }
    
    // Calculate PageRank
    public double[] calculatePageRank(int iterations) {
        double[] rank = new double[V];
        double[] newRank = new double[V];
        double damping = 0.85;
        double initialRank = 1.0 / V;
        
        // Initialize all ranks
        for (int i = 0; i < V; i++) {
            rank[i] = initialRank;
        }
        
        // Iteratively calculate ranks
        for (int iter = 0; iter < iterations; iter++) {
            for (int i = 0; i < V; i++) {
                newRank[i] = (1 - damping) / V;
            }
            
            // For each page with outlinks
            for (int from = 0; from < V; from++) {
                if (!outlinks[from].isEmpty()) {
                    double contribution = rank[from] / outlinks[from].size();
                    
                    for (int to : outlinks[from]) {
                        newRank[to] += damping * contribution;
                    }
                }
            }
            
            // Swap arrays
            double[] temp = rank;
            rank = newRank;
            newRank = temp;
        }
        
        return rank;
    }
}`}
            />
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
            <p className="text-sm"><span className="font-medium">Algorithm:</span> PageRank (iterative)</p>
            <p className="text-sm"><span className="font-medium">Real use:</span> Google Search, web analysis</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Compiler & Dependency Analysis</h2>
          
          <div className="bg-white/5 p-4 rounded-md mb-4">
            <p className="text-sm mb-3">
              Compilers use directed acyclic graphs (DAGs) and topological sorting
              to resolve dependencies and generate code.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3 mt-3">
              <p className="text-sm"><span className="font-medium">Example:</span> Package managers (npm, maven) use topological sorting to install packages in correct order</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Summary of Applications</h2>
          
          <div className="space-y-2">
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium">GPS/Navigation:</span> Dijkstra's algorithm for shortest routes</p>
            </div>
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium">Social Networks:</span> BFS/DFS for connections and community detection</p>
            </div>
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium">Recommendations:</span> Graph similarity and collaborative filtering</p>
            </div>
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium">Web Search:</span> PageRank algorithm on web graph</p>
            </div>
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium">Compilers:</span> Topological sorting for dependency resolution</p>
            </div>
            <div className="bg-white/5 p-3 rounded-md">
              <p className="text-sm"><span className="font-medium">Networks:</span> Flow algorithms for optimization</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Graphs model real-world networks and relationships</li>
            <li>Different algorithms solve different types of problems</li>
            <li>Dijkstra's finds optimal routes in navigation systems</li>
            <li>BFS/DFS analyze social networks and connectivity</li>
            <li>Topological sorting resolves dependencies</li>
            <li>PageRank ranks importance in large networks</li>
            <li>Understanding graphs enables solving complex problems</li>
          </ul>
        </section>
      </div>
    </TutorialLayout>
  )
}
