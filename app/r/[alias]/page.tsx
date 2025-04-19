/* eslint-disable @typescript-eslint/no-unused-vars */

import { getDb } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { alias: string } }): Promise<Metadata> => {
  return {
    title: `Redirecting...`,
  };
};

export default async function RedirectAlias({ params }: { params: { alias: string } }) {
  const db = await getDb();
  const link = await db.collection("urls").findOne({ alias: params.alias });

  if (!link) {
    notFound(); // Automatically triggers the 404 error page if alias is not found
  }

  // Perform the redirect to the original URL stored in the database
  redirect(link.url);
}
