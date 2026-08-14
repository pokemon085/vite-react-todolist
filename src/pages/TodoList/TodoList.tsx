import './TodoList.scss';
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
      <div className="todo-list-wrap">
        <div className="todo-list card">
          <div className="title">任務工作台</div>
          <div className="input-wrap">
            <input
              type="text"
              name="inputTask"
              onChange={e => setNewItem(e.target.value)}
              className="todo-input"
              value={newItem}
              placeholder="添加新任務..."
            />
            <button className="todo-add-btn" onClick={handleAddTodo}>
              添加
            </button>
          </div>

          <div className="status-list-and-search">
            <div className="task-status-wrap">
              {taskStatus.map(status => (
                <button
                  key={status.key}
                  className={`task-btn ${filterStatus === status.key ? 'active' : ''}`}
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

          <div className="todo-items-wrapper">
            {displayTodos.length === 0 && <NoData text="暫無數據" icon="📂" />}
            {displayTodos.length > 0 &&
              displayTodos.map(todo => (
                <div key={todo.id} className="todo-item">
                  <div className="checkbox-wrap">
                    <input
                      type="checkbox"
                      className="todo-checkbox"
                      checked={todo.status === TodoStatus.Completed}
                      onChange={() => toggleTodoStatus(todo.id)}
                    />
                  </div>

                  <div
                    className={`todo-item-text ${todo.status === TodoStatus.Completed ? 'completed' : ''}`}
                  >
                    {todo.text}
                  </div>
                  <div
                    className="delete-button"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    删除
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 待處理 */}
        <div className="processed card">
          <div className="left">
            <div className="title">待處理任務</div>
            <div className="count">
              {
                todos.filter(todo => todo.status === TodoStatus.InProgress)
                  .length
              }
              <div className="count-text">件</div>
            </div>
          </div>
          <div className="right">⚠️</div>
        </div>

        {/* 生產力分析 */}
        <div className="productivity card">
          <div className="title">生產力分析</div>
          <div className="tip">即時追蹤任務完成狀況</div>
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
