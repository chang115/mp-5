import { getDb } from "@/lib/db";
import { redirect, notFound } from "next/navigation";

type Props = {
  params: {
    alias: string;
  };
};

export default async function RedirectPage({ params }: Props) {
  const db = await getDb();
  const link = await db.collection("urls").findOne({ alias: params.alias });

  if (!link) {
    notFound();
  }

  redirect(link.url);
}
