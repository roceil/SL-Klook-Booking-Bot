import { showAlertWithTimer } from './showAlertWithTimer'

// ====== 函式：複製到剪貼簿 ======
export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    await showAlertWithTimer('success', `已複製 - ${text}`)
  } catch (err) {
    console.error('無法複製', err)
  }
}