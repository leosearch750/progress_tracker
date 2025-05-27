package fr.cmci.progresstracker.ui.importunity

import android.app.DatePickerDialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import fr.cmci.progresstracker.data.AppDatabase
import fr.cmci.progresstracker.data.repository.ImportunityRepository
import fr.cmci.progresstracker.databinding.FragmentImportunityBinding
import fr.cmci.progresstracker.util.PreferenceManager
import fr.cmci.progresstracker.viewmodel.ImportunityViewModel
import fr.cmci.progresstracker.viewmodel.ViewModelFactory
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

class ImportunityFragment : Fragment() {

    private var _binding: FragmentImportunityBinding? = null
    private val binding get() = _binding!!

    private lateinit var viewModel: ImportunityViewModel
    private lateinit var preferenceManager: PreferenceManager
    private var selectedDate: Date = Calendar.getInstance().time
    private val dateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
    private var counterValue = 0

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentImportunityBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        preferenceManager = PreferenceManager(requireContext())

        // Initialiser le ViewModel
        val database = AppDatabase.getDatabase(requireContext())
        val importunityRepository = ImportunityRepository(
            database.importunityDao()
        )

        viewModel = ViewModelProvider(
            this,
            ViewModelFactory { ImportunityViewModel(importunityRepository) }
        )[ImportunityViewModel::class.java]

        // Observer les résultats de création d'importunité
        viewModel.importunityResult.observe(viewLifecycleOwner) { result ->
            when (result) {
                is ImportunityViewModel.ImportunityResult.Success -> {
                    Toast.makeText(requireContext(), "Importunité enregistrée avec succès!", Toast.LENGTH_SHORT).show()
                    clearInputs()
                }
                is ImportunityViewModel.ImportunityResult.Error -> {
                    Toast.makeText(requireContext(), result.message, Toast.LENGTH_SHORT).show()
                }
            }
        }

        // Configurer le sélecteur de date
        updateDateButtonText()
        binding.buttonSelectDate.setOnClickListener {
            showDatePicker()
        }

        // Configurer les boutons d'incrémentation et de décrémentation
        binding.buttonIncrement.setOnClickListener {
            counterValue++
            updateCounterText()
        }

        binding.buttonDecrement.setOnClickListener {
            if (counterValue > 0) {
                counterValue--
                updateCounterText()
            }
        }

        // Configurer le bouton d'enregistrement
        binding.buttonSaveImportunity.setOnClickListener {
            if (validateInputs()) {
                saveImportunity()
            }
        }
    }

    private fun updateDateButtonText() {
        binding.buttonSelectDate.text = dateFormat.format(selectedDate)
    }

    private fun updateCounterText() {
        binding.textViewCounter.text = counterValue.toString()
    }

    private fun showDatePicker() {
        val calendar = Calendar.getInstance()
        calendar.time = selectedDate

        val year = calendar.get(Calendar.YEAR)
        val month = calendar.get(Calendar.MONTH)
        val day = calendar.get(Calendar.DAY_OF_MONTH)

        DatePickerDialog(requireContext(), { _, selectedYear, selectedMonth, selectedDay ->
            calendar.set(selectedYear, selectedMonth, selectedDay)
            selectedDate = calendar.time
            updateDateButtonText()
        }, year, month, day).show()
    }

    private fun validateInputs(): Boolean {
        // Vérifier que le sujet est rempli
        if (binding.editTextSubject.text.isNullOrBlank()) {
            Toast.makeText(requireContext(), "Veuillez entrer un sujet", Toast.LENGTH_SHORT).show()
            return false
        }

        return true
    }

    private fun saveImportunity() {
        val userId = preferenceManager.getUserId()
        if (userId == -1L) {
            Toast.makeText(requireContext(), "Erreur: utilisateur non connecté", Toast.LENGTH_SHORT).show()
            return
        }

        val subject = binding.editTextSubject.text.toString()

        viewModel.createImportunity(
            userId = userId,
            date = selectedDate,
            subject = subject,
            counter = counterValue
        )
    }

    private fun clearInputs() {
        binding.editTextSubject.text.clear()
        counterValue = 0
        updateCounterText()

        // Réinitialiser la date à aujourd'hui
        selectedDate = Calendar.getInstance().time
        updateDateButtonText()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
