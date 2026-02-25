import Boards from "@/models/Boards";
import mongodb from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    await mongodb();

    // Unwrap params correctly
    const { id } = await context.params;

    const board = await Boards.findById(id);

    if (!board) {
      return NextResponse.json({ message: "Board not found" }, { status: 404 });
    }

    return NextResponse.json(board);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    await mongodb();

    const { id } = await context.params;
    const { title, blocks } = await req.json();

    const board = await Boards.findById(id);
    if (!board) {
      return NextResponse.json({ message: "Board not found" }, { status: 404 });
    }

    if (title !== undefined) board.title = title;
    if (blocks !== undefined) board.blocks = blocks;

    await board.save();

    return NextResponse.json(board);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    await mongodb();

    const { id } = await context.params;

    const deleted = await Boards.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Board not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}