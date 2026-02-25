import Boards from "@/models/Boards";
import mongodb from "@/lib/mongodb";

export async function GET() {
  try {
    await mongodb();

    const boards = await Boards.find().sort({ createdAt: -1 });

    return Response.json(boards);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await mongodb();

    const data = await req.json();

    const board = await Boards.create({
      title: data.title,
      owner: data.owner,
    });

    return Response.json(board);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}