import dedent from 'ts-dedent';

import { Language } from '@/types/language';

export const snippets: {
  name: string;
  language: Language;
  code: string;
}[] = [
  {
    name: 'Queue',
    language: 'javascript',
    code: dedent(`class Queue {
    constructor() {
      this._arr = [];
    }
    enqueue(item) {
      this._arr.push(item);
    }
    dequeue() {
      return this._arr.shift();
    }
  }`),
  },
  {
    name: 'Stack',
    language: 'javascript',
    code: dedent(`class Stack {
      constructor() {
        this._arr = [];
      }
      push(item) {
        this._arr.push(item);
      }
      pop() {
        return this._arr.pop();
      }
      peek() {
        return this._arr[this._arr.length - 1];
      }
    }`),
  },
  {
    name: 'Tree',
    language: 'javascript',
    code: dedent(`class Node {
      constructor(content, children = []) {
        this.content = content;
        this.children = children;
      }
    }
    
    const tree = new Node('hello', [
      new Node('world'),
      new Node('and'),
      new Node('fun', [
        new Node('javascript!')
      ])
    ]);
    
    function traverse(node) {
      console.log(node.content);
      for (let child of node.children) {
        traverse(child);
      }
    }`),
  },
  {
    name: 'BFS',
    language: 'python',
    code: dedent(`from collections import deque

    def BFS_with_adj_list(graph, root):
        visited = []
        queue = deque([root])
    
        while queue:
            n = queue.popleft()
            if n not in visited:
                visited.append(n)
                queue += graph[n] - set(visited)
        return visited`),
  },
  {
    name: 'DFS',
    language: 'python',
    code: dedent(`def DFS_with_adj_list(graph, root):
    visited = []
    stack = [root]

    while stack:
        n = stack.pop()
        if n not in visited:
            visited.append(n)
            stack += graph[n] - set(visited)
    return visited`),
  },
];
