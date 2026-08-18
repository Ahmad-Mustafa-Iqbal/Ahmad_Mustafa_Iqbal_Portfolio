"""
GitHub API integration — fetches, filters, categorises and caches repos.
"""

import time
import httpx
from fastapi import APIRouter, HTTPException

from app.core.config import (
    GITHUB_USERNAME,
    GITHUB_API_BASE,
    CACHE_TTL,
    EXCLUDED_REPOS,
    PINNED_REPOS,
    REPO_CATEGORY_MAP,
    LANGUAGE_CATEGORY_MAP,
)

router = APIRouter()

# ── In-memory cache ──
_cache = {"data": None, "timestamp": 0}


def _categorize_repo(repo: dict) -> str:
    """Determine category for a repo based on config or language."""
    name = repo["name"]
    if name in REPO_CATEGORY_MAP:
        return REPO_CATEGORY_MAP[name]
    language = repo.get("language") or ""
    return LANGUAGE_CATEGORY_MAP.get(language, "other")


def _format_repo(repo: dict) -> dict:
    """Transform raw GitHub API response into a clean project object."""
    name = repo["name"]
    return {
        "id": repo["id"],
        "name": name,
        "title": name.replace("-", " ").replace("_", " ").replace(".", ""),
        "description": repo.get("description") or "",
        "language": repo.get("language") or "Unknown",
        "stars": repo.get("stargazers_count", 0),
        "forks": repo.get("forks_count", 0),
        "topics": repo.get("topics", []),
        "github": repo.get("html_url", ""),
        "homepage": repo.get("homepage") or None,
        "category": _categorize_repo(repo),
        "pinned": name in PINNED_REPOS,
        "size": repo.get("size", 0),
        "updatedAt": repo.get("updated_at", ""),
        "createdAt": repo.get("created_at", ""),
    }


async def _fetch_repos() -> list[dict]:
    """Fetch repos from GitHub API with caching."""
    now = time.time()

    # Return cache if still valid
    if _cache["data"] is not None and (now - _cache["timestamp"]) < CACHE_TTL:
        return _cache["data"]

    url = f"{GITHUB_API_BASE}/users/{GITHUB_USERNAME}/repos"
    params = {"per_page": 100, "sort": "updated", "type": "owner"}

    async with httpx.AsyncClient(timeout=15) as client:
        response = await client.get(url, params=params)

    if response.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail=f"GitHub API returned {response.status_code}",
        )

    raw_repos = response.json()

    # Filter and format
    projects = []
    for repo in raw_repos:
        # Skip forks, private, and excluded repos
        if repo.get("fork"):
            continue
        if repo.get("private"):
            continue
        if repo["name"] in EXCLUDED_REPOS:
            continue

        projects.append(_format_repo(repo))

    # Sort: pinned first, then by updated date
    projects.sort(key=lambda p: (not p["pinned"], p["updatedAt"]), reverse=False)
    # Re-sort: pinned first, then most recently updated
    pinned = [p for p in projects if p["pinned"]]
    others = [p for p in projects if not p["pinned"]]
    others.sort(key=lambda p: p["updatedAt"], reverse=True)
    result = pinned + others

    # Update cache
    _cache["data"] = result
    _cache["timestamp"] = now

    return result


@router.get("/repos")
async def get_repos():
    """Return formatted GitHub repos for the portfolio."""
    repos = await _fetch_repos()
    return {
        "username": GITHUB_USERNAME,
        "total": len(repos),
        "pinned_count": sum(1 for r in repos if r["pinned"]),
        "projects": repos,
    }
