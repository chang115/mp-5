import { getDb } from "@/lib/db";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    alias: string;
  };
}

export default async function RedirectAlias({ params }: Props) {
  const db = await getDb();
  const link = await db.collection("urls").findOne({ alias: params.alias });

  if (!link) {
    notFound(); 
  }

  redirect(link.url); 
}
