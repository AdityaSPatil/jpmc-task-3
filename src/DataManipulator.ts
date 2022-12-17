import { ServerRespond } from './DataStreamer';

export interface Row {
  ratio: number,
  price_abc: number, 
  price_def: number,
  timestamp: Date,
  upper_bound: number, 
  lower_bound: number, 
  trigger_alert: number | undefined
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
      const abcPrice = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2.0;
      const defPrice = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2.0


      return {
        ratio: abcPrice/defPrice,
        price_abc: abcPrice, 
        price_def: defPrice,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp: serverResponds[1].timestamp,
        upper_bound: 1.10, 
        lower_bound: 0.90, 
        trigger_alert: ((abcPrice/defPrice) >= 1.10 || (abcPrice/defPrice) <= 0.90) ? abcPrice/defPrice : undefined
      };
  }
}
