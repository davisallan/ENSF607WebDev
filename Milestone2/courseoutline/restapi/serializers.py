from rest_framework import serializers
from .models import *


class CalendarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CalenderInfo
        fields = ('courseId', 'courseTitle', 'courseDescription', 'courseHours', 'academicCredit', 'calendarReference')


class OutlineSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CourseOutline
        fields = ('id', 'courseNumber')


class OutcomesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LearningOutcome
        fields = ('courseId', 'outcomeNumber', 'outcomeDescription', 'graduateAttribute', 'instructionLevel')


class GradeTableSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FinalGradesTable
        fields = ('courseId', 'component', 'outcomes', 'weight')


class GradeTableSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FinalGradesTable
        fields = ('courseId', 'notes', 'letterAPlus', 'letterA', 'letterAMinus', 'letterBPlus', 'letterB',
                  'letterBMinus', 'letterCPlus', 'letterC', 'letterCMinus', 'letterDPlus', 'letterD', 'letterF')
