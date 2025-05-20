package fr.cmci.progresstracker.ui.history

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import fr.cmci.progresstracker.data.AppDatabase
import fr.cmci.progresstracker.data.entity.BibleReading
import fr.cmci.progresstracker.data.entity.ChristianReading
import fr.cmci.progresstracker.data.entity.DailyEntry
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
    private lateinit var preferenceManager: PreferenceManager
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

        // Configurer le RecyclerView
        adapter = HistoryAdapter()
        binding.recyclerViewHistory.layoutManager = LinearLayoutManager(requireContext())
        binding.recyclerViewHistory.adapter = adapter

        // Charger l'historique
        loadHistory()
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