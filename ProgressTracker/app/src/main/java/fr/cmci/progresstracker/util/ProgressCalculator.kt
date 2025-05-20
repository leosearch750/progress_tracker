package fr.cmci.progresstracker.util

import java.util.Calendar

class ProgressCalculator {

    fun calculateExpectedProgress(currentDate: Calendar = Calendar.getInstance()): Float {
        val currentYear = currentDate.get(Calendar.YEAR)
        val startOfYear = Calendar.getInstance().apply {
            set(currentYear, Calendar.JANUARY, 1, 0, 0, 0)
        }

        // Calculer le nombre de jours écoulés depuis le début de l'année
        val dayOfYear = currentDate.get(Calendar.DAY_OF_YEAR)
        val daysInYear = if (isLeapYear(currentYear)) 366 else 365

        // Retourner le pourcentage de l'année écoulée
        return dayOfYear.toFloat() / daysInYear.toFloat()
    }

    fun calculateProgressStatus(
        actualProgress: Float,
        expectedProgress: Float
    ): ProgressStatus {
        val ratio = actualProgress / expectedProgress

        return when {
            ratio < 0.8f -> ProgressStatus.BEHIND
            ratio <= 1.0f -> ProgressStatus.ON_TRACK
            else -> ProgressStatus.AHEAD
        }
    }

    fun getProgressMessage(status: ProgressStatus): String {
        return when (status) {
            ProgressStatus.BEHIND -> "Vous êtes en retard sur votre objectif."
            ProgressStatus.ON_TRACK -> "Vous êtes sur la bonne voie."
            ProgressStatus.AHEAD -> "Félicitations, vous êtes en avance sur votre objectif!"
        }
    }

    private fun isLeapYear(year: Int): Boolean {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
    }

    enum class ProgressStatus {
        BEHIND, ON_TRACK, AHEAD
    }
}