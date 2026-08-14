import { useEffect, useState, useMemo } from 'react';
import type { TodoItem } from '../type/Todo';
import { TodoStatus, TodoStatusNameMap } from '../type/Todo';
import type { NotifyPopupProps } from '../type/NotifyPopup';

export const useTodos = () => {
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

  return {
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
  };
};
