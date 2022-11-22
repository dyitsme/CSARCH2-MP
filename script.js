import { complement, add, shift, chosenDec, isBin, dec_to_bin } from './utils.js'

document.querySelector('#submit').addEventListener('click', main)


function main() {
  let M = document.querySelector('#inputM').value
  let Q = document.querySelector('#inputQ').value
  let MC = complement(M)
  let Q0 = Q.length-1
  let Q_1 = '0'
  let A = ''
  let prod = '' 
  let valid = true
  let masterValid = true
  // ========= checking for validity and conversion ================
  // if (chosenDec) {
  //   let dec_to_bin_obj = dec_to_bin(M, valid)
  //   M = dec_to_bin_obj.B
  //   valid = dec_to_bin_obj.valid

  //   if (!valid) {
  //     masterValid = false
  //   }

  //   dec_to_bin_obj = dec_to_bin(Q, valid)
  //   Q = dec_to_bin_obj.B
  //   valid = dec_to_bin_obj.valid
  //   // should have a master invalid
  //   if (!valid) {
  //     masterValid = false
  //   }
  // }
  // else {
  //   valid = isBin(M)
  //   if (!valid) {
  //     masterValid = false
  //   }
  //   valid = isBin(Q)
  //   if (!valid) {
  //     masterValid = false
  //   }
  // }

  // ========= initialization ======================================
  for (let i = 0; i < M.length; i++) {
    A = '0' + A
  }
  
  console.log("\nInitialization: ")
  console.log("-M = " + MC)
  console.log("M = " + M)
  console.log("A = " + A + "  Q = " + Q + "  Q-1 = " + Q_1 + "\n")

  console.log("" + A + " " + Q + " " + Q_1)

  for (let i = 0; i < Q.length; i++) {
    console.log("------------------------------")
    if (Q.charAt(Q0) + Q_1 == "01") {
      A = add(A, M)
      console.log(M + "\t\tA <- A+M")
      console.log(A + "\t\tCycle " + (i+1))
    }
    else if  (Q.charAt(Q0) + Q_1 == "10") {
      A = add(A, MC) // add is wrong
      console.log(MC + "\t\tA <- A-M")
      console.log(A + "\t\tCycle " + (i+1))
    }
    else {
      console.log("-COPY-\t\tCycle " + (i+1))
    }
    
    console.log(A + " " + Q + " " + Q_1)
    let obj = shift(A, Q, Q_1)
    A = obj.A
    Q = obj.Q
    Q_1 = obj.Q_1
    console.log(A + " " + Q + " " + Q_1)
  }


  prod = A + Q
  console.log("\nFinal Answer: " + prod)
}