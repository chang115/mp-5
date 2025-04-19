// app/r/[alias]/page.tsx

import { getDb } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

// Generate metadata for the page (optional)
export const generateMetadata = async ({ params }: { params: { alias: string } }): Promise<Metadata> => {
  return {
    title: `Redirecting...`,
  };
};

// Main redirect function
export default async function RedirectAlias({ params }: { params: { alias: string } }) {
  const db = await getDb();
  
  // Fetch the link from the database based on the alias
  const link = await db.collection("urls").findOne({ alias: params.alias });

  // If no link is found, trigger the 404 page
  if (!link) {
    notFound(); // Triggers the built-in 404 page
  }

  // Redirect to the original URL stored in the database
  redirect(link.url); // Redirect the user to the URL
}
