import Link from 'next/link'
import notFound  from '@/public/not-found.png'
import Image from 'next/dist/shared/lib/image-external'
export default function NotFound() {
  return (
    <div className='h-screen w-screen flex justify-between'>
      <div className=' w-full text-nowrap flex-wrap flex flex-col justify-center items-center gap-4 p-10'>
        <h1 className='text-[110px] font-semibold'>404 - Error</h1>
        <h2 className='text-2xl'> Page Not Found</h2>
        <p className='text-gray-600'>Could not find requested resource</p>
        <button className='bg-violet-700 text-white py-2 px-4 rounded-lg hover:bg-violet-800'>
          <Link href="/">Return Home</Link>
        </button>
      </div>
      <div className='w-[40%] h-screen p-0 m-0'>

        <Image src={notFound} width={400} alt="Not Found" />
      </div>
    </div>
  )
}