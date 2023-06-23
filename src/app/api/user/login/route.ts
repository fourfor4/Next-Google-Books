import constants from "@/constants";
import { IUser } from "@/interfaces";
import { User } from "@/models/User";
import { connectToDatabase } from "@/utils/mongo.utils";
import { NextResponse } from "next/server";

const { text } = constants;
const { authMsg } = text;
const { loginSuccessMsg, incorrectPWDMsg, noUserMsg } = authMsg;

connectToDatabase();
export async function POST(req: Request) {
  try {
    const body: IUser = await req.json();
    const user = await User.findOne({ email: body.email });
    if (user) {
      if (user.password === body.password)
        return NextResponse.json({ success: true, user, msg: loginSuccessMsg });
      else
        return NextResponse.json({
          success: false,
          msg: incorrectPWDMsg,
        });
    } else {
      return NextResponse.json({
        success: false,
        msg: noUserMsg,
      });
    }
  } catch (error) {
    return NextResponse.json("error", {
      status: 500,
    });
  }
}
