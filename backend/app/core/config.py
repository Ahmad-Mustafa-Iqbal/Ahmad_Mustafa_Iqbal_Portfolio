"""
Core configuration for the Portfolio backend.
"""

# ── GitHub Settings ──
GITHUB_USERNAME = "Ahmad-Mustafa-Iqbal"
GITHUB_API_BASE = "https://api.github.com"

# Cache TTL in seconds (10 minutes)
CACHE_TTL = 600

# ── Repos to EXCLUDE from portfolio (not showcase-worthy) ──
EXCLUDED_REPOS = [
    "Ahmad_Mustafa_Iqbal_Portfolio",  # This portfolio itself
    "Ahmad-Mustafa-Iqbal",            # Profile README
    "neetcode-submissions",            # Practice problems
    "Amazon-clone",                    # Basic clone
    "Tic-Tac-Toe",                     # Too simple
    "Rock-paper-Scissors",             # Too simple
    "Currency-Converter",              # Too simple
    "FlappyBird_Java",                 # Simple game
    "University-Course-Management-System",  # Text-based, too simple
    "Java_mate",                       # Incomplete
    "Perceptron-In-Assembly",          # Too niche
]

# ── Repos to PIN / Feature (shown at top as large cards) ──
PINNED_REPOS = [
    "Ml-energy-prediction-dashboard",
    "BBC-news-advanced-Nlp.",
    "Amazon-sentiment-analysis",
    "Smart-City-Management-System",
]

# ── Manual category mapping ──
# Categories: "ai", "web", "data", "other"
REPO_CATEGORY_MAP = {
    "BBC-news-advanced-Nlp.": "ai",
    "Amazon-sentiment-analysis": "ai",
    "Credit-card-customer-segmentation": "data",
    "Ml-energy-prediction-dashboard": "ai",
    "steel-energy-consumption-analysis": "data",
    "Islamabad-Property-Prediction": "ai",
    "Search-Algorithm-Visualizer": "ai",
    "Smart-City-Management-System": "other",
    "Comparative-analysis-ml-heart-disease": "ai",
    "UK-Online-Store-retail-eda": "data",
    "Clima-Client-side-weather-dashboard": "web",
    "Lost-in-Xylora": "other",
    "Movies-Data-Analysis-EDA-with-Pandas-Seaborn-": "data",
}

# ── Fallback: auto-detect category from language ──
LANGUAGE_CATEGORY_MAP = {
    "Jupyter Notebook": "data",
    "Python": "ai",
    "JavaScript": "web",
    "HTML": "web",
    "Java": "other",
    "Assembly": "other",
}
