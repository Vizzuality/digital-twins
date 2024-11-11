import Image from 'next/image';

import dynamic from 'next/dynamic'
const Lines = dynamic(() => import('@/components/lines'), { ssr: false })

export default function Intro() {
  return (
    <section className="relative bg-blue-950">
      <Lines verticalClassName="left-8 w-[calc(100vh-16px)]" sectionName='intro' columns={[64, 136, 452, 947]} rows={[220, 286, 302, 364, 468, 764]} />
      <div className='container relative pt-[110px] xl:pt-[177px] pl-8 xl:pl-24 flex flex-col-reverse xl:grid xl:grid-cols-[250px_1fr_250px] pb-[60px]'>
        <div className='space-y-10 pt-[41px]'>
          {/* Text and images removed for now - May be recovered on the future */}
          {/* <div className='text-white text-balanced leading-[18px] pt-4 xl:pt-0'>
            The Climate Adaptation <br />Digital Twin in Action: <br />Climate simulations to support decisions in the energy sector.
          </div>
          <ul className='flex flex-row xl:flex-col gap-[10px]'>
            {
              Array(5).fill(0).map((_, i) => (
                <li key={`intro-images-${i}`} className='flex items-center gap-[9px] relative'>
                  <Image alt="" src={`/images/energy-thumbs-${i + 1}.png`} width={72} height={79} />
                  {i === 0 && <span className='bg-white w-[10px] h-[10px] rounded-full hidden xl:block' />}
                </li>
              ))
            }
          </ul> */}
        </div>
        <div className='text-center space-y-[30px] xl:space-y-[94px]'>
          <div>
            <div className='text-light-green text-xs inline-flex items-center pb-4'>Case study<span className='mx-[10px] h-px w-[20px] bg-light-green' />01 Energy</div>
            <h1 className='xl:max-w-[1012px]'>
              <div className="text-light-green text-2xl xl:text-[90px] xl:leading-[81px] font-semibold">The Future of </div>
              <div className="text-white text-2xl xl:text-[90px] xl:leading-[81px] font-semibold">Energy</div>
            </h1>
          </div>
          <div className='flex items-center justify-center'>
            <Image alt="" src="/images/energy-intro.png" width={494} height={297} />
          </div>
        </div>
      </div>
    </section>);
};