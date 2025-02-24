import React from 'react';
import { Table, Button, Whisper, Tooltip } from 'rsuite';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';

interface Question {
  id: number;
  question: string;
  answer: string;
}

interface QuestionsTableProps {
  data: Question[];
  onEdit: (question: Question) => void;
  onDelete: (question: Question) => void;
}

const QuestionsTable: React.FC<QuestionsTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <Table bordered cellBordered data={data} autoHeight wordWrap="break-word">
      <Table.Column width={50} align="center" fixed>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey="id" />
      </Table.Column>

      <Table.Column flexGrow={3} fixed>
        <Table.HeaderCell>Вопрос</Table.HeaderCell>
        <Table.Cell dataKey="question" />
      </Table.Column>

      <Table.Column flexGrow={1} fixed>
        <Table.HeaderCell>Ответ</Table.HeaderCell>
        <Table.Cell dataKey="answer" />
      </Table.Column>

      <Table.Column width={120} align="center" fixed>
        <Table.HeaderCell>Действия</Table.HeaderCell>
        <Table.Cell>
          {(rowData: any) => (
            <div className='actionButtons'>
              <Whisper
                trigger="hover"
                placement="top"
                speaker={<Tooltip>Редактировать</Tooltip>}
              >
                <Button onClick={() => onEdit(rowData)}>
                  <MdEdit color='#1caf68' size={20} />
                </Button>
              </Whisper>

              <Whisper
                trigger="hover"
                placement="top"
                speaker={<Tooltip>Удалить</Tooltip>}
              >
                <Button onClick={() => onDelete(rowData)}>
                  <MdDeleteOutline color='rgb(210 54 54)' size={20} />
                </Button>
              </Whisper>
            </div>
          )}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
};

export default QuestionsTable;
