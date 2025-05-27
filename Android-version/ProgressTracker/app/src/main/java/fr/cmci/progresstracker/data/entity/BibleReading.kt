package fr.cmci.progresstracker.data.entity

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.PrimaryKey

@Entity(
    tableName = "bible_readings",
    foreignKeys = [
        ForeignKey(
            entity = DailyEntry::class,
            parentColumns = ["id"],
            childColumns = ["entryId"],
            onDelete = ForeignKey.CASCADE
        )
    ]
)
data class BibleReading(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val entryId: Long,
    val chaptersCount: Int,
    val chaptersTarget: Int,
    val chaptersList: String
)
