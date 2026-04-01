import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const cwd = process.cwd();
  const dirName = __dirname;
  
  const possiblePaths = [
    path.join(cwd, 'prisma', 'dev.db'),
    path.join(cwd, 'dev.db'),
    path.join(cwd, '..', 'prisma', 'dev.db'),
    '/home/customer/www/theaurika.in/public_html/prisma/dev.db', // Common Hostinger path format
  ];

  const results = possiblePaths.map(p => ({
    path: p,
    exists: fs.existsSync(p)
  }));

  return NextResponse.json({
    cwd,
    dirName,
    results,
    env: process.env.NODE_ENV
  });
}
