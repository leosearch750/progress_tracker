package fr.cmci.progresstracker.data.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import fr.cmci.progresstracker.data.entity.DailyEntry
import kotlinx.coroutines.flow.Flow
import java.util.Date

@Dao
interface DailyEntryDao {
    @Insert
    suspend fun insertEntry(entry: DailyEntry): Long

    @Query("SELECT * FROM daily_entries WHERE userId = :userId ORDER BY date DESC")
    fun getAllEntriesForUser(userId: Long): Flow<List<DailyEntry>>

    @Query("SELECT * FROM daily_entries WHERE userId = :userId AND date = :date LIMIT 1")
    suspend fun getEntryForDate(userId: Long, date: Date): DailyEntry?

    @Query("SELECT SUM(rdCompleted) FROM daily_entries WHERE userId = :userId AND date BETWEEN :startDate AND :endDate")
    suspend fun getTotalRdForPeriod(userId: Long, startDate: Date, endDate: Date): Int?

    @Query("SELECT SUM(psHours) FROM daily_entries WHERE userId = :userId AND date BETWEEN :startDate AND :endDate")
    suspend fun getTotalPsForPeriod(userId: Long, startDate: Date, endDate: Date): Float?

    @Query("DELETE FROM daily_entries WHERE id = :entryId")
    suspend fun deleteEntry(entryId: Long)
}