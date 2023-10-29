import { rest } from "msw";


interface BookingRequestBody {
  bookingDate: string;
  passengerName: string;
  adultCount: number;
  childCount: number;
  passengerPhone: string;
  orderNumber: string;
}

export const handlers = [

  // 取得東琉線訂單編號
  rest.post(
    `http://localhost:3000/booking`,
    (req, res, ctx) => {
      const body = req.body as BookingRequestBody;
      const { bookingDate, passengerName, adultCount, childCount, passengerPhone } = body;
  
      return res(
        ctx.status(200),
        ctx.json({
          bookingDate,
          passengerName:`${passengerName}`,
          adultCount,
          childCount,
          passengerPhone,
          orderNumber : "2023000000",
        })
      );
    }
  ),
];
