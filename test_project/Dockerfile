# Use Python 3.11.1 image based on Debian Bullseye in its slim variant as the base image
FROM python:3.11.1-slim-bullseye

# Set an environment variable to unbuffer Python output, aiding in logging and debugging
ENV PYTHONBUFFERED=1

# Define an environment variable for the web service's port, commonly used in cloud services
ENV PORT 8080

# Set Django settings module to use production settings
ENV DJANGO_SETTINGS_MODULE=test_project.settings.production

# Set the working directory within the container to /app for any subsequent commands
WORKDIR /app

# Copy the entire current directory contents into the container at /app
COPY . /app/

# Upgrade pip to ensure we have the latest version for installing dependencies
RUN pip install --upgrade pip

# Install dependencies from the requirements.txt file to ensure our Python environment is ready
RUN pip install -r requirements.txt

# Create static files directory
RUN mkdir -p /app/staticfiles

# Run database migrations
RUN python manage.py migrate --settings=test_project.settings.production

# Collect static files using production settings
RUN python manage.py collectstatic --noinput --settings=test_project.settings.production

# Set the command to run our web service using Gunicorn with increased timeout
CMD ["gunicorn", "test_project.wsgi:application", "--bind", "0.0.0.0:8080", "--workers", "1", "--timeout", "300", "--log-level", "info", "--access-logfile", "-", "--error-logfile", "-"]

# Inform Docker that the container listens on the specified network port at runtime
EXPOSE ${PORT}