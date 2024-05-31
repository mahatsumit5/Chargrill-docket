import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  userName: { type: String, required: false, default: "" },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
});

const user = models.User || model("User", userSchema);
export default user;
