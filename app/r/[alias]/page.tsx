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
    notFound(); // shows 404 page
  }

  redirect(link.url); // redirects to original URL
}
