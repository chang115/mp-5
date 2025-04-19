import { getDb } from "@/lib/db";
import { notFound } from "next/navigation";

type Props = {
  params: {
    alias: string;
  };
};

export default async function RedirectAlias({ params }: Props) {
  const db = await getDb();
  const link = await db.collection("urls").findOne({ alias: params.alias });

  if (!link) {
    notFound();
  }

  return (
    <meta httpEquiv="refresh" content={`0; url=${link.url}`} />
  );
}
