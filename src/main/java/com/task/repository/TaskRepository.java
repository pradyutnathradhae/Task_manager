package com.task.repository;

import com.task.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

//Adding annotation - not needed since sinch spring will auto add.
@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

    //Adding few customized repository function to be used in service layer
    @Query("select t from Task t where t.status = :status")
    List<Task> findAllByStatus(@Param("status") String status);

    @Query("select t from Task t where t.priority = :priority")
    List<Task> findAllByPriority(@Param("priority") String priority);

    @Query("select t from Task t where t.title LIKE %:keyword%")
    List<Task> findAllByTitle(@Param("keyword") String keyword);
}
