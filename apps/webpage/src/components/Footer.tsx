export default function Footer() {
    return (
      <footer className="w-full bg-[#212121] pt-8 pb-7 text-white flex flex-col items-center">
        <div className="w-full flex justify-evenly mb-4">
          <div className="socialMedia">
            <h3 className="font-bold mb-2 underline">Social Media</h3>
            <ul className="space-y-2">
              <li className="hover:underline"><a href="https://www.instagram.com/theomsharma" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li className="hover:underline"><a href="https://github.com/omsharma29" target="_blank" rel="noopener noreferrer">Github</a></li>
              <li className="hover:underline"><a href="https://www.linkedin.com/in/omsharma029" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li className="hover:underline"><a href="#" target="_blank" rel="noopener noreferrer">Portfolio</a></li>
            </ul>
          </div>
          <div className="topPlaces">
            <h3 className="font-bold mb-2 underline">Top Places</h3>
            <ul className="space-y-2">
              <li>India</li>
              <li>USA</li>
              <li>UAE</li>
            </ul>
          </div>
          <div className="features">
            <h3 className="font-bold mb-2 underline">Features</h3>
            <ul className="space-y-2">
              <li className="hover:underline">Order</li>
              <li className="hover:underline">Address Fetch</li>
              <li className="hover:underline">Payment</li>
              <li className="hover:underline">Admin</li>
            </ul>
          </div>
        </div>
        <div className="w-full flex flex-col items-center px-8 text-sm">
          <span>Theme By Figma & Developed by <strong>Om Sharma</strong></span>
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          <span>Contact: <a href="mailto:contactom1001@gmail.com" className="hover:underline">contactom1001@gmail.com</a></span>
        </div>
      </footer>
    );
  }