/* ================================================
   Service: GitHub API Client
   ================================================ */

const API_BASE = '/api/github';

/**
 * Fetch GitHub projects from the backend API.
 * Returns { projects, total, pinnedCount } or throws.
 */
export async function fetchGitHubProjects() {
  const response = await fetch(`${API_BASE}/repos`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    projects: data.projects || [],
    total: data.total || 0,
    pinnedCount: data.pinned_count || 0,
  };
}
