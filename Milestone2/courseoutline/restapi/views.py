from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *

# Create your views here.


class CalendarInfoViewSet(viewsets.ModelViewSet):
    queryset = CalenderInfo.objects.all().order_by('courseNumber')
    serializer_class = CalendarSerializer
