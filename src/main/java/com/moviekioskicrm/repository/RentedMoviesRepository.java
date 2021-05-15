package com.moviekioskicrm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moviekioskicrm.model.Clients;


@Repository //is a Spring annotation that indicates that the decorated class is a repository. A repository is a mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects.
public interface RentedMoviesRepository extends JpaRepository<Clients, Long> {
	
	//this is the only custom query that we needed so select the movies with a false fild tha represents that it has not been returned
	@Query(value = "SELECT c FROM Clients c WHERE c.returned = false AND c.client_id = :client_id")
    Optional<Clients> findByIdAndReturnedIsFalse(@Param("client_id") long clientId);

}
