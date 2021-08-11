import Image from 'next/image'

const Banner = () => {
  return (
    <div className='relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] '>
      <Image
        src='https://res.cloudinary.com/minakshi-nayak/image/upload/v1628592718/57b9f708-bb12-498c-bc33-769f8fc43e63_wyscka.webp'
        layout='fill'
        objectFit='cover'
      />
      <div className='absolute top-1/2 w-full text-center'>
        <p className='text-sm sm:text-lg'>Not sure where to go ? Perfect</p>
        <button className='text-purple-500 px-10 py-4 bg-white rounded-full shadow-md font-bold my-5 hover:shadow-xl active:scale-90 transition duration-150'>
          I'm flexible
        </button>
      </div>
    </div>
  )
}

export default Banner
