import MapMaker from "../assets/MapMarker.svg"
import Donut from "../assets/Donut.svg"
import Invoice from "../assets/Invoice.svg"
import Menu from "../assets/Menu.svg"


const info = [
    {
        "image": MapMaker,
        "heading": "Select Location",
        "para": "Choose the location where your food will be delivered."
    },
    {
        "image": Menu,
        "heading": "Select Order",
        "para": "Check over hundreds of menus to pick your favorite food"
    },
    {
        "image": Invoice,
        "heading": "Pay Advance",
        "para": "It's quick, safe, and simple. Select several methods of payment"
    },
    {
        "image": Donut,
        "heading": "Enjoy meals",
        "para": "Food is made and delivered directly to your home."
    },
]

export default function HowItWorks() {
    return (
        <div className='hidden sm:flex flex-col items-center w-[100%] h-[518px] mt-5 mb-1 bg-gradient-to-b from-[#ffcf6733] from-opacity-10 to-white'>
            <div className="title font-extrabold text-6xl mt-10 text-[#F17228]  ">How does it Work</div>
            <div className="items flex justify-center ">
                {info.map((infos) => (
                    <div className='flex flex-col items-center mx-12'>
                    <div className="image mt-9">
                        <img src={infos.image} alt={infos.heading} />
                    </div>
                    <div className="heading p-1 font-bold">{infos.heading}</div>
                    <div className="para flex flex-col items-center">
                        <p className='text-center opacity-45'>{infos.para}</p>
                    </div>
                    </div>
                ))}
            </div>

        </div>
    )
}