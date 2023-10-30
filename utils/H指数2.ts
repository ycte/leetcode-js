// 275. H 指数 2
function hIndex(citations: number[]): number {
  var length:number = citations.length
  var temp = length
  while (temp--) {
    if (citations[temp] < length - temp) 
      return length - (temp + 1)
  }
  return length
}

console.log(hIndex([0,1,3,5,6]))
console.log(hIndex([1, 2, 3, 4, 100]))

// 274. H 指数
function hIndex1(citations: number[]): number {
  citations.sort((a, b) => b - a)
  // console.log(citations)
  let h = 0
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= i+1) {
      h = i+1
    }
  }
  return h
}
 
console.log(hIndex1([3,0,6,1,5]))
console.log(hIndex1([1,3,1]))

