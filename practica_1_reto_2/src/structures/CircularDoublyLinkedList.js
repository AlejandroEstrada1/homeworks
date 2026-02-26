
export class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export function buildCircularDoublyLinkedList(items) {
  if (!items || items.length === 0) return null;

  const nodes = items.map((item) => new Node(item));

  for (let i = 0; i < nodes.length; i++) {
    const nextIndex = (i + 1) % nodes.length;
    const prevIndex = (i - 1 + nodes.length) % nodes.length;

    nodes[i].next = nodes[nextIndex];
    nodes[i].prev = nodes[prevIndex];
  }

  
  return nodes[0];
}