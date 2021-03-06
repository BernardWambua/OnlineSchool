'''
    A serializer to serialize data from Course, Grade and Chapter models
    and parse json to the view.
'''
from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Course, Chapter, Grade
from .validators import ValidateCourses


class GradeSerializer(serializers.ModelSerializer):
    '''
    A class to serialize data from Grade model
    '''
    id = serializers.ReadOnlyField()

    class Meta:
        model = Grade
        fields = ['id', 'grade_name']
        extra_kwargs = {
            "grade_name": {
                "error_messages": {
                    "blank": "Please provide the grade name!"
                }
            }
        }

    def validate(self, data):
        '''
            Checks if all values passed by tutors are valid
        '''

        # Checks for space characters
        have_white_space =\
            ValidateCourses.check_white_spaces(
                data['grade_name']
            )

        if have_white_space:
            raise serializers.ValidationError(
                "The grade name shouldn't have"
                " white spaces before, within or after"
            )

        # Checks for valid names
        not_valid_name =\
            ValidateCourses.check_valid_names(
                data['grade_name']
            )

        if not_valid_name:
            raise serializers.ValidationError(
                "The grade name should start with an "
                "uppercase followed by lowercase characters. e.g Four"
            )
        return data


class ChapterCreateSerializer(serializers.ModelSerializer):
    '''
    A class to serialize data from Chapter model
    '''
    id = serializers.ReadOnlyField()

    class Meta:
        model = Chapter
        fields = ('id', 'chapter_name', 'content', 'course')
        extra_kwargs = {
            "chapter_name": {
                "error_messages": {
                    "blank": "Please provide the Chapter name!"
                }
            },
            "content": {
                "error_messages": {
                    "blank": "Content cannot be blank!"
                }
            }
        }

    def validate(self, data):
        '''
            Checks if all values passed by tutors are valid
        '''

        # Checks for space characters
        have_white_space =\
            ValidateCourses.check_white_spaces(
                data['chapter_name']
            )

        if have_white_space:
            raise serializers.ValidationError(
                "The chapter name shouldn't have"
                " white spaces before, within or after"
            )

        # Checks for valid names
        not_valid_name =\
            ValidateCourses.check_valid_names(
                data['chapter_name']
            )

        if not_valid_name:
            raise serializers.ValidationError(
                "The chapter name should start with an "
                "uppercase followed by lowercase characters. e.g Algebra"
            )
        return data


class ChapterGetSerializer(serializers.ModelSerializer):
    '''
    A class to serialize data from Chapter model
    '''
    id = serializers.ReadOnlyField()
    course = serializers.CharField(source='course.course_name', read_only=True)

    class Meta:
        model = Chapter
        fields = ('id', 'chapter_name', 'content', 'course')
        extra_kwargs = {
            "chapter_name": {
                "error_messages": {
                    "blank": "Please provide the Chapter name!"
                }
            },
            "content": {
                "error_messages": {
                    "blank": "Content cannot be blank!"
                }
            }
        }

    def validate(self, data):
        '''
            Checks if all values passed by tutors are valid
        '''

        # Checks for space characters
        have_white_space =\
            ValidateCourses.check_white_spaces(
                data['chapter_name']
            )

        if have_white_space:
            raise serializers.ValidationError(
                "The chapter name shouldn't have"
                " white spaces before, within or after"
            )

        # Checks for valid names
        not_valid_name =\
            ValidateCourses.check_valid_names(
                data['chapter_name']
            )

        if not_valid_name:
            raise serializers.ValidationError(
                "The chapter name should start with an "
                "uppercase followed by lowercase characters. e.g Algebra"
            )
        return data


class CourseCreateSerializer(serializers.ModelSerializer):
    '''
    A class to serialize data from Course model
    '''
    id = serializers.ReadOnlyField()
    created = serializers.ReadOnlyField()
    chapter_set = ChapterCreateSerializer(read_only=True, many=True)

    class Meta:
        model = Course
        fields = ['id', 'course_name', 'grade', 'description',
                  'created', 'chapter_set']
        extra_kwargs = {
            "course_name": {
                "error_messages": {
                    "blank": "Please provide the course name!"
                }
            }, "description": {
                "error_messages": {
                    "blank": "Please provide course description!"
                }
            },

        }

    def validate(self, data):
        '''
            Checks if all values passed by tutors are valid
        '''

        # Checks for space characters
        have_white_space =\
            ValidateCourses.check_white_spaces(
                data['course_name']
            )

        if have_white_space:
            raise serializers.ValidationError(
                "The course name shouldn't have"
                " white spaces before, within or after"
            )

        # Checks for valid names
        not_valid_name =\
            ValidateCourses.check_valid_names(
                data['course_name']
            )

        if not_valid_name:
            raise serializers.ValidationError(
                "The course name should start with an "
                "uppercase followed by lowercase characters. e.g English"
            )
        return data


class CourseGetSerializer(serializers.ModelSerializer):
    '''
    A class to serialize data from Course model
    '''
    id = serializers.ReadOnlyField()
    created = serializers.ReadOnlyField()
    grade_name = serializers.CharField(
        source='grade.grade_name', read_only=True)
    tutor = serializers.CharField(source='tutor.username', read_only=True)
    chapters = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'course_name', 'grade_name', 'description',
                  'created', 'tutor', 'chapters']
        extra_kwargs = {
            "course_name": {
                "error_messages": {
                    "blank": "Please provide the course name!"
                }
            }, "description": {
                "error_messages": {
                    "blank": "Please provide course description!"
                }
            },

        }

    def get_chapters(self, obj):
        serializer = ChapterGetSerializer(
            Chapter.objects.filter(course_id=obj.id), many=True
        )
        return serializer.data

    def validate(self, data):
        '''
            Checks if all values passed by tutors are valid
        '''

        # Checks for space characters
        have_white_space =\
            ValidateCourses.check_white_spaces(
                data['course_name']
            )

        if have_white_space:
            raise serializers.ValidationError(
                "The course name shouldn't have"
                " white spaces before, within or after"
            )

        # Checks for valid names
        not_valid_name =\
            ValidateCourses.check_valid_names(
                data['course_name']
            )

        if not_valid_name:
            raise serializers.ValidationError(
                "The course name should start with an "
                "uppercase followed by lowercase characters. e.g English"
            )
        return data
