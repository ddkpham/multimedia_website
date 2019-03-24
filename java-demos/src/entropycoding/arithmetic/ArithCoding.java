package entropycoding.arithmetic;

import static java.lang.Double.longBitsToDouble;
import java.util.HashMap;

public class ArithCoding {
    HashMap<Character, ArithSymbol> arithmeticSymbols;
    
    public ArithCoding () {
        arithmeticSymbols = new HashMap<>();
    }
    
    public void addSymbol (char symbol, double low, double range) {
        ArithSymbol newSymbol = new ArithSymbol(symbol, low, range);
        arithmeticSymbols.put(symbol, newSymbol);
    }
    
    public void initDefaultSymbols () {
        addSymbol('A', 0.0, 0.2);
        addSymbol('B', 0.2, 0.1);
        addSymbol('C', 0.3, 0.2);
        addSymbol('D', 0.5, 0.05);
        addSymbol('E', 0.55, 0.3);
        addSymbol('F', 0.85, 0.05);
        addSymbol('$', 0.9, 0.1);
    }
    
    public long encode (String input) {
        double low = 0.0;
        double high = 1.0;
        double range = 1.0;
        
        for (int i =0; i < input.length(); i++) {
            ArithSymbol symbol = arithmeticSymbols.get(input.charAt(i));
            double newLow = low + range * symbol.getLow();
            double newHigh = low + range * symbol.getHigh();
            
            low = newLow;
            high = newHigh;
            range = high - low;
        }
        
        return generateCodeword(low, high);
    }
    
    public String decode (long input) {
        
        double value = getCodewordValue(input);
        ArithSymbol symbol = null;
        String output = "";
        do {
            for (ArithSymbol currSymbol : arithmeticSymbols.values()) {
                if (currSymbol.getLow() <= value && value < currSymbol.getHigh()) {
                    symbol = currSymbol;
                }
            }
            output = output + symbol.getSymbol();
            double low = symbol.getLow();
            double high = symbol.getHigh();
            double range = high - low;
            value = (value - low) / range;
        } while (symbol.getSymbol() != '$');
        
        return output;
    }
    
    
    public double getCodewordValue (long code) {
        if (code == 0) {
            return 0.0;
        }
        
        // count the number of leading zeros
        int leadingZeroCount = 0;
        long mask = 0x8000000000000000L;
        while ((code & mask) == 0) {
            leadingZeroCount++;
            mask = mask >> 1;
        }
        
        long exponent = 1023 - 1 - leadingZeroCount;
        exponent = exponent << 52;
        
        code = code << (leadingZeroCount + 1);
        code = code >>> 12;
        
        long value = 0x0000000000000000L;
        
        value = value | exponent;
        value = value | code;
        
        return longBitsToDouble(value);
    }
    
    public long generateCodeword (double low, double high) {
        long code = 0x0000000000000000L;
        long mask = 0x8000000000000000L;
        int k = 1;
        
        while (getCodewordValue(code) < low) {
            code = code ^ mask;
            if (getCodewordValue(code) > high) {
                code = code ^ mask;
            }
            k = k + 1;
            mask = mask >>> 1;
        }
        
        return code;
    }
}
