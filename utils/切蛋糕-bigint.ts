function maxArea(h: number, w: number,
  horizontalCuts: number[], verticalCuts: number[]): number {
  const MOD = BigInt(1e9 + 7)
  let htemp = []
  horizontalCuts = horizontalCuts.sort((a,b) => a - b)
  htemp.push(horizontalCuts[0])
  for (let i = 0; i < horizontalCuts.length -1; i++) {
      htemp.push(horizontalCuts[i+1] - horizontalCuts[i])
  }
  htemp.push(h - horizontalCuts[horizontalCuts.length-1])
  console.log("h", htemp)
  let vtemp = []
  verticalCuts = verticalCuts.sort((a,b) => a - b)
  vtemp.push(verticalCuts[0])
  for (let i = 0; i < verticalCuts.length - 1; i++) {
    vtemp.push(verticalCuts[i+1] - verticalCuts[i])
  }
  vtemp.push(w - verticalCuts[verticalCuts.length - 1])
  // the max number in vtemp
  
  return Number(
    (BigInt(Math.max(...htemp)) * BigInt(Math.max(...vtemp)))
    % MOD)
};

console.log("maxArea", maxArea(5, 4, [3, 1], [1]))

function maxArea1(h: number, w: number, hs: number[], vs: number[]): number {
  const MOD = BigInt(1e9 + 7);
  hs.sort((a,b)=>a-b);
  vs.sort((a,b)=>a-b);
  const n = hs.length, m = vs.length;
  let mh = Math.max(hs[0], h - hs[n - 1]), mv = Math.max(vs[0], w - vs[m - 1]);
  for (let i = 1; i < n; i++) mh = Math.max(mh, hs[i] - hs[i - 1]);
  for (let i = 1; i < m; i++) mv = Math.max(mv, vs[i] - vs[i - 1]);
  return Number((BigInt(mh) * BigInt(mv)) % MOD);
};

// 作者：宫水三叶
// 链接：https://leetcode.cn/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts/solutions/2500353/gong-shui-san-xie-noxiang-xin-ke-xue-xi-ecnvl/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。