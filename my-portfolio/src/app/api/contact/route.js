import { NextResponse } from "next/server";
import { Resend } from "resend";


export async function POST (request){
  const { name, email, message } = await request.json();
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Fill up the all field" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if(!apiKey){
    return NextResponse.json(
      {error: "Missing API Key"},
      {Status:500}
    );
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.MY_GMAIL,
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>নাম:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
            
            `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Can't sent Email" }, { status: 500 });
  }
};
