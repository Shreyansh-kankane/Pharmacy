import connectToDatabase from "@/utils/db";

export default async function handler(req, res) {
    try {
        const db = await connectToDatabase(process.env.MONGoDB_URI);
        const medicineCollection = db.collection('medicine_stock');
        const medicines = await medicineCollection.find({}).toArray();
        return res.status(200).json({medicines});
    } catch (error) {
        console.error("error fetching medicine",error);
    }
}