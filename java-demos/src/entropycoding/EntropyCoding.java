package entropycoding;

import entropycoding.arithmetic.ArithCoding;
import entropycoding.huffman.HuffCoding;

public class EntropyCoding {

    public static void main(String[] args) {
        ArithCoding arithmeticCoding = new ArithCoding();
        arithmeticCoding.initDefaultSymbols();
        
        String inputString = "CAEE$";
        long encoding = arithmeticCoding.encode(inputString);
        System.out.println("Value: " + arithmeticCoding.getCodewordValue(encoding));
        System.out.println(String.format("Encoding: %x", encoding));
        String output = arithmeticCoding.decode(encoding);
        System.out.println("Decoding: " + output);
        
        HuffCoding huffmanCoding = new HuffCoding();
        huffmanCoding.createHuffmanTree("HELLO");
        
    }
    
}
