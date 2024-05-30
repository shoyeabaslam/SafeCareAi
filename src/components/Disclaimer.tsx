import { IoIosInformationCircleOutline } from "react-icons/io";


const Disclaimer = ()=>{
    return(
        <div className='disclaimer flex items-center justify-center px-2 py-4 '>
              <p className='w-full border p-2 rounded-lg'>
                  <span className='text-rose-600 items-center space-x-4 flex '><IoIosInformationCircleOutline className='mr-2' />Disclaimer</span><span className="text-sm text-slate-800">The information provided is based on the ingredients listed and general safety guidelines. Always consult a healthcare professional before using any product, especially if you have underlying health conditions.</span>
              </p>
          </div>
    )
}

export default Disclaimer;