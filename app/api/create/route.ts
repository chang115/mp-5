import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { isValidUrl } from '@/lib/validateUrl';

export async function POST(req: Request) {
  const { url, alias } = await req.json();
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    return NextResponse.json({ message: 'BASE_URL is not defined' }, { status: 500 });
  }

  try {

    if (!isValidUrl(url)) {
      return NextResponse.json({ message: 'Invalid URL' }, { status: 400 });
    }

    const db = await getDb();
    const existing = await db.collection('urls').findOne({ alias });

    if (existing) {
      return NextResponse.json({ message: 'Alias already taken' }, { status: 409 });
    }


    await db.collection('urls').insertOne({ url, alias });

    return NextResponse.json({
      alias,
      shortUrl: `${baseUrl}/r/${alias}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
