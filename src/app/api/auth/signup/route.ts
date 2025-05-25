import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, companyName } = await req.json();

    if (!email || !password || !name || !companyName) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format (basic)
    if (!/\S+@\S+\.\S+/.test(email)) {
        return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    // Validate password strength (basic example: at least 6 characters)
    if (password.length < 6) {
        return NextResponse.json({ message: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    // Check if company already exists
    const existingCompany = await prisma.company.findUnique({
      where: { name: companyName },
    });
    if (existingCompany) {
      return NextResponse.json({ message: 'Company name already taken' }, { status: 409 }); // 409 Conflict
    }

    // Check if user (email) already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create the company first
    const newCompany = await prisma.company.create({
      data: {
        name: companyName,
      },
    });

    // Then create the user, linking to the new company
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        companyId: newCompany.id,
      },
    });

    // Don't return the password hash in the response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({ 
        message: 'User registered successfully', 
        user: userWithoutPassword, 
        company: newCompany 
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    // Check for specific Prisma errors if needed, e.g., P2002 for unique constraint violation
    // if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') { ... }
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 });
  }
} 