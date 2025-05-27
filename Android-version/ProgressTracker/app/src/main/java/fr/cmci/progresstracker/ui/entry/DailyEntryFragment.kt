package fr.cmci.progresstracker.ui.entry

import android.app.DatePickerDialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import fr.cmci.progresstracker.data.AppDatabase
import fr.cmci.progresstracker.data.repository.EntryRepository
import fr.cmci.progresstracker.databinding.FragmentDailyEntryBinding
import fr.cmci.progresstracker.viewmodel.DailyEntryViewModel
import fr.cmci.progresstracker.viewmodel.ViewModelFactory
import fr.cmci.progresstracker.util.PreferenceManager
// import fr.cmci.progresstracker.databinding.ActivityLoginBinding
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

class DailyEntryFragment : Fragment() {

    private var _binding: FragmentDailyEntryBinding? = null
    private val binding get() = _binding!!

    private lateinit var viewModel: DailyEntryViewModel
    private lateinit var preferenceManager: PreferenceManager
    private var selectedDate: Date = Calendar.getInstance().time
    private val dateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentDailyEntryBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        preferenceManager = PreferenceManager(requireContext())

        // Initialiser le ViewModel
        val database = AppDatabase.getDatabase(requireContext())
        val entryRepository = EntryRepository(
            database.dailyEntryDao(),
            database.bibleReadingDao(),
            database.christianReadingDao()
        )

        viewModel = ViewModelProvider(
            this,
            ViewModelFactory { DailyEntryViewModel(entryRepository) }
        )[DailyEntryViewModel::class.java]

        // Observer les résultats de création d'entrée
        viewModel.entryResult.observe(viewLifecycleOwner) { result ->
            when (result) {
                is DailyEntryViewModel.EntryResult.Success -> {
                    Toast.makeText(requireContext(), "Entrée enregistrée avec succès!", Toast.LENGTH_SHORT).show()
                    clearInputs()
                }
                is DailyEntryViewModel.EntryResult.Error -> {
                    Toast.makeText(requireContext(), result.message, Toast.LENGTH_SHORT).show()
                }
            }
        }

        // Configurer le sélecteur de date
        updateDateButtonText()
        binding.buttonSelectDate.setOnClickListener {
            showDatePicker()
        }

        // Configurer le bouton d'enregistrement
        binding.buttonSaveEntry.setOnClickListener {
            if (validateInputs()) {
                saveEntry()
            }
        }
    }

    private fun updateDateButtonText() {
        binding.buttonSelectDate.text = dateFormat.format(selectedDate)
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
        // Vérifier que les champs obligatoires sont remplis
        if (binding.editTextRDCompleted.text.isNullOrBlank() ||
            binding.editTextRDTarget.text.isNullOrBlank() ||
            binding.editTextLBCompleted.text.isNullOrBlank() ||
            binding.editTextLBTarget.text.isNullOrBlank() ||
            binding.editTextLBChapters.text.isNullOrBlank() ||
            binding.editTextLCPages.text.isNullOrBlank() ||
            binding.editTextLCBook.text.isNullOrBlank() ||
            binding.editTextPSHours.text.isNullOrBlank() ||
            binding.editTextPSTarget.text.isNullOrBlank()
        ) {
            Toast.makeText(requireContext(), "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show()
            return false
        }

        return true
    }

    private fun saveEntry() {
        val userId = preferenceManager.getUserId()
        if (userId == -1L) {
            Toast.makeText(requireContext(), "Erreur: utilisateur non connecté", Toast.LENGTH_SHORT).show()
            return
        }

        val rdCompleted = binding.editTextRDCompleted.text.toString().toInt()
        val rdTarget = binding.editTextRDTarget.text.toString().toInt()
        val lbCompleted = binding.editTextLBCompleted.text.toString().toInt()
        val lbTarget = binding.editTextLBTarget.text.toString().toInt()
        val lbChapters = binding.editTextLBChapters.text.toString()
        val lcPages = binding.editTextLCPages.text.toString().toInt()
        val lcBook = binding.editTextLCBook.text.toString()
        val psHours = binding.editTextPSHours.text.toString().toFloat()
        val psTarget = binding.editTextPSTarget.text.toString().toFloat()

        viewModel.createEntry(
            userId = userId,
            date = selectedDate,
            rdCompleted = rdCompleted,
            rdTarget = rdTarget,
            psHours = psHours,
            psTarget = psTarget,
            lbChaptersCount = lbCompleted,
            lbChaptersTarget = lbTarget,
            lbChaptersList = lbChapters,
            lcPagesCount = lcPages,
            lcBookName = lcBook
        )
    }

    private fun clearInputs() {
        binding.editTextRDCompleted.text.clear()
        binding.editTextRDTarget.text.clear()
        binding.editTextLBCompleted.text.clear()
        binding.editTextLBTarget.text.clear()
        binding.editTextLBChapters.text.clear()
        binding.editTextLCPages.text.clear()
        binding.editTextLCBook.text.clear()
        binding.editTextPSHours.text.clear()
        binding.editTextPSTarget.text.clear()

        // Réinitialiser la date à aujourd'hui
        selectedDate = Calendar.getInstance().time
        updateDateButtonText()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}