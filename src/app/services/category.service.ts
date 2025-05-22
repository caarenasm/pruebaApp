import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [];

  constructor() {
    const saved = localStorage.getItem('categories');
    if (saved) {
      this.categories = JSON.parse(saved);
    }
  }

  getCategories(): Category[] {
    return this.categories;
  }

  addCategory(name: string): void {
    const newCategory: Category = { id: Date.now().toString(), name, isEditing: false };
    this.categories.push(newCategory);
    this.save();
  }

  deleteCategory(id: string): void {
    this.categories = this.categories.filter(c => c.id !== id);
    this.save();
  }

  private save(): void {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  updateCategory(category: Category): void {
    const task = this.categories.find(t => t.id === category.id);
    
    if (task) {
      task.name = category.name;
      
      this.save();
    }
  }
  
}
