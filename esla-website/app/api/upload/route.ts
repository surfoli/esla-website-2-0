import { NextResponse } from 'next/server';
import { isAuthorized } from '@/lib/auth';
import { put } from '@vercel/blob';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const dir = String(formData.get('dir') || 'team-logos');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const originalName = file.name || 'upload.bin';
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `esla/${dir}/${Date.now()}-${safeName}`;

    const token = process.env.BLOB_READ_WRITE_TOKEN;

    const blob = await put(key, file, {
      access: 'public',
      token,
      contentType: file.type || 'application/octet-stream',
    });

    return NextResponse.json({ url: blob.url, pathname: blob.pathname });
  } catch (e) {
    console.error('Upload error:', e);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
