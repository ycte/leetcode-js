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
