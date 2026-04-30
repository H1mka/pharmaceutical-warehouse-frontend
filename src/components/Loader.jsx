const Loader = ({ isLoading }) => {
  return isLoading ? (
    <div className='fixed left-0 top-0 w-screen h-screen z-999 flex justify-center items-center'>
      <div className='absolute left-0 top-0 w-screen h-screen bg-stone-950 opacity-50 z-99'></div>
      <div className='z-100 relative'>
        <span className='loading loading-spinner text-success loading-xl'></span>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Loader
