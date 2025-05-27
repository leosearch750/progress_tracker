package fr.cmci.progresstracker.data.entity

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.PrimaryKey

@Entity(
    tableName = "christian_readings",
    foreignKeys = [
        ForeignKey(
            entity = DailyEntry::class,
            parentColumns = ["id"],
            childColumns = ["entryId"],
            onDelete = ForeignKey.CASCADE
        )
    ]
)
data class ChristianReading(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val entryId: Long,
    val pagesCount: Int,
    val bookName: String
)
