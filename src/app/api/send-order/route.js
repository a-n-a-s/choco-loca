import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(request) {
  try {
    const { message } = await request.json();

    const twilioMessage = await client.messages.create({
      body: message,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919347368822",
    });
    // 722971373536802

    return NextResponse.json({
      success: true,
      message: twilioMessage.body,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
