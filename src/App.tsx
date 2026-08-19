import styles from './App.module.scss';
import TodoList from './pages/TodoList/TodoList';
function App() {
  return (
    <div className={styles.wrapper}>
      <TodoList />
    </div>
  );
}

export default App;
