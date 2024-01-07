export class Node {
  private word: string;
  private freq: number[];
  private next: Node | null;

  incrementFreq(file_position: number) {

  }

  constructor(word: string, file_position: number, next: Node | null = null) {
    this.word = word;
    this.freq = [0];
    this.next = next;
  }
}

export class IndexList {
  private head: Node | null;
  private length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  incrementWord(word: string, file_position: number) {

  }
}