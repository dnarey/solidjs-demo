import { For } from "solid-js";
import { createStore } from "solid-js/store";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function Tasks() {
  const [taskList, setTaskList] = createStore<Task[]>([]);

  const addTask = (e: Event) => {
    e.preventDefault();
    const taskInput = document.getElementById("task-input") as HTMLInputElement;

    const newTask = {
      id: Math.random().toString(36).substring(2),
      text: taskInput.value,
      completed: false,
    };

    setTaskList([newTask, ...taskList]);
    taskInput.value = "";
  };

  const deleteTask = (task: Task) => {
    setTaskList(taskList.filter((t: Task) => t.id !== task.id));
  };

  const toggleStatus = (taskId: string) => {
    setTaskList(
      (task) => task.id === taskId,
      "completed",
      (completed) => !completed
    );
  };

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <h1 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Task Tracker
      </h1>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6">
          <input
            id="task-input"
            type="text"
            placeholder="Add Task"
            class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={(e) => addTask(e)}
          >
            Add Task
          </button>
        </form>
      </div>

      <h3 class="mt-10 mb-4 text-center text-2xl font-bold tracking-tight text-gray-900">
        Tasks
      </h3>
      <For each={taskList}>
        {(task) => (
          <div class="flex min-h-full flex-row justify-center px-6 py-2 lg:px-8">
            <button
              class="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => deleteTask(task)}
            >
              X
            </button>
            <div
              class={`flex justify-center rounded-md bg-slate-100 px-3 py-1.5 text-sm font-semibold leading-6 text-inherit shadow-sm mx-3 min-w-64 ${
                task.completed && "line-through"
              }`}
            >
              {task.text}
            </div>
            <input
              type="checkbox"
              class="h-6 w-6 rounded-md mt-2"
              checked={task.completed}
              onClick={() => toggleStatus(task.id)}
            />
          </div>
        )}
      </For>
    </div>
  );
}
