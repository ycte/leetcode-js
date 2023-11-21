// TODO: 2485. 找出中枢整数
const cntSum1 = (n: number): number => {
  let res = 0
  for (let i = 1; i <= n; i++) res += i
  return res
}

function pivotInteger1(n: number): number {
  const sumOfn = cntSum1(n)

  for (let i = 1; i <= n; i++) 
    if (sumOfn - cntSum1(i - 1) * 2 === i) return i
  return -1
}

// TODO: 2485. 找出中枢整数
const cntSum = (n: number): number => n * (n + 1) / 2

function pivotInteger(n: number): number {
  const sumOfn = cntSum(n)

  for (let i = 1; i <= n; i++) 
    if (sumOfn - cntSum(i - 1) * 2 === i) return i
  return -1
}

// TODO: 1. 两数之和
function twoSum(nums: number[], target: number): number[] {
  const numsMap: Map<number, number> = new Map()
  nums.forEach((item, index) => numsMap.set(item, index))
  let res: number[] = []
  nums.forEach((item, index)=> {
    if (numsMap.has(target - item) && numsMap.get(target - item) !== index) {
      res = [index, numsMap.get(target - item) || 0]
    }
  })
  return res
}

console.log("twoSum", twoSum([2, 7, 11, 15], 9))

// TODO: 1121
// TODO: 2490. 回环句
function isCircularSentence(sentence: string): boolean {
  const lenOfSentence = sentence.length
  if (sentence[0] !== sentence[lenOfSentence - 1]) return false
  // console.log(typeof(sentence[0]), typeof(sentence.charAt(0)))
  for (let i = 1; i <= lenOfSentence - 1 - 1; i++) 
    if (sentence[i] === ' ') 
      if (sentence[i + 1] !== sentence[i - 1])
        return false
  return true
}

console.log(isCircularSentence("leetcod1 exercises sound delightful"))

// TODO: 2600. K 件物品的最大和
function kItemsWithMaximumSum(numOnes: number, numZeros: number, numNegOnes: number, k: number)
  : number {
  /* return k <= numOnes ? k : 
    (k <= numZeros + numOnes ? numOnes : numOnes - (k - numZeros - numOnes)) */
  if (k <= numOnes + numZeros) return Math.min(numOnes, k)
  return numOnes - (k - numZeros - numOnes)
}

console.log("kItemsWithMaximumSum", kItemsWithMaximumSum(3, 2, 2, 2))
console.log("kItemsWithMaximumSum", kItemsWithMaximumSum(3, 2, 2, 4))
console.log("kItemsWithMaximumSum", kItemsWithMaximumSum(3, 2, 2, 6))

// TODO: 2544. 交替数字和
function alternateDigitSum(n: number): number {
  const nStr = n.toString()
  const lenOfStr = nStr.length
  let res = 0
  for (let i = 0; i < lenOfStr; i++) {
    if (i % 2 === 0) res += parseInt(nStr[i])
    else res -= parseInt(nStr[i])
  }
  return res
}

console.log(alternateDigitSum(123))

// TODO: 415. 字符串相加
function addStrings(num1: string, num2: string): string {
  const lenOfNum1: number = num1.length
  const lenOfNum2: number = num2.length
  const maxLen: number = Math.max(lenOfNum1, lenOfNum2)
  maxLen === lenOfNum2 ? (num1 = "0".repeat(lenOfNum2 - lenOfNum1) + num1)
    : (num2 = "0".repeat(lenOfNum1 - lenOfNum2) + num2)

  // console.log(num1, num2)
  let res: string = ""
  let carry: number = 0 // 进位：carry
  for (let i = 1; i <= maxLen; i++) {
    const num1Char: string = num1[maxLen - i]
    const num2Char: string = num2[maxLen - i]
    let sum: number = Number(num1Char) + Number(num2Char) + carry
    if (sum >= 10) {
      sum -= 10
      carry = 1
    }
    else carry = 0
    res = sum.toString() + res
  }
  if (carry === 1) res = "1" + res
  return res
}

console.log("addStrings", addStrings("77", "456"))