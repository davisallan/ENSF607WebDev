from rest_framework import serializers
from .models import *


class CalendarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CalenderInfo
        fields = ('courseId', 'courseNumber', 'courseTitle', 'courseDescription', 'courseHours', 'academicCredit',
                  'calendarReference')


class OutcomesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LearningOutcome
        fields = ('courseId', 'outcomeNumber', 'outcomeDescription')


class GradAttributeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GraduateAttribute
        fields = ('courseId', 'outcomeNumber', 'graduateAttribute', 'instructionLevel')


class GradeTableSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FinalGradesTable
        fields = ('courseId', 'component', 'outcomes', 'weight')


class LetterTableSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FinalGradesInfo
        fields = ('courseId', 'notes', 'letterAPlus', 'letterA', 'letterAMinus', 'letterBPlus', 'letterB',
                  'letterBMinus', 'letterCPlus', 'letterC', 'letterCMinus', 'letterDPlus', 'letterD', 'letterF')
