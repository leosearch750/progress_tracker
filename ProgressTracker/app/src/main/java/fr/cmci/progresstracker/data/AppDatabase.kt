package fr.cmci.progresstracker.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import fr.cmci.progresstracker.data.dao.AnnualGoalDao
import fr.cmci.progresstracker.data.dao.BibleReadingDao
import fr.cmci.progresstracker.data.dao.ChristianReadingDao
import fr.cmci.progresstracker.data.dao.DailyEntryDao
import fr.cmci.progresstracker.data.dao.UserDao
import fr.cmci.progresstracker.data.entity.AnnualGoal
import fr.cmci.progresstracker.data.entity.BibleReading
import fr.cmci.progresstracker.data.entity.ChristianReading
import fr.cmci.progresstracker.data.entity.DailyEntry
import fr.cmci.progresstracker.data.entity.User

@Database(
    entities = [
        User::class,
        AnnualGoal::class,
        DailyEntry::class,
        BibleReading::class,
        ChristianReading::class
    ],
    version = 1,
    exportSchema = false
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {

    abstract fun userDao(): UserDao
    abstract fun annualGoalDao(): AnnualGoalDao
    abstract fun dailyEntryDao(): DailyEntryDao
    abstract fun bibleReadingDao(): BibleReadingDao
    abstract fun christianReadingDao(): ChristianReadingDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "progress_tracker_database"
                )
                    .fallbackToDestructiveMigration()
                    .build()
                INSTANCE = instance
                instance
            }
        }
    }
}