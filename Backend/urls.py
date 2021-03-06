from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


urlpatterns = [
    # courses
    path('courses/', views.CourseList.as_view()),
    path('courses/<int:pk>/', views.CourseDetail.as_view()),
    # chapters
    path('chapters/', views.ChapterList.as_view()),
    path('chapters/<int:pk>/', views.ChapterDetail.as_view()),
    # grades
    path('grades/', views.GradeList.as_view()),
    path('grades/<int:pk>/', views.GradeDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
