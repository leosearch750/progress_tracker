package fr.cmci.progresstracker.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import fr.cmci.progresstracker.data.repository.GoalRepository
import fr.cmci.progresstracker.data.repository.UserRepository
import kotlinx.coroutines.launch

class RegisterViewModel(
    private val userRepository: UserRepository,
    private val goalRepository: GoalRepository
) : ViewModel() {

    private val _registrationResult = MutableLiveData<RegistrationResult>()
    val registrationResult: LiveData<RegistrationResult> = _registrationResult

    fun register(
        username: String,
        password: String,
        rdTotal: Int,
        lbTotal: Int,
        lcTotal: Int,
        psTotal: Float
    ) {
        viewModelScope.launch {
            try {
                // Créer l'utilisateur
                val userId = userRepository.registerUser(username, password)

                // Créer les objectifs annuels
                goalRepository.createAnnualGoal(
                    userId = userId,
                    rdTotal = rdTotal,
                    lbTotal = lbTotal,
                    lcTotal = lcTotal,
                    psTotal = psTotal
                )

                _registrationResult.value = RegistrationResult.Success(userId)
            } catch (e: Exception) {
                _registrationResult.value = RegistrationResult.Error("Erreur lors de l'inscription: ${e.message}")
            }
        }
    }

    sealed class RegistrationResult {
        data class Success(val userId: Long) : RegistrationResult()
        data class Error(val message: String) : RegistrationResult()
    }
}