def dec_to_bin(D, valid):
    nB = "0"
    if D[0] == "-":
        D = D[1:]
        nB = "1"
    if D.isdigit():
        D = int(D)
        B = ""
        while D != 0:
            B = str(D % 2) + B
            D //= 2
        if nB == "1":
            B = complement(B)
        B = nB + B
    else:
        B = 0
        valid = False
    return B, valid

def bin_to_dec(B):
    D = 0
    multiplier = 1
    negative = False

    if B[0] == "1":
        B = complement(B)
        B = B[1:]
        negative = True

    for i in range(len(B)-1,-1,-1):
        D += int(B[i]) * multiplier
        multiplier *= 2
    
    if negative:
        D *= -1

    return D
    pass

def complement(M):
    bits = len(M)
    flag = False
    for i in range(bits-1,-1,-1):
        if flag:
            if M[i] == '0': M = M[:i] + '1' + M[i+1:]
            else: M = M[:i] + '0' + M[i+1:]
        else:
            if M[i] == '1': flag = True
    return M

def add(A,M):
    bits = len(M)
    S = ''
    C = 0
    for i in range(bits-1,-1,-1):
        if A[i] == "1" and M[i] == "1":
            if C == 1:
                S = "1" + S
            else:
                S = "0" + S
            C = 1
        elif A[i] == "0" and M[i] == "0":
            if C == 1:
                S = "1" + S
            else:
                S = "0" + S
            C = 0
        else:
            if C == 1:
                S = "0" + S
                C = 1
            else:
                S = "1" + S
                C = 0
    return S

def shift(A,Q,Q_1):
    Q_1 = Q[len(Q)-1]
    Q = A[len(A)-1] + Q[:len(Q)-1]
    A = A[0] + A[:len(A)-1]
    return A,Q,Q_1

valid = True
print("Enter 'B' for binary input or 'D' for decimal input:")
base = input()

if base != 'B' and base != 'D':
    valid = False
else:
    if base == 'B':
        print("Multiplicand (binary):")
        M = input()
        print("Multiplicand (binary):")
        Q = input()

        for i in M:
            if i != "0" and i != "1":
                valid = False
        for i in Q:
            if i != "0" and i != "1":
                valid = False
    else:
        print("Multiplicand (decimal):")
        dM = input()
        print("Multiplicand (decimal):")
        dQ = input()
        
        M, valid = dec_to_bin(dM, valid)
        Q, valid = dec_to_bin(dQ, valid)

display = True
if valid:
    print("Enter 'Y' if you want to display each step or 'N' if not:")
    choice = input()
    if choice != "Y" and choice != "N":
        valid = False
    elif choice == "Y":
        display = True
    else:
        display = False

if valid:
    MC = complement(M)
    Q0 = len(Q)-1
    Q_1 = '0'
    A = ''
    for i in M:
        A = '0' + A

    if display:
        print("\nInitialization: ")
        print("-M = " + MC)
        print("M = " + M)
        print("A = " + A + "  Q = " + Q + "  Q-1 = " + Q_1 + "\n")
        print("" + A + " " + Q + " " + Q_1)
    for i in range(len(Q)):
        if display: print("------------------------------")
        if Q[Q0] + Q_1 == "01":
            if display:
                print(M + "\t\tA <- A+M")
                print(A + "\t\tCycle " + str(i+1))
            A = add(A,M)
        elif Q[Q0] + Q_1 == "10":
            if display:
                print(MC + "\t\tA <- A-M")
                print(A + "\t\tCycle " + str(i+1))
            A = add(A,MC)
        else:
            if display: print("-COPY-\t\tCycle " + str(i+1))

        if display: print(A + " " + Q + " " + Q_1)
        A,Q,Q_1 = shift(A,Q,Q_1)
        if display: print(A + " " + Q + " " + Q_1)

    prod = A + Q
    print("\nFinal Answer")
    print("Binary: " + prod)
    print("Decimal: " + str(bin_to_dec(prod)))
else:
    print("You have entered an invalid value!")