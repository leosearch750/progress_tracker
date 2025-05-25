package fr.cmci.progresstracker.ui.history

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import fr.cmci.progresstracker.util.PreferenceManager
import fr.cmci.progresstracker.databinding.ActivityLoginBinding
import fr.cmci.progresstracker.databinding.ItemHistoryEntryBinding
import java.text.SimpleDateFormat
import java.util.Locale

class HistoryAdapter(private val onDeleteClick: (Long) -> Unit) :
    ListAdapter<HistoryFragment.HistoryItem, HistoryAdapter.ViewHolder>(HistoryDiffCallback()) {

    private val dateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemHistoryEntryBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = getItem(position)
        holder.bind(item)
    }

    inner class ViewHolder(private val binding: ItemHistoryEntryBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(item: HistoryFragment.HistoryItem) {
            val entry = item.entry
            val bibleReading = item.bibleReading
            val christianReading = item.christianReading

            // Date
            binding.textViewEntryDate.text = dateFormat.format(entry.date)

            // RD
            binding.textViewRDEntry.text = "RD: ${entry.rdCompleted}/${entry.rdTarget}"

            // LB
            val lbText = if (bibleReading != null) {
                "LB: ${bibleReading.chaptersCount}/${bibleReading.chaptersTarget} chapitres (${bibleReading.chaptersList})"
            } else {
                "LB: Non renseigné"
            }
            binding.textViewLBEntry.text = lbText

            // LC
            val lcText = if (christianReading != null) {
                "LC: ${christianReading.pagesCount} pages (${christianReading.bookName})"
            } else {
                "LC: Non renseigné"
            }
            binding.textViewLCEntry.text = lcText

            // PS
            binding.textViewPSEntry.text = "PS: ${entry.psHours}/${entry.psTarget}h"

            // Configurer le bouton de suppression
            binding.buttonDeleteEntry.setOnClickListener {
                onDeleteClick(entry.id)
            }
        }
    }

    class HistoryDiffCallback : DiffUtil.ItemCallback<HistoryFragment.HistoryItem>() {
        override fun areItemsTheSame(
            oldItem: HistoryFragment.HistoryItem,
            newItem: HistoryFragment.HistoryItem
        ): Boolean {
            return oldItem.entry.id == newItem.entry.id
        }

        override fun areContentsTheSame(
            oldItem: HistoryFragment.HistoryItem,
            newItem: HistoryFragment.HistoryItem
        ): Boolean {
            return oldItem == newItem
        }
    }
}