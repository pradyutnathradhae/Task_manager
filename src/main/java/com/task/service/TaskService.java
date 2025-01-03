package com.task.service;

import com.task.model.Task;
import com.task.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public List<Task> getAllTasksById(List<Long> ls) {
        return taskRepository.findAllById(ls);
    }

    public void createTask(Task task) {
        taskRepository.save(task);
    }

    public Task updateTask(Long id,Task upd_task) {
        return taskRepository.findById(id).map(
                task -> {
                    task.setTitle(upd_task.getTitle().isEmpty() ? task.getTitle(): upd_task.getTitle());
                    task.setDescription(upd_task.getDescription().isEmpty() ? task.getDescription() : upd_task.getDescription());
                    task.setPriority(upd_task.getPriority() <= 0 ? task.getPriority(): upd_task.getPriority());
                    task.setStatus(upd_task.getStatus().equals("No Change") ? task.getStatus():upd_task.getStatus());
                    return taskRepository.save(task);
                }).orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findAllByStatus(status);
    }

    public List<Task> getTasksByPriority(Integer priority) {
        return taskRepository.findAllByPriority(priority);
    }

    public List<Task> getTasksByTitle(String keyword) {
        return taskRepository.findAllByTitle(keyword.toLowerCase());
    }
    public List<Task> getTasksByStatusAndPriority(String status, Integer priority) {
        return taskRepository.findAllByStatusAndPriority(status,priority);
    }
}
