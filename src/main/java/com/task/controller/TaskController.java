package com.task.controller;

import com.task.service.TaskService;
import com.task.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/status/{status}")
    public List<Task> getAllByStatus(@PathVariable String status) {
        return taskService.getTasksByStatus(status);
    }

    @GetMapping("/priority/{priority}")
    public List<Task> getAllByPriority(@PathVariable Integer priority) {
        return taskService.getTasksByPriority(priority);
    }
    @GetMapping("/status/{status}/priority/{priority}")
    public List<Task> getAllByStatusAndPriority(@PathVariable String status,@PathVariable Integer priority) {
        return taskService.getTasksByStatusAndPriority(status,priority);
    }

    @PostMapping
    public void addTask(@RequestBody Task task) {
        taskService.createTask(task);
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id).orElseThrow(() -> new RuntimeException("Task Not Found"));
    }
    @GetMapping("/title/{keyword}")
    public List<Task> getTaskByTitle(@PathVariable String keyword) {
        return taskService.getTasksByTitle(keyword);
    }


    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
