export default function useTextPostionUtil(): {
  calculateNodeAndOffsetByTextPosition: (
    entryNode: Node | null,
    textPosition: number
  ) => { node: Node | null; offset: number };
  calculateTextPositionByNodeAndOffset: (
    node: Node,
    offset: number,
    textRootElement: Element
  ) => number;
} {
  const calculateNodeAndOffsetByTextPosition = (
    entryNode: Node | null,
    textPosition: number
  ) => {
    let offset = 0;
    let node = entryNode;
    while (node) {
      if (node.textContent) {
        if (offset + node.textContent.length < textPosition) {
          offset += node.textContent.length;
          node = node.nextSibling;
        } else {
          if (node.nodeType !== 3 && node.firstChild) {
            node = node.firstChild;
          } else {
            break;
          }
        }
      } else {
        if (node.nextSibling) {
          node = node.nextSibling;
        } else {
          node = node.firstChild;
        }
      }
    }
    offset = textPosition - offset;
    return { node, offset };
  };
  const calculateTextPositionByNodeAndOffset = (
    node: Node,
    offset: number,
    textRootElement: Element
  ) => {
    while (node !== textRootElement && node.parentNode) {
      while (node.previousSibling !== null) {
        node = node.previousSibling;
        if (node.textContent) {
          offset += node.textContent.length;
        }
      }
      node = node.parentNode as Node;
    }
    return offset;
  };
  return {
    calculateNodeAndOffsetByTextPosition,
    calculateTextPositionByNodeAndOffset,
  };
}
