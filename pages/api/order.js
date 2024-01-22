import connectToDatabase from "@/utils/db";


export default async function handler(req, res) {

    if (req.method === 'POST') {

        try {
            const db = await connectToDatabase(process.env.MONGoDB_URI);
            
    
            return res.status(200).json({medicines});
        } catch (error) {
            console.error("error fetching medicine",error);
        }
        
    }
    if(req.method === 'GET') {


    }
}