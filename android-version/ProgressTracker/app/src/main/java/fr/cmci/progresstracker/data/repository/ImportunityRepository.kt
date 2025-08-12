package fr.cmci.progresstracker.data.repository

import fr.cmci.progresstracker.data.dao.ImportunityDao
import fr.cmci.progresstracker.data.entity.Importunity
import kotlinx.coroutines.flow.Flow
import java.util.Date

class ImportunityRepository(
    private val importunityDao: ImportunityDao
) {
    suspend fun createImportunity(
        userId: Long,
        date: Date,
        subject: String,
        counter: Int
    ): Long {
        // Créer l'importunité
        val importunity = Importunity(
            userId = userId,
            date = date,
            subject = subject,
            counter = counter
        )
        return importunityDao.insertImportunity(importunity)
    }

    fun getAllImportunitiesForUser(userId: Long): Flow<List<Importunity>> {
        return importunityDao.getAllImportunitiesForUser(userId)
    }

    suspend fun deleteImportunity(importunityId: Long) {
        importunityDao.deleteImportunity(importunityId)
    }
}
