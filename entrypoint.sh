#!/bin/bash

# Wait for MySQL database to initialize (adjust sleep time as needed)
sleep 30

# Run Django application
python manage.py runserver 0.0.0.0:8000
