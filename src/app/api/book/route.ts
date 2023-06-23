import constants from "@/constants";
import { IBook } from "@/interfaces";
import { Book } from "@/models/Book";
import { connectToDatabase } from "@/utils/mongo.utils";
import { NextResponse } from "next/server";

const { text } = constants;
const { addSuccessMsg, addFailedMsg, removeSuccessMsg, removeFailedsMsg } =
  text;
connectToDatabase();

export async function GET() {
  try {
    const books = await Book.find();
    return NextResponse.json({ success: true, books });
  } catch {
    return NextResponse.json("error", {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body: IBook = await req.json();
    const newPost = new Book(body);
    await newPost.save();
    const books = await Book.find();
    return NextResponse.json({ success: true, msg: addSuccessMsg, books });
  } catch {
    return NextResponse.json({
      success: false,
      msg: addFailedMsg,
    });
  }
}

export async function DELETE(req: Request) {
  const query = new URL(req.url).searchParams;
  const bookId = query.get("bookId");
  const userId = query.get("userId");
  try {
    await Book.findOneAndDelete({ id: bookId, userId });
    const books = await Book.find();
    return NextResponse.json({ success: true, msg: removeSuccessMsg, books });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      msg: removeFailedsMsg,
    });
  }
}
