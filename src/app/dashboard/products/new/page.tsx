"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import PageHeader from '@/components/ui/PageHeader';
import { 
  Package,
  Save,
  X,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    categoryId: '',
    description: '',
    sellingPrice: '',
    minStockLevel: '',
    location: '',
    fitment: '',
    imageUrl: '',
    supplier: ''
  });

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error(t('inventory.fetchCategoriesError'));
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        // Don't set error state as categories are optional
      }
    };

    fetchCategories();
  }, [t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validation
      if (!formData.name || !formData.sku || !formData.categoryId || !formData.sellingPrice) {
        throw new Error(t('inventory.requiredFieldsValidation'));
      }

      // Parse numeric values
      const productData = {
        ...formData,
        sellingPrice: parseFloat(formData.sellingPrice),
        minStockLevel: formData.minStockLevel ? parseInt(formData.minStockLevel) : 0,
        totalStock: 0 // New products start with 0 stock
      };

      // Submit to API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('inventory.createProductError'));
      }

      // Redirect to the product list page
      router.push('/dashboard/products');
    } catch (error: unknown) {
      console.error('Error creating product:', error);
      setError(error instanceof Error ? error.message : t('inventory.unexpectedError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title={t('inventory.addNewProductTitle')} 
        description={t('inventory.addNewProductDescription')} 
        icon={<Package className="h-6 w-6" />}
      />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">{error}</p>
              {error.includes(t('inventory.requiredFieldsValidation')) && (
                <p className="text-sm mt-1">
                  {t('inventory.requiredFieldsHelp')}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              {t('inventory.productNameRequired')}
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t('inventory.productNamePlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku" className="text-base">
              {t('inventory.skuRequired')}
            </Label>
            <Input
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              placeholder={t('inventory.skuPlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId" className="text-base">
              {t('inventory.categoryRequired')}
            </Label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-800 dark:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              required
            >
              <option value="">{t('inventory.selectCategory')}</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sellingPrice" className="text-base">
              {t('inventory.sellingPriceRequired')}
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                $
              </span>
              <Input
                id="sellingPrice"
                name="sellingPrice"
                type="number"
                min="0.01"
                step="0.01"
                value={formData.sellingPrice}
                onChange={handleInputChange}
                className="pl-7"
                placeholder={t('inventory.sellingPricePlaceholder')}
                required
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="description" className="text-base">
              {t('inventory.description')}
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={t('inventory.descriptionPlaceholder')}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier" className="text-base">
              {t('inventory.defaultSupplier')}
            </Label>
            <Input
              id="supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleInputChange}
              placeholder={t('inventory.defaultSupplierPlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minStockLevel" className="text-base">
              {t('inventory.minimumStockLevel')}
            </Label>
            <Input
              id="minStockLevel"
              name="minStockLevel"
              type="number"
              min="0"
              value={formData.minStockLevel}
              onChange={handleInputChange}
              placeholder={t('inventory.minimumStockLevelPlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-base">
              {t('inventory.storageLocationLabel')}
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder={t('inventory.storageLocationPlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fitment" className="text-base">
              {t('inventory.vehicleFitment')}
            </Label>
            <Input
              id="fitment"
              name="fitment"
              value={formData.fitment}
              onChange={handleInputChange}
              placeholder={t('inventory.vehicleFitmentPlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-base">
              {t('inventory.imageUrl')}
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder={t('inventory.imageUrlPlaceholder')}
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button 
            type="button" 
            onClick={() => router.back()} 
            variant="outline"
            className="flex items-center"
          >
            <X className="mr-2 h-4 w-4" />
            {t('common.cancel')}
          </Button>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                {t('common.saving')}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {t('inventory.saveProduct')}
              </>
            )}
          </Button>
        </div>
        
        {/* Debug section - only visible in development environment */}
        {process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_SHOW_DEBUG === 'true' && (
          <div className="mt-8 p-4 border border-gray-300 rounded-md bg-gray-50 text-xs">
            <h4 className="font-semibold mb-2">Debug Info:</h4>
            <p><strong>Required fields:</strong> name, sku, categoryId, sellingPrice</p>
            <p><strong>Form Data:</strong></p>
            <pre className="mt-2 overflow-auto max-h-40">
              {JSON.stringify(
                {
                  name: formData.name,
                  sku: formData.sku,
                  categoryId: formData.categoryId,
                  sellingPrice: formData.sellingPrice
                }, 
                null, 2
              )}
            </pre>
          </div>
        )}
      </form>
    </div>
  );
} 