package fr.cmci.progresstracker.ui.dashboard

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import fr.cmci.progresstracker.data.AppDatabase
import fr.cmci.progresstracker.data.repository.EntryRepository
import fr.cmci.progresstracker.data.repository.GoalRepository
import fr.cmci.progresstracker.util.PreferenceManager
import fr.cmci.progresstracker.util.ProgressCalculator
import fr.cmci.progresstracker.viewmodel.ProgressViewModel
import fr.cmci.progresstracker.viewmodel.ViewModelFactory
import fr.cmci.progresstracker.databinding.ActivityLoginBinding
import fr.cmci.progresstracker.databinding.FragmentDashboardBinding

class DashboardFragment : Fragment() {

    private var _binding: FragmentDashboardBinding? = null
    private val binding get() = _binding!!

    private lateinit var viewModel: ProgressViewModel
    private lateinit var preferenceManager: PreferenceManager

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentDashboardBinding.inflate(inflater, container, false)
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
        val goalRepository = GoalRepository(database.annualGoalDao())
        val progressCalculator = ProgressCalculator()

        viewModel = ViewModelProvider(
            this,
            ViewModelFactory { ProgressViewModel(entryRepository, goalRepository, progressCalculator) }
        )[ProgressViewModel::class.java]

        // Observer les données de progression
        viewModel.progressData.observe(viewLifecycleOwner) { data ->
            updateUI(data)
        }

        // Charger les données de progression
        val userId = preferenceManager.getUserId()
        if (userId != -1L) {
            viewModel.loadProgress(userId)
        }
    }

    private fun updateUI(data: ProgressViewModel.ProgressData) {
        // Mettre à jour la progression globale
        val overallProgressPercent = (data.overallProgress * 100).toInt()
        binding.textViewOverallProgress.text = "Progression globale: $overallProgressPercent%"
        binding.progressBarOverall.progress = overallProgressPercent

        // Mettre à jour le message de statut
        binding.textViewStatusMessage.text = data.statusMessage

        // Mettre à jour les progressions par aspect
        val rdProgressPercent = (data.rdProgress * 100).toInt()
        binding.textViewRDProgress.text = "$rdProgressPercent%"
        binding.progressBarRD.progress = rdProgressPercent

        val lbProgressPercent = (data.lbProgress * 100).toInt()
        binding.textViewLBProgress.text = "$lbProgressPercent%"
        binding.progressBarLB.progress = lbProgressPercent

        val lcProgressPercent = (data.lcProgress * 100).toInt()
        binding.textViewLCProgress.text = "$lcProgressPercent%"
        binding.progressBarLC.progress = lcProgressPercent

        val psProgressPercent = (data.psProgress * 100).toInt()
        binding.textViewPSProgress.text = "$psProgressPercent%"
        binding.progressBarPS.progress = psProgressPercent
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}