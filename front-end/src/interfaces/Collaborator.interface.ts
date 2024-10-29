export interface Collaborator {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface CollaboratorFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface CollaboratorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCollaborator: (collaborator: CollaboratorFormData) => void;
}
