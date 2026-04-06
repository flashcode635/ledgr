import Link from 'next/link'
import notFound  from '@/public/not-found.png'
import Image from 'next/dist/shared/lib/image-external'
import { Button } from '@/components/ui/buttons'
export default function NotFound() {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-1'>
      <div className='w-screen flex justify-center items-center p-0 m-0'>

        <Image src={notFound} width={400} alt="Not Found" />
      </div>
      <div className=' w-full text-nowrap flex-wrap flex flex-col justify-center items-center gap-4 p-10 pt-1'>
        {/* <h1 className='text-[110px] font-semibold'>404 - Error</h1> */}
        <h2 className='text-2xl'> Page Not Found</h2>
        <p className='text-gray-600'>Could not find requested resource</p>
        {/* <button className='bg-slate-800/30 border border-slate-400 text-white py-2 px-4 rounded-lg hover:bg-slate-600/20'>
          <Link href="/">Return Home</Link>
        </button> */}
        <Button variant="outline" size="md" layout="default">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
      
    </div>
  )
}