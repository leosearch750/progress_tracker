package fr.cmci.progresstracker

import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import fr.cmci.progresstracker.util.PreferenceManager
import fr.cmci.progresstracker.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var preferenceManager: PreferenceManager
    private lateinit var navController: NavController

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Activer edge-to-edge avant d'inflater la vue
        enableEdgeToEdge()

        // Inflater la vue une seule fois avec ViewBinding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Initialiser le PreferenceManager
        preferenceManager = PreferenceManager(this)

        // Configurer la Toolbar
        setSupportActionBar(binding.toolbar)

        // Configurer les insets de fenêtre
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Configurer la navigation après que la vue soit complètement initialisée
        try {
            Log.d("MainActivity", "Initialisation de la navigation")

            // Obtenir le NavHostFragment et le NavController
            val navHostFragment = supportFragmentManager
                .findFragmentById(R.id.nav_host_fragment) as NavHostFragment
            navController = navHostFragment.navController

            Log.d("MainActivity", "Navigation initialisée avec succès")
        } catch (e: Exception) {
            // Gérer l'exception si le fragment de navigation n'est pas trouvé
            Log.e("MainActivity", "Erreur lors de l'initialisation de la navigation", e)
            e.printStackTrace()
        }
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflater le menu déroulant
        menuInflater.inflate(R.menu.dropdown_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Gérer les clics sur les éléments du menu déroulant
        return when (item.itemId) {
            R.id.navigation_dashboard -> {
                navController.navigate(R.id.navigation_dashboard)
                true
            }
            R.id.navigation_entry -> {
                navController.navigate(R.id.navigation_entry)
                true
            }
            R.id.navigation_importunity -> {
                navController.navigate(R.id.navigation_importunity)
                true
            }
            R.id.navigation_history -> {
                navController.navigate(R.id.navigation_history)
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
}
