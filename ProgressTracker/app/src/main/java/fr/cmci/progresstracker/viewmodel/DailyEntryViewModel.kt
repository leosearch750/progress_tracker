package fr.cmci.progresstracker.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import fr.cmci.progresstracker.data.repository.EntryRepository
import kotlinx.coroutines.launch
import java.util.Date

class DailyEntryViewModel(private val entryRepository: EntryRepository) : ViewModel() {

    private val _entryResult = MutableLiveData<EntryResult>()
    val entryResult: LiveData<EntryResult> = _entryResult

    fun createEntry(
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
    ) {
        viewModelScope.launch {
            try {
                val entryId = entryRepository.createDailyEntry(
                    userId = userId,
                    date = date,
                    rdCompleted = rdCompleted,
                    rdTarget = rdTarget,
                    psHours = psHours,
                    psTarget = psTarget,
                    lbChaptersCount = lbChaptersCount,
                    lbChaptersTarget = lbChaptersTarget,
                    lbChaptersList = lbChaptersList,
                    lcPagesCount = lcPagesCount,
                    lcBookName = lcBookName
                )
                _entryResult.value = EntryResult.Success(entryId)
            } catch (e: Exception) {
                _entryResult.value = EntryResult.Error("Erreur lors de la création de l'entrée: ${e.message}")
            }
        }
    }

    sealed class EntryResult {
        data class Success(val entryId: Long) : EntryResult()
        data class Error(val message: String) : EntryResult()
    }
}