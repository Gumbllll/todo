import { useAppDispatch } from '../../hooks'
import styles from './InputTask.module.scss'
import { removeTodo, updateTodo, toggleCompleted } from '../../redux/todoSlice'
import { useEffect, useRef, useState } from 'react'

interface IInputTask {
    id: string,
    title: string,
    completed: boolean,
}

export const InputTask: React.FC<IInputTask> = ({id, title, completed}) => {
    const [updateMode, setUpdateMode] = useState(false)
    const [value, setValue] = useState(title)

    const dispatch = useAppDispatch();
    const refUpdate = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(updateMode) {
            refUpdate?.current?.focus();
        }
    }, [updateMode])

    const handleRemove = () => {
        dispatch(removeTodo(id))
    }

    const handleUpdate = () => {
        dispatch(updateTodo({id, value}))
        setUpdateMode(false)
    }

    const handleCompleted = () => {
        dispatch(toggleCompleted({id, completed: true}));
        setTimeout(() => dispatch(removeTodo(id)), 300);  
    }

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input onChange={handleCompleted} checked={completed} disabled={updateMode} type='checkbox' className={styles.inputTaskCheckbox}/>
                {updateMode ? <input ref={refUpdate} type='text' value={value} onChange={e => setValue(e.target.value)}/> 
                : <h1 className={styles.inputTaskTitle}>{title}</h1>}
            </label>
            {updateMode ? <button onClick={handleUpdate} className={styles.inputTaskUpdate}>Сохранить</button>
            : <button onClick={() => setUpdateMode(true)} className={styles.inputTaskEdit}>Изменить</button> 
            }
            <button onClick={handleRemove} className={styles.inputTaskRemove} disabled={updateMode}>Удалить</button>
        </div>
        
    )
}