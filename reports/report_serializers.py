from rest_framework import serializers
from .models import Report

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'title', 'findings', 'report_status', 'impression', 'patient_name', 'date_of_birth', 'referring_physician', 'created_at']
