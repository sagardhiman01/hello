import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { requireAdmin } from '@/lib/auth';

export async function POST(req) {
  try {
    // 1. Verify admin authentication
    await requireAdmin(req);

    // 2. Parse the request form data
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // 3. Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.' }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ success: false, error: 'File size exceeds 5MB limit.' }, { status: 400 });
    }

    // 4. Create names and paths
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, filename);

    // 5. Ensure directory exists and write file
    await mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: filename
    });
  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to upload image' 
    }, { status: 500 });
  }
}
