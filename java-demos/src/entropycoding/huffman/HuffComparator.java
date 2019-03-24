package entropycoding.huffman;

import java.util.Comparator;

public class HuffComparator implements Comparator<HuffTree>{ 
              
    @Override
    public int compare(HuffTree t1, HuffTree t2) { 
        if (t1.count > t2.count) {
            return 1; 
        }
        else if (t1.count < t2.count) {
            return -1;
        }
        return 0; 
    } 
    
} 
