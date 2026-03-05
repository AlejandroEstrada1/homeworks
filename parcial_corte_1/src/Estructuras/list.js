

class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

class NodoDoble {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
    this.anterior = null;
  }
}

class NodoCircular {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

class NodoCircularDoble {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
    this.anterior = null;
  }
}



export class LinkedList {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.longitud = 0;
  }

  agregar(valor) {
    const nuevoNodo = new Nodo(valor);

    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
    } else {
      this.cola.siguiente = nuevoNodo;
      this.cola = nuevoNodo;
    }

    this.longitud++;
  }

 
  buscar(valor, actual = this.cabeza) {
    while (actual) {
      if (actual.valor === valor) return actual;
      actual = actual.siguiente;
    }
    return null;
  }

  
  tamaño() {
    return this.longitud;
  }

  
  eliminar(valor) {
    if (!this.cabeza) return null;

   
    if (this.cabeza.valor === valor) {
      const eliminado = this.cabeza.valor;
      this.cabeza = this.cabeza.siguiente;

      if (!this.cabeza) this.cola = null;

      this.longitud--;
      return eliminado;
    }

    let anterior = this.cabeza;
    let actual = this.cabeza.siguiente;

    while (actual) {
      if (actual.valor === valor) {
        const eliminado = actual.valor;

        anterior.siguiente = actual.siguiente;

        if (actual === this.cola) {
          this.cola = anterior;
        }

        this.longitud--;
        return eliminado;
      }

      anterior = actual;
      actual = actual.siguiente;
    }

    return null;
  }

  
  borrarPorId(id) {
    if (!this.cabeza) return null;

    if (this.cabeza.valor.id === id) {
      const eliminado = this.cabeza.valor;
      this.cabeza = this.cabeza.siguiente;

      if (!this.cabeza) this.cola = null;

      this.longitud--;
      return eliminado;
    }

    let anterior = this.cabeza;
    let actual = this.cabeza.siguiente;

    while (actual) {
      if (actual.valor.id === id) {
        const eliminado = actual.valor;

        anterior.siguiente = actual.siguiente;

        if (actual === this.cola) this.cola = anterior;

        this.longitud--;
        return eliminado;
      }

      anterior = actual;
      actual = actual.siguiente;
    }

    return null;
  }


  imprimir() {
    const resultado = [];
    let actual = this.cabeza;

    while (actual) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
    }

    return resultado;
  }
}




export class DoublyLinkedList {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.longitud = 0;
  }

  agregar(valor) {
    const nuevoNodo = new NodoDoble(valor);

    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      this.longitud++;
      return;
    }

    nuevoNodo.anterior = this.cola;
    this.cola.siguiente = nuevoNodo;
    this.cola = nuevoNodo;
    this.longitud++;
  }

  buscar(valor, actual = this.cabeza) {
    while (actual) {
      if (actual.valor === valor) return actual;
      actual = actual.siguiente;
    }
    return null;
  }

  tamaño() {
    return this.longitud;
  }

  
  eliminar(valor) {
    if (!this.cabeza) return null;

    let actual = this.cabeza;

    while (actual) {
      if (actual.valor === valor) {
        const eliminado = actual.valor;

        if (actual === this.cabeza) {
          this.cabeza = actual.siguiente;
          if (this.cabeza) this.cabeza.anterior = null;
        }

        if (actual === this.cola) {
          this.cola = actual.anterior;
          if (this.cola) this.cola.siguiente = null;
        }

        if (actual.anterior) actual.anterior.siguiente = actual.siguiente;
        if (actual.siguiente) actual.siguiente.anterior = actual.anterior;

        this.longitud--;
        return eliminado;
      }

      actual = actual.siguiente;
    }

    return null;
  }

  imprimir() {
    const resultado = [];
    let actual = this.cabeza;

    while (actual) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
    }

    return resultado;
  }
}


export class CircularLinkedList {
  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.longitud = 0;
  }

  construirDesdeArreglo(items) {
    if (!items || items.length === 0) return;

    items.forEach((x) => this.agregar(x));
  
    this.cola.siguiente = this.cabeza;
  }

  agregar(valor) {
    const nuevoNodo = new NodoCircular(valor);

    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      this.cola.siguiente = this.cabeza; 
      this.longitud++;
      return;
    }

    this.cola.siguiente = nuevoNodo;
    this.cola = nuevoNodo;
    this.cola.siguiente = this.cabeza; 
    this.longitud++;
  }

  tamaño() {
    return this.longitud;
  }

  imprimir(limite = this.longitud) {
    const resultado = [];
    if (!this.cabeza) return resultado;

    let actual = this.cabeza;
    let i = 0;

    while (i < limite) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
      i++;
    }

    return resultado;
  }
}


export class CircularDoublyLinkedList {
  constructor() {
    this.cabeza = null;
    this.longitud = 0;
  }

  construirDesdeArreglo(items) {
    if (!items || items.length === 0) return;

    const nodos = items.map((x) => new NodoCircularDoble(x));

    for (let i = 0; i < nodos.length; i++) {
      const sig = (i + 1) % nodos.length;
      const ant = (i - 1 + nodos.length) % nodos.length;

      nodos[i].siguiente = nodos[sig];
      nodos[i].anterior = nodos[ant];
    }

    this.cabeza = nodos[0];
    this.longitud = nodos.length;
  }

  tamaño() {
    return this.longitud;
  }

  imprimir(limite = this.longitud) {
    const resultado = [];
    if (!this.cabeza) return resultado;

    let actual = this.cabeza;
    let i = 0;

    while (i < limite) {
      resultado.push(actual.valor);
      actual = actual.siguiente;
      i++;
    }

    return resultado;
  }
}