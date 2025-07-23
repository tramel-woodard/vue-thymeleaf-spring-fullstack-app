package com.demo.vuethymespring.controller;

import com.demo.vuethymespring.model.Todo;
import com.demo.vuethymespring.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    
    @Autowired
    private TodoRepository repository;

    @GetMapping
    public List<Todo> getAllTodos() {
        return repository.findAll();
    }

    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return repository.save(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
