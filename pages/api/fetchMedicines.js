import connectToDatabase from "@/utils/db";

export default async function fetchMedicines(req, res) {
    try {
        const db = await connectToDatabase(process.env.MONGoDB_URI);
        const medicineCollection = db.collection('medicine_stock');

        const medicines = await medicineCollection.find({}).toArray();
        
        const distributorCollection = db.collection('distributor');
        const ObjectId = require('mongodb').ObjectId;
        const updatedMedicine = await Promise.all( 
            medicines.map(async (medicine) => {
            
            const distributor = await distributorCollection.findOne({_id: new ObjectId(medicine.distributorId)});
            medicine.distributorName = distributor.name;
            return medicine;
        }));

        return res.status(200).json({medicines:updatedMedicine});
    } catch (error) {
        console.error("error fetching medicine",error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}