import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// This endpoint is temporarily disabled until the Supplier model is added to the schema
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: false,
    message: 'Migration temporarily disabled. Please run Prisma migrations first to add the Supplier model.'
  }, { status: 503 });
} 