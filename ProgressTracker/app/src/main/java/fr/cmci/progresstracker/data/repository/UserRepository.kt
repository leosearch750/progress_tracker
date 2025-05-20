package fr.cmci.progresstracker.data.repository

import fr.cmci.progresstracker.data.dao.UserDao
import fr.cmci.progresstracker.data.entity.User
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.firstOrNull
import java.util.Date

class UserRepository(private val userDao: UserDao) {

    suspend fun registerUser(username: String, password: String): Long {
        val user = User(
            username = username,
            password = password, // Note: Dans une vraie app, il faudrait hasher le mot de passe
            creationDate = Date()
        )
        return userDao.insertUser(user)
    }

    suspend fun loginUser(username: String, password: String): User? {
        return userDao.getUserByCredentials(username, password)
    }

    fun getUserById(userId: Long): Flow<User> {
        return userDao.getUserById(userId)
    }

    suspend fun checkUserExists(userId: Long): Boolean {
        val userFlow = userDao.getUserById(userId)
        val user = userFlow.firstOrNull()
        return user != null
    }

}