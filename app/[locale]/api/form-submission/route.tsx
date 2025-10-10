import { z } from "zod";
import { sendEmail } from "../../_actions/sendMail";
import { getContactFormSchema } from "@/zodSchemas/contact-form";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    // Validate the request body against the schema
    const validatedData = getContactFormSchema().safeParse(body);

    if (!validatedData.success) {
      return Response.json(validatedData.error, {
        status: 400,
      });
    }

    await sendEmail(validatedData.data);

    // Return a success response
    return Response.json({
      success: true,
      message: "Message submitted successfully!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return Response.json(
        { success: false, errors: error.errors },
        { status: 400 },
      );
    }

    // Return a generic error response
    return Response.json(
      { success: false, message: "An error occurred" },
      { status: 500 },
    );
  }
}
