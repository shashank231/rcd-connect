from django.contrib import admin
from .models import TodoTasks

@admin.register(TodoTasks)
class TodoTasksAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
