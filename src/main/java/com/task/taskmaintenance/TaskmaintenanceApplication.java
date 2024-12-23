package com.task.taskmaintenance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.task.model")
public class TaskmaintenanceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskmaintenanceApplication.class, args);
	}

}
