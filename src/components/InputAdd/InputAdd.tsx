import { useState } from 'react';
import { useAppDispatch } from '../../hooks'
import { addTodo } from '../../redux/todoSlice';
import styles from './InputAdd.module.scss'

export const InputAdd: React.FC = () => {

    const [value, setValue] = useState('')
    const dispatch = useAppDispatch();

    const addNewTodo = () => {
        if (value) {
            dispatch(addTodo(value));
            setValue('');
        }   else {
            alert('Поле задачи пустое, добавьте значение.')
        }   
    };

    return (
        <div className={styles.inputAdd}>
            <input  
                type='text' 
                className={styles.inputAddTask}
                value={value}
                onChange={(e) => {setValue(e.target.value)}}
                />
            <button onClick={addNewTodo} className={styles.inputAddButton} >Добавить</button>
        </div>
    )
}