import { NextResponse } from 'next/server';
import { readDb, writeDb, checkAuth } from '@/lib/db';

export async function GET() {
  try {
    const db = readDb();
    return NextResponse.json(db.reviews || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { quote, name, univ, avatar } = await request.json();
    
    if (!quote || !name || !univ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = readDb();
    const newReview = {
      id: Date.now(),
      quote,
      name,
      univ,
      avatar: avatar || name.substring(0, 2).toUpperCase()
    };

    db.reviews = db.reviews || [];
    db.reviews.push(newReview);
    writeDb(db);

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 });
    }

    const db = readDb();
    db.reviews = (db.reviews || []).filter((r: any) => r.id !== Number(id));
    writeDb(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
