import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    bus: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

// mongoose.models.Nextcart || mongoose.model('Nextcart', NextcartSchema);
const BusBookingModel=mongoose.models.Bookings || mongoose.model("Bookings",BusSchema);

export default BusBookingModel;