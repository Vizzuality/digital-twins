import dynamic from 'next/dynamic'
const Lines = dynamic(() => import('@/components/lines'), { ssr: false })

export default function Intro() {
  return (
    <section className="relative bg-blue-900 text-white">
      <Lines verticalClassName="left-8 w-[calc(100vh-16px)]" sectionName='intro' columns={[64, 432, 757, 897]} rows={[179, 246]} />
      <div className='container relative pt-[110px] xl:pt-[177px] pl-8 xl:pl-24 pb-[60px] xl:pb-[140px]'>
        <h1 className='text-light-white text-2xl xl:text-[90px] xl:leading-[81px] font-semibold'>
          About Us
        </h1>
      </div>
    </section>);
};