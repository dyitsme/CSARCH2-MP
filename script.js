import { complement, add, shift, is_bin, is_digit, bin_to_dec, dec_to_bin, rangebit4to16 } from './utils.js'

document.querySelector('#submit').addEventListener('click', main)
const output_box = document.querySelector('.output-box')


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
      console.log(M + "\t\tA <- A+M")
      console.log(A + "\t\tCycle " + (i+1))
      A = add(A, M)
    }
    else if  (Q.charAt(Q0) + Q_1 == "10") {
      console.log(MC + "\t\tA <- A-M")
      console.log(A + "\t\tCycle " + (i+1))
      A = add(A, MC) // add is wrong
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

function wait(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function render_all(MC, M, Q, A, Q_1, Q0, sbs) {
  let prodB = ''
  let prodD = ''
  let btn = document.getElementById('submit');
  let inM = document.getElementById('inputM');
  let inQ = document.getElementById('inputQ');

  btn.setAttribute("disabled", true);
  inM.setAttribute("disabled", true);
  inQ.setAttribute("disabled", true);
  const output_box = document.querySelector('.output-box')
  if (sbs) {
    output_box.innerHTML += `
      <div>
        <div class="init">Initialization</div>
        <div>-M = ${MC}</div>
        <div>M = ${M}</div>
        <div>A = ${A} Q = ${Q} Q-1 = ${Q_1}</div>
        </br>
        <div class="hint">- Complement M so we can use that for subtraction later.</div>
        <div class="hint">- Set A to 0 with the number of 0's being equal to the number of bits in M.</div>
        <div class="hint">- Set Q-1 to 0 and keep track of the last bit of Q.</div>
      </div>
      </br>
    `
    await wait(1000);
  }
  else {
    output_box.innerHTML += `
      <div>
        <div class="init">Initialization</div>
        <div>-M = ${MC}</div>
        <div>M = ${M}</div>
        <div>A = ${A} Q = ${Q} Q-1 = ${Q_1}</div>
      </div>
    `
  }
  for (let i = 0; i < Q.length; i++) {
      output_box.innerHTML += `
        <hr></hr>
      `
      if (sbs) await wait(4000);
    if (Q.charAt(Q0) + Q_1 == "01") {
      if (sbs) {
        output_box.innerHTML += `
          <div>Cycle ${i+1}</div>
          <div class="hint">- Check the values of Q's least significant bit and Q-1.</div>
          <div class="hint">- Q0  = 0</div>
          <div class="hint">- Q-1 = 1</div>
          <div class="hint">- Therefore: A <- A + M</div>
          </br>
          <div class="cycle">
            <div>${M}</div>
            <div>${A}</div>
          </div>
          </br>
        `
        await wait(3000);
      } else {
        output_box.innerHTML += `
          <div class="cycle">
            <div>${M} A <- A+M</div>
            <div>${A} Cycle ${i+1}</div>
          </div>
        `
      }
      A = add(A, M)
    }
    else if  (Q.charAt(Q0) + Q_1 == "10") {
      if (sbs) {
        output_box.innerHTML += `
        <div>Cycle ${i+1}</div>
        <div class="hint">- Check the values of Q's least significant bit and Q-1.</div>
        <div class="hint">- Q0  = 1</div>
        <div class="hint">- Q-1 = 0</div>
        <div class="hint">- Therefore: A <- A - M</div>
        <div class="hint">- Since we complemented M earlier, we can just add that to A,</div>
        </br>
        <div class="cycle">
          <div>${MC}</div>
          <div>${A}</div>
        </div>
        </br>
      `
        await wait(4000);
      } else {
        output_box.innerHTML += `
          <div class="cycle">
            <div>${MC} A <- A-M</div>
            <div>${A} Cycle ${i+1}</div>
          </div>
        `
      }
      A = add(A, MC) 
    }
    else {
      if (sbs) {
        output_box.innerHTML += `
          <div>Cycle ${i+1}</div>
          <div class="hint">- Check the values of Q's least significant bit and Q-1.</div>
          <div class="hint">- Q0  = Q-1</div>
          <div class="hint">- Therefore: Just COPY the current values.</div>
          </br>
        `
        await wait(4000);
      } else {
        output_box.innerHTML += `
          <div class="cycle">-COPY- Cycle ${i+1}</div>
        `
      }
    }
    
    if (sbs) {
      output_box.innerHTML += `
        <div>${A} ${Q} ${Q_1}</div>
        </br>
        <div class="hint">- Shift to the right and take note of the sign bit.</div>
        </br>
      `
      await wait(2000);
    } else {
      output_box.innerHTML += `
        <div>${A} ${Q} ${Q_1}</div>
      `
    }
    let obj = shift(A, Q, Q_1)
    A = obj.A
    Q = obj.Q
    Q_1 = obj.Q_1

    output_box.innerHTML += `
      <div>${A} ${Q} ${Q_1}</div>
    `
    if (sbs) await wait(3000);
  }

  prodB = A + Q
  prodD = bin_to_dec(prodB)
  if (sbs) {
    output_box.innerHTML += `
    </br></br>
    <div class="hint">- To get the final answer, combine A and Q.</div>
    </br>
  `
  }
  output_box.innerHTML += `
    <hr></hr>
    </br>
    <div class="prod">Final Answer (Binary): ${prodB}</div>
    <div class="prod">Final Answer (Decimal): ${prodD}</div>
  `
  btn.removeAttribute("disabled");
  inM.removeAttribute("disabled");
  inQ.removeAttribute("disabled");
}

function render_file(MC, M, Q, A, Q_1, Q0) {
  let prod = ''
  
  const output_file = []

  output_file.push(`Initialization\n`)
  output_file.push(`-M = ${MC}\n`)
  output_file.push(`M = ${M}\n`)
  output_file.push(`A = ${A} Q = ${Q} Q-1 = ${Q_1}\n`)
  for (let i = 0; i < Q.length; i++) {
    output_file.push(`------------------------------\n`)

    if (Q.charAt(Q0) + Q_1 == "01") {
      output_file.push(`${M} A <- A+M\n`)
      output_file.push(`${A} Cycle ${i+1}\n`)
      A = add(A, M)
    }
    else if  (Q.charAt(Q0) + Q_1 == "10") {
      output_file.push(`${M} A <- A+M\n`)
      output_file.push(`${A} Cycle ${i+1}\n`)
      A = add(A, MC) // add is wrong
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
  while(output_box.firstChild) {
    output_box.removeChild(output_box.lastChild)
  }
}

function display(MC, M, Q, A, Q_1, Q0, out_type) {
  if (out_type == 'Step') {
    // change to step by step
    reset_html()
    render_all(MC, M, Q, A, Q_1, Q0, true);
  }
  else if (out_type == 'All') {
    reset_html()
    render_all(MC, M, Q, A, Q_1, Q0, false)
  }
  else {
    // display to text file
    output_box.innerHTML = `
      <a id="a1" download="output.txt">Download text file</a>
    `
    const file = render_file(MC, M, Q, A, Q_1, Q0)
    const blob1 = new Blob(file, { type: 'text/plain'})
    a1.href = URL.createObjectURL(blob1)
  }
  
}

function initializeA(A, M) {
  for (let i = 0; i < M.length; i++) {
    A = '0' + A
  }
  return A
}

function main() {
  let M = document.querySelector('#inputM').value
  let Q = document.querySelector('#inputQ').value
  let MC = complement(M)
  let Q0 = Q.length-1
  let Q_1 = '0'
  let A = ''
  let valid = true
  
  let num_type = checked_num_radio()  // 'Binary' or 'Decimal'
  let out_type = checked_out_radio()  // 'Step', 'All', or 'File'

  // ========= initialization ======================================


  if (num_type == 'Binary') {
    if (is_bin(M) && is_bin(Q)) {
      if (rangebit4to16(M) && rangebit4to16(Q)) {
        A = initializeA(A, M)
        display(MC, M, Q, A, Q_1, Q0, out_type)
      }
      else if (M.length > 16 || Q.length > 16) {
        output_box.innerHTML = `
          <div class="error">Input should be within 4 to 16 bits</div>
        `
      }
      else {
        while(M.length < 4) {
          M = M.charAt(0) + M
        }
        while(Q.length < 4) {
          Q = Q.charAt(0) + Q
        }
        A = initializeA(A, M)
        MC = complement(M)
        display(MC, M, Q, A, Q_1, Q0, out_type)
      }
    }
    else {
      output_box.innerHTML = `
        <div class="error">Input should be in binary</div>
      `
    }
  }
  else {
    if (is_digit(M) && is_digit(Q)) {
      M = dec_to_bin(M)
      Q = dec_to_bin(Q)
      MC = complement(M)
      Q0 = Q.length-1

      if (rangebit4to16(M) && rangebit4to16(Q)) {
        A = initializeA(A, M)
        display(MC, M, Q, A, Q_1, Q0, out_type)
      }
      else if (M.length > 16 || Q.length > 16) {
        output_box.innerHTML = `
          <div class="error">Input should be within 4 to 16 bits</div>
        `
      }
      else {
        while(M.length < 4) {
          M = M.charAt(0) + M
        }
        while(Q.length < 4) {
          Q = Q.charAt(0) + Q
        }
        A = initializeA(A, M)
        MC = complement(M)
        Q0 = Q.length-1
        display(MC, M, Q, A, Q_1, Q0, out_type)
      }
    }
    else {
      output_box.innerHTML = `
        <div class="error">Input should be in decimal</div>
      `
    }
  }

  // console_test(MC, M, Q, A, Q_1, Q0)
  
}
