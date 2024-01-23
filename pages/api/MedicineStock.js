import connectToDatabase from "@/utils/db";

export default async function handler(req, res) {

    if(req.method === 'POST') {
        const medicine = req.body;
        const db = await connectToDatabase(process.env.MONGoDB_URI);
        const medicineCollection = db.collection('medicine_stock');

        try {
            const existingMedicine = await medicineCollection.findOne({ batchNo: medicine.batchNo });

            const myMed = {}
            if(medicine.name!='') myMed.name = medicine.name;
            if(medicine.price!='') myMed.price = medicine.price;
            if(medicine.expiryDate!='') myMed.expiryDate = medicine.expiryDate;
            if(medicine.quantity!='') myMed.quantity = medicine.quantity;
            if(medicine.stackNo!='') myMed.stackNo = medicine.stackNo;

            if (existingMedicine) {

                const result = await medicineCollection.findOneAndUpdate(
                    { batchNo: medicine.batchNo },
                    { $set: myMed },
                    { returnDocument: 'after' }
                );
                return res.status(200).json({medicine: result.value});

            } else {

                if(medicine.name=='' || medicine.price=='' || medicine.batchNo=='' || medicine.expiryDate=='' || medicine.quantity=='' || medicine.stackNo==''){
                    return res.status(400).json({message: "Please fill all the fields"});   
                }


                const result = await medicineCollection.insertOne(medicine);
                console.log('added medicine ', result);
                return res.status(200).json({success: true,message: "Medicine added successfully"});
            }
        } catch (error) {
            console.error("error fetching medicine",error);
            return res.status(500).json({message: "Internal Server Error"});
        } 
    } 

    if(req.method === 'GET') {
        try {
            const distributorId = req.query.distributorId;

            const db = await connectToDatabase(process.env.MONGoDB_URI);
            const medicineCollection = db.collection('medicine_stock');

            const medicines = await medicineCollection.find({distributorId:distributorId}).toArray();

            return res.status(200).json({medicines:medicines});
        } catch (error) {
            console.error("error fetching medicine",error);
            return res.status(500).json({message: "Internal Server Error"});
        }
    }
    else {
        return res.status(400).json({message: "Wrong request method"});
    }
}