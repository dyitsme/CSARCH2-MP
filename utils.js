const binRadio = document.querySelector('#binary')

export function chosenDec() {
  if (binRadio.checked) {
    console.log('its binary')
    return false
  }
  else {
    console.log('its decimal')
    return true
  }
}

function isDigit(D) {
  const validNums = ['1', '2,', '3', '4', '5', '6', '7', '8', '9', '0']

  for (let i = 0; i < D.length; i++) {
    for (let j = 0; j < validNums.length; j++) {
      if (D.charAt(i) != validNums[j]) { // might consider === if value is not a string
        return false
      }
    }
  }
  return true
}

export function isBin(B) {
  const validNums = ['0', '1']

  for (let i = 0; i < B.length; i++) {
    for (let j = 0; j < validNums.length; j++) {
      if (B.charAt(i) != validNums[j]) { // might consider === if value is not a string
        return false
      }
    }
  }
  return true
}


export function dec_to_bin(D, valid) {
  let nB = '0'
  let B = ''

  if (D.charAt(0) == "-") {
    D = D.slice(1)
    nB = '1' 
  }
  if (isDigit(D)) {
    D = parseInt(D)
    B = ''
    while (D != 0) {
      B = str(D % 2) + B
      D = D / 2
      D = Math.floor(D)
    }
    if (nB == '1') {
      B = complement(B)
    }
    B = nB + B
  }
  else {
    B = 0
    valid = false
  }
  return {
    B: B,
    valid: valid
  }
}

export function complement(M) {
  let bits = M.length
  let flag = false
  for (let i = bits-1; i > -1; i--) {
    if (flag) {
      if (M.charAt(i) == '0') {
        M = M.slice(0, i) + '1' + M.slice(i+1)
      }
      else {
        M = M.slice(0, i) + '0' + M.slice(i+1)
      }
    }
    else if (M.charAt(i) == '1') {
      flag = true
    }
  }
  return M
}

export function add(A, M) {
  let bits = M.length
  let S = ''
  let C = 0

  for (let i = bits-1; i > -1; i--) {
    if (A.charAt(i) == '1' && M.charAt(i) == '1') {
      if (C == 1) {
        S = '1' + S
      }
      else {
        S = '0' + S
      }
      C = 1
    }
    else if (A.charAt(i) == '0' && M.charAt(i) == '0') {
      if (C == 1) {
        S = '1' + S
      }
      else {
        S = '0' + S
      }
      C = 0
    }
    else {
      if (C == 1) {
        S = '0' + S
        C = 1
      }
      else {
        S = '1' + S
        C = 0
      }
    }
  }
  return S
}

export function shift(A, Q, Q_1) {
  Q_1 = Q.charAt(Q.length-1)
  Q = A.charAt(A.length-1) + Q.slice(0, Q.length-1)
  A = A.charAt(0) + A.slice(0, A.length-1)
  return {
    A: A,
    Q: Q,
    Q_1: Q_1 
  }
}

