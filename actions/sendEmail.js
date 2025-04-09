"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData) => {
    const senderEmail = formData.get("email");
    const name = formData.get("name");
    const phone = formData.get("phone number");
    const message = formData.get("project details");

    // Simple validation
    if (!senderEmail || !name || !message) {
        return {
            error: "Please fill in all required fields.",
        };
    }

    if (!isValidEmail(senderEmail)) {
        return {
            error: "Please provide a valid email address.",
        };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: "myrskyi.work@gmail.com",
            subject: `Contact form submission from ${name}`,
            replyTo: senderEmail,
            text: `
        Name: ${name}
        Email: ${senderEmail}
        Phone: ${phone || "Not provided"}
        
        Message:
        ${message}
      `,
        });

        if (error) {
            return { error: error.message };
        }

        return { data };
    } catch (error) {
        return { error: "Failed to send email." };
    }
};

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}