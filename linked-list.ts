export class Node {
  private word: string;
  private freq: number[];
  private next: Node | null;
  
    constructor(word: string, file_position: number, next: Node | null = null) {
      this.word = word;
      this.freq = new Array(file_position + 1).fill(0);
      this.freq[file_position]++;
      this.next = next;
    }

  getValues() {
    return [this.word, this.freq];
  }

  getWord() {
    return this.word;
  }

  getNext() {
    return this.next;
  }

  setNext(node: Node | null) {
    this.next = node;
  }

  isNext() {
    return this.next !== null;
  }

  incrementFreq(file_position: number) {
    while (this.freq.length <= file_position) {
      this.freq.push(0);
    }
    this.freq[file_position]++;
  }

  serialize() {
    return {
      word: this.word,
      freq: this.freq
    }
  }
}

export class IndexList {
  private head: Node | null;
  private length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  getWordFreq(word: string) {
    let pointer = this.head;
    while (pointer !== null && pointer.getWord() <= word) {
      if (pointer.getWord() === word) {
        return pointer.getValues()[1];
      }
      pointer = pointer.getNext();
    }
    return [0];
  }

  incrementWord(word: string, file_position: number) {
    if (this.head === null) {
      this.head = new Node(word, file_position);
      this.length++;
      return;
    }
    if (this.head.getWord() > word) {
      this.head = new Node(word, file_position, this.head);
      this.length++;
      return;
    }
    let pointer = this.head;
    while (true) {
      if (pointer.getWord() === word) {
        pointer.incrementFreq(file_position);
        break;
      }

      const next = pointer.getNext();
      if (!next) {
        pointer.setNext(new Node(word, file_position));
        this.length++;
        break;
      }
      
      if (next.getWord() > word) {
        pointer.setNext(new Node(word, file_position, next));
        this.length++;
        break;
      }

      pointer = next;
    }
  }

  serialize() {
    let pointer = this.head;
    const res: any[] = [];
    while (pointer !== null) {
      res.push(pointer.serialize());
      pointer = pointer.getNext();
    }
    return res;
  }
}