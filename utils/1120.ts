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