import styles from './TodoList.module.scss';
import PieChart from '../../components/PieChart/PieChart';
import NoData from '../../components/NoData/NoData';
import Search from '../../components/Search/Search';
import NotifyPopup from '../../components/NotifyPopup/NotifyPopup';
import { useTodos } from '../../hooks/useTodos';
import { TodoStatus } from '../../type/Todo';

export default function TodoList() {
  const {
    setNewItem,
    newItem,
    handleAddTodo,
    taskStatus,
    filterStatus,
    handleFilterStatus,
    setSearchItem,
    searchItem,
    todos,
    toggleTodoStatus,
    handleDeleteTodo,
    notifyPopup,
    pieChartData,
    displayTodos,
  } = useTodos();

  return (
    <>
      <div className={styles['todo-list-wrap']}>
        <div className={`${styles['todo-list']} ${styles.card}`}>
          <div className={styles.title}>任務工作台</div>
          <div className={styles['input-wrap']}>
            <input
              type="text"
              name="inputTask"
              onChange={e => setNewItem(e.target.value)}
              className={styles['todo-input']}
              value={newItem}
              placeholder="添加新任務..."
            />
            <button className={styles['todo-add-btn']} onClick={handleAddTodo}>
              添加
            </button>
          </div>

          <div className={styles['status-list-and-search']}>
            <div className={styles['task-status-wrap']}>
              {taskStatus.map(status => (
                <button
                  key={status.key}
                  className={`${styles['task-btn']} ${filterStatus === status.key ? styles.active : ''}`}
                  onClick={() => handleFilterStatus(status.key)}
                >
                  {status.name}
                </button>
              ))}
            </div>
            <Search
              value={searchItem}
              onChange={setSearchItem}
              placeholder="搜尋關鍵字"
            />
          </div>

          <div className={styles['todo-items-wrapper']}>
            {displayTodos.length === 0 && <NoData text="暫無數據" icon="📂" />}
            {displayTodos.length > 0 &&
              displayTodos.map(todo => (
                <div key={todo.id} className={styles['todo-item']}>
                  <div className={styles['checkbox-wrap']}>
                    <input
                      type="checkbox"
                      className={styles['todo-checkbox']}
                      checked={todo.status === TodoStatus.Completed}
                      onChange={() => toggleTodoStatus(todo.id)}
                    />
                  </div>

                  <div
                    className={`${styles['todo-item-text']} ${todo.status === TodoStatus.Completed ? styles.completed : ''}`}
                  >
                    {todo.text}
                  </div>
                  <div
                    className={styles['delete-button']}
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    删除
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 待處理 */}
        <div className={`${styles.processed} ${styles.card}`}>
          <div className={styles.left}>
            <div className={styles.title}>待處理任務</div>
            <div className={styles.count}>
              {
                todos.filter(todo => todo.status === TodoStatus.InProgress)
                  .length
              }
              <div className={styles['count-text']}>件</div>
            </div>
          </div>
          <div className={styles.right}>⚠️</div>
        </div>

        {/* 生產力分析 */}
        <div className={`${styles.productivity} ${styles.card}`}>
          <div className={styles.title}>生產力分析</div>
          <div className={styles.tip}>即時追蹤任務完成狀況</div>
          {todos.length > 0 ? (
            <PieChart data={pieChartData} />
          ) : (
            <NoData text="暫無數據" icon="📂" />
          )}
        </div>

        {/* 彈窗 */}
        {notifyPopup && <NotifyPopup {...notifyPopup} />}
      </div>
    </>
  );
}
