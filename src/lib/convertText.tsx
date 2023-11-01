type ParsedData = {
  departureDate: string
  passengerName: string
  adultCount: number
  childCount: number
  passengerPhone: string
  orderNumber: string
}

const parseText = (inputText: string): ParsedData => {
  // 初始化最後回傳的 Data
  let foundData: ParsedData = {
    departureDate: '',
    passengerName: '',
    adultCount: 0,
    childCount: 0,
    passengerPhone: '',
    orderNumber: '',
  }

  // 定義正則表達式
  const orderNumberRegex = /訂單編號:\s*([^\n]+)/
  const departureDateRegex = /參加時間:\s*\n\s*([\d-]+)/
  const passengerNameRegex = /全名:\s*([^\n]+)/
  const passengerPhoneRegex = /手機號碼:\s*([^\n]+)/
  const fullTicketRegex = /全票\s*x\s*(\d+)/
  const roundTripTicketRegex = /往返船票.*x\s*(\d+)/
  const halfTicketRegex = /半票.*x\s*(\d+)/

  // 搜尋訂單編號
  const orderNumberMatch = inputText.match(orderNumberRegex)
  if (orderNumberMatch) {
    foundData.orderNumber = orderNumberMatch[1].split(' ')[0]
  }

  // 搜尋參加時間
  const departureDateMatch = inputText.match(departureDateRegex)
  if (departureDateMatch) {
    foundData.departureDate = departureDateMatch[1]
  }

  // 搜尋姓名
  const passengerNameMatch = inputText.match(passengerNameRegex)
  if (passengerNameMatch) {
    foundData.passengerName = passengerNameMatch[1]
  }

  // 搜尋電話
  const passengerPhoneMatch = inputText.match(passengerPhoneRegex)
  if (passengerPhoneMatch) {
    foundData.passengerPhone = passengerPhoneMatch[1]
  }

  // 搜尋全票－(文字顯示『全票』時)
  const fullTicketMatch = inputText.match(fullTicketRegex)
  if (fullTicketMatch) {
    foundData.adultCount += parseInt(fullTicketMatch[1], 10)
  }

  // 搜尋全票－(文字顯示『往返船票』時)
  const roundTripTicketMatch = inputText.match(roundTripTicketRegex)
  if (roundTripTicketMatch) {
    foundData.adultCount += parseInt(roundTripTicketMatch[1], 10)
  }

  // 搜尋半票
  const halfTicketMatch = inputText.match(halfTicketRegex)
  if (halfTicketMatch) {
    foundData.childCount += parseInt(halfTicketMatch[1], 10)
  }

  return foundData
}

export default parseText
