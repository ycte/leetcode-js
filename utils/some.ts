function punishmentNumber(n: number): number {
  const check = (t:number, x:number):boolean => {
    if (t === x) return true
    let d:number = 10
    while (t >= d && t % d <= x) {
      if (check(Math.floor(t / d), x - (t % d))) return true
      d *= 10
    }
    return false
  }
  let ans: number = 0
  for (let i = 1; i <= n; i++) {
    if (check(i * i, i)) ans += i
  }
  return ans
};

console.log("punishmentNumber", punishmentNumber(10))


// DP
function numRollsToTarget(n: number, k: number, target: number): number {
  // 计算组合数
  const dp = Array(n + 1).fill(BigInt(0))
    .map(() => Array(target + 1).fill(BigInt(0)))
  // console.log(dp)
  for (let i = 0; i <= n; i++) {
    dp[0][0] = BigInt(1)
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= target; j++) {
      for (let x = 1; x <= k; x++) {
        if (j - x >= 0) {
          dp[i][j] += BigInt(dp[i - 1][j - x])
          dp[i][j] %= BigInt(1e9 + 7)
        }
      }
    }
  }
  return Number(dp[n][target] % BigInt(1e9 + 7))
}

console.log(numRollsToTarget(30, 30, 500))