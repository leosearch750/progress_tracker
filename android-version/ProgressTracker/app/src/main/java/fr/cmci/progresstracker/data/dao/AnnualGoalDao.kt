package fr.cmci.progresstracker.data.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import fr.cmci.progresstracker.data.entity.AnnualGoal
import kotlinx.coroutines.flow.Flow

@Dao
interface AnnualGoalDao {
    @Insert
    suspend fun insertGoal(goal: AnnualGoal): Long

    @Update
    suspend fun updateGoal(goal: AnnualGoal)

    @Query("SELECT * FROM annual_goals WHERE userId = :userId AND year = :year LIMIT 1")
    fun getGoalForYear(userId: Long, year: Int): Flow<AnnualGoal>
}