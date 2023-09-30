type ParsedData = {
  全票數量?: number
  半票數量?: number
  全名?: string
  參加時間?: string
  手機號碼?: string
  單位?: string
  訂單編號?: string // 新增訂單編號
}

const parseText = (inputText: string) => {
  const lines = inputText.split('\n')
  const foundData: ParsedData = {}
  let orderNumber: string | undefined

  // 使用正則表達式找出訂單編號
  const orderNumberMatch = inputText.match(/訂單編號:\s*([^\n]+)/)
  if (orderNumberMatch) {
    orderNumber = orderNumberMatch[1].split(' ')[0]
  }

  foundData['訂單編號'] = orderNumber

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    const key = line.split(':')[0].trim()
    if (['單位', '全名', '參加時間', '手機號碼'].includes(key)) {
      const validKey = key as keyof ParsedData
      foundData[validKey] = lines[i + 2].trim() as any
    }
  }

  let fullTicketCount: number = 0
  let halfTicketCount: number = 0
  if (foundData.單位) {
    const unitInfo = foundData.單位
    const tickets = unitInfo.split(',')
    for (const ticket of tickets) {
      const fullTicketMatch =
        ticket.match(/全票.*x\s*(\d+)/) || ticket.match(/往返船票.*x\s*(\d+)/)
      const halfTicketMatch = ticket.match(/半票.*x\s*(\d+)/)
      if (fullTicketMatch) {
        fullTicketCount = parseInt(fullTicketMatch[1], 10)
      }
      if (halfTicketMatch) {
        halfTicketCount = parseInt(halfTicketMatch[1], 10)
      }
    }
  }
  foundData['全票數量'] = fullTicketCount
  foundData['半票數量'] = halfTicketCount
  return foundData
}

export default parseText
