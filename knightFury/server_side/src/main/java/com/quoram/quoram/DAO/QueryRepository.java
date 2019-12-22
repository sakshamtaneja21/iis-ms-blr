package com.quoram.quoram.DAO;

import com.quoram.quoram.Entity.Query;
import org.springframework.data.jpa.repository.JpaRepository;

//@RepositoryRestResource(path = "newPathInsteadOfemployees")
public interface QueryRepository extends JpaRepository<Query, Integer> {
}
