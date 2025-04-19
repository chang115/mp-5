import { getDb } from "@/lib/db";
import { redirect, notFound } from "next/navigation";

// No need for a custom interface or PageProps import
export default async function Page({ params }: { params: { alias: string } }) {
  const db = await getDb();
  const link = await db.collection("urls").findOne({ alias: params.alias });

  if (!link) {
    notFound(); // Show 404 page if alias doesn't exist
  }

  redirect(link.url); // Redirect to original URL
}
