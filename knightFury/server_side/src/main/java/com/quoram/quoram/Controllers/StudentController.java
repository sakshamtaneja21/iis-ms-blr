package com.quoram.quoram.Controllers;

import com.quoram.quoram.DAO.StudentRepository;
import com.quoram.quoram.Entity.Query;
import com.quoram.quoram.Entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;


    @GetMapping("/student/{id}")
    public Student getStudent(@PathVariable int id) {
        return studentRepository.getOne(id);
    }

    @GetMapping("/students")
    public List<Student> listStudents() {
        return studentRepository.findAll();
    }

    @DeleteMapping("/student/{id}")
    public String deleteStudent(@PathVariable int id) {

        try {
            studentRepository.deleteById(id);
            return HttpStatus.OK.toString() + " deleted the student succesfully";
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST.toString() + " error deleting the student";
        }
    }

    @PostMapping("/student")
    public String createStudent(@RequestBody Student student) {
        try {
            studentRepository.save(student);
            return HttpStatus.CREATED.toString() + " Student created succesfully";
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST.toString() + " failed to create a Student";
        }
    }

}
