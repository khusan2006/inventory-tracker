import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

// GET all categories or a specific category by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      const category = await prisma.category.findUnique({
        where: { id }
      });
      
      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(category);
    }
    
    const categories = await prisma.category.findMany({
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
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }
    
    // Check if category with same name already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: 'insensitive' // Case-insensitive search
        }
      }
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { error: 'A category with this name already exists' },
        { status: 409 }
      );
    }
    
    // Create new category
    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        description: data.description || '',
        color: data.color || '#CBD5E1' // Default color (Tailwind slate-300)
      }
    });
    
    console.log(`New category created: ${newCategory.name} (${newCategory.id})`);
    
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
  try {
    const data = await request.json();
    
    if (!data.id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: data.id }
    });
    
    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // If name is being updated, check for duplicates
    if (data.name && data.name !== existingCategory.name) {
      const categoryWithSameName = await prisma.category.findFirst({
        where: {
          id: { not: data.id },
          name: {
            equals: data.name,
            mode: 'insensitive' // Case-insensitive search
          }
        }
      });
      
      if (categoryWithSameName) {
        return NextResponse.json(
          { error: 'A category with this name already exists' },
          { status: 409 }
        );
      }
    }
    
    // Update the category
    const updatedCategory = await prisma.category.update({
      where: { id: data.id },
      data: {
        name: data.name !== undefined ? data.name : undefined,
        description: data.description !== undefined ? data.description : undefined,
        color: data.color !== undefined ? data.color : undefined
      }
    });
    
    console.log(`Category updated: ${updatedCategory.name} (${updatedCategory.id})`);
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
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true }
    });
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Check if there are products using this category
    if (category.products.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category with associated products' },
        { status: 400 }
      );
    }
    
    // Delete the category
    const deletedCategory = await prisma.category.delete({
      where: { id }
    });
    
    console.log(`Category deleted: ${deletedCategory.name} (${deletedCategory.id})`);
    return NextResponse.json({ success: true, deletedCategory });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
} 