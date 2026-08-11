export interface TodoItem {
  id: string;
  text: string;
  status: number; // 0: 全部, 1: 已完成, 2: 進行中
}

export const TodoStatus = {
  NotStarted: 0,
  Completed: 1,
  InProgress: 2,
};

export const TodoStatusNameMap = {
  [TodoStatus.NotStarted]: '全部',
  [TodoStatus.Completed]: '已完成',
  [TodoStatus.InProgress]: '進行中',
};
