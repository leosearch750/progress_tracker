package fr.cmci.progresstracker.data.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import fr.cmci.progresstracker.data.entity.ChristianReading
import kotlinx.coroutines.flow.Flow

@Dao
interface ChristianReadingDao {
    @Insert
    suspend fun insertReading(reading: ChristianReading): Long

    @Query("SELECT * FROM christian_readings WHERE entryId = :entryId")
    fun getReadingForEntry(entryId: Long): Flow<ChristianReading?>

    @Query("SELECT SUM(pagesCount) FROM christian_readings INNER JOIN daily_entries ON christian_readings.entryId = daily_entries.id WHERE daily_entries.userId = :userId AND daily_entries.date BETWEEN :startDate AND :endDate")
    suspend fun getTotalPagesForPeriod(userId: Long, startDate: java.util.Date, endDate: java.util.Date): Int?
}