import mongoose, { Model, Document } from "mongoose";

interface IUser extends Document {
    email: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
