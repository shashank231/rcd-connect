from rest_framework import serializers
from .models import TodoTasks


class TodoTasksListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoTasks
        fields = '__all__'

