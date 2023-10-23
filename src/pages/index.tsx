import { FormEvent, useState } from 'react'
import axios from 'axios'
import Loading from '../components/Loading'
import parseText from '../lib/parseText'
import { copyToClipboard } from '@/lib/copyToClipboard'

type ParsedData = {
  全票數量?: number
  半票數量?: number
  全名?: string
  參加時間?: string
  手機號碼?: string
  單位?: string
  訂單編號?: string // 新增訂單編號
}

type ShowData = {
  bookingDate?: string
  adultCount?: number
  childCount?: number
  orderNumber?: string
  passengerName?: string
  passengerPhone?: string
}

export default function Home() {
  const [text, setText] = useState<string>('')
  const [showData, setShowData] = useState<ShowData>({})
  const [loading, setLoading] = useState<boolean>(false)

  const getOrderNumber = async (convertData: ParsedData) => {
    try {
      const combinedName = `${convertData['全名']} - ${convertData['訂單編號']}`
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/booking`,
        {
          bookingDate: convertData['參加時間'],
          adultCount: convertData['全票數量'],
          childCount: convertData['半票數量'],
          passengerName: combinedName,
          passengerPhone: convertData['手機號碼'],
        },
      )
      setShowData(res.data)
      setText('')
      setLoading(false)
    } catch (err) {
      console.error('訂單獲取失敗', err)
      setLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setShowData({})
    setLoading(true)
    const convertData = parseText(text)
    getOrderNumber(convertData)
  }

  const renderObj = {
    '出發日期：': showData.bookingDate,
    '乘客姓名：': showData.passengerName,
    '全票數量：': showData.adultCount,
    '半票數量：': showData.childCount,
    '手機號碼：': showData.passengerPhone,
    '訂單編號：': showData.orderNumber,
  }

  return (
    <div className='container flex justify-center items-center h-screen'>
      <div>
        <Loading loading={loading} />
        <h1 className='text-5xl font-bold  rounded backdrop-blur-sm bg-white/30 p-3 text-gray-800 mb-3'>
          Klook 訂票系統
        </h1>

        <div className='flex space-x-4'>
          <form onSubmit={handleSubmit}>
            <textarea
              className='w-full h-full min-h-[500px] min-w-[500px] rounded backdrop-blur-sm bg-white/30 p-2 text-gray-800'
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <button
              type='submit'
              className=' bg-gray-800 hover:bg-white hover:text-gray-800 text-white font-bold py-3 px-7 text-xl rounded'
            >
              送出
            </button>
          </form>

          <div className='min-w-[250px] text-gray-800 px-4 pt-3 rounded backdrop-blur-sm bg-white/30'>
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold mb-10'>訂票結果</h2>

              {Object.keys(renderObj).map(key => (
                <div
                  key={key}
                  className='border-b pb-2 border-gray-800'
                >
                  <span>{key}</span>
                  {key === '訂單編號：' ? (
                    <b
                      className='cursor-pointer underline text-blue-500'
                      onClick={() =>
                        copyToClipboard(showData.orderNumber || '')
                      }
                    >
                      {renderObj[key as keyof typeof renderObj]}
                    </b>
                  ) : (
                    <b>{renderObj[key as keyof typeof renderObj]}</b>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
