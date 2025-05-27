package fr.cmci.progresstracker.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import fr.cmci.progresstracker.data.repository.UserRepository
import kotlinx.coroutines.launch

class LoginViewModel(private val userRepository: UserRepository) : ViewModel() {

    private val _loginResult = MutableLiveData<LoginResult>()
    val loginResult: LiveData<LoginResult> = _loginResult

    fun login(username: String, password: String) {
        viewModelScope.launch {
            val user = userRepository.loginUser(username, password)
            if (user != null) {
                _loginResult.value = LoginResult.Success(user.id)
            } else {
                _loginResult.value = LoginResult.Error("Nom d'utilisateur ou mot de passe incorrect")
            }
        }
    }

    sealed class LoginResult {
        data class Success(val userId: Long) : LoginResult()
        data class Error(val message: String) : LoginResult()
    }
}