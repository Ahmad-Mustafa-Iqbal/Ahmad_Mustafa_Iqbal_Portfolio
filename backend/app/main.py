"""
FastAPI application entry point.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.github import router as github_router

app = FastAPI(
    title="Portfolio API",
    description="Backend API for Ahmad Mustafa Iqbal's Portfolio",
    version="1.0.0",
)

# ── CORS ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ──
app.include_router(github_router, prefix="/api/github", tags=["GitHub"])


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
