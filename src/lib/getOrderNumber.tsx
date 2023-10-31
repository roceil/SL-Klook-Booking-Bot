import axios from 'axios'
import { ShowData } from '../pages'
import { showAlertWithTimer } from './showAlertWithTimer'

export type ParsedData = {
  convertData: {
    departureDate: string
    passengerName: string
    adultCount: number
    childCount: number
    passengerPhone: string
    orderNumber: string
  }
  setShowData: React.Dispatch<React.SetStateAction<ShowData>>
  setText: React.Dispatch<React.SetStateAction<string>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
export const getOrderNumber = async ({
  convertData,
  setShowData,
  setText,
  setLoading,
}: ParsedData) => {
  try {
    const combinedName = `${convertData.passengerName} - ${convertData.orderNumber}`
    const headers = {
      Identity: process.env.NEXT_PUBLIC_IDENTITY,
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/booking`,
      {
        bookingDate: convertData.departureDate,
        adultCount: convertData.adultCount,
        childCount: convertData.childCount,
        passengerName: combinedName,
        passengerPhone: convertData.passengerPhone,
      },
      {
        headers,
      },
    )
    setShowData(res.data)
    setText('')
    setLoading(false)
    showAlertWithTimer('success', '訂票成功')
    return res.data
  } catch (err) {
    showAlertWithTimer('error', '訂單獲取失敗')
    setLoading(false)
  }
}
