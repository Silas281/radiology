from django.urls import path
from .views import ReportListCreateAPIView, ReportRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('reports/', ReportListCreateAPIView.as_view(), name='report-list-create'),
    path('reports/<int:pk>/', ReportRetrieveUpdateDestroyAPIView.as_view(), name='report-detail'),
]