import { ChangeEvent, useState } from 'react';
import './Services.css'
import CropImage from './CropImage';
import { FaRegImage } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { MdCancelPresentation } from 'react-icons/md';
import { createWorker } from 'tesseract.js';
import Loader from './Loader';
import runGPT from '../../api/RunGPT';
import GPTReport from './GPTReport';
import toast from 'react-hot-toast';


const mainCategories = [
    "Food and Beverages",
    "Personal Care",
    "Cosmetics",
    "Household Products",
    "Health and Wellness",
    "Baby and Child Care",
    "Pet Care",
    "Electronics and Gadgets",
    "Clothing and Accessories",
    "Automotive",
    "Home and Garden",
    "Other"
];



const Services = () => {
    const [src, setSrc] = useState<string | undefined>();
    const [isImageShown, setIsImageShown] = useState(false);
    const [fileName, setFileName] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStage, setLoadingStage] = useState<string>();
    const [category, setCategory] = useState<string>('Other');
    const [ingredientsList, setIngredientsList] = useState<string>();
    const [healthCondition, setHealthCondtion] = useState<string>('fit');
    const [gptReport, setGptReport] = useState(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
                setFileName(file.name)
                setSrc(URL.createObjectURL(file));
                setIsImageShown(prev => !prev);
            }
        }
    };

    const handleImageCancel = () => {
        setSrc('');
        setFileName('');
        setIsImageShown(false);
    }

    const getTheTextFromImage = async () => {
        setIsLoading(prev => !prev);
        if (src) {
            setLoadingStage('Extracting Text...')
            const worker = await createWorker('eng');
            const ret = await worker.recognize(src!);
            return ret.data.text;
        } else {
            console.log('provide the image to load');
        }
        return;
    }

    //sending get req to google api
    const generateTheGPTReport = async (ingredients: string) => {
        try {
            const chatSession = await runGPT();
            setLoadingStage('Fetching details')
            const result = await chatSession.sendMessage(`I have a ${category} product. Here are the ingredients: ${ingredients}. Is this product safe to use, and what are the potential long-term effects?I have ${healthCondition} can I use this product safely? Please provide an overall safety percentage`);
            setLoadingStage('Generating Report')
            if (result.response.text()) {
                const res = JSON.parse(result.response.text());
                setGptReport(res);
            } else {
                toast.error("No Data Found")
            }
        } catch (err) {
            toast.error("No Response From The Server")
        }
    }

    const handleAnalysis = async () => {
        if (!src && !ingredientsList) {
            toast.error("Please Add Ingredients")
            return
        }
        setLoadingStage('Analyzing Ingredients...')
        try {
            if (src && !ingredientsList?.trim()) {
                const imageText = await getTheTextFromImage();
                await generateTheGPTReport(imageText!)
                toast.success("Report Is Generated Successfully")
                setSrc('');
                setFileName('')
            }
            else if (!src && ingredientsList?.trim()) {
                setIsLoading(true)
                await generateTheGPTReport(ingredientsList)
                toast.success("Report Is Generated Successfully")
                setIngredientsList('');
            }
            else {
                console.log('no ingredients')
                toast.error("No Ingredients Found")
            }

        } catch (err) {
            toast.error("Try Again Later")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section id='Services' className="service_container w-full relative min-h-screen">
            <div className='service_fields_wrapper'>
                <div>
                    <h1 className='text-3xl sm:text-5xl text-center text-slate-800 font-bold mt-8'>Scan <span className='text-blue-500 font-Poetse '>Smart, </span>Choose <span className='text-rose-500 font-Poetse'>Healthy</span></h1>
                </div>
                <div className='mt-11 pointer-events-auto px-5 flex-col space-y-9 sm:px-10 flex justify-center min-h-[80vh] items-center'>
                    <div className="service_input_wrapper flex flex-col items-center rounded-lg bg-white/30 shadow-xl shadow-blue-200 border backdrop-blur-lg border-blue-50 p-6 w-[100%] sm:w-[90%] md:w-[70%] overflow-hidden relative">
                        <div className="input_group flex flex-col space-y-4 w-full">
                            <label htmlFor="health_conditions" className="text-sm font-medium text-gray-700 mb-1">
                                Health Conditions (optional):
                            </label>
                            <input
                                onChange={(e) => setHealthCondtion(e.target.value)}
                                type="text"
                                id="health_conditions"
                                className="border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none text-sm"
                                placeholder="Diabetes, Hypertension..."
                            />
                        </div>
                        <div className="input_group flex flex-col space-y-4 w-full my-6">
                            <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">
                                Category:
                            </label>
                            <select
                                id="category"
                                className="border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none text-sm appearance-none"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value={'other'}>Select Category</option>
                                {
                                    mainCategories.map((category, idx) => (
                                        <option key={idx} value={category}>{category}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="input_group flex flex-col space-y-4 w-full">
                            <label htmlFor="health_conditions" className="text-sm font-medium text-gray-700 mb-1">
                                Add Ingredients:
                            </label>
                            <textarea
                                onChange={(e) => setIngredientsList(e.target.value)}
                                id="health_conditions"
                                className="border rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none text-sm"
                                placeholder="sugar : 2g etc..."
                                value={ingredientsList}
                            />
                        </div>
                        <div className='flex justify-center my-2 items-center'>
                            <div className='w-[100px] h-0.5 bg-blue-400 rounded-lg' /> <span className='mx-3'>or</span> <div className='w-[100px] h-0.5 bg-blue-400 rounded-lg' />
                        </div>
                        <div className="input_group flex flex-col space-y-4 w-full">
                            {
                                fileName ?
                                    <div className='border-2 bg-white border-slate-500 rounded-md p-3 text-slate-900 shadow-sm outline-none  flex items-center justify-between space-x-8 text-lg w-full'>
                                        <span className='text-sm text-center'>{fileName}</span>
                                        <MdCancelPresentation className='text-xl text-rose-400 cursor-pointer' onClick={handleImageCancel} />
                                    </div> :
                                    <label htmlFor='file-upload' className={`border rounded-md p-3 text-slate-900 shadow-sm outline-none bg-white cursor-pointer flex items-center space-x-8 text-lg`}>
                                        <div className='flex items-center space-x-5'>
                                            <FaRegImage />
                                            <span className='text-sm text-center'>Choose an Image of Ingredients</span>
                                        </div>
                                    </label>
                            }
                            <input
                                id='file-upload'
                                type='file'
                                accept='image/*'
                                className="hidden"
                                placeholder="Diabetes, Hypertension..."
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className='mt-5'>
                            <button onClick={handleAnalysis} className='py-2 px-10 flex items-center space-x-2 bg-blue-500 rounded-full border border-blue-500 text-white '><span>Analyze</span> <IoSend /></button>
                        </div>
                        {isImageShown && <CropImage src={src!} setSrc={setSrc} setIsImageShown={setIsImageShown} />}
                        {isLoading && <Loader loadingStage={loadingStage!} />}
                    </div>
                    <div className='flex justify-center'>
                        {
                            gptReport && <GPTReport data={gptReport} />
                        }
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Services;