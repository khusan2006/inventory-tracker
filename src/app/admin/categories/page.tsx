"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Tag,
  AlertCircle,
  Search,
  X
} from 'lucide-react';
import Header from '@/components/admin/Header';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  
  // Form states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#CBD5E1' // Default color
  });

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories when search text changes
  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredCategories(categories);
    } else {
      const lowercasedSearch = searchText.toLowerCase();
      const results = categories.filter(
        category => 
          category.name.toLowerCase().includes(lowercasedSearch) ||
          category.description.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredCategories(results);
    }
  }, [searchText, categories]);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/categories');
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      setCategories(data);
      setFilteredCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Could not load categories. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddCategory = async () => {
    try {
      setError(null);
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add category');
      }
      
      // Add the new category to the list
      setCategories([...categories, data]);
      
      // Reset form and close dialog
      setFormData({
        name: '',
        description: '',
        color: '#CBD5E1'
      });
      setIsAddDialogOpen(false);
    } catch (err: any) {
      console.error('Error adding category:', err);
      setError(err.message || 'Failed to add category');
    }
  };

  const handleEditCategory = async () => {
    if (!selectedCategory) return;
    
    try {
      setError(null);
      const response = await fetch('/api/categories', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedCategory.id,
          ...formData
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update category');
      }
      
      // Update the category in the list
      setCategories(categories.map(cat => 
        cat.id === selectedCategory.id ? data : cat
      ));
      
      // Reset form and close dialog
      setSelectedCategory(null);
      setFormData({
        name: '',
        description: '',
        color: '#CBD5E1'
      });
      setIsEditDialogOpen(false);
    } catch (err: any) {
      console.error('Error updating category:', err);
      setError(err.message || 'Failed to update category');
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    
    try {
      setError(null);
      const response = await fetch(`/api/categories?id=${selectedCategory.id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete category');
      }
      
      // Remove the category from the list
      setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
      
      // Reset selected category and close dialog
      setSelectedCategory(null);
      setIsDeleteDialogOpen(false);
    } catch (err: any) {
      console.error('Error deleting category:', err);
      setError(err.message || 'Failed to delete category');
    }
  };

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto bg-gray-50 dark:bg-slate-900">
        <div className="p-3 sm:p-6 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-6">
            <div className="flex items-center">
              <Tag className="mr-3 text-blue-600 dark:text-blue-400 p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg h-9 w-9" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Product Categories</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Manage your product categories
                </p>
              </div>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a new product category to organize your inventory.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Category name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Brief description of this category"
                      rows={3}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="color">Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="color"
                        name="color"
                        type="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error}
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCategory}>
                    Add Category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search bar */}
          <div className="mb-4 sm:mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 dark:border-slate-600 
                          text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-700
                          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              {searchText && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  onClick={() => setSearchText('')}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-3 text-gray-600 dark:text-gray-400">Loading categories...</p>
            </div>
          ) : error && categories.length === 0 ? (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-4 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          ) : (
            <>
              {/* Desktop table view */}
              <div className="hidden md:block bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
                {filteredCategories.length === 0 ? (
                  <div className="p-8 text-center">
                    <Tag size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 text-lg">No categories found</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      {searchText ? "Try a different search term" : "Create your first category to get started"}
                    </p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                    <thead className="bg-gray-50 dark:bg-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Color
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                      {filteredCategories.map(category => (
                        <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div 
                              className="h-6 w-6 rounded-md" 
                              style={{ backgroundColor: category.color }}
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {category.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-md truncate">
                            {category.description || 'No description'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(category.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEditDialog(category)}
                              className="mr-1"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openDeleteDialog(category)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Mobile card view */}
              <div className="md:hidden space-y-3">
                {filteredCategories.length === 0 ? (
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
                    <Tag size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 text-lg">No categories found</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      {searchText ? "Try a different search term" : "Create your first category to get started"}
                    </p>
                  </div>
                ) : (
                  filteredCategories.map(category => (
                    <div 
                      key={category.id} 
                      className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
                    >
                      <div 
                        className="h-2" 
                        style={{ backgroundColor: category.color }}
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate pr-2">{category.name}</h3>
                          <div 
                            className="h-4 w-4 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: category.color }}
                          />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                          {category.description || 'No description'}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(category.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex space-x-1">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEditDialog(category)}
                              className="px-2 h-8"
                            >
                              <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openDeleteDialog(category)}
                              className="px-2 h-8 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border-red-200 hover:border-red-300 dark:border-red-900 dark:hover:border-red-800"
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogDescription>
                  Update the details for this category.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Category name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of this category"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-color">Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="edit-color"
                      name="color"
                      type="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditCategory}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently delete the category &quot;{selectedCategory?.name}&quot;. 
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteCategory}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </>
  );
} 