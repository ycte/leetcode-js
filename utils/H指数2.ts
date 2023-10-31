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
console.log(hIndex1([1, 3, 1]))

function hIndex2(cs: number[]): number {
  const check = function (cs: number[], x: number): boolean {
      let cnt: number = 0;
      for (let c of cs) {
          if (c >= x) cnt++;
      }
      return cnt >= x;
  }
  const n = cs.length;
  let l = 0, r = n;
  while (l < r) {
      const mid = Math.floor((l + r + 1) / 2);
      if (check(cs, mid)) l = mid;
      else r = mid - 1;
  }
  return r;
};

// 作者：宫水三叶
// 链接：https://leetcode.cn/problems/h-index/solutions/2502896/gong-shui-san-xie-cong-po-ti-dao-zhu-bu-7sug6/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

