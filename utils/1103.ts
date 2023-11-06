// TODO: 1103
// TODO: 2611. 老鼠和奶酪
// FIXME: Imagine at first that the second mouse eats all the cheese, then we should choose k types of cheese with the maximum sum of - reward2[i] + reward1[i].
function miceAndCheese(reward1: number[], reward2: number[],
  k: number): number {
  const rewardTemp: number[] = []
  for (let i = 0; i < reward1.length; i++)
    rewardTemp[i] = reward1[i] - reward2[i]
  rewardTemp.sort((a, b) => a - b)

  // ans 初始化为 reward1 + reward2
  let ans = reward1.reduce((a, b) => a + b, 0) +
    reward2.reduce((a, b) => a + b, 0)
  
  /** 差值小，分配给老鼠2，
    * reward2[i] = (
    * (reward1[i] + reward2[i]) 
    * - (reawrd1[i] - reward2[i])
    * ) / 2
    */
  for (let i = 0; i < rewardTemp.length - k; i++)
    ans = (ans - rewardTemp[i])
  // 差值小，分配给老鼠1
  for (let i = rewardTemp.length - k; i < rewardTemp.length;
    i++) {
    ans = (ans + rewardTemp[i])
  }
  ans = ans / 2
  return ans
}

console.log(miceAndCheese([1, 1, 3, 4], [4, 4, 1, 1], 2))


// TODO: 1170. 比较字符串最小字母出现频次
function numSmallerByFrequency(queries: string[], words: string[]): number[] {
  // 作者：ylb
  const f = (str: string): number => {
    const cnt = new Array(26).fill(0)
    for (const c of str)
      cnt[c.charCodeAt(0) - 'a'.charCodeAt(0)]++
    // return the 1st element that true
    return cnt.find(x => x > 0)
  };

  const nums = words.map(f).sort((a, b) => a - b);
  console.log(nums)
  const ans: number[] = []

  for (const q of queries) {
    const fq = f(q)
    // binary search template
    let l = 0, r = nums.length
    while (l < r) {
      const mid = (l + r) >> 1
      if (nums[mid] > fq)
        r = mid
      else l = mid + 1
    }
    ans.push(nums.length - l)
  }
  return ans
}
console.log(numSmallerByFrequency(["xxyyxx", "xxxyxx"],
  ["xxaaax", "aabaaaa", "xyx", "xxaaxaxx"]))

// TODO: 1104
// TODO: 1171. 从链表中删去总和值为零的连续节dian
// Definition for singly-linked list.
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}
function removeZeroSumSublists(head: ListNode | null): ListNode | null {
  let dummyHead: ListNode = new ListNode(0)
  dummyHead.next = head
  // console.log("dummyHead", dummyHead)
  let prefix: number = 0
  let seen: Map<number, ListNode> = new Map()

  for (let curr: ListNode | null = dummyHead; curr !== null;
    curr = curr.next) {
    
    prefix += curr.val
    seen.set(prefix, curr)
  }
  prefix = 0
  for (let curr: ListNode | null = dummyHead; curr !== null;
    curr = curr.next) {
    prefix += curr.val
    // console.log("curr", curr)
    curr.next = seen.get(prefix)?.next || null
    // console.log(prefix, seen.get(prefix), curr.val, curr.next?.val)
  }
  return dummyHead.next
}

const newListNode: ListNode = new ListNode(1)
newListNode.next = new ListNode(2)
newListNode.next.next = new ListNode(3)
newListNode.next.next.next = new ListNode(-3)
newListNode.next.next.next.next = new ListNode(-2)
console.log("removeZeroSumSublists",
  removeZeroSumSublists(newListNode))

// TODO: 2475. 数组中不等三元组的数目
// FIXME: 整体视野
function unequalTripletsMap(nums: number[]): number {
  let map: Map<number, number> = new Map()
  nums.map((num) =>
    map.set(num, (map.get(num) || 0) + 1)
  )

  let count: number = 0
  let ans: number = 0
  map.forEach((value) => count += 1)
  map.forEach(
    (value, key) => {
      map.forEach((value2, key2) => {
        if (key < key2) {
          map.forEach((value3, key3) => {
            if (key2 < key3) {
              ans += value * value2 * value3
            }
          })
        }
      })
    })
  return count < 3 ? 0 : ans
}
function unequalTriplets(nums: number[]): number {
  nums.sort((a, b) => a - b)
  let ans: number = 0
  let start: number = 0
  for (let i = 0; i < nums.length - 1; i++) {
    const x = nums[i]
    if (x !== nums[i + 1]) {
      ans += start * (i - start + 1) *
        (nums.length - i - 1) 
      start = i + 1
    }
  }
  return ans
}


console.log(unequalTriplets([1, 1, 1, 1, 1]))
console.log(unequalTriplets([4, 4, 2, 4, 3]))
console.log(unequalTriplets([1, 3, 1, 2, 4]))

// TODO: 1375. 二进制字符串前缀一致的次数
// FIXME: SB
function numTimesAllBlue(flips: number[]): number {
  // init
  // console.log("flips", flips)
  let n: number = flips.length
  let ans: number = 0
  let binary: number[] = []
  
  let flipsMap: Map<number, number> = new Map()
  for (let i: number = 0; i < n; i++) {
    binary[i] = 0
  }

  for (let i: number = 0; i < n; i++) {
    // no.i step
    let flag: boolean = true
    binary[flips[i]-1] = 1
  
    for (let j: number = 0; j <= i; j++) 
      if (binary[j] === 0) {
        // console.log(i, flips[i], binary)
        flag = false
        break
      }
    for (let j: number = i + 1; j < n; j++)
      if (binary[j] === 1) {
        // console.log(i, flips[i], binary)
        flag = false
        break
      }
    if (flag) ans++
  }

  return ans
}

console.log(numTimesAllBlue([3, 2, 4, 1, 5]))

// TODO: 1105
// TODO: 1177. 构建回文串检测
const isPalindromeTemp = (s: string, query: number[]): boolean => {
  let start: number = query[0]
  let end: number = query[1]
  let str: string = s.slice(start, end + 1)
  let len: number = str.length
  if (len <= 1) return true

  let tolerance: number = query[2]
  let toTolerance: number = 0
  let map: Map<string, number> = new Map()

  for (const c of str) map.set(c, (map.get(c) || 0) + 1)
  map.forEach((value) => toTolerance += value % 2)
  console.log(str, toTolerance, tolerance, len)

  return tolerance >= Math.floor(toTolerance / 2)
}

function canMakePaliQueriesTemp(s: string,
  queries: number[][]): boolean[] {
  let ans: boolean[] = []
  for (const query of queries) {
    ans.push(isPalindromeTemp(s, query))

  }

  return ans
}

console.log(canMakePaliQueriesTemp("abcda",
  [[3, 3, 0], [1, 2, 0], [0, 3, 1], [0, 3, 2], [0, 4, 1]]))

console.log(canMakePaliQueriesTemp("ninmjmj",
  [[6, 6, 0], [1, 1, 1], [2, 5, 4], [1, 3, 1], [5, 6, 1]]))

// TODO: 1177. 构建回文串检测
const cntToToleranceArr = (s: string, query: number[]): number => {
  let start: number = query[0]
  let end: number = query[1]
  let str: string = s.slice(start, end + 1)
  let toTolerance: number = 0
  let map: Map<string, number> = new Map()
  
  for (const c of str) map.set(c, (map.get(c) || 0) + 1)
  map.forEach((value) => toTolerance += value % 2)
  // console.log("str, ", start, end, str, toTolerance)
  return toTolerance
}

const isPalindromeArr = (s: string, query: number[],
  toToleranceArr: number[][]): boolean => {
  let [i, j, tolerance] = query
  // console.log("tolerance, ",
  //   s.slice(i, j + 1), tolerance, toToleranceArr[i][j])
  return tolerance >= Math.floor(toToleranceArr[i][j] / 2) 
}

function canMakePaliQueriesArr(s: string,
  queries: number[][]): boolean[] {
  let ans: boolean[] = []
  let toToleranceArr: number[][] = []
  let len: number = s.length
  
  for (let i = 0; i < len; i++) {
    let toToleranceArrRow: number[] = []
    for (let j = 0; j < len; j++) {
      if (j < i) toToleranceArrRow.push(0)
      else 
        toToleranceArrRow.push(cntToToleranceArr(s, [i, j, 0]))
    } 
    toToleranceArr.push(toToleranceArrRow)
  }
  // console.log(toToleranceArr)
    
  for (const query of queries) 
    ans.push(isPalindromeArr(s, query, toToleranceArr))
  return ans
}

console.log(canMakePaliQueriesArr("abcda",
  [[3, 3, 0], [1, 2, 0], [0, 3, 1], [0, 3, 2], [0, 4, 1]]))

console.log(canMakePaliQueriesArr("ninmjmj",
  [[6, 6, 0], [1, 1, 1], [2, 5, 4], [1, 3, 1], [5, 6, 1]]))
  
// TODO: 1106
// TODO: 1177. 构建回文串检测
var canMakePaliQueries = function (s: string, queries: number[][]) {
  const n = s.length;
  const count = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    count[i + 1] = count[i] ^
      (1 << (s[i].charCodeAt(0) - 'a'.charCodeAt(0)));
  }
  console.log(count)
  const res = [];
  for (const query of queries) {
    const l = query[0], r = query[1], k = query[2];
    let bits = 0, x = count[r + 1] ^ count[l];
    while (x > 0) {
      x &= x - 1;
      bits++;
    }
    res.push(bits <= k * 2 + 1);
  }
  return res;
}

// 作者：力扣官方题解
// 链接：https://leetcode.cn/problems/can-make-palindrome-from-substring/solutions/2297460/gou-jian-hui-wen-chuan-jian-ce-by-leetco-e9i1/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// console.log(3^3)
console.log(canMakePaliQueries("abcda", [[3, 3, 0]]))
