from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from .serializers import TodoTasksListSerializer
from .models import TodoTasks
from rest_framework import status


class TodoListPost(ListCreateAPIView):
    queryset = TodoTasks.objects.all()
    serializer_class = TodoTasksListSerializer


class TodoDelete(RetrieveUpdateDestroyAPIView):
    queryset = TodoTasks.objects.all()
    serializer_class = TodoTasksListSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if self.kwargs['pk'] == str(-1):
            TodoTasks.objects.all().delete()
            return Response(status=status.HTTP_200_OK, data={'response': 'Deleted Successfully'})
        else:
            return self.destroy(request, *args, **kwargs)

