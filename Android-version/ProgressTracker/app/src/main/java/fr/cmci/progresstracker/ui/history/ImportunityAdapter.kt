package fr.cmci.progresstracker.ui.history

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import fr.cmci.progresstracker.data.entity.Importunity
import fr.cmci.progresstracker.databinding.ItemImportunityBinding
import java.text.SimpleDateFormat
import java.util.Locale

class ImportunityAdapter : RecyclerView.Adapter<ImportunityAdapter.ViewHolder>() {

    private val dateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
    private var importunities: List<Importunity> = emptyList()

    fun submitList(newList: List<Importunity>) {
        importunities = newList
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemImportunityBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = importunities[position]
        holder.bind(item)
    }

    override fun getItemCount(): Int = importunities.size

    inner class ViewHolder(private val binding: ItemImportunityBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(item: Importunity) {
            // Date
            binding.textViewImportunityDate.text = dateFormat.format(item.date)

            // Sujet
            binding.textViewImportunitySubject.text = item.subject

            // Compteur
            binding.textViewImportunityCounter.text = "Compteur: ${item.counter}"
        }
    }
}
