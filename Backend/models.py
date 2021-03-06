'''
    Model classes to create database tables namely Course, Grade and Chapter.
'''
from django.db import models
from django.conf import settings


class Grade(models.Model):
    '''
    A model to store grade records which is a lookup field in course
    '''
    grade_name = models.CharField(max_length=15, unique=True)

    def __str__(self):
        """
            Returns the name of the grade level
        """
        return '{}'.format(self.grade_name)


class Course(models.Model):
    '''
    A model to store courses records
    '''
    course_name = models.CharField(max_length=50)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        """
            Meta class odering courses by date created they were created.
        """
        ordering = ('-created',)

    def __str__(self):
        return "%s %s %s" % (self.course_name, " Grade ", self.grade)


class Chapter(models.Model):
    '''
    A model to store chapters records
    '''
    chapter_name = models.CharField(max_length=50)
    content = models.FileField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return "%s %s" % (self.course, self.chapter_name)
