import { FormEvent } from 'react'
import convertText from './convertText'
import { getOrderNumber } from './getOrderNumber'
import { ShowData } from '@/pages'
import { showAlertWithTimer } from './showAlertWithTimer'

type SubmitProps = {
  e: FormEvent
  setShowData: React.Dispatch<React.SetStateAction<ShowData>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
}
export const handleSubmit = async ({
  e,
  setShowData,
  setLoading,
  text,
  setText,
}: SubmitProps) => {
  e.preventDefault()
  setShowData({
    bookingDate: '',
    adultCount: 0,
    childCount: 0,
    orderNumber: '',
    passengerName: '',
    passengerPhone: '',
  })
  setLoading(true)
  try {
    const convertData = convertText(text)
    await getOrderNumber({ convertData, setShowData, setLoading, setText })
  } catch (error) {
    showAlertWithTimer('error', '訂單獲取失敗')
  } finally {
    setLoading(false)
  }
}
