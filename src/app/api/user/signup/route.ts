import constants from "@/constants";
import { IUser } from "@/interfaces";
import { User } from "@/models/User";
import { connectToDatabase } from "@/utils/mongo.utils";
import { NextResponse } from "next/server";

const { text } = constants;
const { authMsg } = text;
const { signupSuccessMsg, isUserMsg } = authMsg;

connectToDatabase();
export async function POST(req: Request) {
  try {
    const body: IUser = await req.json();
    const user = await User.findOne({ email: body.email });
    if (user) {
      return NextResponse.json({
        success: false,
        msg: isUserMsg,
      });
    } else {
      const newUser = new User(body);
      const user = await newUser.save();
      return NextResponse.json({ success: true, user, msg: signupSuccessMsg });
    }
  } catch (error) {
    return NextResponse.json("error", {
      status: 500,
    });
  }
}
