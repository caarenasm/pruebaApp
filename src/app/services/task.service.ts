import { Injectable } from '@angular/core';
import { Tasks } from '../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Tasks[] = [];

  constructor() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasks = JSON.parse(saved);
    }
  }

  getTasks(categoryId?: string): Tasks[] {
    return categoryId
      ? this.tasks.filter(t => t.categoryId === categoryId)
      : this.tasks;
  }

  addTask(title: string, categoryId?: string): void {
    const newTask: Tasks = {
      id: Date.now().toString(),
      title,
      completed: false,
      categoryId,
    };
    this.tasks.push(newTask);
    this.save();
  }

  toggleTask(id: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.save();
    }
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  private save(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  updateTask(task: Tasks): void {
      const tasks = this.tasks.find(t => t.id === task.id);
      
      if (tasks) {
        tasks.title = task.title;
        this.save();
      }
    }
}
