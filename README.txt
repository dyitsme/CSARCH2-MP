README!

Welcome to the DEMADALE Sequential Circuit Binary Multiplication web tool!
This website is used to perform binary multiplication on binary and decimal inputs with the use of the sequential circuit.
Follow the steps accordingly if you wish to be guided:

Perform 1, 2, and 3 in any order
1.) Select your input type using the radio buttons under "Number Type"
  "Binary" for signed binary inputs.
  "Decimal" for regular decimal inputs.
2.) Type your multiplicand in M and multiplier in Q.
  Your input must be within 4 to 16 bits and must be a valid binary number. This also applies for decimal inputs.
  If your input exceeds 16 bits, you will need to try again, however if your input is shorter than 4 bits, the program automatically extends your input to 4 bits.
  For negative decimal inputs, just type one '-' followed by the number (how you would typically write a negative decimal number).
3.) Select your output type:
  "Step-by-step" prints explanations of each step in an orderly manner.
  "All" prints the complete solution immediately with minimal explanation.
  "File" prints all of the output text to a file which can be downloaded.
4.) Press "Enter" and check the results.

Here are some sample test cases:

Sample input 1:
M = 1010
Q = 0110
Number Type = Binary

Sample output 1:
Binary: 11011100
Decimal: -36


Sample input 2:
M = 01100
Q = 010
Number Type = Binary

Sample output 2:
Binary: 000011000
Decimal: 24


Sample input 3:
M = 10010110101100111
Q = 10001
Number Type = Binary

Sample output 3:
Input should be within 4 to 16 bits


Sample input 4:
M = 15
Q = 3
Number Type = Binary

Sample ouptut 4:
Input should be in binary


Sample input 5:
M = 61
Q = 8
Number Type = Decimal

Sample output 5:
Binary: 000111101000
Decimal: 488


Sample input 6:
M = -21
Q = 12
Number Type = Decimal

Sample output 6:
Binary: 11100000100
Decimal: -252


Sample input 7:
M = 500
Q = --1
Number Type = Decimal

Sample ouptut 7:
Input should be in decimal


Sample input 8:
M = 1abc2
Q = 99 99
Number Type = Decimal

Sample ouptut 8:
Input should be in decimal


Sample input 9:
M = 1011
Q = 1010
Number Type = Decimal

Sample output 9:
Binary: 0011111001010010110110
Decimal: 1021110


Sample input 10:
M = -50
Q = -2
Number Type = Decimal

Sample output 10:
Binary: 00001100100
Decimal: 100
