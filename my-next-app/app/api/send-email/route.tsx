import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "jos50275266@gmail.com",
    subject: "Hello World",
    react: <WelcomeTemplate name="yongsu" />,
  });

    return NextResponse.json({});
}
