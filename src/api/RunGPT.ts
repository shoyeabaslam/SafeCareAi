import { GoogleGenerativeAI ,HarmCategory,HarmBlockThreshold} from "@google/generative-ai";
import { instruction } from "./SystemInstruction";
 

const runGPT = async () =>{
        const apiKey = import.meta.env.VITE_GOOGLE_GPT_API;
       
        const genAI = new GoogleGenerativeAI(apiKey!);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: instruction,
          });
          const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
          };
          const safetySettings = [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
          ];
            const chatSession = model.startChat({
              generationConfig,
              safetySettings,
              history: [
              ],
            });
          
          return chatSession;
    }

export default runGPT


// const result = await chatSession.sendMessage(`I have a ${category} product. Here are the ingredients: ${ingredientList}. Is this product safe to use, and what are the potential long-term effects?I have ${healthCondition} can I use this product safely? Please provide an overall safety percentage`);
// console.log(result.response.text())
// if(result.response.text()){
//     const res = JSON.parse(result.response.text());
//     console.log(res['Overall Safety Percentage'])
// }