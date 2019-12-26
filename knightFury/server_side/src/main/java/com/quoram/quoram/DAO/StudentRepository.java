package com.quoram.quoram.DAO;

import com.quoram.quoram.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

    //@RepositoryRestResource(path = "newPathInsteadOfemployees")
    public interface StudentRepository extends JpaRepository<Student, Integer> {
    }
