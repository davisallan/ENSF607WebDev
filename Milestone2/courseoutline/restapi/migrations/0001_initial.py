# Generated by Django 3.1.5 on 2021-01-07 20:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CourseOutline',
            fields=[
                ('courseId', models.TextField(primary_key=True, serialize=False)),
                ('courseNumber', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='LearningOutcome',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('outcomeNumber', models.CharField(blank=True, max_length=2)),
                ('outcomeDescription', models.TextField(blank=True)),
                ('graduateAttribute', models.CharField(blank=True, max_length=50)),
                ('instructionLevel', models.CharField(blank=True, max_length=15)),
                ('courseId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.courseoutline')),
            ],
        ),
        migrations.CreateModel(
            name='FinalGradesTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('component', models.CharField(blank=True, max_length=25)),
                ('outcomes', models.CharField(blank=True, max_length=15)),
                ('weight', models.CharField(blank=True, max_length=3)),
                ('courseId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.courseoutline')),
            ],
        ),
        migrations.CreateModel(
            name='FinalGradesInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notes', models.TextField(blank=True)),
                ('letterAPlus', models.CharField(blank=True, max_length=4)),
                ('letterA', models.CharField(blank=True, max_length=4)),
                ('letterAMinus', models.CharField(blank=True, max_length=4)),
                ('letterBPlus', models.CharField(blank=True, max_length=4)),
                ('letterB', models.CharField(blank=True, max_length=4)),
                ('letterBMinus', models.CharField(blank=True, max_length=4)),
                ('letterCPlus', models.CharField(blank=True, max_length=4)),
                ('letterC', models.CharField(blank=True, max_length=4)),
                ('letterCMinus', models.CharField(blank=True, max_length=4)),
                ('letterDPlus', models.CharField(blank=True, max_length=4)),
                ('letterD', models.CharField(blank=True, max_length=4)),
                ('letterF', models.CharField(blank=True, max_length=4)),
                ('courseId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.courseoutline')),
            ],
        ),
        migrations.CreateModel(
            name='CalenderInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courseTitle', models.CharField(blank=True, max_length=50)),
                ('courseDescription', models.TextField(blank=True)),
                ('courseHours', models.CharField(blank=True, max_length=25)),
                ('academicCredit', models.CharField(blank=True, max_length=10)),
                ('calendarReference', models.TextField(blank=True)),
                ('courseId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.courseoutline')),
            ],
        ),
    ]
