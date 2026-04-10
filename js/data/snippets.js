// All code snippets keyed by algo name matching app.js ALGO_CONFIG
const codeSnippets = {
    // ── Linear Search ──
    linear_search_iterative: {
        java: `// Linear Search - Iterativo
public int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i; // ¡Encontrado!
        }
    }
    return -1; // No encontrado
}`,
        python: `# Linear Search - Iterativo
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # ¡Encontrado!
    return -1  # No encontrado`
    },
    linear_search_recursive: {
        java: `// Linear Search - Recursivo
public int searchRec(int[] arr, int target, int i) {
    if (i >= arr.length) return -1;
    if (arr[i] == target) return i;
    return searchRec(arr, target, i + 1);
}`,
        python: `# Linear Search - Recursivo
def search_rec(arr, target, i=0):
    if i >= len(arr): return -1
    if arr[i] == target: return i
    return search_rec(arr, target, i + 1)`
    },
    // ── Binary Search ──
    binary_search_iterative: {
        java: `// Binary Search - Iterativo
public int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else                   high = mid - 1;
    }
    return -1;
}`,
        python: `# Binary Search - Iterativo
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1`
    },
    binary_search_recursive: {
        java: `// Binary Search - Recursivo
public int bsRec(int[] arr, int target, int low, int high) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target)
        return bsRec(arr, target, mid + 1, high);
    return bsRec(arr, target, low, mid - 1);
}`,
        python: `# Binary Search - Recursivo
def bs_rec(arr, target, low, high):
    if low > high: return -1
    mid = (low + high) // 2
    if arr[mid] == target: return mid
    if arr[mid] < target:
        return bs_rec(arr, target, mid + 1, high)
    return bs_rec(arr, target, low, mid - 1)`
    },
    // ── Bubble Sort ──
    bubble_sort: {
        java: `// Bubble Sort
public void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Intercambiar
                int temp = arr[j];
                arr[j]   = arr[j + 1];
                arr[j+1] = temp;
            }
        }
    }
}`,
        python: `# Bubble Sort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]`
    },
    // ── Insertion Sort ──
    insertion_sort: {
        java: `// Insertion Sort
// 🃏 Como ordenar cartas en tu mano
public void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i]; // La carta que tomamos
        int j   = i - 1;
        // Mover cartas mayores a la derecha
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key; // Insertar en posición
    }
}`,
        python: `# Insertion Sort
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`
    },
    // ── Selection Sort ──
    selection_sort: {
        java: `// Selection Sort
// 🔎 Siempre selecciona el menor
public void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        int minIdx = i; // Asumir que el primero es el menor
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j; // Nuevo mínimo encontrado
            }
        }
        // Intercambiar con la posición actual
        int temp    = arr[i];
        arr[i]      = arr[minIdx];
        arr[minIdx] = temp;
    }
}`,
        python: `# Selection Sort
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`
    },
    // ── Merge Sort ──
    merge_sort: {
        java: `public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    public static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;

        while (i <= mid && j <= right) {
            if (arr[i] < arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }

        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        for (int x = 0; x < temp.length; x++) {
            arr[left + x] = temp[x];
        }
    }
}`,
        python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        merge_sort(L)
        merge_sort(R)

        i = j = k = 0
        while i < len(L) and j < len(R):
            if (L[i] < R[j]):
                arr[k] = L[i]; i += 1
            else:
                arr[k] = R[j]; j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]; i += 1; k += 1
        while j < len(R):
            arr[k] = R[j]; j += 1; k += 1`
    },
    // ── Quick Sort ──
    quick_sort: {
        java: `// Quick Sort - Pivote
public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);    // izquierda
        quickSort(arr, pi + 1, high);   // derecha
    }
}
// partition coloca pivote en su lugar correcto`,
        python: `# Quick Sort
def quick_sort(arr, low=0, high=None):
    if high is None: high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)`
    },
    // ── More Advanced Sorting ──
    heap_sort: {
        java: `// Heap Sort
public void heapSort(int arr[]) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
        python: `# Heap Sort
def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1): heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)`
    },
    radix_sort: {
        java: `// Radix Sort
public void radixSort(int[] arr) {
    int max = getMax(arr);
    for (int exp = 1; max / exp > 0; exp *= 10)
        countSort(arr, exp);
}`,
        python: `# Radix Sort
def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val / exp > 1:
        counting_sort(arr, exp)
        exp *= 10`
    },
    counting_sort: {
        java: `// Counting Sort
public void countingSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    int[] count = new int[max + 1];
    for (int num : arr) count[num]++;
    int index = 0;
    for (int i = 0; i <= max; i++) {
        while (count[i]-- > 0) arr[index++] = i;
    }
}`,
        python: `# Counting Sort
def counting_sort(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for num in arr: count[num] += 1
    idx = 0
    for i, c in enumerate(count):
        for _ in range(c):
            arr[idx] = i; idx += 1`
    },
    dfs: {
        java: `// DFS - Búsqueda en Profundidad
void dfs(int v, boolean[] visited, List<List<Integer>> adj) {
    visited[v] = true;
    System.out.print(v + " ");
    for (int neighbor : adj.get(v)) {
        if (!visited[neighbor]) {
            dfs(neighbor, visited, adj);
        }
    }
}`,
        python: `# DFS - Búsqueda en Profundidad
def dfs(v, visited, adj):
    visited[v] = True
    print(v, end=" ")
    for neighbor in adj[v]:
        if not visited[neighbor]:
            dfs(neighbor, visited, adj)`
    },
    bfs: {
        java: `// BFS - Búsqueda en Anchura
void bfs(int start, List<List<Integer>> adj) {
    boolean[] visited = new boolean[adj.size()];
    Queue<Integer> q = new LinkedList<>();
    q.add(start); visited[start] = true;
    while (!q.isEmpty()) {
        int v = q.poll();
        System.out.print(v + " ");
        for (int n : adj.get(v)) {
            if (!visited[n]) {
                q.add(n); visited[n] = true;
            }
        }
    }
}`,
        python: `# BFS - Búsqueda en Anchura
from collections import deque
def bfs(start, adj):
    visited = [False] * len(adj)
    q = deque([start])
    visited[start] = True
    while q:
        v = q.popleft()
        print(v, end=" ")
        for n in adj[v]:
            if not visited[n]:
                q.append(n); visited[n] = True`
    },
    dijkstra: {
        java: `// Dijkstra - Camino más corto
void dijkstra(int graph[][], int src) {
    int V = graph.length;
    int[] dist = new int[V];
    boolean[] sptSet = new boolean[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    for (int i = 0; i < V - 1; i++) {
        int u = minDistance(dist, sptSet, V);
        sptSet[u] = true;
        for (int v = 0; v < V; v++)
            if (!sptSet[v] && graph[u][v] != 0 && dist[u] != Integer.MAX_VALUE 
                && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }
}`,
        python: `# Dijkstra - Camino más corto
import heapq
def dijkstra(graph, src):
    V = len(graph)
    dist = [float("inf")] * V
    dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))`
    },
    bellman_ford: {
        java: `// Bellman-Ford
void bellmanFord(int[][] edges, int V, int src) {
    int[] dist = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    for (int i = 1; i < V; i++) {
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
        }
    }
}`,
        python: `# Bellman-Ford
def bellman_ford(edges, V, src):
    dist = [float("inf")] * V
    dist[src] = 0
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != float("inf") and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w`
    },
    floyd_warshall: {
        java: `// Floyd-Warshall
void floydWarshall(int graph[][], int V) {
    int[][] dist = new int[V][V];
    for(int i=0; i<V; i++) 
        for(int j=0; j<V; j++) dist[i][j] = graph[i][j];
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
            }
        }
    }
}`,
        python: `# Floyd-Warshall
def floyd_warshall(graph, V):
    dist = [row[:] for row in graph]
    for k in range(V):
        for i in range(V):
            for j in range(V):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`
    },
    prim: {
        java: `// Prim (MST)
void primMST(int graph[][], int V) {
    int[] parent = new int[V];
    int[] key = new int[V];
    boolean[] mstSet = new boolean[V];
    Arrays.fill(key, Integer.MAX_VALUE);
    key[0] = 0; parent[0] = -1;
    for (int count = 0; count < V - 1; count++) {
        int u = minKey(key, mstSet, V);
        mstSet[u] = true;
        for (int v = 0; v < V; v++)
            if (graph[u][v] != 0 && !mstSet[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
    }
}`,
        python: `# Prim (MST)
import heapq
def prim(graph, V):
    visited = [False] * V
    pq = [(0, 0)] # (weight, node)
    mst_cost = 0
    while pq:
        w, u = heapq.heappop(pq)
        if visited[u]: continue
        visited[u] = True
        mst_cost += w
        for v, weight in graph[u]:
            if not visited[v]: heapq.heappush(pq, (weight, v))`
    },
    kruskal: {
        java: `// Kruskal (MST)
void kruskalMST(int[][] edges, int V) {
    Arrays.sort(edges, (a, b) -> a[2] - b[2]);
    int[] parent = new int[V];
    for (int i=0; i<V; i++) parent[i] = i;
    for (int[] edge : edges) {
        int rootU = find(parent, edge[0]);
        int rootV = find(parent, edge[1]);
        if (rootU != rootV) {
            parent[rootU] = rootV;
        }
    }
}`,
        python: `# Kruskal (MST)
def kruskal(edges, V):
    edges.sort(key=lambda x: x[2])
    parent = list(range(V))
    def find(i):
        if parent[i] == i: return i
        return find(parent[i])
    for u, v, w in edges:
        root_u, root_v = find(u), find(v)
        if root_u != root_v:
            parent[root_u] = root_v`
    },
    topo_sort: {
        java: `// Topological Sort
void topoSort(int v, boolean[] visited, Stack<Integer> stack, List<List<Integer>> adj) {
    visited[v] = true;
    for (int n : adj.get(v))
        if (!visited[n]) topoSort(n, visited, stack, adj);
    stack.push(v);
}`,
        python: `# Topological Sort
def topo_sort_util(v, visited, stack, adj):
    visited[v] = True
    for n in adj[v]:
        if not visited[n]: topo_sort_util(n, visited, stack, adj)
    stack.append(v)`
    },
    linear_reg: {
        java: `// Regresión Lineal Simple
public double[] linearRegression(double[] x, double[] y) {
    double n = x.length;
    double sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (int i = 0; i < n; i++) {
        sumX += x[i]; sumY += y[i];
        sumXY += x[i] * y[i]; sumXX += x[i] * x[i];
    }
    double slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    double intercept = (sumY - slope * sumX) / n;
    return new double[]{slope, intercept};
}`,
        python: `# Regresión Lineal Simple
def linear_regression(x, y):
    n = len(x)
    sum_x, sum_y = sum(x), sum(y)
    sum_xy = sum(x[i]*y[i] for i in range(n))
    sum_xx = sum(x[i]**2 for i in range(n))
    m = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x**2)
    b = (sum_y - m * sum_x) / n
    return m, b`
    },
    logistic_reg: { 
        java: `// Regresión Logística (Sigmoide)
public double sigmoid(double z) {
    return 1.0 / (1.0 + Math.exp(-z));
}

public double[] fitLogistic(double[][] X, double[] y, int epochs, double lr) {
    double[] w = new double[X[0].length];
    for (int e = 0; e < epochs; e++) {
        for (int i = 0; i < X.length; i++) {
            double z = 0;
            for (int j = 0; j < w.length; j++) z += w[j] * X[i][j];
            double pred = sigmoid(z);
            for (int j = 0; j < w.length; j++) {
                w[j] -= lr * (pred - y[i]) * X[i][j];
            }
        }
    }
    return w;
}`, 
        python: `# Regresión Logística (Sigmoide)
import math
def sigmoid(z):
    return 1.0 / (1.0 + math.exp(-z))

def logistic_regression(X, y, epochs, lr):
    w = [0] * len(X[0])
    for _ in range(epochs):
        for i in range(len(X)):
            z = sum(w[j] * X[i][j] for j in range(len(w)))
            pred = sigmoid(z)
            for j in range(len(w)):
                w[j] -= lr * (pred - y[i]) * X[i][j]
    return w` 
    },
    knn: { 
        java: `// K-Nearest Neighbors (KNN)
public int knnPredict(double[][] trainData, int[] labels, double[] testPoint, int k) {
    PriorityQueue<double[]> pq = new PriorityQueue<>((a, b) -> Double.compare(b[0], a[0]));
    for (int i = 0; i < trainData.length; i++) {
        double dist = getDistance(trainData[i], testPoint);
        pq.add(new double[]{dist, labels[i]});
        if (pq.size() > k) pq.poll();
    }
    // Lógica para contar la mayoría de votos...
    return getMajority(pq);
}`, 
        python: `# K-Nearest Neighbors (KNN)
import math
def get_distance(p1, p2):
    return math.sqrt(sum((x - y)**2 for x, y in zip(p1, p2)))

def knn_predict(train_data, labels, test_point, k):
    distances = []
    for i in range(len(train_data)):
        dist = get_distance(train_data[i], test_point)
        distances.append((dist, labels[i]))
    distances.sort(key=lambda x: x[0])
    k_nearest_labels = [label for _, label in distances[:k]]
    return max(set(k_nearest_labels), key=k_nearest_labels.count)` 
    },
    kmeans: { 
        java: `// K-Means Clustering
public void kMeans(double[][] data, int k, int iterations) {
    double[][] centroids = initializeCentroids(data, k);
    int[] labels = new int[data.length];
    for (int iter = 0; iter < iterations; iter++) {
        // 1. Asignar cada punto al centroide más cercano
        for (int i = 0; i < data.length; i++) {
            labels[i] = findClosest(data[i], centroids);
        }
        // 2. Recalcular centroides
        updateCentroids(data, labels, centroids);
    }
}`, 
        python: `# K-Means Clustering
def k_means(data, k, iterations):
    centroids = initialize_centroids(data, k)
    labels = [0] * len(data)
    for _ in range(iterations):
        # 1. Asignar al centroide más cercano
        for i, point in enumerate(data):
            labels[i] = find_closest(point, centroids)
        # 2. Recalcular centroides usando promedios
        centroids = update_centroids(data, labels, k)
    return labels, centroids` 
    },
    dtree: { 
        java: `// Árboles de Decisión (Concepto CART / ID3)
class TreeNode {
    int featureIndex;
    double threshold;
    TreeNode left, right;
    Integer label; 
}
public TreeNode buildTree(double[][] X, int[] y, int depth) {
    if (depth == MAX_DEPTH || isPure(y)) {
        return createLeaf(y);
    }
    Split bestSplit = findBestSplit(X, y); // Busca mayor ganancia de info.
    TreeNode node = new TreeNode(bestSplit);
    node.left = buildTree(bestSplit.leftX, bestSplit.leftY, depth+1);
    node.right = buildTree(bestSplit.rightX, bestSplit.rightY, depth+1);
    return node;
}`, 
        python: `# Árboles de Decisión (Concepto)
class TreeNode:
    def __init__(self, feature=None, threshold=None, left=None, right=None, label=None):
        self.feature = feature
        self.threshold = threshold
        self.left = left
        self.right = right
        self.label = label

def build_tree(X, y, depth=0):
    if depth == MAX_DEPTH or is_pure(y):
        return TreeNode(label=majority_class(y))
    best_split = find_best_split(X, y) # Maximiza Info Gain Gini
    left_child = build_tree(best_split.X_left, best_split.y_left, depth + 1)
    right_child = build_tree(best_split.X_right, best_split.y_right, depth + 1)
    return TreeNode(best_split.feature, best_split.threshold, left_child, right_child)` 
    },
    randomforest: { 
        java: `// Random Forest (Ensemble)
public class RandomForest {
    List<TreeNode> trees = new ArrayList<>();
    public void fit(double[][] X, int[] y, int numTrees) {
        for (int i = 0; i < numTrees; i++) {
            DataSample sample = bootstrapSample(X, y);
            trees.add(buildTree(sample.X, sample.y, 0));
        }
    }
    public int predict(double[] X) {
        int[] votes = new int[NUM_CLASSES];
        for (TreeNode tree : trees) {
            votes[tree.predict(X)]++;
        }
        return getMajorityVote(votes);
    }
}`, 
        python: `# Random Forest (Ensemble)
class RandomForest:
    def __init__(self, num_trees=10):
        self.trees = []
        self.num_trees = num_trees
        
    def fit(self, X, y):
        for _ in range(self.num_trees):
            X_sample, y_sample = bootstrap_sample(X, y)
            tree = build_tree(X_sample, y_sample) # Subset de features
            self.trees.append(tree)
            
    def predict(self, X):
        predictions = [tree.predict(X) for tree in self.trees]
        return max(set(predictions), key=predictions.count)` 
    },
    svm: { 
        java: `// Support Vector Machine (SVM - SGD Lineal)
public double[] fitSVM(double[][] X, int[] y, int epochs, double lr, double lambda) {
    double[] w = new double[X[0].length];
    for (int e = 0; e < epochs; e++) {
        for (int i = 0; i < X.length; i++) {
            double condition = y[i] * dotProduct(w, X[i]);
            if (condition >= 1) {
                // Penaliza el margen
                updateWeights(w, X[i], lr, lambda);
            } else {
                // Penaliza el error de clasificación y el margen
                updateWeightsWithError(w, X[i], y[i], lr, lambda);
            }
        }
    }
    return w;
}`, 
        python: `# Support Vector Machine (SVM - SGD Lineal)
def fit_svm(X, y, epochs, lr, lambda_param):
    w = [0] * len(X[0])
    for _ in range(epochs):
        for i in range(len(X)):
            condition = y[i] * sum(w[j] * X[i][j] for j in range(len(w)))
            if condition >= 1:
                # El punto está clasificado correctamente y fuera del margen
                w = [w[j] - lr * (2 * lambda_param * w[j]) for j in range(len(w))]
            else:
                # Punto erróneo o dentro del margen
                w = [w[j] - lr * (2 * lambda_param * w[j] - X[i][j] * y[i]) for j in range(len(w))]
    return w` 
    },
    dp: {
        java: `// Programación Dinámica - Knapsack
int knapsack(int W, int[] wt, int[] val, int n) {
    int[][] dp = new int[n + 1][W + 1];
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w)
                dp[i][w] = Math.max(val[i-1] + dp[i-1][w - wt[i-1]], dp[i-1][w]);
            else
                dp[i][w] = dp[i-1][w];
        }
    }
    return dp[n][W];
}`,
        python: `# Programación Dinámica - Knapsack
def knapsack(W, wt, val, n):
    dp = [[0 for x in range(W + 1)] for x in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if wt[i-1] <= w:
                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])
            else:
                dp[i][w] = dp[i-1][w]
    return dp[n][W]`
    },
    greedy: {
        java: `// Algoritmos Voraces - Cambio de monedas
int minCoins(int[] coins, int amount) {
    Arrays.sort(coins);
    int count = 0;
    for (int i = coins.length - 1; i >= 0; i--) {
        while (amount >= coins[i]) {
            amount -= coins[i];
            count++;
        }
    }
    return count;
}`,
        python: `# Algoritmos Voraces - Cambio de monedas
def min_coins(coins, amount):
    coins.sort(reverse=True)
    count = 0
    for coin in coins:
        while amount >= coin:
            amount -= coin
            count += 1
    return count`
    },
    backtracking: {
        java: `// Backtracking - N Queens (Fragmento)
boolean solveNQUtil(int board[][], int col) {
    if (col >= N) return true;
    for (int i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1;
            if (solveNQUtil(board, col + 1)) return true;
            board[i][col] = 0; // BACKTRACK
        }
    }
    return false;
}`,
        python: `# Backtracking - N Queens (Fragmento)
def solve_nq_util(board, col):
    if col >= N: return True
    for i in range(N):
        if is_safe(board, i, col):
            board[i][col] = 1
            if solve_nq_util(board, col + 1): return True
            board[i][col] = 0  # BACKTRACK
    return False`
    },
    divide: { 
        java: `// Divide y Vencerás (Merge Sort Generalizado)
public int[] divideAndConquer(int[] arr) {
    if (arr.length <= 1) return arr;
    // 1. Divide el problema
    int mid = arr.length / 2;
    int[] left = divideAndConquer(Arrays.copyOfRange(arr, 0, mid));
    int[] right = divideAndConquer(Arrays.copyOfRange(arr, mid, arr.length));
    // 2. Vencerás (Combinar resultados)
    return merge(left, right);
}`, 
        python: `# Divide y Vencerás (Merge Sort Generalizado)
def divide_and_conquer(arr):
    if len(arr) <= 1: return arr
    # 1. Divide
    mid = len(arr) // 2
    left = divide_and_conquer(arr[:mid])
    right = divide_and_conquer(arr[mid:])
    # 2. Vencerás
    return merge(left, right)` 
    },
    huffman: { 
        java: `// Compresión Huffman
class HuffmanNode implements Comparable<HuffmanNode> {
    char data; int freq;
    HuffmanNode left, right;
    public int compareTo(HuffmanNode node) { return freq - node.freq; }
}
public HuffmanNode buildTree(char[] charArray, int[] charFreq) {
    PriorityQueue<HuffmanNode> pq = new PriorityQueue<>();
    for (int i = 0; i < charArray.length; i++) {
        HuffmanNode hn = new HuffmanNode();
        hn.data = charArray[i]; hn.freq = charFreq[i];
        pq.add(hn);
    }
    while (pq.size() > 1) {
        HuffmanNode x = pq.peek(); pq.poll();
        HuffmanNode y = pq.peek(); pq.poll();
        HuffmanNode f = new HuffmanNode();
        f.freq = x.freq + y.freq; f.left = x; f.right = y;
        pq.add(f);
    }
    return pq.peek(); // Root of the tree
}`, 
        python: `# Compresión Huffman
import heapq
class Node:
    def __init__(self, char, freq):
        self.char = char; self.freq = freq
        self.left = None; self.right = None
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_tree(char_freqs):
    pq = [Node(char, freq) for char, freq in char_freqs.items()]
    heapq.heapify(pq)
    while len(pq) > 1:
        x = heapq.heappop(pq)
        y = heapq.heappop(pq)
        f = Node(None, x.freq + y.freq)
        f.left = x; f.right = y
        heapq.heappush(pq, f)
    return heapq.heappop(pq) # Root` 
    },
    hashing: { 
        java: `// Hashing (Implementación básica de un HashMap)
class HashNode<K, V> {
    K key; V value; HashNode<K, V> next;
}
public class SimpleHashMap<K, V> {
    private HashNode<K, V>[] bucketArray;
    private int capacity;
    public SimpleHashMap() {
        bucketArray = new HashNode[10];
        capacity = 10;
    }
    public void add(K key, V value) {
        int index = Math.abs(key.hashCode() % capacity);
        HashNode<K, V> head = bucketArray[index];
        while (head != null) {
            if (head.key.equals(key)) { head.value = value; return; }
            head = head.next;
        }
        HashNode<K, V> newNode = new HashNode<>();
        newNode.key = key; newNode.value = value;
        newNode.next = bucketArray[index];
        bucketArray[index] = newNode;
    }
}`, 
        python: `# Hashing (Resolución con encadenamiento)
class HashNode:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None

class SimpleHashMap:
    def __init__(self, capacity=10):
        self.bucket = [None] * capacity
        self.capacity = capacity
        
    def add(self, key, value):
        index = hash(key) % self.capacity
        head = self.bucket[index]
        while head:
            if head.key == key:
                head.value = value; return
            head = head.next
        new_node = HashNode(key, value)
        new_node.next = self.bucket[index]
        self.bucket[index] = new_node` 
    },
    // Crypto
    euclid: {
        java: `// Algoritmo de Euclides (MCD)
public int mcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}`,
        python: `# Algoritmo de Euclides (MCD)
def mcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a`
    },
    sieve: {
        java: `// Criba de Eratóstenes
public void sieve(int n) {
    boolean[] prime = new boolean[n + 1];
    Arrays.fill(prime, true);
    for (int p = 2; p * p <= n; p++) {
        if (prime[p]) {
            for (int i = p * p; i <= n; i += p)
                prime[i] = false;
        }
    }
}`,
        python: `# Criba de Eratóstenes
def sieve(n):
    prime = [True] * (n + 1)
    p = 2
    while p * p <= n:
        if prime[p]:
            for i in range(p * p, n + 1, p):
                prime[i] = False
        p += 1`
    },
    rsa: {
        java: `// RSA (Cifrado asimétrico conceptual)
// 1. Elegir p, q (primos grandes)
// 2. n = p * q
// 3. phi = (p-1)*(q-1)
// 4. e = coprime con phi
// 5. d = inverso multiplicativo de e mod phi
// Cifrado: C = M^e mod n
// Descifrado: M = C^d mod n`,
        python: `# RSA (Cifrado asimétrico conceptual)
# 1. p, q primos; n = p*q; phi = (p-1)*(q-1)
# 2. e (pública); d (privada)
# Cifrar: c = (m**e) % n
# Descifrar: m = (c**d) % n`
    }
};

// ── Line Highlight Maps ──
const lineHighlights = {
    linear_search_iterative: {
        java:   { checkMatch:[3], found:[4], notFound:[6] },
        python: { checkMatch:[3], found:[4], notFound:[5] }
    },
    linear_search_recursive: {
        java:   { call:[1], basecase:[2], checkMatch:[3], found:[3], recurse:[4] },
        python: { call:[1], basecase:[2], checkMatch:[3], found:[3], recurse:[4] }
    },
    binary_search_iterative: {
        java:   { checkMatch:[4], found:[4], moveLow:[5], moveHigh:[6] },
        python: { checkMatch:[4], found:[4], moveLow:[5], moveHigh:[6] }
    },
    binary_search_recursive: {
        java:   { call:[1], basecase:[2], checkMatch:[4], found:[4] },
        python: { call:[1], basecase:[2], checkMatch:[4], found:[4] }
    },
    bubble_sort: {
        java:   { init:[1], checkMatch:[5], swap:[7,8,9] },
        python: { init:[1], checkMatch:[4], swap:[5] }
    },
    insertion_sort: {
        java:   { init:[3], checkMatch:[7], swap:[8] },
        python: { init:[2], checkMatch:[4], swap:[5] }
    },
    selection_sort: {
        java:   { init:[3], checkMatch:[5], found:[6], swap:[9,10,11] },
        python: { init:[2], checkMatch:[4], found:[5], swap:[6] }
    }
};
