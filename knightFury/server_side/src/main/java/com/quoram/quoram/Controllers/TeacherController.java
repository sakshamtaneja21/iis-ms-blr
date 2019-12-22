package com.quoram.quoram.Controllers;


import com.quoram.quoram.DAO.QueryRepository;
import com.quoram.quoram.DAO.StudentRepository;
import com.quoram.quoram.DAO.TeacherRepository;
import com.quoram.quoram.Entity.Query;
import com.quoram.quoram.Entity.Student;
import com.quoram.quoram.Entity.Teacher;
import com.quoram.quoram.Services.ServicesInterface.TeacherServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private QueryRepository queryRepository;

    @Autowired
    private StudentRepository studentRepository;


    @Autowired
    private TeacherServices teacherServices;

    @GetMapping("/teachers")
    public List<Teacher> listTeachers() {
        return teacherRepository.findAll();
    }

    @GetMapping("/teacher/{id}")
    public Teacher getTeacher(@PathVariable int id) {
        return teacherRepository.getOne(id);
    }

    @DeleteMapping("/teacher/{id}")
    public String deleteTeacher(@PathVariable int id) {
        try {
            teacherRepository.deleteById(id);
            return HttpStatus.OK.toString() + " deleted the teacher succesfully";
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST.toString() + " error deleting the teacher";
        }
    }

    @PostMapping("/teacher")
    public String createTeacher(@RequestBody Teacher teacher) {
        try {
            teacherRepository.save(teacher);
            return HttpStatus.CREATED.toString() + " created the teacher succesfully";
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST.toString() + " error creating new teacher";
        }
    }

    @GetMapping("/get-suggested-teachers/{queryId}")
    public List<Teacher> getSuggestedTeachers(@PathVariable int queryId) throws Exception {

        try {
            Query query = queryRepository.getOne(queryId);
            String language = query.getLanguage();
            String subject = query.getSubject();
            int studentId = query.getStudentId();
            Student student = studentRepository.getOne(studentId);
            String studentEducation = student.getEducationLevel();

            return teacherServices.getSuggestedTeachersForAQuery(language, subject, studentEducation);

        } catch (Exception e) {
            throw new Exception("Error in the find suggested teachers api" + e.getMessage());
        }

    }

    @GetMapping("/accept-query-request/{queryId}/{teacherId}")
    public String acceptIncomingRequest(@PathVariable int queryId, @PathVariable int teacherId) {
        return teacherServices.acceptIncomingRequest(queryId, teacherId);
    }

    @GetMapping("list-interested-teachers/{queryId}")
    public List<Teacher> listInterestedTeachers(@PathVariable int queryId) {
        return teacherServices.listInterestedTeachers(queryId);
    }

    @GetMapping("select-teacher/{queryId}/{teacherId}")
    public String selectTeacher(@PathVariable int queryId, @PathVariable int teacherId) {
        return teacherServices.selectTeacher(queryId, teacherId);
    }

}
