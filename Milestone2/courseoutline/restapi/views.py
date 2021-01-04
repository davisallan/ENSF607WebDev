from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *

# Create your views here.


class CalendarInfoViewSet(viewsets.ModelViewSet):
    queryset = CalenderInfo.objects.all()
    serializer_class = CalendarSerializer


class CourseOutlineViewSet(viewsets.ModelViewSet):
    queryset = CourseOutline.objects.all().order_by('courseNumber')
    serializer_class = CalendarSerializer


class LearningOutcomeViewSet(viewsets.ModelViewSet):
    queryset = LearningOutcome.objects.all().order_by('outcomeNumber')
    serializer_class = CalendarSerializer


class FinalGradesTableViewSet(viewsets.ModelViewSet):
    queryset = FinalGradesTable.objects.all()
    serializer_class = CalendarSerializer


class FinalGradesInfoViewSet(viewsets.ModelViewSet):
    queryset = FinalGradesInfo.objects.all()
    serializer_class = CalendarSerializer
