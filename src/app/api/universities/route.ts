import { NextResponse } from 'next/server';
import { readDb, writeDb, checkAuth } from '@/lib/db';

export async function GET() {
  try {
    const db = readDb();
    return NextResponse.json(db.universities || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch universities' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, location, region, degreeCategory, accreditation, tuition, onsiteFrequency, majors, programs, logo } = body;
    
    if (!name || !location || !region || !degreeCategory || !accreditation || !tuition || !onsiteFrequency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = readDb();
    const newUniversity = {
      id: Date.now(),
      name,
      location,
      region,
      degreeCategory,
      accreditation,
      tuition,
      onsiteFrequency,
      majors: Array.isArray(majors) ? majors : (majors ? String(majors).split(',').map((s: string) => s.trim()).filter(Boolean) : []),
      programs: Array.isArray(programs) ? programs : (programs ? String(programs).split(',').map((s: string) => s.trim()).filter(Boolean) : []),
      logo: logo || '' // base64 logo string
    };

    db.universities = db.universities || [];
    db.universities.push(newUniversity);
    writeDb(db);

    return NextResponse.json(newUniversity, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create university' }, { status: 500 });
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
    db.universities = (db.universities || []).filter((u: any) => u.id !== Number(id));
    writeDb(db);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete university' }, { status: 500 });
  }
}
