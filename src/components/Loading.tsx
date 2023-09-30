

const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <div
      style={{
        display: loading ? 'flex' : 'none',
      }}
      className='w-screen h-screen bg-black/70 fixed top-0 left-0 z-10 flex justify-center items-center'
    >
      <span className='loading loading-ring loading-lg'></span>
      <span className='loading loading-ring loading-lg'></span>
      <span className='loading loading-ring loading-lg'></span>
    </div>
  )
}


export default Loading