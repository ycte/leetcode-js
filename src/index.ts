const 珊瑚宫心海: string = "my_wife"
console.log("珊瑚宫心海", 珊瑚宫心海)

// TODO: 1177. 构建回文串检测

var canMakePaliQueries = function(s: string, queries: number[][]) {
  const n = s.length;
  const count = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
      count[i + 1] = count[i] ^ (1 << (s[i].charCodeAt(0) - 'a'.charCodeAt(0)));
  }
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