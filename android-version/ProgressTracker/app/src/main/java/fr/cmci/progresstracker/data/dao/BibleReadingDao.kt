package fr.cmci.progresstracker.data.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import fr.cmci.progresstracker.data.entity.BibleReading
import kotlinx.coroutines.flow.Flow

@Dao
interface BibleReadingDao {
    @Insert
    suspend fun insertReading(reading: BibleReading): Long

    @Query("SELECT * FROM bible_readings WHERE entryId = :entryId")
    fun getReadingForEntry(entryId: Long): Flow<BibleReading?>

    @Query("SELECT SUM(chaptersCount) FROM bible_readings INNER JOIN daily_entries ON bible_readings.entryId = daily_entries.id WHERE daily_entries.userId = :userId AND daily_entries.date BETWEEN :startDate AND :endDate")
    suspend fun getTotalChaptersForPeriod(userId: Long, startDate: java.util.Date, endDate: java.util.Date): Int?
}