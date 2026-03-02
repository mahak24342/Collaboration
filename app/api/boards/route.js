import Boards from "@/models/Boards";
import mongodb from "@/lib/mongodb";

export async function GET() {
  try {
    await mongodb();
    const boards = await Boards.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(boards), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await mongodb();
    const data = await req.json();
    const board = await Boards.create({
      title: data.title,
      owner: data.owner,
      blocks: [],
    });
    return new Response(JSON.stringify(board), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}