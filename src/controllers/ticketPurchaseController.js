import ticketPurchaseModel from "../models/ticketPurchase.js"

const ticketPurchaseController = {};

ticketPurchaseController.getAllPurchases = async (req, res) =>{
    try {
        const purchases = await ticketPurchaseModel
            .find()
            .populate("customerId", "name email");
            return res.status(200).json(purchases);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

ticketPurchaseController.createPurchase = async (req, res) =>{
    try {
        const {customerId, quantity, purchaseDate, total, paymentStatus, transactionId} = req.body;
        const newPurchase = new ticketPurchaseModel({customerId, quantity, purchaseDate, total, paymentStatus, transactionId});
        await newPurchase.save();
        return res.status(200).json({message: "Purchase succesful"});
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }

};

ticketPurchaseController.updatePurchase = async (req, res) =>{
    try {
        const {customerId, quantity, purchaseDate, total, paymentStatus, transactionId} = req.body;
        const updatedPurchase = await ticketPurchaseModel.findByIdAndValidate(
            req.params.id,
            {customerId, quantity, purchaseDate, total, paymentStatus, transactionId},
            {new: true},
        );

        return res.status(200).json({message: "Purchase updated succesfuly"});
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

ticketPurchaseController.deletePurchase = async (req, res) =>{
    try {
        await ticketPurchaseModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Purchase deleted succesfuly"});
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export default ticketPurchaseController;