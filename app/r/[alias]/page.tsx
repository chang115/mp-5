import { getDb } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    alias: string;
  };
}

export default async function RedirectAlias({ params }: PageProps) {
  const db = await getDb();
  const link = await db.collection("urls").findOne({ alias: params.alias });

  if (!link) {
    notFound(); // Shows 404 if alias is not found
  }

  redirect(link.url); // Redirect to the original URL
}
