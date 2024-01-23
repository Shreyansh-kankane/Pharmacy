import connectToDatabase from "@/utils/db";


export default async function handler(req, res) {

    //place order
    if (req.method === 'POST') {
        const {cart,client} = req.body;
        try {
            const db = await connectToDatabase(process.env.MONGODB_URI);
            const orderCollection = db.collection('orders');
            
            const orders = [];
            const order = {}
 
            cart.items.map((item)=>{
                const distributorId = item.distributorId;
                let index = order[distributorId];
                if(index != undefined){
                    orders[index].medicines.push(item);
                }else {
                    order[distributorId] = orders.length;
                    orders.push({
                        distributorId: distributorId,
                        medicines: [item],
                        client: client
                    })
                }
            })

            const medicineCollection = db.collection('medicine_stock');

            //update medicine stock
            cart.items.map(async (item)=>{
                const medicine = await medicineCollection.findOne({batchNo: item.batchNo});
                const result = await medicineCollection.findOneAndUpdate(
                    { batchNo: item.batchNo },
                    { $set: {quantity: medicine.quantity - item.buy} },
                    { returnDocument: 'after' }
                );
            })

            const result = await orderCollection.insertMany(orders);
            return res.status(200).json({success: true,message: "Order placed successfully"});

        } catch (error) {
            console.error("error fetching medicine",error);
        }
        
    }
}




