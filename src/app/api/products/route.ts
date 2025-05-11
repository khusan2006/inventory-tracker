import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

// GET all products or filter by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true }
      });
      
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(product);
    }
    
    // Get all products with their categories
    const products = await prisma.product.findMany({
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
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.sku || !data.name || !data.categoryId || !data.sellingPrice) {
      return NextResponse.json(
        { error: 'Missing required fields (sku, name, categoryId, sellingPrice)' },
        { status: 400 }
      );
    }
    
    // Check if the category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId }
    });
    
    if (!categoryExists) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Check if SKU already exists
    const existingProduct = await prisma.product.findFirst({
      where: {
        sku: {
          equals: data.sku,
          mode: 'insensitive' // Case-insensitive match
        }
      }
    });
    
    if (existingProduct) {
      return NextResponse.json(
        { error: 'A product with this SKU already exists' },
        { status: 409 }
      );
    }
    
    // Create new product
    const newProduct = await prisma.product.create({
      data: {
        sku: data.sku,
        name: data.name,
        description: data.description || '',
        categoryId: data.categoryId,
        sellingPrice: parseFloat(data.sellingPrice),
        totalStock: parseInt(data.totalStock || '0'),
        minStockLevel: parseInt(data.minStockLevel || '0'),
        location: data.location || '',
        imageUrl: data.imageUrl || '',
        fitment: data.fitment || '',
        supplier: data.supplier || ''
      },
      include: { category: true }
    });
    
    console.log(`New product created: ${newProduct.name} (${newProduct.id}), SKU: ${newProduct.sku}`);
    
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
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    // Find the product
    const existingProduct = await prisma.product.findUnique({
      where: { id: data.id }
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // If SKU is being updated, check for duplicates
    if (data.sku && data.sku !== existingProduct.sku) {
      const productWithSameSku = await prisma.product.findFirst({
        where: {
          id: { not: data.id },
          sku: {
            equals: data.sku,
            mode: 'insensitive' // Case-insensitive match
          }
        }
      });
      
      if (productWithSameSku) {
        return NextResponse.json(
          { error: 'A product with this SKU already exists' },
          { status: 409 }
        );
      }
    }
    
    // If changing category, verify the category exists
    if (data.categoryId && data.categoryId !== existingProduct.categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: data.categoryId }
      });
      
      if (!categoryExists) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }
    }
    
    // Prepare update data (only defined fields will be updated)
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
    
    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: data.id },
      data: updateData,
      include: { category: true }
    });
    
    console.log(`Updated product: ${updatedProduct.name} (${updatedProduct.id})`);
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE a product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    // Check if product exists and if it has any batches
    const product = await prisma.product.findUnique({
      where: { id },
      include: { batches: true, sales: true }
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Check if there are any batches or sales associated with this product
    if (product.batches.length > 0 || product.sales.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete product with associated batches or sales' },
        { status: 400 }
      );
    }
    
    // Delete the product
    const deletedProduct = await prisma.product.delete({
      where: { id }
    });
    
    console.log(`Deleted product: ${deletedProduct.name} (${deletedProduct.id})`);
    
    return NextResponse.json({ success: true, deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
} 