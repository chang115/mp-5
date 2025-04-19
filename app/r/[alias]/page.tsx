import { getDb } from "@/lib/db";
import { redirect, notFound } from "next/navigation";

export default async function RedirectAlias({ params }: any) {
  const db = await getDb();
  const link = await db.collection("urls").findOne({ alias: params.alias });

  if (!link) {
    notFound();
  }

  redirect(link.url);
}
