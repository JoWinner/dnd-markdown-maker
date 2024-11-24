'use client';

import { useEffect } from 'react';
import { useGitHub } from '@/hooks/use-github';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, RefreshCw, Github } from 'lucide-react';

export function RepositorySelector() {
  const {
    repositories,
    loading,
    loadRepositories,
    isConnected,
    connectGitHub,
    selectedRepo,
    setSelectedRepo
  } = useGitHub();

  useEffect(() => {
    if (isConnected) {
      loadRepositories();
    }
  }, [isConnected, loadRepositories]);

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2">
        <Button onClick={connectGitHub} variant="outline">
          <Github className="mr-2 h-4 w-4" />
          Connect GitHub Account
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Select 
        value={selectedRepo ? `${selectedRepo.owner}/${selectedRepo.name}` : ''} 
        onValueChange={(value) => {
          const [owner, name] = value.split('/');
          setSelectedRepo({ owner, name });
        }}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select a repository" />
        </SelectTrigger>
        <SelectContent>
          {repositories.map((repo) => (
            <SelectItem
              key={repo.id}
              value={`${repo.owner.login}/${repo.name}`}
            >
              {repo.owner.login}/{repo.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => loadRepositories()}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
