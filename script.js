import { complement, add, shift, is_bin, dec_to_bin } from './utils.js'

document.querySelector('#submit').addEventListener('click', main)


function checked_num_radio() {
  let radioButtonGroup = document.getElementsByName("num_type")
  let checkedRadio = Array.from(radioButtonGroup).find(
    (radio) => radio.checked
  )
  return checkedRadio.value
}

function checked_out_radio() {
  let radioButtonGroup = document.getElementsByName("out_type")
  let checkedRadio = Array.from(radioButtonGroup).find(
    (radio) => radio.checked
  )
  return checkedRadio.value
}


function console_test(MC, M, Q, A, Q_1, Q0) {
  let prod = ''
  
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

  
function render_all(MC, M, Q, A, Q_1, Q0) {
  let prod = ''
  
  const output_box = document.querySelector('.output-box')
  output_box.innerHTML += `
    <div>
      <div class="init">Initialization</div>
      <div>-M = ${MC}</div>
      <div>M = ${M}</div>
      <div>A = ${A} Q = ${Q} Q-1 = ${Q_1}</div>
    </div>
  `
  for (let i = 0; i < Q.length; i++) {
      output_box.innerHTML += `
        <div>------------------------------</div>
      `
    if (Q.charAt(Q0) + Q_1 == "01") {
      output_box.innerHTML += `
        <div class="cycle">
          <div>${M} A <- A+M</div>
          <div>${A} Cycle ${i+1}</div>
        </div>
      `
      A = add(A, M)
    }
    else if  (Q.charAt(Q0) + Q_1 == "10") {
      output_box.innerHTML += `
        <div class="cycle">
          <div>${MC} A <- A-M</div>
          <div>${A} Cycle ${i+1}</div>
        </div>
      `
      A = add(A, MC) // add is wrong
    }
    else {
      output_box.innerHTML += `
        <div class="cycle">-COPY- Cycle ${i+1}</div>
      `
    }
    
    output_box.innerHTML += `
      <div>${A} ${Q} ${Q_1}</div>
    `
    let obj = shift(A, Q, Q_1)
    A = obj.A
    Q = obj.Q
    Q_1 = obj.Q_1

    output_box.innerHTML += `
      <div>${A} ${Q} ${Q_1}</div>
    `
  }

  prod = A + Q
  output_box.innerHTML += `
    <div class="prod">Final Answer: ${prod}</div>
  `
}

function render_file(MC, M, Q, A, Q_1, Q0) {
  let prod = ''
  
  const output_file = []

  output_file.push(`Initialization\n`)
  output_file.push(`-M = ${MC}\n`)
  output_file.push(`M = ${M}\n`)
  output_file.push(`A = ${A}\n`)
  output_file.push(`A = ${A} Q = ${Q} Q-1 = ${Q_1}\n`)
  for (let i = 0; i < Q.length; i++) {
    output_file.push(`------------------------------\n`)

    if (Q.charAt(Q0) + Q_1 == "01") {
      A = add(A, M)
      output_file.push(`${M} A <- A+M\n`)
      output_file.push(`${A} Cycle ${i+1}\n`)
    }
    else if  (Q.charAt(Q0) + Q_1 == "10") {
      A = add(A, MC) // add is wrong
      output_file.push(`${M} A <- A+M\n`)
      output_file.push(`${A} Cycle ${i+1}\n`)
    }
    else {
      output_file.push(`-COPY- Cycle ${i+1}\n`)
    }
    
    output_file.push(`${A} ${Q} ${Q_1}\n`)
    let obj = shift(A, Q, Q_1)
    A = obj.A
    Q = obj.Q
    Q_1 = obj.Q_1

    output_file.push(`${A} ${Q} ${Q_1}\n`)
  }

  prod = A + Q
  output_file.push(`Final Answer: ${prod}\n`)
  
  return output_file
}

function reset_html() {
  const output_box = document.querySelector('.output-box')

  while(output_box.firstChild) {
    output_box.removeChild(output_box.lastChild)
  }
}

function main() {
  const output_box = document.querySelector('.output-box')
  let M = document.querySelector('#inputM').value
  let Q = document.querySelector('#inputQ').value
  let MC = complement(M)
  let Q0 = Q.length-1
  let Q_1 = '0'
  let A = ''
  let valid = true
  
  let num_type = checked_num_radio()  // 'Binary' or 'Decimal'
  let out_type = checked_out_radio()  // 'Step', 'All', or 'File'

  // ========= checking for validity and conversion ================
  if (num_type == 'Decimal') {
    M = dec_to_bin(M, valid)
    Q = dec_to_bin(Q, valid)
    MC = complement(M)
  }

  // ========= initialization ======================================
  for (let i = 0; i < M.length; i++) {
    A = '0' + A
  }

  if (is_bin(M) && is_bin(Q)) {
    if (out_type == 'Step') {
      // change to step by step
      reset_html()
      render_all(MC, M, Q, A, Q_1, Q0)
    }
    else if (out_type == 'All') {
      reset_html()
      render_all(MC, M, Q, A, Q_1, Q0)
    }
    else {
      // display to text file
      output_box.innerHTML += `
        <a id="a1" download="output.txt">Download text file</a>
      `
      const file = render_file(MC, M, Q, A, Q_1, Q0)
      const blob1 = new Blob(file, { type: 'text/plain'})
      a1.href = URL.createObjectURL(blob1)
    }
  }
  else {
    output_box.innerHTML = `
      <div class="error">Input should be in binary</div>
    `
  }
  // console_test(MC, M, Q, A, Q_1, Q0)
  
}