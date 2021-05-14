package com.moviekioskicrm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moviekioskicrm.model.Clients;


@Repository
public interface RentedMoviesRepository extends JpaRepository<Clients, Long> {
	
	@Query(value = "SELECT c FROM Clients c WHERE c.returned = false AND c.client_id = :client_id")
    Optional<Clients> findByIdAndReturnedIsFalse(@Param("client_id") long clientId);

}
