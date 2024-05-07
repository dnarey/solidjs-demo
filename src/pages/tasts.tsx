import { For } from "solid-js";
import { createStore } from "solid-js/store";
import { Task } from "../constants/definitions";
import TaskItem from "../components/TaskItem";

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
          <TaskItem
            task={task}
            onDelete={deleteTask}
            onToggle={toggleStatus}
          ></TaskItem>
        )}
      </For>
    </div>
  );
}
