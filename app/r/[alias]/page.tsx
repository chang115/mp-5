import { getDb } from "@/lib/db";
import { notFound } from "next/navigation";
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
    notFound();
  }

  return (
    <meta httpEquiv="refresh" content={`0; url=${link.url}`} />
  );
}
