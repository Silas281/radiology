from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Report
from .report_serializers import ReportSerializer

class ReportListCreateAPIView(APIView):
    """
    This is class API view for getting (all), creating(single) reports, and filtering reports by status
    """
    def get(self, request): #get reports (all or by status)
        status_param = request.query_params.get('report_status', None)
        if status_param:
            reports = Report.objects.filter(report_status=status_param)
        else:
            reports = Report.objects.all()
        serializer = ReportSerializer(reports, many=True)
        return Response(serializer.data)

    def post(self, request): #create report
        serializer = ReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def filter_by_status(self, status_param):
        return Report.objects.filter(report_status=status_param)


class ReportRetrieveUpdateDestroyAPIView(APIView):
    """
    This is a class API View for getting single report, updating it, and deleting it
    """

    def get_object(self, pk):
        try:
            return Report.objects.get(pk=pk)
        except Report.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        report = self.get_object(pk)
        serializer = ReportSerializer(report)
        return Response(serializer.data)

    def put(self, request, pk):
        report = self.get_object(pk)
        serializer = ReportSerializer(report, data=request.data)
        if serializer.is_valid(): #if valid
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) #error updating report

    def delete(self, request, pk):
        report = self.get_object(pk)
        report.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
