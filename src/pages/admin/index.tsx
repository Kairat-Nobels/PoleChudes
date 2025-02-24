import React, { useEffect, useState } from 'react';
import { Container, Content, Header as RSHeader, Button } from 'rsuite';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { adminFetchQuestions, createQuestion, deleteQuestion, updateQuestion } from '@redux/admin/adminSlice';
import QuestionsTable from './components/QuestionsTable';
import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { questions, loading, error } = useAppSelector((state) => state.admin);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    dispatch(adminFetchQuestions());
  }, [dispatch]);

  return (
    <Container className='admin'>
      <RSHeader>
        <h2>Админ Панель</h2>
      </RSHeader>
      <Content className='adminContent'>

        <div className='adminHeader'>
          <h3>Список вопросов</h3>
          <Button appearance="primary" onClick={() => {
            setEditModalOpen(true)
            setSelectedQuestion(null)
          }}>
            Создать вопрос
          </Button>
        </div>
        {loading && <p>Загрузка вопросов...</p>}
        {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
        {questions.length > 0 ? (
          <QuestionsTable
            data={questions.map(q => ({ ...q, id: Number(q.id) }))}
            onEdit={(question) => {
              setSelectedQuestion(question);
              setEditModalOpen(true);
            }}
            onDelete={(question) => {
              setSelectedQuestion(question);
              setDeleteModalOpen(true);
            }}
          />
        ) : (
          <p>Нет вопросов</p>
        )}
      </Content>
      {editModalOpen && (
        <EditModal
          show={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSubmit={(values) => {
            if (selectedQuestion) {
              dispatch(updateQuestion({ id: selectedQuestion.id, question: values.questionText, answer: values.answer }));
            } else {
              dispatch(createQuestion({ question: values.questionText, answer: values.answer }));
            }
            setEditModalOpen(false);
          }}
          initialValues={selectedQuestion ? { questionText: selectedQuestion.question, answer: selectedQuestion.answer } : undefined}
        />
      )}

      {deleteModalOpen && (
        <DeleteModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => {
            if (selectedQuestion) {
              dispatch(deleteQuestion(selectedQuestion.id));
            }
            setDeleteModalOpen(false);
          }}
          question={selectedQuestion}
        />
      )}
    </Container>
  );
};

export default AdminPage;
