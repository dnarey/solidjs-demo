import { Component } from "solid-js";
import { Task } from "../constants/definitions";

interface TaskItemProps {
  task: Task;
  onDelete: (task: Task) => void;
  onToggle: (taskId: string) => void;
}

const TaskItem: Component<TaskItemProps> = (props) => {
  return (
    <div class="flex min-h-full flex-row justify-center px-6 py-2 lg:px-8">
      <button
        class="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => props.onDelete(props.task)}
      >
        X
      </button>
      <div
        class={`flex justify-center rounded-md bg-slate-100 px-3 py-1.5 text-sm font-semibold leading-6 text-inherit shadow-sm mx-3 min-w-64 ${
          props.task.completed && "line-through"
        }`}
      >
        {props.task.text}
      </div>
      <input
        type="checkbox"
        class="h-6 w-6 rounded-md mt-2"
        checked={props.task.completed}
        onClick={() => props.onToggle(props.task.id)}
      />
    </div>
  );
};

export default TaskItem;
