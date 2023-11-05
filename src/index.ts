const 珊瑚宫心海: string = "my_wife"
console.log("珊瑚宫心海", 珊瑚宫心海)

const isPalindrome = (s: string, query: number[]): boolean => {
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

function canMakePaliQueries(s: string,
  queries: number[][]): boolean[] {
  let ans: boolean[] = []
  for (const query of queries) {
    ans.push(isPalindrome(s, query))

  }

  return ans
}

console.log(canMakePaliQueries("abcda",
  [[3, 3, 0], [1, 2, 0], [0, 3, 1], [0, 3, 2], [0, 4, 1]]))

console.log(canMakePaliQueries("ninmjmj",
[[6,6,0],[1,1,1],[2,5,4],[1,3,1],[5,6,1]]))