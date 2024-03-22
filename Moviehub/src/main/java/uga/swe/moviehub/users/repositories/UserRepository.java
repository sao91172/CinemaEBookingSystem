package uga.swe.moviehub.users.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import uga.swe.moviehub.users.models.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE User u " +
            "SET u.active = true " +
            "WHERE u.email = ?1")
    void activateUser(String userEmail);

    @Transactional
    @Modifying
    @Query("UPDATE User u " +
            "SET u.password = ?2 " +
            "WHERE u.email = ?1")
    void changePassword(String email, String password);

    @Transactional
    @Modifying
    @Query("UPDATE User u " +
            "SET u.name = ?2 " +
            "WHERE u.email = ?1")
    void changeName(String email, String name);
}
