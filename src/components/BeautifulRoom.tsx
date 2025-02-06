//src\components\beautifulRoom\BeautifulRoom.tsx
import Image from 'next/image'

export default function BeautifulRoom() {
  
  return (
    <section className="relative bg-[#fcf8f3] flex flex-col gap-[34px]  justify-between items-center py-[44px]
    lg:flex-row 
    ">
      
      

      {/* left text */}
      <div className="flex flex-col gap-4 w-[343px] 
      exsm:w-[300px]
      xsm:ml-[50px] 
      
      
      ">
        <h1 className="xsm:text-[40px] exsm:text-[30px] xsm:leading-[48px] exsm:leading-[42px] font-bold">50+ Beautiful rooms 
        inspiration</h1>
        <p>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
        <button className="px-[30px] py-[12px] bg-[#B88E2F] text-white font-bold">Explore More</button>
      </div>

      {/* right div */}
      <div className="flex flex-col gap-[20]
      lg:flex-row
      xsm:ml-[50px]
      exsm:gap-[10px]
      overflow-hidden
      ">

        {/* 1 */}
        <div className=" relative xsm:w-[328px] xsm:h-[582px] exsm:w-[280px] exsm:h-[480px]">
          <Image src="/room1.png" alt="room1" fill style={{ objectFit: 'cover' }}></Image>
        </div>

        {/* 2 */}
        <div className=" relative xsm:w-[302px] xsm:h-[486px] exsm:w-[280px] exsm:h-[480px]">
          <Image src="/room2.png" alt="room2" fill style={{ objectFit: 'cover' }}></Image>
        </div>
        
        {/* 3 */}
        <div className=" relative xsm:w-[302px] xsm:h-[486px] exsm:w-[280px] exsm:h-[480px] ">
          <Image src="/room3.png" alt="room3" fill style={{ objectFit: 'cover' }}></Image>
        </div>

      </div>
    </section>
  )
}