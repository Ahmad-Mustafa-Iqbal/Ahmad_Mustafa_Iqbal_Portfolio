import sys
import os
import uvicorn
import torch
import spaces
import gradio as gr

# Hugging Face ZeroGPU requires at least one function decorated with @spaces.GPU during startup
@spaces.GPU
def dummy_gpu_function():
    return "GPU is active and working!"

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Import the FastAPI application
from app.main import app as fastapi_app

# Create a simple Gradio interface to satisfy the Hugging Face Gradio supervisor
with gr.Blocks() as demo:
    gr.Markdown("# Ahmad Mustafa Iqbal - Portfolio Backend API")
    gr.Markdown("This Hugging Face Space hosts the FastAPI backend for the portfolio application.")
    gr.Markdown("FastAPI endpoints are active under `/api` (e.g. `/api/github/repos`).")
    btn = gr.Button("Test GPU Status")
    out = gr.Textbox(label="Status")
    btn.click(fn=dummy_gpu_function, outputs=out)

# Mount the Gradio app onto our FastAPI app at the root "/"
# This allows the Hugging Face supervisor to see a running Gradio interface
app = gr.mount_gradio_app(fastapi_app, demo, path="/")

if __name__ == "__main__":
    # Start the server on port 7860 (Hugging Face default)
    uvicorn.run(app, host="0.0.0.0", port=7860)
