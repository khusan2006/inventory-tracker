import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust if your authOptions are elsewhere

// GET all categories or a specific category by ID
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      const category = await prisma.category.findUnique({
        where: { id, companyId: userCompanyId } // Scoped by companyId
      });
      
      if (!category) {
        return NextResponse.json(
          { error: 'Category not found for your company' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(category);
    }
    
    // Get all categories for the company
    const categories = await prisma.category.findMany({
      where: { companyId: userCompanyId }, // Scoped by companyId
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST a new category
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const data = await request.json();
    
    if (!data.name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }
    
    // Check if category with same name already exists for this company
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: 'insensitive'
        },
        companyId: userCompanyId // Scoped by companyId
      }
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { error: 'A category with this name already exists in your company' },
        { status: 409 }
      );
    }
    
    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description || '',
        color: data.color || '#CBD5E1',
        companyId: userCompanyId // Assign companyId
      }
    });
    
    console.log(`New category created: ${newCategory.name} (${newCategory.id}) for company ${userCompanyId}`);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// PATCH (update) a category
export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const data = await request.json();
    
    if (!data.id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    // Check if category exists for this company
    const existingCategory = await prisma.category.findUnique({
      where: { id: data.id, companyId: userCompanyId } // Scoped by companyId
    });
    
    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Category not found for your company' },
        { status: 404 }
      );
    }
    
    if (data.name && data.name !== existingCategory.name) {
      const categoryWithSameName = await prisma.category.findFirst({
        where: {
          id: { not: data.id },
          name: {
            equals: data.name,
            mode: 'insensitive'
          },
          companyId: userCompanyId // Scoped by companyId
        }
      });
      
      if (categoryWithSameName) {
        return NextResponse.json(
          { error: 'A category with this name already exists in your company' },
          { status: 409 }
        );
      }
    }
    
    const updatedCategory = await prisma.category.update({
      where: { id: data.id, companyId: userCompanyId }, // Ensure update is scoped
      data: {
        name: data.name !== undefined ? data.name : undefined,
        description: data.description !== undefined ? data.description : undefined,
        color: data.color !== undefined ? data.color : undefined
        // companyId should not be changed here
      }
    });
    
    console.log(`Category updated: ${updatedCategory.name} (${updatedCategory.id}) for company ${userCompanyId}`);
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE a category
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    // Check if category exists for this company and if it has products
    const category = await prisma.category.findUnique({
      where: { id, companyId: userCompanyId }, // Scoped by companyId
      include: { products: true } // We need to check products from THIS company
    });
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found for your company' },
        { status: 404 }
      );
    }
    
    // The products included will already be filtered by categoryId, 
    // but for strictness, ensure these products also belong to the same companyId if needed.
    // However, since a category belongs to a company, its products should too.
    if (category.products.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category with associated products' },
        { status: 400 }
      );
    }
    
    const deletedCategory = await prisma.category.delete({
      where: { id, companyId: userCompanyId } // Ensure delete is scoped
    });
    
    console.log(`Category deleted: ${deletedCategory.name} (${deletedCategory.id}) for company ${userCompanyId}`);
    return NextResponse.json({ success: true, deletedCategory });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
} 