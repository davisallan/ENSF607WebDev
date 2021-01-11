from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from .serializers import *
from .models import *

# Create your views here.


class CalendarInfoViewSet(viewsets.ModelViewSet):
    queryset = CalenderInfo.objects.all().order_by('courseNumber')
    serializer_class = CalendarSerializer


class LearningOutcomeViewSet(viewsets.ModelViewSet):
    queryset = LearningOutcome.objects.all().order_by('outcomeNumber')
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['courseId']
    serializer_class = OutcomesSerializer


class GraduateAttributeViewSet(viewsets.ModelViewSet):
    queryset = GraduateAttribute.objects.all().order_by('courseId')
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['courseId']
    serializer_class = GradAttributeSerializer


class FinalGradesTableViewSet(viewsets.ModelViewSet):
    queryset = FinalGradesTable.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['courseId']
    serializer_class = GradeTableSerializer


class FinalGradesInfoViewSet(viewsets.ModelViewSet):
    queryset = FinalGradesInfo.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['courseId']
    serializer_class = LetterTableSerializer
