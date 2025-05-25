package fr.cmci.progresstracker.data.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import fr.cmci.progresstracker.data.entity.Importunity
import kotlinx.coroutines.flow.Flow
import java.util.Date

@Dao
interface ImportunityDao {
    @Insert
    suspend fun insertImportunity(importunity: Importunity): Long

    @Query("SELECT * FROM importunities WHERE userId = :userId ORDER BY date DESC")
    fun getAllImportunitiesForUser(userId: Long): Flow<List<Importunity>>

    @Query("DELETE FROM importunities WHERE id = :importunityId")
    suspend fun deleteImportunity(importunityId: Long)
}
