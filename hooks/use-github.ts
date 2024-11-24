'use client';

import { useSession, signIn } from 'next-auth/react';
import { useCallback, useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import { toast } from 'sonner';

interface Repository {
  id: number;
  name: string;
  owner: {
    login: string;
  };
}

interface Branch {
  name: string;
  protected: boolean;
}

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  type: string;
}

export function useGitHub() {
  const { data: session } = useSession();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [files, setFiles] = useState<GitHubFile[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<{ owner: string; name: string } | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if GitHub is connected on mount and when session changes
    checkGitHubConnection();
  }, [session]);

  const checkGitHubConnection = async () => {
    if (!session) {
      setIsConnected(false);
      return;
    }

    const githubAccount = session.user?.accounts?.find(
      (account) => account.provider === 'github'
    );
    setIsConnected(!!githubAccount);
  };

  const connectGitHub = async () => {
    try {
      await signIn('github', { callbackUrl: window.location.href });
    } catch (err) {
      console.error('GitHub connection error:', err);
      toast.error('Failed to connect to GitHub');
      setError('Failed to connect to GitHub');
    }
  };

  // Get GitHub access token
  const getGitHubToken = useCallback(() => {
    const githubAccount = session?.user?.accounts?.find(
      (account) => account.provider === 'github'
    );
    return githubAccount?.access_token;
  }, [session]);

  // Create Octokit instance
  const getOctokit = useCallback(() => {
    const token = getGitHubToken();
    if (!token) throw new Error('GitHub token not found');
    return new Octokit({ auth: token });
  }, [getGitHubToken]);

  // Load repositories
  const loadRepositories = useCallback(async () => {
    if (!isConnected) return;
    
    try {
      setLoading(true);
      const octokit = getOctokit();
      const { data } = await octokit.repos.listForAuthenticatedUser({
        visibility: 'all',
        sort: 'updated',
        per_page: 100,
      });
      setRepositories(data);
    } catch (error) {
      console.error('Error loading repositories:', error);
      toast.error('Failed to load repositories');
    } finally {
      setLoading(false);
    }
  }, [isConnected, getOctokit]);

  // Load branches
  const loadBranches = useCallback(async (owner: string, repo: string) => {
    try {
      setLoading(true);
      const octokit = getOctokit();
      const { data } = await octokit.repos.listBranches({
        owner,
        repo,
      });
      setBranches(data);
      // Set default branch if none selected
      if (!selectedBranch && data.length > 0) {
        setSelectedBranch(data[0].name);
      }
    } catch (error) {
      console.error('Error loading branches:', error);
      toast.error('Failed to load branches');
    } finally {
      setLoading(false);
    }
  }, [getOctokit, selectedBranch]);

  // Load files
  const loadFiles = useCallback(async (owner: string, repo: string, branch: string) => {
    try {
      setLoading(true);
      const octokit = getOctokit();
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path: '',
        ref: branch,
      });
      setFiles(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error('Error loading files:', error);
      toast.error('Failed to load files');
    } finally {
      setLoading(false);
    }
  }, [getOctokit]);

  // Load file content
  const loadFile = useCallback(async (owner: string, repo: string, branch: string, path: string) => {
    try {
      const octokit = getOctokit();
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      });
      
      if ('content' in data) {
        return Buffer.from(data.content, 'base64').toString('utf-8');
      }
      throw new Error('Not a file');
    } catch (error) {
      console.error('Error loading file:', error);
      toast.error('Failed to load file');
      throw error;
    }
  }, [getOctokit]);

  // Save file
  const saveFile = useCallback(async (
    owner: string,
    repo: string,
    branch: string,
    path: string,
    content: string,
    message: string
  ) => {
    try {
      const octokit = getOctokit();
      
      // Try to get the current file to get its SHA
      let sha: string | undefined;
      try {
        const { data } = await octokit.repos.getContent({
          owner,
          repo,
          path,
          ref: branch,
        });
        if ('sha' in data) {
          sha = data.sha;
        }
      } catch (error) {
        // File doesn't exist yet, which is fine
      }

      // Create or update file
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content: Buffer.from(content).toString('base64'),
        branch,
        ...(sha ? { sha } : {}),
      });
    } catch (error) {
      console.error('Error saving file:', error);
      toast.error('Failed to save file');
      throw error;
    }
  }, [getOctokit]);

  // Create branch
  const createBranch = useCallback(async (owner: string, repo: string, branch: string) => {
    try {
      const octokit = getOctokit();
      
      // Get the default branch's latest commit SHA
      const { data: { commit } } = await octokit.repos.getBranch({
        owner,
        repo,
        branch: 'main', // or 'master' depending on the repository
      });

      // Create the new branch
      await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branch}`,
        sha: commit.sha,
      });
    } catch (error) {
      console.error('Error creating branch:', error);
      toast.error('Failed to create branch');
      throw error;
    }
  }, [getOctokit]);

  return {
    repositories,
    branches,
    files,
    selectedRepo,
    selectedBranch,
    loading,
    isConnected,
    error,
    connectGitHub,
    loadRepositories,
    loadBranches,
    loadFiles,
    loadFile,
    saveFile,
    createBranch,
    setSelectedRepo,
    setSelectedBranch,
  };
}