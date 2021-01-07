from django.db import models

# Create your models here.


class CourseOutline(models.Model):
    courseId = models.TextField(primary_key=True)
    courseNumber = models.CharField(max_length=10)


class CalenderInfo(models.Model):
    courseId = models.ForeignKey(CourseOutline, on_delete=models.CASCADE)
    courseTitle = models.CharField(max_length=50, blank=True)
    courseDescription = models.TextField(blank=True)
    courseHours = models.CharField(max_length=25, blank=True)
    academicCredit = models.CharField(max_length=10, blank=True)
    calendarReference = models.TextField(blank=True)


class LearningOutcome(models.Model):
    courseId = models.ForeignKey(CourseOutline, on_delete=models.CASCADE)
    outcomeNumber = models.CharField(max_length=2, blank=True)
    outcomeDescription = models.TextField(blank=True)
    graduateAttribute = models.CharField(max_length=50, blank=True)
    instructionLevel = models.CharField(max_length=15, blank=True)


class FinalGradesTable(models.Model):
    courseId = models.ForeignKey(CourseOutline, on_delete=models.CASCADE)
    component = models.CharField(max_length=25, blank=True)
    outcomes = models.CharField(max_length=15, blank=True)
    weight = models.CharField(max_length=3, blank=True)


class FinalGradesInfo(models.Model):
    courseId = models.ForeignKey(CourseOutline, on_delete=models.CASCADE)
    notes = models.TextField(blank=True)
    letterAPlus = models.CharField(max_length=4, blank=True)
    letterA = models.CharField(max_length=4, blank=True)
    letterAMinus = models.CharField(max_length=4, blank=True)
    letterBPlus = models.CharField(max_length=4, blank=True)
    letterB = models.CharField(max_length=4, blank=True)
    letterBMinus = models.CharField(max_length=4, blank=True)
    letterCPlus = models.CharField(max_length=4, blank=True)
    letterC = models.CharField(max_length=4, blank=True)
    letterCMinus = models.CharField(max_length=4, blank=True)
    letterDPlus = models.CharField(max_length=4, blank=True)
    letterD = models.CharField(max_length=4, blank=True)
    letterF = models.CharField(max_length=4, blank=True)

