import sys
import os
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

# Create the Gradio FastAPI app instance
app = gr.routes.App.create_app(demo)

# Mount our FastAPI app onto the Gradio app at "/api"
# This serves all backend routes under "/api" (e.g., "/api/github/repos")
app.mount("/api", fastapi_app)

# Link it back to demo.app so that demo.launch() uses the combined app
demo.app = app

if __name__ == "__main__":
    # Launch the Gradio app using the native launch method, which handles HF port binding
    demo.launch(server_name="0.0.0.0", server_port=7860)
