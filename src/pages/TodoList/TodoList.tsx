import { useEffect, useState, useMemo } from 'react';
import './TodoList.scss';
import type { TodoItem } from '../../type/Todo';
import { TodoStatus, TodoStatusNameMap } from '../../type/Todo';
import PieChart from '../../components/PieChart/PieChart';
import NoData from '../../components/NoData/NoData';
import Search from '../../components/Search/Search';
import NotifyPopup from '../../components/NotifyPopup/NotifyPopup';
import type { NotifyPopupProps } from '../../type/NotifyPopup';

export default function TodoList() {
  // 切換狀態列表
  const taskStatus = [
    {
      key: TodoStatus.NotStarted,
      name: TodoStatusNameMap[TodoStatus.NotStarted],
      color: '#52b26f',
    },
    {
      key: TodoStatus.InProgress,
      name: TodoStatusNameMap[TodoStatus.InProgress],
      color: '#cd75b7',
    },
    {
      key: TodoStatus.Completed,
      name: TodoStatusNameMap[TodoStatus.Completed],
      color: '#eeb558',
    },
  ];

  const [newItem, setNewItem] = useState(''); // todo輸入的欄位
  const [filterStatus, setFilterStatus] = useState<number>(0); // 目前篩選的選項
  const [searchItem, setSearchItem] = useState(''); // 搜尋關鍵字
  const [notifyPopup, setNotifyPopup] = useState<NotifyPopupProps | null>(null);

  const [todos, setTodos] = useState<TodoItem[]>(() => {
    // todo清單
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  //當 todos 改變時，自動寫入 localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  /**
   * 切換tab狀態篩選status
   * @param id 狀態
   */
  const toggleTodoStatus = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          status:
            todo.status === TodoStatus.Completed
              ? TodoStatus.InProgress
              : TodoStatus.Completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleAddTodo = () => {
    if (newItem.trim() === '') {
      setNotifyPopup({
        message: '任務內容不能為空白！',
        onClose: () => setNotifyPopup(null),
        icon: '⚠️',
      });
      return;
    }

    const isSame = todos.some(todo => todo.text === newItem);
    if (isSame) {
      setNotifyPopup({
        message: '此任務已存在，請重新輸入！',
        onClose: () => setNotifyPopup(null),
        icon: '⚠️',
      });
      return;
    }

    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text: newItem,
      status: TodoStatus.InProgress,
    };

    setTodos([...todos, newTodo]);
    setNewItem('');
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleFilterStatus = (status: number) => {
    setFilterStatus(status);
  };

  // 列表
  const displayTodos = useMemo(() => {
    return todos.filter(todo => {
      if (searchItem.trim() !== '') {
        return todo.text.toLowerCase().includes(searchItem.toLowerCase());
      }
      return filterStatus === 0 ? true : todo.status === filterStatus;
    });
  }, [todos, searchItem, filterStatus]);

  // 給圓餅圖的資料
  const pieChartData = taskStatus
    .filter(status => status.key !== TodoStatus.NotStarted)
    .map(item => {
      return {
        name: item.name,
        value: todos.filter(todo => todo.status === item.key).length,
        color: item.color,
      };
    });

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
