import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { body, isValidSignature } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_WEBHOOK_SECRET
    );

    if (isValidSignature === false) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Bad body' }, { status: 400 });
    }

    revalidateTag('home', 'max');
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error(err);
    return new NextResponse('Error processing webhook', { status: 500 });
  }
}
