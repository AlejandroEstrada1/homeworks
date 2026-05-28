export class TrieNode {
  constructor(value = null) {
    this.value = value;
    this.children = {};
    this.isEndOfWord = false;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(word) {
    let node = this.root;

    for (const letter of this.normalize(word)) {
      if (!node.children[letter]) {
        node.children[letter] = new TrieNode(letter);
      }

      node = node.children[letter];
    }

    node.isEndOfWord = true;
  }

  search(word) {
    const node = this.findNode(this.normalize(word));
    return Boolean(node && node.isEndOfWord);
  }

  suggestions(prefix, limit = 6) {
    return this.wordsWithPrefix(prefix).slice(0, limit);
  }

  wordsWithPrefix(prefix) {
    const cleanPrefix = this.normalize(prefix);
    const node = this.findNode(cleanPrefix);

    if (!node) return [];

    const results = [];
    this.collect(node, cleanPrefix, results);
    return results;
  }

  findNode(word) {
    let node = this.root;

    for (const letter of word) {
      if (!node.children[letter]) return null;
      node = node.children[letter];
    }

    return node;
  }

  collect(node, word, results) {
    if (node.isEndOfWord) results.push(word);

    for (const letter of Object.keys(node.children).sort()) {
      this.collect(node.children[letter], word + letter, results);
    }
  }

  normalize(text) {
    return text.trim().toLowerCase();
  }
}

export class MaxHeap {
  constructor(items = []) {
    this.heap = [];
    this.heapify(items);
  }

  push(value) {
    this.heap.push(value);
    this.percolateUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.percolateDown(0);
    return max;
  }

  peek() {
    return this.heap[0] || null;
  }

  heapify(items) {
    this.heap = [...items];

    for (let index = Math.floor(this.heap.length / 2) - 1; index >= 0; index--) {
      this.percolateDown(index);
    }
  }

  top(limit = 5) {
    const copy = new MaxHeap();
    copy.heap = [...this.heap];

    const result = [];
    while (copy.size() && result.length < limit) {
      result.push(copy.pop());
    }

    return result;
  }

  size() {
    return this.heap.length;
  }

  toArray() {
    return [...this.heap];
  }

  percolateUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.priority(this.heap[parent]) >= this.priority(this.heap[index])) break;

      this.swap(parent, index);
      index = parent;
    }
  }

  percolateDown(index) {
    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let biggest = index;

      if (this.heap[left] && this.priority(this.heap[left]) > this.priority(this.heap[biggest])) {
        biggest = left;
      }

      if (this.heap[right] && this.priority(this.heap[right]) > this.priority(this.heap[biggest])) {
        biggest = right;
      }

      if (biggest === index) break;

      this.swap(index, biggest);
      index = biggest;
    }
  }

  swap(indexA, indexB) {
    [this.heap[indexA], this.heap[indexB]] = [this.heap[indexB], this.heap[indexA]];
  }

  priority(value) {
    return value.popularity ?? value.plays ?? value;
  }
}

export class Graph {
  constructor() {
    this.nodes = [];
    this.adjacency = {};
  }

  addNode(node) {
    if (!this.adjacency[node]) {
      this.nodes.push(node);
      this.adjacency[node] = [];
    }
  }

  addEdge(nodeA, nodeB) {
    this.addNode(nodeA);
    this.addNode(nodeB);

    if (!this.adjacency[nodeA].includes(nodeB)) {
      this.adjacency[nodeA].push(nodeB);
    }

    if (!this.adjacency[nodeB].includes(nodeA)) {
      this.adjacency[nodeB].push(nodeA);
    }
  }

  searchNode(node) {
    return this.nodes.includes(node);
  }

  getAdjacency(node) {
    return this.adjacency[node] || [];
  }

  print() {
    return this.adjacency;
  }
}
