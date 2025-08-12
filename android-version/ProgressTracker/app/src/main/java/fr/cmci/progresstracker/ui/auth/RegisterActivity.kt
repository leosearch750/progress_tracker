package fr.cmci.progresstracker.ui.auth

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat.startActivity
import androidx.lifecycle.ViewModelProvider
import fr.cmci.progresstracker.MainActivity
import fr.cmci.progresstracker.data.AppDatabase
import fr.cmci.progresstracker.data.repository.GoalRepository
import fr.cmci.progresstracker.data.repository.UserRepository
import fr.cmci.progresstracker.viewmodel.RegisterViewModel
import fr.cmci.progresstracker.viewmodel.ViewModelFactory
import fr.cmci.progresstracker.util.PreferenceManager
import fr.cmci.progresstracker.databinding.ActivityLoginBinding
import fr.cmci.progresstracker.databinding.ActivityRegisterBinding

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private lateinit var viewModel: RegisterViewModel
    private lateinit var preferenceManager: PreferenceManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        preferenceManager = PreferenceManager(this)

        // Initialiser le ViewModel
        val database = AppDatabase.getDatabase(this)
        val userRepository = UserRepository(database.userDao())
        val goalRepository = GoalRepository(database.annualGoalDao())
        viewModel = ViewModelProvider(
            this,
            ViewModelFactory { RegisterViewModel(userRepository, goalRepository) }
        )[RegisterViewModel::class.java]

        // Observer les résultats d'inscription
        viewModel.registrationResult.observe(this) { result ->
            when (result) {
                is RegisterViewModel.RegistrationResult.Success -> {
                    preferenceManager.saveUserId(result.userId)
                    Toast.makeText(this, "Inscription réussie!", Toast.LENGTH_SHORT).show()
                    navigateToMainActivity()
                }
                is RegisterViewModel.RegistrationResult.Error -> {
                    Toast.makeText(this, result.message, Toast.LENGTH_SHORT).show()
                }
            }
        }

        // Configurer le bouton d'inscription
        binding.buttonRegister.setOnClickListener {
            if (validateInputs()) {
                registerUser()
            }
        }
    }

    private fun validateInputs(): Boolean {
        val username = binding.editTextUsername.text.toString()
        val password = binding.editTextPassword.text.toString()
        val rdTotal = binding.editTextRDTotal.text.toString()
        val lbTotal = binding.editTextLBTotal.text.toString()
        val lcTotal = binding.editTextLCTotal.text.toString()
        val psTotal = binding.editTextPSTotal.text.toString()

        if (username.isBlank() || password.isBlank() || rdTotal.isBlank() ||
            lbTotal.isBlank() || lcTotal.isBlank() || psTotal.isBlank()
        ) {
            Toast.makeText(this, "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show()
            return false
        }

        // Vérifier que les valeurs numériques sont valides
        try {
            rdTotal.toInt()
            lbTotal.toInt()
            lcTotal.toInt()
            psTotal.toFloat()
        } catch (e: NumberFormatException) {
            Toast.makeText(this, "Veuillez entrer des valeurs numériques valides", Toast.LENGTH_SHORT).show()
            return false
        }

        return true
    }

    private fun registerUser() {
        try {
            val username = binding.editTextUsername.text.toString()
            val password = binding.editTextPassword.text.toString()
            val rdTotal = binding.editTextRDTotal.text.toString().toInt()
            val lbTotal = binding.editTextLBTotal.text.toString().toInt()
            val lcTotal = binding.editTextLCTotal.text.toString().toInt()
            val psTotal = binding.editTextPSTotal.text.toString().toFloat()

            viewModel.register(username, password, rdTotal, lbTotal, lcTotal, psTotal)
        } catch (e: NumberFormatException) {
            Toast.makeText(this, "Erreur: Veuillez entrer des valeurs numériques valides", Toast.LENGTH_LONG).show()
        } catch (e: Exception) {
            Toast.makeText(this, "Erreur lors de l'inscription: ${e.message}", Toast.LENGTH_LONG).show()
        }
    }

    private fun navigateToMainActivity() {
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}
