import { isDec, complement, add, shift } from './utils.js'

document.querySelector('#submit').addEventListener('click', main)


function main() {
  // complement(inputM)
  let M = document.querySelector('#inputM').value
  var Q = document.querySelector('#inputQ').value
  let MC = complement(M)
  let Q0 = Q.length-1
  let Q_1 = '0'
  let A = ''

  for (let i = 0; i < M.length; i++) {
    A = '0' + A
  }

  console.log("\nInitialization: ")
  console.log("-M = " + MC)
  console.log("M = " + M)
  console.log("A = " + A + "  Q = " + Q + "  Q-1 = " + Q_1 + "\n")

  console.log("" + A + " " + Q + " " + Q_1)
  console.log(Q.charAt(0) + Q_1)

  for (let i = 0; i < Q.length; i++) {
    console.log("------------------------------")
    if (Q.charAt(Q0) + Q_1 == "01") {
      A = add(A, M)
      console.log(M + "\t\tA <- A+M")
      console.log(A + "\t\tCycle " + str(i+1))
    }
    else if  (Q.charAt(Q0) + Q_1 == "10") {
      A = add(A,MC)
      console.log(MC + "\t\tA <- A-M")
      console.log(A + "\t\tCycle " + str(i+1))
    }
    else {
      console.log("-COPY-\t\tCycle " + str(i+1))
    }

    console.log(A + " " + Q + " " + Q_1)
    let {A, Q, Q_1} = shift(A, Q, Q_1)
    console.log(A + " " + Q + " " + Q_1)
  }
  prod = A + Q
  console.log("\nFinal Answer: " + prod)
}