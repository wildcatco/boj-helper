import dedent from 'ts-dedent';

import { Difficulty } from '@/types/solution';

export const solutions: {
  categoryName: string;
  problemId: number;
  code: string;
  language: 'cpp' | 'python' | 'javascript';
  difficulty: Difficulty;
}[] = [
  {
    categoryName: '수학',
    problemId: 1000,
    code: dedent(`a, b = map(int, input().split())
    print(a + b)`),
    language: 'python',
    difficulty: 'easy',
  },
  {
    categoryName: '수학',
    problemId: 1001,
    code: dedent(`a, b = map(int, input().split())
    print(a - b)`),
    language: 'python',
    difficulty: 'easy',
  },
  {
    categoryName: '구현',
    problemId: 9498,
    code: dedent(`#include <iostream>
    using namespace std;
    int main() {
        int a;
        cin>>a;
        if(a >= 90 && a <= 100)
            cout<<"A";
        else if(a >= 80 && a < 90)
            cout<<"B";
        else if(a >= 70 && a < 80)
            cout<<"C";
        else if(a >= 60 && a < 70)
            cout<<"D";
        else
            cout<<"F";    
    }`),
    language: 'cpp',
    difficulty: 'normal',
  },
  {
    categoryName: '구현',
    problemId: 14681,
    code: dedent(`#include <iostream>
    using namespace std;
    
    int main(){
      int x, y;
      cin>>x>>y;
    
      if(x > 0)
        if(y > 0)
          cout<<1;
        else
          cout<<4;
      else
        if(y > 0)
          cout<<2;
        else
          cout<<3;      
    }`),
    language: 'cpp',
    difficulty: 'easy',
  },
  {
    categoryName: '깊이 우선 탐색',
    problemId: 1260,
    code: dedent(`from collections import deque
    import sys
    read = sys.stdin.readline
    
    def bfs(v):
      q = deque()
      q.append(v)       
      visit_list[v] = 1   
      while q:
        v = q.popleft()
        print(v, end = " ")
        for i in range(1, n + 1):
          if visit_list[i] == 0 and graph[v][i] == 1:
            q.append(i)
            visit_list[i] = 1
    
    def dfs(v):
      visit_list2[v] = 1        
      print(v, end = " ")
      for i in range(1, n + 1):
        if visit_list2[i] == 0 and graph[v][i] == 1:
          dfs(i)
    
    n, m, v = map(int, read().split())
    
    graph = [[0] * (n + 1) for _ in range(n + 1)] 
    visit_list = [0] * (n + 1)
    visit_list2 = [0] * (n + 1)
    
    for _ in range(m):
      a, b = map(int, read().split())
      graph[a][b] = graph[b][a] = 1
    
    dfs(v)
    print()
    bfs(v)`),
    language: 'python',
    difficulty: 'hard',
  },
  {
    categoryName: '깊이 우선 탐색',
    problemId: 2468,
    code: dedent(`from collections import deque
 
    n = int(input())
    graph = []
    maxNum = 0
     
    for i in range(n):
        graph.append(list(map(int, input().split())))
        for j in range(n):
            if graph[i][j] > maxNum:
                maxNum = graph[i][j] 
     
     
     
    dx = [0 ,0, 1, -1]
    dy = [1, -1, 0 ,0]
    def bfs(a, b, value, visited):
        q = deque()
        q.append((a, b))
        visited[a][b] = 1
     
        while q:
            x, y = q.popleft()
     
            for i in range(4):
                nx = x + dx[i]
                ny = y + dy[i]
                if 0 <= nx < n and 0 <= ny < n:
                    if graph[nx][ny] > value and visited[nx][ny] == 0:
                        visited[nx][ny] = 1
                        q.append((nx, ny))
     
     
    result = 0
    for i in range(maxNum): 
        visited = [[0] * n for i in range(n)]
        cnt = 0
     
        for j in range(n):
            for k in range(n):
                if graph[j][k] > i and visited[j][k] == 0: 
                    bfs(j, k, i, visited)
                    cnt += 1
     
        if result < cnt:
            result = cnt
     
    print(result)`),
    language: 'python',
    difficulty: 'hard',
  },
  {
    categoryName: '깊이 우선 탐색',
    problemId: 1240,
    code: dedent(`#include <bits/stdc++.h>
    using namespace std;
    struct Node {int v, cost; };
    int n, m, dist[1001];
    vector <Node> graph[1001];
    
    int bfs(int start, int end){
        queue <int> q;
        q.push(start);
        dist[start] = 0;
        while(!q.empty()){
            int x = q.front();
            q.pop();
            for(auto next : graph[x]){
                if(dist[next.v] >= 0) continue;
                dist[next.v] = dist[x] + next.cost;
                q.push(next.v);
            }
        }
        return dist[end];
    }
    
    int main(){
        cin >> n >> m;
        for(int i = 0, u,v, cost; i < n - 1; i++){
            cin >> u >> v >> cost;
            graph[u].push_back({v,cost});
            graph[v].push_back({u,cost});
        }
        
    
        while(m--){
            int start, end;
            cin >> start >> end;
            memset(dist,-1,sizeof(dist));
            cout << bfs(start, end) << '\n';
        }
    }`),
    language: 'cpp',
    difficulty: 'hard',
  },
  {
    categoryName: '이분 탐색',
    problemId: 1920,
    code: dedent(`#include <iostream>
    #include <algorithm>
    
    using namespace std;
    
    int N,M;
    int arr[100010];
    
    void binarySearch(int key){
        int start = 0;
        int end = N-1;
        int mid;
    
        while(end>=start){
            mid =(start+end)/2;
            if(arr[mid]==key){
                cout<<1<<"\n";
                return;
            }else if(arr[mid]>key){
                end = mid - 1;
            }else{
                start = mid + 1;
            }
        }
        cout<<0<<"\n";
        return;
    }
    
    
    int main(){
        
        ios_base::sync_with_stdio(0);cin.tie(0);
        cin>>N;
        int temp;
    
        for(int i=0;i<N;i++){
            cin>>temp;
            arr[i]=temp;
        }
    
        sort(arr,arr+N);
    
        cin>>M;
        for(int i=0;i<M;i++){
            cin>>temp;
            binarySearch(temp);
        }
    
        return 0;
    }`),
    language: 'cpp',
    difficulty: 'hard',
  },
  {
    categoryName: '우선 순위 큐',
    problemId: 1927,
    code: dedent(`import sys
    import heapq
    
    numbers = int(input())
    heap = []
    
    #Max Heap
    for _ in range(numbers):
        num = int(sys.stdin.readline())
        if num != 0:
            heapq.heappush(heap, num)
        else:
            try:
                print(heapq.heappop(heap))
            except:
                print(0)`),
    language: 'python',
    difficulty: 'normal',
  },
  {
    categoryName: '우선 순위 큐',
    problemId: 15903,
    code: dedent(`from sys import stdin
    import heapq
    
    
    n, m = map(int, stdin.readline().split())
    
    cards = [int(x) for x in stdin.readline().split()]
    # cards 리스트를 heap으로 변환
    heapq.heapify(cards)
    
    for _ in range(m):
        card1 = heapq.heappop(cards)
        card2 = heapq.heappop(cards)
    
        heapq.heappush(cards, card1 + card2)
        heapq.heappush(cards, card1 + card2)
    
    print(sum(cards))`),
    language: 'python',
    difficulty: 'normal',
  },
  {
    categoryName: '우선 순위 큐',
    problemId: 11000,
    code: dedent(`import heapq
    n = int(input())
    
    q = []
    
    for i in range(n):
        start, end = map(int, input().split())
        q.append([start, end])
    
    q.sort()
    
    room = []
    heapq.heappush(room, q[0][1])
    
    for i in range(1, n):
        if q[i][0] < room[0]: # 현재 회의실 끝나는 시간보다 다음 회의 시작시간이 빠르면
            heapq.heappush(room, q[i][1]) # 새로운 회의실 개설
        else: # 현재 회의실에 이어서 회의 개최 가능
            heapq.heappop(room) # 새로운 회의로 시간 변경을 위해 pop후 새 시간 push
            heapq.heappush(room, q[i][1])
    
    print(len(room))`),
    language: 'python',
    difficulty: 'normal',
  },
  {
    categoryName: '분할 정복',
    problemId: 2447,
    code: dedent(`def draw_stars(n):
    if n==1:
      return ['*']
  
    Stars=draw_stars(n//3)
    L=[]
  
    for star in Stars:
      L.append(star*3)
    for star in Stars통
      L.append(star+' '*(n//3)+star)
    for star in Stars:
      L.append(star*3)
  
    return L
  
  N=int(input())
  print('\n'.join(draw_stars(N)))`),
    language: 'python',
    difficulty: 'normal',
  },
  {
    categoryName: '분할 정복',
    problemId: 1992,
    code: dedent(`n = int(input())
    graph = [list(map(int, input())) for _ in range(n)]
    
    
    def dnc(x, y, n):
        check = graph[x][y]
        for i in range(x, x + n):
            for j in range(y, y + n):
                if check != graph[i][j]:
                    check = -1
                    break
    
        if check == -1:
            print("(", end='')
            n = n // 2
            dnc(x, y, n)  # 오른쪽 위
            dnc(x, y + n, n)  # 왼쪽 위
            dnc(x + n, y, n)  # 오른쪽 아래
            dnc(x + n, y + n, n)  # 왼쪽 아래
            print(")", end='')
    
        elif check == 1:
            print(1, end='')
        else:
            print(0, end='')
    
    
    dnc(0, 0, n)`),
    language: 'python',
    difficulty: 'normal',
  },
  {
    categoryName: '분할 정복',
    problemId: 10830,
    code: dedent(`import sys
    input = sys.stdin.readline
    
    N, B = map(int, input().split())
    A = [[*map(int, input().split())] for _ in range(N)]
    
    def mul(U, V):
        n = len(U)
        Z = [[0]*n for _ in range(n)]
        
        for row in range(n):
            for col in range(n):
                e = 0
                for i in range(n):
                    e += U[row][i] * V[i][col]
                Z[row][col] = e % 1000
    
        return Z
    
    def square(A, B):
        if B == 1:
            for x in range(len(A)):
                for y in range(len(A)):
                    A[x][y] %= 1000
            return A
        
        tmp = square(A, B//2)
        if B % 2:
            return mul(mul(tmp, tmp), A)
        else:
            return mul(tmp, tmp)
    
    result = square(A, B)
    for r in result:
        print(*r)`),
    language: 'python',
    difficulty: 'hard',
  },
];
