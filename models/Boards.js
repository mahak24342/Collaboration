// models/Board.js
import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema({
  id: String,       // unique block id (optional, MongoDB provides _id)
  content: String,  // text content of the block
});

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: String,
  blocks: { type: [BlockSchema], default: [] },
}, { timestamps: true });

// Use singular "Board" for the model name
export default mongoose.models.Board || mongoose.model("Board", BoardSchema);