import Swal, { SweetAlertResult } from 'sweetalert2'

// ====== 函式：顯示提示訊息 ======
export const showAlertWithTimer = async (
  icon: 'success' | 'error',
  message: string,
): Promise<void> => {
  let timerInterval: NodeJS.Timeout
  try {
    const result: SweetAlertResult = await Swal.fire({
      icon,
      title: `${message}`,
      timer: icon === 'success' ? 800 : 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer()?.querySelector('b')
        if (b) {
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()?.toString() || ''
          }, 100)
        }
      },
      willClose: () => {
        clearInterval(timerInterval)
      },
    })
    // 倒數計時器不正常時，使用這段程式碼
    // if (result.dismiss === Swal.DismissReason.timer) {
    //   console.log('I was closed by the timer')
    // }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
