package entropycoding.huffman;

import java.util.ArrayList;
import java.util.PriorityQueue;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

public class HuffCoding {

    PriorityQueue<HuffTree> subtreeQueue;
    HashMap<Character, Integer> symbolFrequency;
    List<HuffTree> symbolList;
    HashMap<Character, String> symbolToCodeword;
    HashMap<String, Character> codewordToSymbol;

    public HuffCoding () {
        subtreeQueue = new PriorityQueue<>(5, new HuffComparator());
        symbolFrequency = new HashMap<>();
        symbolList = new ArrayList<HuffTree>();
        symbolToCodeword = new HashMap<>();
        codewordToSymbol = new HashMap<>();
    }

    public void createHuffmanTree (String input) {

        // Get the frequency for each character
        for (int i = 0; i < input.length(); i++) {
            char currChar = input.charAt(i);
            symbolFrequency.putIfAbsent(currChar, 0);
            symbolFrequency.put(currChar, symbolFrequency.get(currChar) + 1);
        }

        // Put each character into priority queue based on frequency
        for (Map.Entry<Character, Integer> entry : symbolFrequency.entrySet()) {
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
            String codeword = "";
            while (currNode.getParent() != null) {
                prevNode = currNode;
                currNode = currNode.getParent();
                if (prevNode == currNode.getLeft()) {
                    codeword = "0" + codeword;
                } else if (prevNode == currNode.getRight()) {
                    codeword = "1" + codeword;
                } else {
                    System.out.println("BAD");
                }
            }
            symbolToCodeword.put(node.getSymbol(), codeword);
            codewordToSymbol.put(codeword, node.getSymbol());
        }
    }

    public String encode (String input) {
        String output = "";
        for (int i = 0; i < input.length(); i++) {
            char currChar = input.charAt(i);
            output = output + symbolToCodeword.get(currChar);
        }
        return output;
    }

    public String decode (String input) {
        String output = "";
        String currCodeword = "";
        for (int i = 0; i < input.length(); i++) {
            currCodeword = currCodeword + input.charAt(i);
            if (codewordToSymbol.containsKey(currCodeword)) {
                output = output + codewordToSymbol.get(currCodeword);
                currCodeword = "";
            }
        }
        return output;
    }
}
