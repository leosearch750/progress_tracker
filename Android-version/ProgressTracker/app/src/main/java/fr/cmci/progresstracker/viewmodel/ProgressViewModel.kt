package fr.cmci.progresstracker.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import fr.cmci.progresstracker.data.repository.EntryRepository
import fr.cmci.progresstracker.data.repository.GoalRepository
import fr.cmci.progresstracker.util.ProgressCalculator
import kotlinx.coroutines.launch

class ProgressViewModel(
    private val entryRepository: EntryRepository,
    private val goalRepository: GoalRepository,
    private val progressCalculator: ProgressCalculator
) : ViewModel() {

    private val _progressData = MutableLiveData<ProgressData>()
    val progressData: LiveData<ProgressData> = _progressData

    fun loadProgress(userId: Long) {
        viewModelScope.launch {
            try {
                // Récupérer les objectifs annuels
                goalRepository.getCurrentYearGoal(userId).collect { goal ->
                    if (goal != null) {
                        // Récupérer les progrès actuels
                        val progress = entryRepository.getYearToDateProgress(userId)

                        // Calculer le pourcentage attendu à ce jour
                        val expectedProgress = progressCalculator.calculateExpectedProgress()

                        // Calculer les pourcentages de progression pour chaque aspect
                        val rdProgress = if (goal.rdTotal > 0) progress["rd"]!! / goal.rdTotal else 0f
                        val lbProgress = if (goal.lbTotal > 0) progress["lb"]!! / goal.lbTotal else 0f
                        val lcProgress = if (goal.lcTotal > 0) progress["lc"]!! / goal.lcTotal else 0f
                        val psProgress = if (goal.psTotal > 0) progress["ps"]!! / goal.psTotal else 0f

                        // Calculer la progression globale
                        val overallProgress = (rdProgress + lbProgress + lcProgress + psProgress) / 4

                        // Déterminer le statut de progression
                        val status = progressCalculator.calculateProgressStatus(overallProgress, expectedProgress)
                        val message = progressCalculator.getProgressMessage(status)

                        _progressData.value = ProgressData(
                            rdProgress = rdProgress,
                            lbProgress = lbProgress,
                            lcProgress = lcProgress,
                            psProgress = psProgress,
                            overallProgress = overallProgress,
                            expectedProgress = expectedProgress,
                            statusMessage = message
                        )
                    }
                }
            } catch (e: Exception) {
                // Gérer l'erreur
            }
        }
    }

    data class ProgressData(
        val rdProgress: Float,
        val lbProgress: Float,
        val lcProgress: Float,
        val psProgress: Float,
        val overallProgress: Float,
        val expectedProgress: Float,
        val statusMessage: String
    )
}