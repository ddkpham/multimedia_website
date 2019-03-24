package entropycoding.huffman;

public class HuffTree {
    HuffTree left;
    HuffTree right;
    HuffTree parent;
    char symbol; // parent is Character.MIN_VALUE
    int count;
    
    public  HuffTree(char symbol, int count) {
        left = null;
        right = null;
        parent = null;
        this.symbol = symbol;
        this.count = count;
    }
    
    public void setLeft(HuffTree left) {
        this.left = left;
    }
    
    public void setRight(HuffTree right) {
        this.right = right;
    }
    
    public void setParent(HuffTree parent) {
        this.parent = parent;
    }
    
    public void setSymbol(char symbol) {
        this.symbol = symbol;
    }
    
    public void setCount(int count) {
        this.count = count;
    }
    
    public char getSymbol() {
        return symbol;
    }
    
    public int getCount() {
        return count;
    }
    
    public HuffTree getLeft() {
        return left;
    }
    
    public HuffTree getRight() {
        return right;
    }
    
    public HuffTree getParent() {
        return parent;
    }
    
    public void insertNewSymbol(char symbol) {
        // Go all the way to NEW
        // Split the NEW leaf
        // will create new subtree
        // NEW is left, new symbol is right
        // new symbol node will have count of 1
    }
    
    public void insertSymbol() {
        //
    }
}