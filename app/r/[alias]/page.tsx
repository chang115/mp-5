import { getDb } from "@/lib/db";
import { redirect, notFound } from "next/navigation";

export default async function RedirectAlias({ params }: { params: { alias: string } }) {
  const db = await getDb();
  const link = await db.collection("urls").findOne({ alias: params.alias });

  if (!link) {
    notFound();
  }

  redirect(link.url); // This will redirect properly
}
