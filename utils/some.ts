/* FIXME: TODO: in this file is just a note-mark
 * that seperate different questions
 */

// TODO: 2698. 求一个整数的惩罚数
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
    if (check(i * i, i)) ans += i * i
  }
  return ans
};

console.log("punishmentNumber", punishmentNumber(10))


// TODO: DP 1155. 掷骰子等于目标和的方法数
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

// TODO: 2316. 统计无向图中无法互相到达点对数
// Floyd -- large scare of storage
function countPairsFloyd(n: number, edges: number[][]): number {
  let graph:Array<Array<number>> = Array(n).fill(0)
    .map(() => Array(n).fill(0))

  for (let i = 0; i < n; i++) {
    graph[i][i] = 1
  }
  console.log("graph", graph[0])
  for (let i = 0; i < edges.length; i++) {
    let [a, b] = edges[i]
    graph[a][b] = 1
    graph[b][a] = 1
  }
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (graph[i][k] && graph[k][j]) graph[i][j] = 1
      }
    }
  }
  let res: number = 0
  console.log(graph[0])
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue
      res += graph[i][j] === 1 ? 0 : 1
    }
  }
  return res / 2 
};

console.log(countPairsFloyd(3, [[0, 1], [0, 2], [1, 2]]))
// console.log(countPairsFloyd(9628, []))

// DFS
function countPairs(n: number, edges: number[][]): number {
  // init graph
  const graph = new Array(n).fill(0)
    .map(() => new Array())
  for (let i = 0; i < edges.length; i++) {
    let [a, b] = edges[i]
    graph[a].push(b)
    graph[b].push(a)
  }

  // dfs return cnt(node) that can reach
  const visited = new Array(n).fill(false)
  function dfs(graph: Array<Array<number>>,
    node: number, visited: boolean[]) {
    visited[node] = true
    let count = 1
    for (let i = 0; i < graph[node].length; i++) {
      if (visited[graph[node][i]]) continue
      count += dfs(graph, graph[node][i], visited)
    }
    return count
  }

  // res
  let res = 0
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue
    let count = dfs(graph, i, visited)
    // all node in cnt(node) can not reach (n - cnt(node))
    res += count * (n - count)
  }
  return res / 2
}

console.log(countPairs(3, [[0, 1], [0, 2], [1, 2]]))
console.log(countPairs(9628, []))

//TODO: 位运算 2525. 根据规则将箱子分类
function categorizeBox(length: number, width: number,
  height: number, mass: number): string {
  const isBulky: boolean = 
    (length >= 1e4 || width >= 1e4 || height >= 1e4) ||
    (BigInt(length * width * height) >= BigInt(1e9))
  const isHeavy: boolean = mass >= 100
  const res: string = isBulky ? 
    (isHeavy ? "Both" : "Bulky") :
    (isHeavy ? "Heavy" : "Neither")
  
  return res
};
console.log(categorizeBox(1000, 35, 700, 100))
console.log(categorizeBox(10000, 35, 700, 100))

// TODO: 1726. 同积元组
// FIXME: Map.get error handler
function tupleSameProduct(nums: number[]): number {
  const multiplyMap = new Map<number, number>()
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const product = nums[i] * nums[j]
      // FIXME: Map.get error handler
      multiplyMap.set(product,
        (multiplyMap.get(product) || 0) + 1)
    } 
  }
  console.log(multiplyMap)
  let res = 0
  for (const [key, value] of multiplyMap) {
    if (value > 1) {
      // c(n-1, n) * 8
      res += (value * (value - 1)) / 2 * 8
    }
  }
  return res
}

console.log(tupleSameProduct([2, 3, 4, 6]))

// TODO: 2530. 执行 K 次操作后的最大分数
// FIXME: import in LeetCode
import { MaxPriorityQueue } from '@datastructures-js/priority-queue'
function maxKelements(nums: number[], k: number): number {
  
  const queue = new MaxPriorityQueue()

  let ans = 0


  for (let i = 0; i < nums.length; i++)
    queue.enqueue(nums[i])
  while (k--) {
    let x = queue.dequeue().element
    console.log(x)
    queue.enqueue(Math.floor((x + 2) / 3))
    ans += x
  }
  return ans
}

console.log(maxKelements([3, 2, 1, 5, 6, 4], 2))

// TODO: 2652. 倍数求和
function sumOfMultiples(n: number): number {
  const res: number[] = []
  for (let i = 1; i * 3 <= n; i++) res.push(i * 3)
  for (let i = 1; i * 5 <= n; i++) 
    if (i * 5 % 3 !== 0) res.push(i * 5)
  for (let i = 1; i * 7 <= n; i++) 
    if (i * 7 % 3 !== 0 && i * 7 % 5 !== 0)
      res.push(i * 7)
  
  console.log(res)
  let ans = 0
  for (const num of res) 
    ans += num
  return ans
}

console.log("sumOfMultiples(10)", sumOfMultiples(10))
console.log("sumOfMultiples(7)", sumOfMultiples(7))

function sumOfMultiplesMath(n: number): number {
  function s(m: number) {
    return Math.floor(n / m) * (Math.floor(n / m) + 1) / 2 * m;
  }
  return s(3) + s(5) + s(7) - s(15) - s(21) - s(35) + s(105)
}

console.log("sumOfMultiplesMath(10)", sumOfMultiplesMath(10))

// TODO: 136. 只出现一次的数字
// FIXME: for-of 空间使用大于 for
function singleNumber(nums: number[]): number {
  let res: number = 0
  for (let i: number = 0; i < nums.length; i++) {
    res ^= nums[i]
  }
  return res
}

function singleNumberForof(nums: number[]): number {
  let res: number = 0
  for (const num of nums) {
    res ^= num
  }
  return res
}

function singleNumberReduce(nums: number[]): number {
  return nums.reduce((a, b) => a ^ b)
}

console.log("singleNumber([2, 2, 1])", singleNumber([2, 2, 1]))
console.log("singleNumberForof([2, 2, 1])", singleNumberForof([2, 2, 1]))
console.log("singleNumberReduce([2, 2, 1])", singleNumberReduce([2, 2, 1]))

// TODO: 137. 只出现一次的数字 II
// FIXME: https://leetcode.cn/problems/single-number-ii/solutions/2482832/dai-ni-yi-bu-bu-tui-dao-chu-wei-yun-suan-wnwy/?envType=daily-question&envId=2023-10-30
function singleNumber2(nums: number[]): number {
  let res: number = 0
  for (let i = 0; i < 32; i++) {
    let sum: number = 0
    for (let j = 0; j < nums.length; j++) {
      sum += (nums[j] >> i) & 1
    }
    if (sum % 3 === 1) {
      res |= 1 << i
    }
  }
  return res
}
console.log(singleNumber2([0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5]))

// TODO: 260. 只出现一次的数字 III
// FIXME:TODO: proable variable name 
function singleNumber3(nums: number[]): number[] {
  // 异或结果，两个数不一样的位为 1
  let exclusiveOr: number = 0
  nums.forEach(
    (item: number) => {
      exclusiveOr ^= item
    }
  )
  
  // 利用第一个不一样的位为 1，将数组分为两组，两组分别异或，得到两组中不同的数
  let seletor: number = exclusiveOr & -exclusiveOr
  let res0: number = 0
  nums.forEach(
    (item: number) => {
      if ((item & seletor) === 0) {
        res0 ^= item
      }
    }
  )

  return [res0, exclusiveOr ^ res0]
}

console.log("singleNumber3", singleNumber3([2, 2, 1, 3]))

// TODO: jump from end to 1st question