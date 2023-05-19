import SnippetForm from '@/components/snippet/modal/SnippetForm';
import Modal from '@/components/ui/Modal';

const AddSnippetModal = () => {
  return (
    <Modal name="addSnippet" isStatic={true}>
      <SnippetForm mode="add" />
    </Modal>
  );
};

export default AddSnippetModal;
