
// complexity: O(n)
function sumTo1(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// complexity: O(n)
function sumTo2(n: number): number {
  if (n == 1) return 1;
  return n + sumTo2(n - 1);
}


// complexity: O(1)
function sumTo3(n: number): number {
  return n * (n + 1) / 2;
}




  