from django.db import models

# Create your models here.


class CalenderInfo(models.Model):
    courseNumber = models.CharField(max_length=10)
    courseTitle = models.CharField(max_length=50)
    courseDescription = models.TextField()
    courseHours = models.CharField(max_length=25)
    academicCredit = models.CharField(max_length=10)
    calendarReference = models.TextField()

