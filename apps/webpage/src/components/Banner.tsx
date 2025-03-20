import { Button } from "@repo/ui/button";
import Pizza1 from "../assets/Pizza1.svg";
import Pizza2 from "../assets/Pizza2.svg";
import Pizza3 from "../assets/Pizza3.svg";

const Details = [
  {
    image: Pizza1,
    H1: "Best deals Crispy Volcano Pizza",
    Para: "Enjoy the large size of Pizza, a cheesy, spicy burst of flavors with a crispy crust!",
  },
  {
    image: Pizza2,
    H1: "Celebrate parties with Paratha Pizza",
    Para: "Get the best Paratha Pizza loaded with a lip-smacking blend of cheesy and spicy flavors. Check out the best deals for Paratha Pizza!",
  },
  {
    image: Pizza3,
    H1: "Wanna eat hot & spicy Pizza?",
    Para: "Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals.",
  },
];

export default function Banner() {
  return (
    <div className="flex flex-col items-center gap-5 mt-[100px] mb-[80px]">
      {Details.map((detail, index) => (
        <div
          key={index}
          className="box w-full sm:w-[80%] lg:w-[60%] h-auto mt-5 mb-4 flex flex-col sm:flex-row shadow-2xl rounded-2xl"
        >
          {/* Text Section */}
          <div className="text flex flex-col justify-center items-center sm:items-start gap-4 m-3 text-center sm:text-left">
            <h1 className="font-extrabold text-2xl sm:text-4xl">{detail.H1}</h1>
            <p className="opacity-70 text-sm sm:text-base">{detail.Para}</p>
            <Button className="w-[80%] hidden sm:w-auto items-end hover:border-amber-500 cursor-pointer text-white bg-gradient-to-l from-[#FFB800] to-[#FF8A00] drop-shadow-[0px_4px_10px_#FFB20E]">
              Make Some Order
            </Button>
          </div>
          {/* Image Section */}
          <div className="img flex w-full sm:w-[50%] h-[200px] sm:h-[250px] lg:h-[300px]">
            <img src={detail.image} alt="Pizza" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
