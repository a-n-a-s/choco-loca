import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const { message } = await request.json();

    const response = await await axios.post(`https://api.telegram.org/bot7762046637:AAFVXDzDYPELBYjxSxaYGidzg7nIpt5qILY/sendMessage`, {
      chat_id: 6197103835,
      text: message,
    });
    

    console.log(response.data)

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return NextResponse.json({
      success: true,
      message: response.data,
    });
  } catch (error) {
    console.error("WhatsApp API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.error?.message || error.message },
      { status: 500 }
    );
  }
}
