  

      list = [
   18,
   8,
   10,
   6,
   6,
  7,
]


sorted = list.sort((a, b) => parseFloat(a) - parseFloat(b));

console.log(sorted)

// var dataArray = list.map((x)=>    
//       if (i != (list.length -1)){
//         console.log(`comparisson: ${list[i]}/${anchor}`)
//         if (list[i] >= list[list.length -1]){ 
      
//       var temp = list[i]
//       list[i] = list[list.length -1]
//       list[list.length -1] = temp

//         }
//       }
//     );

import SendSMS from 'react-native-sms'
import Communications from 'react-native-communications';