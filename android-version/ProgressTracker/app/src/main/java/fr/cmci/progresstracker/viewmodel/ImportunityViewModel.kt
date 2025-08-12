package fr.cmci.progresstracker.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import fr.cmci.progresstracker.data.repository.ImportunityRepository
import kotlinx.coroutines.launch
import java.util.Date

class ImportunityViewModel(
    private val importunityRepository: ImportunityRepository
) : ViewModel() {

    private val _importunityResult = MutableLiveData<ImportunityResult>()
    val importunityResult: LiveData<ImportunityResult> = _importunityResult

    fun createImportunity(
        userId: Long,
        date: Date,
        subject: String,
        counter: Int
    ) {
        viewModelScope.launch {
            try {
                val importunityId = importunityRepository.createImportunity(
                    userId = userId,
                    date = date,
                    subject = subject,
                    counter = counter
                )
                _importunityResult.postValue(ImportunityResult.Success(importunityId))
            } catch (e: Exception) {
                _importunityResult.postValue(ImportunityResult.Error("Erreur lors de l'enregistrement: ${e.message}"))
            }
        }
    }

    sealed class ImportunityResult {
        data class Success(val importunityId: Long) : ImportunityResult()
        data class Error(val message: String) : ImportunityResult()
    }
}
