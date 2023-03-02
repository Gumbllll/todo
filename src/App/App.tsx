import styles from './App.module.scss'
import { InputAdd } from '../components/InputAdd/InputAdd';
import { InputTask } from '../components/InputTask/InputTask';
import { useAppSelector } from '../hooks';



function App() {
  const todos = useAppSelector((state) => state.list)

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>Список задач</h1>
      <section className={styles.articleSection}>
        <InputAdd/>
      </section>
      <section className={styles.articleSection}>
        {todos.length > 0 ?
          todos.map((todo) => <InputTask key={todo.id} id={todo.id} title={todo.title} completed={todo.completed}/>) 
          : <p className={styles.articleVoid}>Нет активных задач</p>
        } 
      </section>
    </article>
  );
}

export default App;
