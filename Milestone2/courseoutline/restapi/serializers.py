from rest_framework import serializers
from .models import *


class CalendarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CalenderInfo
        fields = ('courseNumber', 'courseTitle', 'courseDescription', 'courseHours', 'academicCredit', 'calendarReference')
