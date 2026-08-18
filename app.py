import sys
import os
import torch
import spaces
import gradio as gr
from fastapi.middleware.cors import CORSMiddleware

# Hugging Face ZeroGPU requires at least one function decorated with @spaces.GPU during startup
@spaces.GPU
def dummy_gpu_function():
    return "GPU is active and working!"

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Import the GitHub router from the backend app
from app.api.github import router as github_router

# Create a simple Gradio interface to satisfy the Hugging Face Gradio supervisor
with gr.Blocks() as demo:
    gr.Markdown("# Ahmad Mustafa Iqbal - Portfolio Backend API")
    gr.Markdown("This Hugging Face Space hosts the FastAPI backend for the portfolio application.")
    gr.Markdown("FastAPI endpoints are active under `/api` (e.g. `/api/github/repos`).")
    btn = gr.Button("Test GPU Status")
    out = gr.Textbox(label="Status")
    btn.click(fn=dummy_gpu_function, outputs=out)

# Monkeypatch Gradio's internal FastAPI app creator to inject our routes dynamically
original_create_app = gr.routes.App.create_app

def custom_create_app(*args, **kwargs):
    app = original_create_app(*args, **kwargs)
    
    # Configure CORS on Gradio's app so our frontend can access it
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Register our backend endpoints directly on Gradio's FastAPI app
    app.include_router(github_router, prefix="/api/github", tags=["GitHub"])
    
    @app.get("/api/health")
    async def health_check():
        return {"status": "ok"}
        
    # Reorder routes: move /api routes to the front of the routing table
    # This prevents Gradio's catch-all/wildcard routes from intercepting API calls
    api_routes = []
    other_routes = []
    for route in app.router.routes:
        if hasattr(route, 'path') and route.path.startswith("/api"):
            api_routes.append(route)
        else:
            other_routes.append(route)
            
    app.router.routes = api_routes + other_routes
    return app

# Apply the monkeypatch
gr.routes.App.create_app = custom_create_app

if __name__ == "__main__":
    # Launch the Gradio app using the native launch method, which handles HF port binding
    demo.launch(server_name="0.0.0.0", server_port=7860)
