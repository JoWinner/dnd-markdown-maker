'use client';

import { useState, useEffect } from 'react';
import { RepositorySelector } from './repository-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Save, Plus, FileDown } from 'lucide-react';
import { useGitHub } from '@/hooks/use-github';
import { toast } from 'sonner';

interface GitHubToolbarProps {
  onSave?: () => Promise<string>;
  onLoad?: (content: string) => Promise<void>;
}

export function GitHubToolbar({ onSave, onLoad }: GitHubToolbarProps) {
  const {
    branches,
    selectedRepo,
    selectedBranch,
    loadBranches,
    loadFiles,
    loadFile,
    saveFile,
    createBranch,
    isConnected,
    setSelectedBranch
  } = useGitHub();

  const [filePath, setFilePath] = useState<string>('');
  const [commitMessage, setCommitMessage] = useState<string>('Update markdown document');
  const [newBranchName, setNewBranchName] = useState<string>('');
  const [newBranchDialogOpen, setNewBranchDialogOpen] = useState(false);

  // Load branches when repository is selected
  useEffect(() => {
    if (selectedRepo) {
      loadBranches(selectedRepo.owner, selectedRepo.name);
    }
  }, [selectedRepo, loadBranches]);

  // Load files when branch is selected
  useEffect(() => {
    if (selectedRepo && selectedBranch) {
      loadFiles(selectedRepo.owner, selectedRepo.name, selectedBranch);
    }
  }, [selectedRepo, selectedBranch, loadFiles]);

  const handleCreateBranch = async () => {
    if (!selectedRepo || !newBranchName) return;
    
    try {
      await createBranch(selectedRepo.owner, selectedRepo.name, newBranchName);
      setNewBranchDialogOpen(false);
      setNewBranchName('');
      toast.success('Branch created successfully');
      await loadBranches(selectedRepo.owner, selectedRepo.name);
    } catch (error) {
      toast.error('Failed to create branch');
    }
  };

  const handleSave = async () => {
    if (!selectedRepo || !selectedBranch || !filePath || !onSave) return;
    
    try {
      const content = await onSave();
      await saveFile(selectedRepo.owner, selectedRepo.name, selectedBranch, filePath, content, commitMessage);
      toast.success('File saved successfully');
    } catch (error) {
      toast.error('Failed to save file');
    }
  };

  const handleLoad = async () => {
    if (!selectedRepo || !selectedBranch || !filePath || !onLoad) return;
    
    try {
      const content = await loadFile(selectedRepo.owner, selectedRepo.name, selectedBranch, filePath);
      await onLoad(content);
      toast.success('File loaded successfully');
    } catch (error) {
      toast.error('Failed to load file');
    }
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center gap-4 p-4">
        <RepositorySelector />
      </div>
    );
  }

  return (
    <div className="flex items-center  justify-center gap-4 p-4">
      <RepositorySelector />
      
      {selectedRepo && (
        <>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch.name} value={branch.name}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog open={newBranchDialogOpen} onOpenChange={setNewBranchDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Branch</DialogTitle>
                <DialogDescription>
                  Enter a name for the new branch
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="branch">Branch name</Label>
                  <Input
                    id="branch"
                    value={newBranchName}
                    onChange={(e) => setNewBranchName(e.target.value)}
                    placeholder="feature/my-new-branch"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateBranch} disabled={!newBranchName}>
                  Create Branch
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Input
            placeholder="File path (e.g., docs/README.md)"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            className="w-[300px]"
          />

          <Input
            placeholder="Commit message"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            className="w-[300px]"
          />

          <Button onClick={handleLoad} variant="outline" disabled={!filePath}>
            <FileDown className="mr-2 h-4 w-4" />
            Load
          </Button>

          <Button onClick={handleSave} disabled={!filePath}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </>
      )}
    </div>
  );
}
