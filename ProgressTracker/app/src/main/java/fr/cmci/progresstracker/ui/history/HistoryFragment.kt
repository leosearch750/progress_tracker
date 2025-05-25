package fr.cmci.progresstracker.ui.history

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import fr.cmci.progresstracker.data.AppDatabase
import fr.cmci.progresstracker.data.entity.BibleReading
import fr.cmci.progresstracker.data.entity.ChristianReading
import fr.cmci.progresstracker.data.entity.DailyEntry
import fr.cmci.progresstracker.data.entity.Importunity
import fr.cmci.progresstracker.data.repository.EntryRepository
import fr.cmci.progresstracker.data.repository.ImportunityRepository
import fr.cmci.progresstracker.util.PreferenceManager
import fr.cmci.progresstracker.databinding.ActivityLoginBinding
import fr.cmci.progresstracker.databinding.FragmentHistoryBinding
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Locale

class HistoryFragment : Fragment() {

    private var _binding: FragmentHistoryBinding? = null
    private val binding get() = _binding!!

    private lateinit var adapter: HistoryAdapter
    private lateinit var importunityAdapter: ImportunityAdapter
    private lateinit var preferenceManager: PreferenceManager
    private lateinit var entryRepository: EntryRepository
    private lateinit var importunityRepository: ImportunityRepository
    private val dateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHistoryBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        preferenceManager = PreferenceManager(requireContext())

        // Initialiser les repositories
        val database = AppDatabase.getDatabase(requireContext())
        entryRepository = EntryRepository(
            database.dailyEntryDao(),
            database.bibleReadingDao(),
            database.christianReadingDao()
        )
        importunityRepository = ImportunityRepository(database.importunityDao())

        // Configurer le RecyclerView pour les entrées quotidiennes
        adapter = HistoryAdapter { entryId ->
            showDeleteConfirmationDialog(entryId)
        }
        binding.recyclerViewHistory.layoutManager = LinearLayoutManager(requireContext())
        binding.recyclerViewHistory.adapter = adapter

        // Configurer le RecyclerView pour les importunités
        importunityAdapter = ImportunityAdapter()
        binding.recyclerViewImportunities.layoutManager = LinearLayoutManager(requireContext())
        binding.recyclerViewImportunities.adapter = importunityAdapter

        // Charger l'historique
        loadHistory()
        loadImportunities()
    }

    private fun showDeleteConfirmationDialog(entryId: Long) {
        AlertDialog.Builder(requireContext())
            .setTitle("Supprimer l'entrée")
            .setMessage("Êtes-vous sûr de vouloir supprimer cette entrée ? Cette action est irréversible et ajustera les pourcentages de progression.")
            .setPositiveButton("Supprimer") { _, _ ->
                deleteEntry(entryId)
            }
            .setNegativeButton("Annuler", null)
            .show()
    }

    private fun deleteEntry(entryId: Long) {
        viewLifecycleOwner.lifecycleScope.launch {
            try {
                entryRepository.deleteEntry(entryId)
                Toast.makeText(requireContext(), "Entrée supprimée avec succès", Toast.LENGTH_SHORT).show()
                // La liste sera automatiquement mise à jour grâce au Flow dans loadHistory
            } catch (e: Exception) {
                Toast.makeText(requireContext(), "Erreur lors de la suppression: ${e.message}", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun loadHistory() {
        val userId = preferenceManager.getUserId()
        if (userId == -1L) {
            binding.textViewEmptyHistory.visibility = View.VISIBLE
            binding.recyclerViewHistory.visibility = View.GONE
            return
        }

        val database = AppDatabase.getDatabase(requireContext())
        val dailyEntryDao = database.dailyEntryDao()
        val bibleReadingDao = database.bibleReadingDao()
        val christianReadingDao = database.christianReadingDao()

        viewLifecycleOwner.lifecycleScope.launch {
            dailyEntryDao.getAllEntriesForUser(userId).collect { entries ->
                if (entries.isEmpty()) {
                    binding.textViewEmptyHistory.visibility = View.VISIBLE
                    binding.recyclerViewHistory.visibility = View.GONE
                } else {
                    binding.textViewEmptyHistory.visibility = View.GONE
                    binding.recyclerViewHistory.visibility = View.VISIBLE

                    val historyItems = entries.map { entry ->
                        val bibleReading = bibleReadingDao.getReadingForEntry(entry.id).first()
                        val christianReading = christianReadingDao.getReadingForEntry(entry.id).first()

                        HistoryItem(
                            entry = entry,
                            bibleReading = bibleReading,
                            christianReading = christianReading
                        )
                    }

                    adapter.submitList(historyItems)
                }
            }
        }
    }

    private fun loadImportunities() {
        val userId = preferenceManager.getUserId()
        if (userId == -1L) {
            binding.textViewEmptyImportunities.visibility = View.VISIBLE
            binding.recyclerViewImportunities.visibility = View.GONE
            return
        }

        viewLifecycleOwner.lifecycleScope.launch {
            importunityRepository.getAllImportunitiesForUser(userId).collect { importunities ->
                if (importunities.isEmpty()) {
                    binding.textViewEmptyImportunities.visibility = View.VISIBLE
                    binding.recyclerViewImportunities.visibility = View.GONE
                } else {
                    binding.textViewEmptyImportunities.visibility = View.GONE
                    binding.recyclerViewImportunities.visibility = View.VISIBLE
                    importunityAdapter.submitList(importunities)
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    data class HistoryItem(
        val entry: DailyEntry,
        val bibleReading: BibleReading?,
        val christianReading: ChristianReading?
    )
}