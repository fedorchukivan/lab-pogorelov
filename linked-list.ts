export class Node {
  private word: string;
  private freq: number[];
  private next: Node | null;
  
    constructor(word: string, file_position: number, next: Node | null = null) {
      this.word = word;
      this.freq = [0];
      this.next = next;
    }

  getValues() {
    return [this.word, this.freq];
  }

  getNext() {
    return this.next;
  }

  isNext() {
    return this.next !== null;
  }

  incrementFreq(file_position: number) {

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
    return [0];
  }

  incrementWord(word: string, file_position: number) {

  }
}