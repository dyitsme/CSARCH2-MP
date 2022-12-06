export function is_digit(str) {
  let isDecimal = false;
  for (let i = 0; i < str.length; i++) {
    if (i == 0) {
      if (str[i] == "-" ||
        str[i] == "0" || 
        str[i] == "1" ||
        str[i] == "2" ||
        str[i] == "3" ||
        str[i] == "4" ||
        str[i] == "5" ||
        str[i] == "6" ||
        str[i] == "7" ||
        str[i] == "8" ||
        str[i] == "9" ) {
        isDecimal = true;
      }
    }
    else {
      if (str[i] == "0" || 
          str[i] == "1" ||
          str[i] == "2" ||
          str[i] == "3" ||
          str[i] == "4" ||
          str[i] == "5" ||
          str[i] == "6" ||
          str[i] == "7" ||
          str[i] == "8" ||
          str[i] == "9" ) {
        isDecimal = true;
      } else {
        isDecimal = false;
      }
    }
  }
  return isDecimal;
}

export function is_bin(str) {
  let isBinary = false;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "0" || str[i] == "1") {
      isBinary = true;
    } else {
      return false;
    }
  }
  return isBinary;
}

export function bin_to_dec(B) {
  let D = 0;
  let multiplier = 1;
  let negative = false;

  if (B.charAt(0) == "1") {
      B = complement(B);
      B = B.slice(1);
      negative = true;
  }
  for (let i = B.length-1; i > -1 ; i--) {
      D += parseInt(B[i]) * multiplier;
      multiplier *= 2;
  }
  if (negative) {
      D *= -1;
  }
  return D;
}

export function dec_to_bin(D) {
  let nB = '0'
  let B = ''

  if (D.charAt(0) == "-") {
    D = D.slice(1)
    nB = '1' 
  }
  D = parseInt(D)
  B = ''
  while (D != 0) {
    B = (D % 2).toString() + B
    D = Math.floor(D / 2)
  }
  if (nB == '1') {
    B = complement(B)
  }
  B = nB + B
  return B
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

// checks if within 4 to 16 bits
export function rangebit4to16(str) {
  if (str.length >= 4 && str.length <= 16) {
    return true 
  }
  return false
}
