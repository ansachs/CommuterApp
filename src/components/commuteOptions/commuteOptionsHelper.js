// import React from 'react';

export const convertTime = (duration) => {
  if (duration[2] === 'd' && duration[10] === 'h') {
    return ((parseInt(duration[0]) * 24) * (60)) + ((parseInt(duration[7])* 10) * 60) + (parseInt(duration[8])* 60)
  }
  else if (duration[2] === 'd' && duration[9] === 'h'&& duration[5] === 's') {
    return ((parseInt(duration[0]) * 24) * (60)) + (parseInt(duration[7]) * 60)
  }
   else if (duration[2] === 'd' && duration[9] === 'h' && duration[13] === 's') {
    return ((parseInt(duration[0]) * 24) * (60)) + ((parseInt(duration[6]) * 10) * 60) + (parseInt(duration[7])* 60)
  }
  else if (duration[2] === 'd' && duration[8] === 'h') {
    return ((parseInt(duration[0]) * 24) * (60)) + (parseInt(duration[6]) * 60)
  }
  else if (duration[3] === 'h' && duration[12] === 'm') {
    return ((parseInt(duration[0]) * 10) * 60) + (parseInt(duration[1]) * 60) + (parseInt(duration[9]) * 10) + parseInt(duration[10])
  }
  else if (duration[3] === 'h' && duration[11] === 'm') {
    return ((parseInt(duration[0]) * 10) * 60) + (parseInt(duration[1]) * 60) + parseInt(duration[9])
  }
  else if (duration[2] === 'h' && duration[11] === 'm') {
    return (parseInt(duration[0]) * 60) + ((parseInt(duration[8]) * 10)) + parseInt(duration[9])
  }
  else if (duration[2] === 'h' && duration[10] === 'm' && duration[13] === 's'&& duration[6] === 's') {
    return (parseInt(duration[0]) * 60) + parseInt(duration[8])
  }
  else if (duration[2] === 'h' && duration[10] === 'm' && duration[13] === 's') {
    return (parseInt(duration[0]) * 60) + ((parseInt(duration[7]) * 10)) + parseInt(duration[8])
  }

  else if (duration[2] === 'h' && duration[9] === 'm') {
    return (parseInt(duration[0]) * 60) + parseInt(duration[7])
  }
   else if (duration[2] === 'h' && duration[10] === 'm') {
    return (parseInt(duration[0]) * 60) + parseInt(duration[8])
  }
  else if (duration[3] === 'm') {
    return (parseInt(duration[0]) * 10) + parseInt(duration[1])
  }
  else if (duration[2] === 'm') {
    return parseInt(duration[0])
  }
  else if (duration[4] === 'm') {
    return (parseInt(duration[0]) * 100) + (parseInt(duration[1]) * 10) + parseInt(duration[2])
  }
}


