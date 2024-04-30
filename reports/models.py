from django.db import models


class Report(models.Model):
    '''
    Report Model: (title,findings,report_status,impression)
    '''
    title = models.CharField(max_length=400,null=True)
    findings = models.TextField()
    REPORT_STATUS_CHOICES = [
        ('New', 'New'),
        ('Unread', 'Unread'),
        ('Prelim', 'Prelim'),
        ('Final', 'Final'),
    ]
    report_status = models.CharField(max_length=100, choices=REPORT_STATUS_CHOICES)
    impression = models.TextField(null=True)

    patient_name = models.CharField(max_length=100,null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    referring_physician = models.CharField(max_length=200,null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)  # Automatic creation date

    def __str__(self):
        return self.title
