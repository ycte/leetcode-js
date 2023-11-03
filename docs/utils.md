# Code utils

* binary search template

```ts
  // binary search template
  let l = 0, r = nums.length
  while (l < r) {
    const mid = (l + r) >> 1
    if (nums[mid] > fq)
      r = mid
    else l = mid + 1
  }
```
