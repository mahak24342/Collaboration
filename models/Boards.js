// models/Board.js
import mongoose from "mongoose";

// Each block can have content and an assignee
const BlockSchema = new mongoose.Schema({
  id: { type: String, required: true },      // unique block id
  content: { type: String, default: "" },    // text content
  assignee: { type: String, default: "" },   // user assigned to this block
});

const BoardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    owner: { type: String, default: "demo-user" },
    blocks: { type: [BlockSchema], default: [] }, // array of blocks
  },
  { timestamps: true }
);

// Export the model, singular "Board"
export default mongoose.models.Board || mongoose.model("Board", BoardSchema);