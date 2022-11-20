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

M = input()
MC = complement(M)
Q = input()
Q0 = len(Q)-1
Q_1 = '0'
A = ''
for i in M:
    A = '0' + A

print("\nInitialization: ")
print("-M = " + MC)
print("M = " + M)
print("A = " + A + "  Q = " + Q + "  Q-1 = " + Q_1 + "\n")

print("" + A + " " + Q + " " + Q_1)
for i in range(len(Q)):
    print("------------------------------")
    if Q[Q0] + Q_1 == "01":
        A = add(A,M)
        print(M + "\t\tA <- A+M")
        print(A + "\t\tCycle " + str(i+1))
    elif Q[Q0] + Q_1 == "10":
        A = add(A,MC)
        print(MC + "\t\tA <- A-M")
        print(A + "\t\tCycle " + str(i+1))
    else:
        print("-COPY-\t\tCycle " + str(i+1))

    print(A + " " + Q + " " + Q_1)
    A,Q,Q_1 = shift(A,Q,Q_1)
    print(A + " " + Q + " " + Q_1)

prod = A + Q
print("\nFinal Answer: " + prod)