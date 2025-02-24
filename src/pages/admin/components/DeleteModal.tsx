import React from 'react';
import { Modal, Button } from 'rsuite';

interface DeleteQuestionModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  question: { question: string };
}

const DeleteModal: React.FC<DeleteQuestionModalProps> = ({ open, onClose, onConfirm, question }) => {
  return (
    <Modal open={open} onClose={onClose} backdrop="static" size="xs">
      <Modal.Header>
        <Modal.Title>Удаление вопроса</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Вы точно хотите удалить этот вопрос?</p>
        <strong>{question?.question}</strong>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm} appearance="primary" color="red">
          Удалить
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
