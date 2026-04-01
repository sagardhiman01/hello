import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import prisma from '@/lib/prisma';

export async function GET() {
  const cwd = process.cwd();
  
  const results = [
    {
      path: path.join(cwd, 'prisma', 'dev.db'),
      exists: fs.existsSync(path.join(cwd, 'prisma', 'dev.db'))
    }
  ];

  let prismaTest = "Not attempted";
  try {
    const userCount = await prisma.user.count();
    prismaTest = `Success: ${userCount} users found`;
  } catch (e) {
    prismaTest = `Error: ${e.message}`;
  }

  return NextResponse.json({
    cwd,
    results,
    prismaTest,
    env: process.env.NODE_ENV
  });
}
