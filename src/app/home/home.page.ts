import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Tasks } from '../models/tasks.model';

import { RemoteConfig } from '@angular/fire/remote-config';
import { fetchAndActivate, getValue } from 'firebase/remote-config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  tasks: Tasks[] = [];
  categories: Category[] = [];
  selectedCategoryId: string = '';
  newTaskTitle: string = '';
  newCategoryName: string = '';
  categoriesEnabled: boolean = true;
  editingTaskId: string | null = null;
  editedTaskTitle: string = '';
  editingCategoryId: string | null = null;
  editedCategoryName: string = '';


  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private remoteConfig: RemoteConfig
  ) {}

  async ionViewWillEnter() {
    await this.loadFeatureFlag();
    if (this.categoriesEnabled) {
      this.loadCategories();
    }
    this.loadTasks();
  }

async loadFeatureFlag() {
  try {
    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 3600000,
      fetchTimeoutMillis: 60000, // 1 minute timeout, adjust as needed
    };
    await fetchAndActivate(this.remoteConfig);
    const value = getValue(this.remoteConfig, 'enable_categories').asBoolean();
    console.log('enable_categories from remote config:', value);
    this.categoriesEnabled = value;
  } catch (error) {
    console.error('Remote Config error:', error);
    this.categoriesEnabled = false; // fallback
  }
}


  loadCategories() {
    this.categories = this.categoryService.getCategories();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks(this.selectedCategoryId);
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    this.taskService.addTask(this.newTaskTitle, this.selectedCategoryId || undefined);
    this.newTaskTitle = '';
    this.loadTasks();
  }

  toggleTask(id: string) {
    this.taskService.toggleTask(id);
    this.loadTasks();
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  addCategory() {
    if (!this.newCategoryName.trim()) return;
    this.categoryService.addCategory(this.newCategoryName);
    this.newCategoryName = '';
    this.loadCategories();
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id);
    if (this.selectedCategoryId === id) {
      this.selectedCategoryId = '';
    }
    this.loadCategories();
    this.loadTasks();
  }

  onCategoryChange() {
    this.loadTasks();
  }

editTask(task: any) {
  this.editingTaskId = task.id;
  this.editedTaskTitle = task.title;
  this.taskService.updateTask(task);
}

saveTaskEdit(task: any) {
  task.title = this.editedTaskTitle;
  this.editingTaskId = null;
}

cancelTaskEdit() {
  this.editingTaskId = null;
}

editCategory(cat: any) {
  this.editingCategoryId = cat.id;
  this.editedCategoryName = cat.name;
  this.categoryService.updateCategory(cat);
}

saveCategoryEdit(cat: any) {
  cat.name = this.editedCategoryName;
  this.editingCategoryId = null;
}

cancelCategoryEdit() {
  this.editingCategoryId = null;
}

}
