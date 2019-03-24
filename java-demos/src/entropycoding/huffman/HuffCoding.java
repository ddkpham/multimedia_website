package entropycoding.huffman;

import java.util.ArrayList;
import java.util.PriorityQueue;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

public class HuffCoding {
    
    PriorityQueue<HuffTree> subtreeQueue;
    HashMap<Character, Integer> characterFrequency;
    List<HuffTree> symbolList;
    
    public HuffCoding () {
        subtreeQueue = new PriorityQueue<>(5, new HuffComparator()); 
        characterFrequency = new HashMap<>();
        symbolList = new ArrayList<HuffTree>(); 
    }
    
    public void createHuffmanTree (String input) {
        
        // Get the frequency for each character
        for (int i = 0; i < input.length(); i++) {
            char currChar = input.charAt(i);
            characterFrequency.putIfAbsent(currChar, 0);
            characterFrequency.put(currChar, characterFrequency.get(currChar) + 1);
        }
        
        // Put each character into priority queue based on frequency
        for (Map.Entry<Character, Integer> entry : characterFrequency.entrySet()) {
            HuffTree newTree = new HuffTree(entry.getKey(), entry.getValue());
            subtreeQueue.add(newTree);
            symbolList.add(newTree);
        }
        
        // Create the huffman tree
        while (subtreeQueue.size() > 1) {
            HuffTree subtree1 = subtreeQueue.poll();
            HuffTree subtree2 = subtreeQueue.poll();
            HuffTree newSubtree = new HuffTree(Character.MIN_VALUE, subtree1.getCount() + subtree2.getCount());
            newSubtree.setLeft(subtree1);
            newSubtree.setRight(subtree2);
            subtree1.setParent(newSubtree);
            subtree2.setParent(newSubtree);
            subtreeQueue.add(newSubtree);
        }
        
        // Get the huffman codeword for each symbol
        for (int i = 0; i < symbolList.size(); i++) {
            HuffTree node = symbolList.get(i);
            HuffTree currNode = node;
            HuffTree prevNode = null;
            String codeWord = "";
            while (currNode.getParent() != null) {
                prevNode = currNode;
                currNode = currNode.getParent();
                if (prevNode == currNode.getLeft()) {
                    codeWord = "0" + codeWord;
                } else if (prevNode == currNode.getRight()) {
                    codeWord = "1" + codeWord;
                } else {
                    System.out.println("BAD");
                }
            }
            System.out.println(node.symbol + ": " + codeWord);
        }
    }
}
