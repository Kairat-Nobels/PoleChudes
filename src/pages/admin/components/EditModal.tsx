import React, { useState } from 'react';
import { Modal, Form, Button, Input } from 'rsuite';

interface EditModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (values: { questionText: string; answer: string }) => void;
  initialValues?: { questionText: string; answer: string };
}

const EditModal: React.FC<EditModalProps> = ({ show, onClose, onSubmit, initialValues }) => {
  const [formData, setFormData] = useState(initialValues || { questionText: '', answer: '' });

  const handleChange = (value: string, name: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.questionText.trim() || !formData.answer.trim()) {
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal className='editModal' open={show} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>{initialValues ? 'Редактировать вопрос' : 'Создать вопрос'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid>
          <Form.Group>
            <Form.ControlLabel>Вопрос</Form.ControlLabel>
            <Input value={formData.questionText} onChange={(value) => handleChange(value, 'questionText')} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Ответ</Form.ControlLabel>
            <Input value={formData.answer} onChange={(value) => handleChange(value, 'answer')} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} appearance="primary" disabled={!formData.questionText.trim() || !formData.answer.trim()}>
          {initialValues ? 'Сохранить' : 'Создать'}
        </Button>
        <Button onClick={onClose} appearance="subtle">Отмена</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
