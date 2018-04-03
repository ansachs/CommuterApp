import LyftApiCalls from "../../src/apis/LyftApi"
import {lyft_ETA_Data, lyft_Ride_Estimate_data} from './sample_data/LyftAPISampleData'  

describe('LyftApi', () => {

  const user_token = "I5Ai48wgoc4RBmeL90fH5oMeo1itkxS7eD55RHU19Dd6p6n1nFDjOqY5x0lkrxcZ4YUxSPYXgmZUWjEnGXtWRN5wzbIQEJU3fdQubDz0wAnhcz0I5nmEgVA="
    
  const cp_lat = "41.88036"
  const cp_lng = "-87.630257"
  const dmn_lat = "41.910049"
  const dmn_lng = "-87.677963"

  const createPromise = (expected) => 
    jest.fn().mockImplementation(() => 
      new Promise((resolve, reject) => {
        //if a value is passe
          resolve({
            json: () => expected
          });
      })
    );

  it('gets the ETA for the three types of Lyft rides', async ()=> {

    global.fetch = createPromise(lyft_ETA_Data);

    await LyftApiCalls.getDriverEtaToOrigin(user_token, cp_lat, cp_lng)
    .then((json)=>{
      expect(json).toEqual(lyft_ETA_Data);  
    })
  })

  it('gets ride estimates for all types of lyfts', async ()=> {

    global.fetch = createPromise(lyft_Ride_Estimate_data);

    await LyftApiCalls.getRideDetails(user_token, cp_lat, cp_lng, dmn_lat, dmn_lng)
    .then((json)=>{
      expect(json).toEqual(lyft_Ride_Estimate_data);  
    })
  })



})