import axios from "axios";
import {apiUrl,demoValue} from '../constants';

export async function getChartData(user) {
  //api stops working thatswhy added demo value
   // const result = await axios.get(apiUrl);
    //   return result.data.products;
      return demoValue;

};
