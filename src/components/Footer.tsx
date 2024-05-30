import { FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-6 px-4">
      <div className="container mx-auto flex flex-wrap justify-center items-center sm:justify-between">
        <div className="flex items-center">
          <a href="/"  className="text-2xl mr-4 font-bold font-Poetse">SafeCareAi</a>
          <p className="text-sm text-white mt-1">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="flex space-x-4 text-2xl my-2 sm:my-0">
          <a href="https://www.linkedin.com/in/shoyeab/" target="_blank" className="text-slate-200 hover:text-white"><FaLinkedin/></a>
          <a href="mailto:shoyeab07@gmail.com" className="text-slate-200 hover:text-white"><SiGmail/></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
