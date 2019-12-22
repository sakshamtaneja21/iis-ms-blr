package com.quoram.quoram.DAO;

import com.quoram.quoram.Entity.Student;
import com.quoram.quoram.Entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
}
