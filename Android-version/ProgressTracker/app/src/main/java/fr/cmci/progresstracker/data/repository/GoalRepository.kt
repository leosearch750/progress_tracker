package fr.cmci.progresstracker.data.repository

import fr.cmci.progresstracker.data.dao.AnnualGoalDao
import fr.cmci.progresstracker.data.entity.AnnualGoal
import kotlinx.coroutines.flow.Flow
import java.util.Calendar

class GoalRepository(private val goalDao: AnnualGoalDao) {

    suspend fun createAnnualGoal(
        userId: Long,
        rdTotal: Int,
        lbTotal: Int,
        lcTotal: Int,
        psTotal: Float
    ): Long {
        val currentYear = Calendar.getInstance().get(Calendar.YEAR)
        val goal = AnnualGoal(
            userId = userId,
            year = currentYear,
            rdTotal = rdTotal,
            lbTotal = lbTotal,
            lcTotal = lcTotal,
            psTotal = psTotal
        )
        return goalDao.insertGoal(goal)
    }

    fun getCurrentYearGoal(userId: Long): Flow<AnnualGoal?> {
        val currentYear = Calendar.getInstance().get(Calendar.YEAR)
        return goalDao.getGoalForYear(userId, currentYear)
    }
}