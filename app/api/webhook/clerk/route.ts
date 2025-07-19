import { createUser, updateUser } from "@/database/actions/user.action";
import { CreateUserParams } from "@/types";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { object, id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    if (eventType === "user.created") {
      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = evt.data;
      const { result, error } = await createUser({
        clerkId: id,
        email: email_addresses[0].email_address,
        userName: username!,
        firstName: first_name as string,
        lastName: last_name as string,
        photo: image_url,
      });

      if (error) {
        throw new Error(error);
      } else {
        return NextResponse.json({ message: "OK", user: result });
      }
    }
    if (eventType === "user.updated") {
      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = evt.data;
      const { error, result } = await updateUser(id, {
        email: email_addresses[0].email_address,
        firstName: first_name as string,
        lastName: last_name as string,
        photo: image_url,
        userName: username!,
      });
      if (error) {
        throw new Error(error);
      } else {
        return NextResponse.json({ message: "OK", user: result });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
