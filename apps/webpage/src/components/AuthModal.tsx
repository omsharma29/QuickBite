import { useState } from 'react';
import { Dialog, DialogContent } from "@repo/ui/dialog";
import { LogIn } from './LogIn';
import { Signup } from './SignUp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const [view, setView] = useState(initialView);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {view === 'login' ? (
          <LogIn onSwitchToSignup={() => setView('signup')} />
        ) : (
          <Signup onSwitchToLogin={() => setView('login')} />
        )}
      </DialogContent>
    </Dialog>
  );
}