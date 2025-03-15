import { Button } from "@repo/ui/button"
import Pizza1 from "../assets/Pizza1.svg"
import Pizza2 from "../assets/Pizza2.svg"
import Pizza3 from "../assets/Pizza3.svg"

const Details  = [
    {
        "image" : Pizza1,
        "H1" : "Best deals Crispy Volcano Pizza",
        "Para": "Enjoy the large size of Pizza, a cheesy, spicy burst of flavors with a crispy crust!"

    },
    {
        "image" : Pizza2,
        "H1" : "Celebrate parties with Paratha Pizza",
        "Para": "Get the best Paratha Pizza loaded with a lip-smacking blend of cheesy and spicy flavors. Check out the best deals for Paratha Pizza!h"

    },
    {
        "image" : Pizza3,
        "H1" : "Wanna eat hot & spicy Pizza?",
        "Para": "Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals."
    },


]



export default function Banner() {
  return (
    <div className="flex flex-col items-center gap-1 mt-[100px] mb-[80px]">
        {Details.map((detail)=>(
            <div className="box w-[80%] h-[300px] mt-5 mb-2 flex shadow-2xl">
            <div className="text flex flex-col justify-center items-center gap-3  m-3">
                <h1 className="font-extrabold text-4xl">{detail.H1}</h1>
                <p className="opacity-40 text-start ">{detail.Para}</p>
                <Button className="w-[80%] items-end  hover:border-amber-500  cursor-pointer  text-white bg-gradient-to-l from-[#FFB800]  to-[#FF8A00] drop-shadow-[0px_4px_10px_#FFB20E]">Make Some Order</Button>
            </div>
            <div className="img flex w-[80%] h-full">
                <img src={detail.image} alt="Pizza" className="w-full h-full object-cover" />
            </div>
        </div>
        ))
        
}
    </div>
  )
}