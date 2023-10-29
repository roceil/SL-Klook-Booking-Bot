import { getOrderNumber, ParsedData } from '../lib/getOrderNumber' // 請自行替換正確的模塊名
import { mswServer } from '../../mocks/server'
import { showAlertWithTimer } from '../lib/showAlertWithTimer'
import { rest } from 'msw'

jest.mock('../lib/showAlertWithTimer')

describe('getOrderNumber 功能', () => {
  // 在所有測試開始前啟動 MSW
  beforeAll(() => mswServer.listen())
  // 在每個測試之後重置所有模擬
  afterEach(() => mswServer.resetHandlers())
  // 在所有測試結束後關閉 MSW
  afterAll(() => mswServer.close())

  // ====== 準備 ====== //
  const mockParsedData: ParsedData = {
    convertData: {
      departureDate: '2023-11-31',
      passengerName: '',
      adultCount: 0,
      childCount: 0,
      passengerPhone: '0912-345678',
      orderNumber: '2023000000',
    },
    setShowData: jest.fn(),
    setText: jest.fn(),
    setLoading: jest.fn(),
  }

  it('【成功】測試 API 發送成功', async () => {
    // ====== 執行 ====== //
    await getOrderNumber(mockParsedData)

    // ====== 驗證 ====== //
    expect(mockParsedData.setShowData).toHaveBeenCalledWith({
      bookingDate: mockParsedData.convertData.departureDate,
      passengerName: `${mockParsedData.convertData.passengerName} - ${mockParsedData.convertData.orderNumber}`,
      adultCount: mockParsedData.convertData.adultCount,
      childCount: mockParsedData.convertData.childCount,
      passengerPhone: mockParsedData.convertData.passengerPhone,
      orderNumber: mockParsedData.convertData.orderNumber,
    })

    expect(mockParsedData.setText).toHaveBeenCalledWith('')
  })

  it('【失敗】測試 API 發送失敗', async () => {
    // 在特定測試內覆寫預設行為
    mswServer.use(
      rest.post('http://localhost:3000/booking', (req, res, ctx) => {
        return res(ctx.status(400)) // 模擬一個 400 錯誤
      }),
    )

    // ====== 執行 ====== //
    await getOrderNumber(mockParsedData)

    // ====== 驗證 ====== //
    expect(showAlertWithTimer).toHaveBeenCalledWith('error', '訂單獲取失敗')
  })
})
