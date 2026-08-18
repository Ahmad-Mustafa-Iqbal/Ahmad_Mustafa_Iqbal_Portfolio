import sys
import os
import uvicorn
import torch
import spaces

# Hugging Face ZeroGPU requires at least one function decorated with @spaces.GPU during startup
@spaces.GPU
def dummy_gpu_function():
    return "Satisfying Hugging Face ZeroGPU check"

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Import the FastAPI application
from app.main import app

if __name__ == "__main__":
    # Start the server on port 7860 (Hugging Face default)
    uvicorn.run(app, host="0.0.0.0", port=7860)
