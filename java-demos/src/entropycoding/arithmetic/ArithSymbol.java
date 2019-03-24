package entropycoding.arithmetic;

public class ArithSymbol {
    char symbol;
    double low;
    double high;
    double range;
    double count;
    
    public ArithSymbol (char symbol) {
        this.symbol = symbol;
        this.low = 0.0;
        this.high = 0.0;
        this.range = 0.0;
        this.count = 0.0;
    }
    
    public ArithSymbol (char symbol, double low, double range) {
        this.symbol = symbol;
        this.low = low;
        this.high = low + range;
        this.range = range;
        this.count = 0.0;
    }
    
    public void setLow (double low) {
        this.low = low;
    }
    
    public void setHigh (double high) {
        this.high = high;
    }
    
    public void setRange (double range) {
        this.range = range;
    }
    
    public void setCount (double count) {
        this.count = count;
    }
    
    public char getSymbol () {
        return symbol;
    }    
    
    public double getLow () {
        return low;
    }
    
    public double getHigh () {
        return high;
    }
    
    public double getRange () {
        return range;
    }
    
    public double getCount () {
        return count;
    }    
}
