"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, MoreHorizontal, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description: string;
  column: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
}

export default function KanbanBoard() {
  const [columns] = useState<Column[]>([
    { id: "todo", title: "Captura de ideias", color: "bg-blue-500" },
    { id: "inProgress", title: "In Progress", color: "bg-yellow-500" },
    { id: "review", title: "Review", color: "bg-purple-500" },
    { id: "testing", title: "Testing", color: "bg-orange-500" },
    { id: "done", title: "Done", color: "bg-green-500" },
  ]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("todo");
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    if (taskId) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, column: columnId } : task
        )
      );
    }
    setDraggedTask(null);
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        description: newTaskDescription,
        column: selectedColumn,
      };

      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setIsAddingTask(false);
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kanban</h1>
            <p className="text-muted-foreground">Validação de ideias</p>
          </div>
          <Button
            onClick={() => setIsAddingTask(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        {/* Add Task Modal */}
        {isAddingTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Task description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <label htmlFor="column-select" className="sr-only">
                  Select column
                </label>
                <select
                  id="column-select"
                  aria-label="Select column"
                  value={selectedColumn}
                  onChange={(e) => setSelectedColumn(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {columns.map((column) => (
                    <option key={column.id} value={column.id}>
                      {column.title}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <Button
                    onClick={addTask}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Add Task
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingTask(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          {columns.map((column) => (
            <ColumnComponent
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.column === column.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
              onDragStart={handleDragStart}
              onDeleteTask={deleteTask}
              draggedTask={draggedTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ColumnProps {
  column: Column;
  tasks: Task[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  draggedTask: string | null;
}

function ColumnComponent({
  column,
  tasks,
  onDragOver,
  onDrop,
  onDragStart,
  onDeleteTask,
  draggedTask,
}: ColumnProps) {
  return (
    <div
      className="bg-card rounded shadow-sm border"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="p-2 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${column.color}`} />
            <p className="font-semibold">{column.title}</p>
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {tasks.length}
            </span>
          </div>
        </div>
      </div>

      <div className="p-1 space-y-1.5 min-h-96">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            onDelete={onDeleteTask}
            isDragging={draggedTask === task.id}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p>Nenhuma ideia</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDelete: (taskId: string) => void;
  isDragging: boolean;
}

function TaskCard({ task, onDragStart, onDelete, isDragging }: TaskCardProps) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={`cursor-grab transition-all duration-200 ${
        isDragging ? "opacity-50 scale-95" : "hover:shadow-md"
      }`}
    >
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-foreground mb-2">{task.title}</h4>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
          <DropdownMenu open={showOptions} onOpenChange={setShowOptions}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 opacity-70 hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(task.id)}
              >
                <X className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
