import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust if your authOptions are elsewhere

// GET all products or filter by ID
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
      const product = await prisma.product.findUnique({
        where: { id, companyId: userCompanyId }, // Scoped by companyId
        include: { category: true }
      });
      
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found for your company' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(product);
    }
    
    // Get all products for the company
    const products = await prisma.product.findMany({
      where: { companyId: userCompanyId }, // Scoped by companyId
      include: { category: true },
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST a new product
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const data = await request.json();
    
    if (!data.sku || !data.name || !data.categoryId || !data.sellingPrice) {
      return NextResponse.json(
        { error: 'Missing required fields (sku, name, categoryId, sellingPrice)' },
        { status: 400 }
      );
    }
    
    // Check if the category exists AND belongs to the user's company
    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId, companyId: userCompanyId } 
    });
    
    if (!categoryExists) {
      return NextResponse.json(
        { error: 'Category not found or does not belong to your company' },
        { status: 404 }
      );
    }
    
    // Check if SKU already exists for this company
    const existingProduct = await prisma.product.findFirst({
      where: {
        sku: {
          equals: data.sku,
          mode: 'insensitive'
        },
        companyId: userCompanyId // Scoped by companyId
      }
    });
    
    if (existingProduct) {
      return NextResponse.json(
        { error: 'A product with this SKU already exists in your company' },
        { status: 409 }
      );
    }
    
    const newProduct = await prisma.product.create({
      data: {
        ...data, // Spread existing data
        sellingPrice: parseFloat(data.sellingPrice),
        totalStock: parseInt(data.totalStock || '0'),
        minStockLevel: parseInt(data.minStockLevel || '0'),
        companyId: userCompanyId, // Assign companyId
        // Ensure all fields from schema are covered or have defaults
        description: data.description || '',
        location: data.location || '',
        imageUrl: data.imageUrl || '',
        fitment: data.fitment || '',
        supplier: data.supplier || ''
      },
      include: { category: true }
    });
    
    console.log(`New product created: ${newProduct.name} (${newProduct.id}), SKU: ${newProduct.sku} for company ${userCompanyId}`);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// PATCH to update a product
export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.companyId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userCompanyId = session.user.companyId;

  try {
    const data = await request.json();
    if (!data.id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    
    // Find the product within the user's company
    const existingProduct = await prisma.product.findUnique({
      where: { id: data.id, companyId: userCompanyId } // Scoped by companyId
    });
    
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found for your company' }, { status: 404 });
    }
    
    if (data.sku && data.sku !== existingProduct.sku) {
      const productWithSameSku = await prisma.product.findFirst({
        where: {
          id: { not: data.id },
          sku: { equals: data.sku, mode: 'insensitive' },
          companyId: userCompanyId // Scoped by companyId
        }
      });
      
      if (productWithSameSku) {
        return NextResponse.json({ error: 'A product with this SKU already exists in your company' }, { status: 409 });
      }
    }
    
    if (data.categoryId && data.categoryId !== existingProduct.categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: data.categoryId, companyId: userCompanyId } // Scoped by companyId
      });
      
      if (!categoryExists) {
        return NextResponse.json({ error: 'Category not found or does not belong to your company' }, { status: 404 });
      }
    }
    
    const updateData: any = {};
    if (data.sku !== undefined) updateData.sku = data.sku;
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
    if (data.sellingPrice !== undefined) updateData.sellingPrice = parseFloat(data.sellingPrice);
    if (data.totalStock !== undefined) updateData.totalStock = parseInt(data.totalStock);
    if (data.minStockLevel !== undefined) updateData.minStockLevel = parseInt(data.minStockLevel);
    if (data.location !== undefined) updateData.location = data.location;
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.fitment !== undefined) updateData.fitment = data.fitment;
    if (data.supplier !== undefined) updateData.supplier = data.supplier;
    
    // companyId should not be changed via this PATCH

    const updatedProduct = await prisma.product.update({
      where: { id: data.id, companyId: userCompanyId }, // Ensure update is scoped
      data: updateData,
      include: { category: true }
    });
    
    console.log(`Updated product: ${updatedProduct.name} (${updatedProduct.id}) for company ${userCompanyId}`);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE a product
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
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    
    const product = await prisma.product.findUnique({
      where: { id, companyId: userCompanyId }, // Scoped by companyId
      include: { batches: true, sales: true }
    });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found for your company' }, { status: 404 });
    }
    
    if (product.batches.length > 0 || product.sales.length > 0) {
      return NextResponse.json({ error: 'Cannot delete product with associated batches or sales' }, { status: 400 });
    }
    
    const deletedProduct = await prisma.product.delete({
      where: { id, companyId: userCompanyId } // Ensure delete is scoped
    });
    
    console.log(`Deleted product: ${deletedProduct.name} (${deletedProduct.id}) for company ${userCompanyId}`);
    return NextResponse.json({ success: true, deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
} 