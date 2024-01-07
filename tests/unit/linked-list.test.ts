import { IndexList, Node } from "../../linked-list";

describe('Index list classes', () => {

  describe('Index list node class', () => {
    let node: Node;
    it('should construct node correctly', () => {
      node = new Node('test', 1);
      const f = node.getValues();
      expect(f.length).toBe(2);
      expect(f[0]).toBe(0);
      expect(f[1]).toBe(1);
    });
    it('should increase word frequency correctly', () => {
      node.incrementFreq(1);
      node.incrementFreq(3);
      const f = node.getValues();
      expect(f[1]).toBe(2);
      expect(f.length).toBe(4);
      expect(f[3]).toBe(1);
      expect(f[2]).toBe(0);
    });
  });

  describe('Index list class', () => {
    const list = new IndexList();
    it('should add words correctly', () => {
      list.incrementWord('tes', 0);
      list.incrementWord('tes', 1);
      list.incrementWord('test', 1);
      expect(list.size()).toBe(2);
      expect(list.getWordFreq('tes').length).toBe(2);
    });
  });
});