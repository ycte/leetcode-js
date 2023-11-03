const 珊瑚宫心海: string = "my_wife"
console.log("珊瑚宫心海", 珊瑚宫心海)

function singleNumber(nums: number[]): number[] {
  let exclusiveOr: number = 0
  nums.forEach(
    (item: number) => {
      exclusiveOr ^= item
    }
  )
  
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
};