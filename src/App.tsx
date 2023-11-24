import React, { ChangeEvent, FC } from 'react';
import './App.css';
import { useState } from 'react';
import { todoType } from './apptypes'
import { TodoItem } from './TodoItem';


const App: FC = () => {

  const [task, setTask] = useState<string>('');
  const [workDay, setWorkDay] = useState<number>(0);
  const [todoList, setTodoList] = useState<todoType[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'task') {
      setTask(event.target.value);
    } else {
      setWorkDay(Number(event.target.value));
    }
  }

  const addNewTask = (): void => {
    const newTask = { taskName: task, workDay: workDay };
    setTodoList([...todoList, newTask]);
    setTask('');
    setWorkDay(0);
  }

  const deleteTask = (nameToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== nameToDelete
    }))
  }


  return (
    <div className="App">
      <div className='mainCard'>
        <input className='mainCardInput' type="text" value={task} onChange={handleChange} name='task' placeholder='Taskınızı giriniz...' />
        <input className='mainCardInput' type="number" value={workDay} onChange={handleChange} name='workDay' placeholder='Kaç günde tamamlamalısınız' />
        <button className='mainCardButton' onClick={addNewTask}>Yeni Task Ekle</button>
      </div>
      <div className='todoCart'>
        {todoList.map((task: todoType, index: number) => {
          return (
            <TodoItem key={index} task={task} deleteTask={deleteTask} />
          )
        })}
      </div>
    </div>
  );
}

export default App;
