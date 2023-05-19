import { Snippet } from '@prisma/client';

import SnippetForm from '@/components/snippet/modal/SnippetForm';
import Modal from '@/components/ui/Modal';

interface EditSnippetModalProps {
  snippet?: Snippet | null;
  onEdit?: (snippet: Snippet) => void;
}

const EditSnippetModal: React.FC<EditSnippetModalProps> = ({
  snippet,
  onEdit,
}) => {
  return (
    <Modal name="editSnippet" isStatic={true}>
      <SnippetForm mode="edit" snippet={snippet} onEdit={onEdit} />
    </Modal>
  );
};

export default EditSnippetModal;
