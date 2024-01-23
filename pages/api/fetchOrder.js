import connectToDatabase from "@/utils/db";


export default async function handler(req, res) {

    if(req.method == 'POST'){
        try {
            const db = await connectToDatabase(process.env.MONGODB_URI);
            const orderCollection = db.collection('orders');
            const {distributorId} = req.body;

            const orders = await orderCollection.find({distributorId: distributorId}).toArray();
            return res.status(200).json({orders: orders});

        } catch (error) {
            console.log("Error during fetching order: ", error)
        }

    }

}