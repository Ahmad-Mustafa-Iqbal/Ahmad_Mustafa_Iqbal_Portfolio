FROM python:3.10-slim

# Set environment variables to optimize Python for containerization
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /code

# Copy requirements and install dependencies
COPY backend/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the backend source files into the container
COPY backend/ /code/

# Expose port 7860 (Hugging Face Spaces default port)
EXPOSE 7860

# Command to run the application using uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
