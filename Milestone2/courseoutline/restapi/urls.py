from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'calendarInfo', views.CalendarInfoViewSet)
router.register(r'courseOutline', views.CourseOutlineViewSet)
router.register(r'learningOutcome', views.LearningOutcomeViewSet)
router.register(r'finalGradeTable', views.FinalGradesTableViewSet)
router.register(r'finalGradeInfo', views.FinalGradesInfoViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    ]
