const 珊瑚宫心海: string = "my_wife"
console.log("珊瑚宫心海", 珊瑚宫心海)


function countSeniors(details: string[]): number {
  return details.filter(s => +s.substring(11,13) > 60).length
};
