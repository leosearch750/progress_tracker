package fr.cmci.progresstracker.data.repository

import fr.cmci.progresstracker.data.dao.BibleReadingDao
import fr.cmci.progresstracker.data.dao.ChristianReadingDao
import fr.cmci.progresstracker.data.dao.DailyEntryDao
import fr.cmci.progresstracker.data.entity.BibleReading
import fr.cmci.progresstracker.data.entity.ChristianReading
import fr.cmci.progresstracker.data.entity.DailyEntry
import kotlinx.coroutines.flow.Flow
import java.util.Calendar
import java.util.Date

class EntryRepository(
    private val dailyEntryDao: DailyEntryDao,
    private val bibleReadingDao: BibleReadingDao,
    private val christianReadingDao: ChristianReadingDao
) {

    suspend fun createDailyEntry(
        userId: Long,
        date: Date,
        rdCompleted: Int,
        rdTarget: Int,
        psHours: Float,
        psTarget: Float,
        lbChaptersCount: Int,
        lbChaptersTarget: Int,
        lbChaptersList: String,
        lcPagesCount: Int,
        lcBookName: String
    ): Long {
        // Créer l'entrée quotidienne
        val entry = DailyEntry(
            userId = userId,
            date = date,
            rdCompleted = rdCompleted,
            rdTarget = rdTarget,
            psHours = psHours,
            psTarget = psTarget
        )
        val entryId = dailyEntryDao.insertEntry(entry)

        // Créer la lecture biblique associée
        val bibleReading = BibleReading(
            entryId = entryId,
            chaptersCount = lbChaptersCount,
            chaptersTarget = lbChaptersTarget,
            chaptersList = lbChaptersList
        )
        bibleReadingDao.insertReading(bibleReading)

        // Créer la lecture chrétienne associée
        val christianReading = ChristianReading(
            entryId = entryId,
            pagesCount = lcPagesCount,
            bookName = lcBookName
        )
        christianReadingDao.insertReading(christianReading)

        return entryId
    }

    fun getAllEntriesForUser(userId: Long): Flow<List<DailyEntry>> {
        return dailyEntryDao.getAllEntriesForUser(userId)
    }

    fun getBibleReadingForEntry(entryId: Long): Flow<BibleReading?> {
        return bibleReadingDao.getReadingForEntry(entryId)
    }

    fun getChristianReadingForEntry(entryId: Long): Flow<ChristianReading?> {
        return christianReadingDao.getReadingForEntry(entryId)
    }

    suspend fun deleteEntry(entryId: Long) {
        // Supprimer les lectures associées
        // La suppression en cascade est configurée dans les entités, donc la suppression
        // de l'entrée principale entraînera automatiquement la suppression des lectures associées
        dailyEntryDao.deleteEntry(entryId)
    }

    suspend fun getYearToDateProgress(userId: Long): Map<String, Float> {
        val calendar = Calendar.getInstance()
        val currentYear = calendar.get(Calendar.YEAR)

        // Début de l'année
        val startCalendar = Calendar.getInstance()
        startCalendar.set(currentYear, Calendar.JANUARY, 1, 0, 0, 0)
        val startDate = startCalendar.time

        // Date actuelle
        val endDate = calendar.time

        // Récupérer les totaux pour chaque aspect
        val rdTotal = dailyEntryDao.getTotalRdForPeriod(userId, startDate, endDate) ?: 0
        val lbTotal = bibleReadingDao.getTotalChaptersForPeriod(userId, startDate, endDate) ?: 0
        val lcTotal = christianReadingDao.getTotalPagesForPeriod(userId, startDate, endDate) ?: 0
        val psTotal = dailyEntryDao.getTotalPsForPeriod(userId, startDate, endDate) ?: 0f

        return mapOf(
            "rd" to rdTotal.toFloat(),
            "lb" to lbTotal.toFloat(),
            "lc" to lcTotal.toFloat(),
            "ps" to psTotal
        )
    }
}