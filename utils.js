const binRadio = document.querySelector('#binary')
const decRadio = document.querySelector('#decimal')

export function isDec() {
  if (binRadio.checked) {
    return 0
  }
  else {
    return 1
  }
}

export function dectoBin(dec) {
	// unsure of this function, use with caution
  return dec.toString(2)
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
