
import { Trash } from 'phosphor-react'
import axiosInstance from '../../utils/axios';

import InputCheckBox from '../InputCheckBox';
import styles from './Todo.module.css';
interface TodoProps {
  id: number;
  status: boolean;
  content: string;
  changeStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export function Todo({ id, content, status, deleteTodo, changeStatus }: TodoProps) {

  function handleChangeStatus() {
    changeStatus(id)
    axiosInstance.put(`/todos/${id}`, { id, content, status: !status })
  }



  return (
    <section className={styles.todo}>
      <InputCheckBox onChange={handleChangeStatus} checked={status} />
      <p>{content}</p>
      <button onClick={() => deleteTodo(id)}>
        <Trash size={20} />
      </button>
    </section>
  );
}
