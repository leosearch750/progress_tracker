package fr.cmci.progresstracker.ui.auth

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import fr.cmci.progresstracker.MainActivity
import fr.cmci.progresstracker.data.AppDatabase
import fr.cmci.progresstracker.data.repository.UserRepository
import fr.cmci.progresstracker.viewmodel.LoginViewModel
import fr.cmci.progresstracker.viewmodel.ViewModelFactory
import fr.cmci.progresstracker.util.PreferenceManager
import fr.cmci.progresstracker.databinding.ActivityLoginBinding
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var viewModel: LoginViewModel
    private lateinit var preferenceManager: PreferenceManager
    private lateinit var userRepository: UserRepository

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        preferenceManager = PreferenceManager(this)

        // Initialiser le repository et le ViewModel
        val userDao = AppDatabase.getDatabase(this).userDao()
        userRepository = UserRepository(userDao)
        viewModel = ViewModelProvider(
            this,
            ViewModelFactory { LoginViewModel(userRepository) }
        )[LoginViewModel::class.java]

        // Vérifier si l'utilisateur est déjà connecté et existe dans la base de données
        if (preferenceManager.isLoggedIn()) {
            val userId = preferenceManager.getUserId()
            Log.d("LoginActivity", "Utilisateur potentiellement connecté avec ID: $userId")

            // Vérifier si l'utilisateur existe réellement dans la base de données
            lifecycleScope.launch {
                val userExists = userRepository.checkUserExists(userId)
                if (userExists) {
                    Log.d("LoginActivity", "Utilisateur vérifié, navigation vers MainActivity")
                    navigateToMainActivity()
                } else {
                    Log.d("LoginActivity", "Utilisateur non trouvé dans la base, déconnexion")
                    // L'utilisateur n'existe pas, réinitialiser les préférences
                    preferenceManager.logout()
                    Toast.makeText(this@LoginActivity, "Session expirée, veuillez vous reconnecter", Toast.LENGTH_SHORT).show()
                }
            }
        } else {
            Log.d("LoginActivity", "Aucun utilisateur connecté")
        }

        // Observer les résultats de connexion
        viewModel.loginResult.observe(this) { result ->
            when (result) {
                is LoginViewModel.LoginResult.Success -> {
                    Log.d("LoginActivity", "Connexion réussie avec ID: ${result.userId}")
                    preferenceManager.saveUserId(result.userId)
                    navigateToMainActivity()
                }
                is LoginViewModel.LoginResult.Error -> {
                    Log.e("LoginActivity", "Erreur de connexion: ${result.message}")
                    Toast.makeText(this, result.message, Toast.LENGTH_SHORT).show()
                }
            }
        }

        // Configurer les boutons
        binding.buttonLogin.setOnClickListener {
            val username = binding.editTextUsername.text.toString()
            val password = binding.editTextPassword.text.toString()

            if (username.isBlank() || password.isBlank()) {
                Toast.makeText(this, "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            Log.d("LoginActivity", "Tentative de connexion avec username: $username")
            viewModel.login(username, password)
        }

        binding.buttonRegister.setOnClickListener {
            Log.d("LoginActivity", "Navigation vers RegisterActivity")
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun navigateToMainActivity() {
        Log.d("LoginActivity", "Démarrage de MainActivity")
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}
