import { FC } from "react";
import { BiSolidHandRight } from "react-icons/bi";
import CircularProgressBar from "./CircularProgressBar";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface GPTReportProps {
    data: {
        Overview: string;
        "Ingredient Analysis":{
            [key:string]:{
                'Purpose':string,
                'Long-Term Effects':string
            }
        }; 
        Recommendations: string;
        "Overall Safety Percentage": string;
    };
}


const GPTReport: FC<GPTReportProps> = ({ data }) => {
    const {
        Overview,
        "Ingredient Analysis": ingredientAnalysis,
        Recommendations,
        "Overall Safety Percentage": overallSafetyPercentage,
    } = data;
   
    useGSAP(()=>{
        gsap.from('#report_wrapper-id',
        {
            height:0,
            duration:2,
            ease:'power1.inOut',
        }
       )
    },[])


    

    const downloadReport = async () => {
        const reportContent = document.getElementById('gptreport-content-id') as HTMLDivElement;

        try {
            const canvas = await html2canvas(reportContent, {
                // Add options to handle overflow
                scale: 2, // Adjust scaling factor as needed
                scrollX: 0, // Set scroll position to avoid capturing irrelevant parts
                scrollY: 0,
            });

            const imgData = canvas.toDataURL('image/png'); // Convert to PNG image data

            const pdf = new jsPDF();
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
            pdf.setPage(pdf.internal.pages[1])
            pdf.setTextColor('#3B82F6');   
            pdf.text( 'SafeCareAi',10, pdf.internal.pageSize.height - 10,);
            pdf.save('gptreport.pdf'); // Download as gtreport.pdf

        } catch (error) {
            console.error('Error downloading report:', error);
            // Handle errors appropriately (e.g., display an error message)
        }
    };

    return (
        <div id="report_wrapper-id" className="flex flex-col items-center rounded-lg bg-white/30 shadow-lg shadow-blue-200 border backdrop-blur-lg border-blue-50 h-full w-[100%] sm:w-[90%] md:w-[70%] overflow-hidden relative">
            {<div id="gptreport-content-id" className="flex p-6 w-full flex-col items-center ">
                <h2 className="text-3xl font-semibold text-blue-500 ">Safety Report</h2>
                <section className="overview mt-6">
                    <h3 className="font-semibold text-slate-800 text-xl my-2">Overview</h3>
                    <p className="text-gray-700 ">{Overview ? `${Overview}` : 'Overview'}</p>
                </section>

                <section className="analysis mt-6 w-full">
                    <h3 className="font-semibold text-slate-800 text-xl my-2">Ingredient Analysis and Long-Term Effects</h3>
                    {ingredientAnalysis && Object.entries(ingredientAnalysis).map(([key,value]) => (
                        <div key={key} className="analysis-item my-4 ">
                            <h4 className=" font-semibold">{key}</h4>
                            <ul className="ml-3 text-sm ">
                                <li>
                                    {value['Purpose']}
                                </li>
                                <li>
                                    {value['Long-Term Effects']}
                                </li>
                            </ul>
                        </div>
                    ))}
                </section>

                <section className="recommendations mt-2 ">
                    <h3 className="font-semibold text-slate-800 text-xl my-2">Recommendations</h3>
                    <ul className="list-disc pl-4">
                        {Recommendations && Object.entries(Recommendations).map(([key, value]) => (
                            <li key={key} className="text-green-700 list-none flex items-center  my-4"><BiSolidHandRight className="text-lg mr-4" /><span className="flex-1">{value}</span></li>
                        ))}
                    </ul>
                </section>

                <h4 className="safety-percentage mt-6 text-gray-800 text-2xl font-semibold">Overall Safety Percentage</h4>
                <CircularProgressBar progress={overallSafetyPercentage} />
            </div>}
            <button onClick={downloadReport} className="my-6 border px-3 py-1 rounded-lg bg-slate-600 text-white">Download Report</button>
        </div>
    );
};

export default GPTReport;
